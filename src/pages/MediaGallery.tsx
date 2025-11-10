import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Download, X, ChevronLeft, ChevronRight, ArrowUp, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink: string;
  webContentLink?: string;
}

interface FolderData {
  id: string;
  name: string;
  photos: MediaFile[];
  videos: MediaFile[];
}

const CACHE_KEY = "nice_gallery_cache";
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutes

const MediaGallery = () => {
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [activeFolder, setActiveFolder] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<MediaFile | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Environment variables with fallback to hardcoded values
  const FOLDER_ID = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID || "1RKZdynHHCnssvHARScv9SS0Z591tiubv";
  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "AIzaSyB2kSfQ8znBMnGOAax0T14fVLe6VnklGF8";

  useEffect(() => {
    loadGallery();

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Load from cache or fetch fresh data
  const loadGallery = async () => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < CACHE_DURATION) {
          setFolders(data);
          setActiveFolder(data[0]?.name || "");
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Cache parse error:", e);
      }
    }
    fetchGallery();
  };

  // Fetch all folders and their media
  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError("");

      if (!FOLDER_ID || !API_KEY) {
        throw new Error("Missing Google Drive configuration. Please set VITE_GOOGLE_DRIVE_FOLDER_ID and VITE_GOOGLE_API_KEY in your environment.");
      }

      // Get all subfolders
      const foldersResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents+and+mimeType='application/vnd.google-apps.folder'&key=${API_KEY}&fields=files(id,name)`
      );

      if (!foldersResponse.ok) {
        const errorData = await foldersResponse.json();
        throw new Error(errorData.error?.message || "Failed to fetch folders from Google Drive.");
      }

      const foldersData = await foldersResponse.json();
      const subfolders = foldersData.files || [];

      if (subfolders.length === 0) {
        throw new Error("No subfolders found in the specified Google Drive folder. Please check your folder structure.");
      }

      // Fetch media from each subfolder (going one level deeper to get event folders)
      const folderDataPromises = subfolders.map(async (folder: any) => {
        // First, get subfolders (event folders) within each day folder
        const eventFoldersResponse = await fetch(
          `https://www.googleapis.com/drive/v3/files?q='${folder.id}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType)`
        );

        if (!eventFoldersResponse.ok) return { id: folder.id, name: folder.name, photos: [], videos: [] };

        const eventFoldersData = await eventFoldersResponse.json();
        const eventFolders = eventFoldersData.files || [];

        // Now fetch all files from all event folders
        const allPhotos: MediaFile[] = [];
        const allVideos: MediaFile[] = [];

        for (const eventFolder of eventFolders) {
          // Skip if not a folder
          if (eventFolder.mimeType !== "application/vnd.google-apps.folder") continue;

          const filesResponse = await fetch(
            `https://www.googleapis.com/drive/v3/files?q='${eventFolder.id}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,thumbnailLink,webViewLink,webContentLink)`
          );

          if (filesResponse.ok) {
            const filesData = await filesResponse.json();
            const files: MediaFile[] = filesData.files || [];

            allPhotos.push(...files.filter(file => file.mimeType.startsWith("image/")));
            allVideos.push(...files.filter(file => file.mimeType.startsWith("video/")));
          }
        }

        return {
          id: folder.id,
          name: folder.name,
          photos: allPhotos,
          videos: allVideos,
        };
      });

      const allFolders = await Promise.all(folderDataPromises);

      // Sort folders by name (Day 1, Day 2, Day 3, etc.)
      const sortedFolders = allFolders.sort((a, b) => {
        const dayA = a.name.match(/\d+/)?.[0] || "999";
        const dayB = b.name.match(/\d+/)?.[0] || "999";
        return parseInt(dayA) - parseInt(dayB);
      });

      setFolders(sortedFolders);
      setActiveFolder(sortedFolders[0]?.name || "");

      // Cache the results
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data: sortedFolders, timestamp: Date.now() })
      );

      setLoading(false);
    } catch (err: any) {
      console.error("Error fetching gallery:", err);
      setError(err.message || "Failed to load gallery. Please check your API configuration.");
      setLoading(false);
    }
  };

  const getSubtitleForFolder = (folderName: string): string => {
    const name = folderName.toLowerCase();
    if (name.includes("day 1") || name.includes("day1"))
      return "Technical Tour, City Tour, Chairman's Cocktail";
    if (name.includes("day 2") || name.includes("day2"))
      return "Opening Ceremony, Technical Session 1, Fellows Dinner";
    if (name.includes("day 3") || name.includes("day3"))
      return "Technical Session 2, AGM, Governor's Visit, General Dinner";
    return "Conference Highlights";
  };

  const openLightbox = (media: MediaFile, allMedia: MediaFile[], index: number) => {
    setCurrentMedia(media);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentMedia(null);
  };

  const activeData = folders.find(f => f.name === activeFolder);
  const allPhotos = activeData?.photos || [];

  const goToNext = () => {
    if (allPhotos.length === 0) return;
    const nextIndex = (currentIndex + 1) % allPhotos.length;
    setCurrentIndex(nextIndex);
    setCurrentMedia(allPhotos[nextIndex]);
  };

  const goToPrevious = () => {
    if (allPhotos.length === 0) return;
    const prevIndex = currentIndex === 0 ? allPhotos.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentMedia(allPhotos[prevIndex]);
  };

  const downloadMedia = (media: MediaFile) => {
    const link = document.createElement("a");
    link.href = media.webContentLink || `https://drive.google.com/uc?export=download&id=${media.id}`;
    link.download = media.name;
    link.click();
    toast.success("Download started!");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Conference Media Gallery | NICE National Conference 2025</title>
        <meta
          name="description"
          content="Explore photos and videos from the 2025 National Conference in Kano. Relive each moment — from the tours to the plenary sessions and dinner nights."
        />
      </Helmet>

      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              📸 Conference Media Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Explore photos and videos from the 2025 National Conference in Kano. Relive each moment — from the tours to the plenary sessions and dinner nights.
            </p>
          </div>

          {/* Error State */}
          {error && !loading && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{error}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchGallery}
                  className="ml-4"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-8">
              <Skeleton className="h-12 w-full" />
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <Skeleton key={i} className="aspect-square rounded-lg" />
                ))}
              </div>
            </div>
          )}

          {/* Gallery Content */}
          {!loading && !error && folders.length > 0 && (
            <>
              {/* Download All Button */}
              <div className="flex justify-end mb-6">
                <Button
                  onClick={() =>
                    window.open(`https://drive.google.com/drive/folders/${FOLDER_ID}`, "_blank")
                  }
                  style={{ backgroundColor: "hsl(var(--brand-primary))", color: "hsl(var(--brand-on-primary))" }}
                  className="hover:opacity-90"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All Photos
                </Button>
              </div>

              {/* Tabs for Different Days/Folders */}
              <Tabs value={activeFolder} onValueChange={setActiveFolder} className="w-full">
                <TabsList className="grid w-full mb-8" style={{ gridTemplateColumns: `repeat(${folders.length}, minmax(0, 1fr))` }}>
                  {folders.map((folder) => (
                    <TabsTrigger key={folder.id} value={folder.name}>
                      {folder.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {folders.map((folder) => (
                  <TabsContent key={folder.id} value={folder.name} className="space-y-12">
                    {/* Photos Section */}
                    {folder.photos.length > 0 && (
                      <section>
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-foreground mb-2">
                            📸 {folder.name} - Photos
                          </h2>
                          <p className="text-muted-foreground">{getSubtitleForFolder(folder.name)}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {folder.photos.map((photo, index) => (
                            <Card
                              key={photo.id}
                              className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                              onClick={() => openLightbox(photo, folder.photos, index)}
                            >
                              <div className="aspect-square relative overflow-hidden">
                                <img
                                  src={photo.thumbnailLink || `https://drive.google.com/thumbnail?id=${photo.id}&sz=w500`}
                                  alt={photo.name}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                  <Download
                                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      downloadMedia(photo);
                                    }}
                                  />
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Videos Section */}
                    {folder.videos.length > 0 && (
                      <section>
                        <div className="mb-6">
                          <h2 className="text-2xl font-bold text-foreground mb-2">
                            🎥 {folder.name} - Videos
                          </h2>
                          <p className="text-muted-foreground">Watch video highlights</p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {folder.videos.map((video) => (
                            <Card
                              key={video.id}
                              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                              <div className="aspect-video relative overflow-hidden bg-muted">
                                <iframe
                                  src={`https://drive.google.com/file/d/${video.id}/preview`}
                                  className="w-full h-full"
                                  allow="autoplay"
                                  allowFullScreen
                                  title={video.name}
                                ></iframe>
                              </div>
                              <div className="p-4 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-foreground truncate flex-1">
                                  {video.name}
                                </h3>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => downloadMedia(video)}
                                >
                                  <Download className="w-4 h-4" />
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </section>
                    )}

                    {/* Empty State */}
                    {folder.photos.length === 0 && folder.videos.length === 0 && (
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">No media files found in this folder yet.</p>
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}

          {/* Empty State - No Folders */}
          {!loading && !error && folders.length === 0 && (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Media Found</h3>
              <p className="text-muted-foreground mb-6">
                No folders were found in the specified Google Drive location.
              </p>
              <Button onClick={fetchGallery}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentMedia && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <div className="max-w-5xl max-h-[90vh] relative">
            <img
              src={`https://drive.google.com/uc?export=view&id=${currentMedia.id}`}
              alt={currentMedia.name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-4">
              <span className="text-sm">
                {currentIndex + 1} / {allPhotos.length}
              </span>
              <Button
                size="sm"
                onClick={() => downloadMedia(currentMedia)}
                style={{ backgroundColor: "hsl(var(--brand-primary))", color: "hsl(var(--brand-on-primary))" }}
                className="hover:opacity-90"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <button
            onClick={goToNext}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-12 h-12" />
          </button>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{ backgroundColor: "hsl(var(--brand-primary))", color: "hsl(var(--brand-on-primary))" }}
          className="fixed bottom-8 right-8 p-3 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 hover:scale-110 z-40"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default MediaGallery;

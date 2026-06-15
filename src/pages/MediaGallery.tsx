import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Download, X, ChevronLeft, ChevronRight, ArrowUp, RefreshCw, AlertCircle, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

// 📁 Folder IDs - Replace these with actual Google Drive folder IDs
const FOLDER_IDS = {
  PHOTOS: {
    DAY1: {
      TECH_TOUR: "1C0oDd1p8VP82zklBWKl0t5MNBjbbTqYT",
      CITY_TOUR: "1teNWFuukrkSZgMZAS5P6jqy78nhWEW5M",
      COCKTAIL: "13DsN942F85hJ0UFc3nLpjrMb0G-9veb0",
    },
    DAY2: {
      OPENING: "1mbY1ccHmPW5tiJ-8S2a6vCmhv7djlxw4",
      SESSION1: "1APjECqTJ3oA_jDSmLbVRB4vFMxRzPmdF",
      DINNER: "1xDUu5tSUuSN3y0r67K-hBfmoJGlw_j7p",
    },
    DAY3: {
      SESSION2: "1HaP_TvXH9GsWDuwZaP2bILIUS2vTkrFZ",
      AGM: "1ng0mbZMeZn0otYyTwLTmSgZe4Aay3CyL",
      GOV_VISIT: "1MN47U3MolriC4-iAONLCfI3eb7SdAuMF",
      GENERAL_DINNER: "1JE3NbRkaApPNTMFvrbBcDqetlqQbhZoe",
    },
  },
  VIDEOS: "FOLDER_ID_VIDEOS_MAIN",
};

interface MediaFile {
  id: string;
  name: string;
  mimeType: string;
  thumbnailLink?: string;
  webViewLink: string;
  webContentLink?: string;
}

interface FolderContent {
  folderId: string;
  folderName: string;
  files: MediaFile[];
  loading: boolean;
  error: string;
}

const MediaGallery = () => {
  const [photoSections, setPhotoSections] = useState<Record<string, FolderContent>>({});
  const [videoFiles, setVideoFiles] = useState<MediaFile[]>([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [videosError, setVideosError] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentMedia, setCurrentMedia] = useState<MediaFile | null>(null);
  const [currentMediaList, setCurrentMediaList] = useState<MediaFile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || "AIzaSyB2kSfQ8znBMnGOAax0T14fVLe6VnklGF8";

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Helper function to fetch files from a Google Drive folder
  const fetchDriveFiles = async (folderId: string): Promise<MediaFile[]> => {
    if (!API_KEY) {
      throw new Error("Missing Google API key. Please set VITE_GOOGLE_API_KEY.");
    }

    const response = await fetch(
      `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${API_KEY}&fields=files(id,name,mimeType,thumbnailLink,webViewLink,webContentLink)`
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Failed to fetch files from Google Drive.");
    }

    const data = await response.json();
    return data.files || [];
  };

  // Load files for a specific folder
  const loadFolderFiles = async (folderId: string, folderName: string, sectionKey: string) => {
    setPhotoSections((prev) => ({
      ...prev,
      [sectionKey]: { folderId, folderName, files: [], loading: true, error: "" },
    }));

    try {
      const files = await fetchDriveFiles(folderId);
      const images = files.filter((file) => file.mimeType.startsWith("image/"));

      setPhotoSections((prev) => ({
        ...prev,
        [sectionKey]: { folderId, folderName, files: images, loading: false, error: "" },
      }));
    } catch (err: any) {
      console.error(`Error loading ${folderName}:`, err);
      setPhotoSections((prev) => ({
        ...prev,
        [sectionKey]: {
          folderId,
          folderName,
          files: [],
          loading: false,
          error: err.message || "Failed to load images.",
        },
      }));
    }
  };

  // Load videos
  const loadVideos = async () => {
    setVideosLoading(true);
    setVideosError("");

    try {
      const files = await fetchDriveFiles(FOLDER_IDS.VIDEOS);
      const videos = files.filter((file) => file.mimeType.startsWith("video/"));
      setVideoFiles(videos);
      setVideosLoading(false);
    } catch (err: any) {
      console.error("Error loading videos:", err);
      setVideosError(err.message || "Failed to load videos.");
      setVideosLoading(false);
    }
  };

  // Open lightbox
  const openLightbox = (media: MediaFile, mediaList: MediaFile[], index: number) => {
    setCurrentMedia(media);
    setCurrentMediaList(mediaList);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentMedia(null);
  };

  const goToNext = () => {
    if (currentMediaList.length === 0) return;
    const nextIndex = (currentIndex + 1) % currentMediaList.length;
    setCurrentIndex(nextIndex);
    setCurrentMedia(currentMediaList[nextIndex]);
  };

  const goToPrevious = () => {
    if (currentMediaList.length === 0) return;
    const prevIndex = currentIndex === 0 ? currentMediaList.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentMedia(currentMediaList[prevIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "ArrowLeft") goToPrevious();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [lightboxOpen, currentIndex, currentMediaList]);

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

  const openDriveFolder = (folderId: string) => {
    window.open(`https://drive.google.com/drive/folders/${folderId}`, "_blank");
  };

  // Photo sections configuration
  const photoSectionsConfig = [
    {
      day: "Day 1",
      sections: [
        { key: "day1_tech_tour", name: "Technical Tour", folderId: FOLDER_IDS.PHOTOS.DAY1.TECH_TOUR },
        { key: "day1_city_tour", name: "City Tour", folderId: FOLDER_IDS.PHOTOS.DAY1.CITY_TOUR },
        { key: "day1_cocktail", name: "Chairman's Cocktail", folderId: FOLDER_IDS.PHOTOS.DAY1.COCKTAIL },
      ],
    },
    {
      day: "Day 2",
      sections: [
        { key: "day2_opening", name: "Opening Ceremony", folderId: FOLDER_IDS.PHOTOS.DAY2.OPENING },
        { key: "day2_session1", name: "Technical Session 1", folderId: FOLDER_IDS.PHOTOS.DAY2.SESSION1 },
        { key: "day2_dinner", name: "Fellows Dinner", folderId: FOLDER_IDS.PHOTOS.DAY2.DINNER },
      ],
    },
    {
      day: "Day 3",
      sections: [
        { key: "day3_session2", name: "Technical Session 2", folderId: FOLDER_IDS.PHOTOS.DAY3.SESSION2 },
        { key: "day3_agm", name: "Annual General Meeting", folderId: FOLDER_IDS.PHOTOS.DAY3.AGM },
        { key: "day3_gov_visit", name: "Governor's Visit", folderId: FOLDER_IDS.PHOTOS.DAY3.GOV_VISIT },
        { key: "day3_general_dinner", name: "General Dinner", folderId: FOLDER_IDS.PHOTOS.DAY3.GENERAL_DINNER },
      ],
    },
  ];

  return (
    <>
      <Helmet title="Media Gallery | NICE Kano 2025 Conference">
        <meta
          name="description"
          content="Browse official photos and videos from the NICE Kano 2025 National Conference — grouped by day and activity."
        />
      </Helmet>

      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              📸 NICE Kano 2025 Media Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Browse official photos and videos from the International Civil Engineering Conference and AGM — grouped by day and activity.
            </p>
          </div>

          {/* Tabs for Photos and Videos */}
          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="photos">📸 Photos</TabsTrigger>
              <TabsTrigger value="videos" onClick={() => !videoFiles.length && !videosLoading && loadVideos()}>
                🎥 Videos
              </TabsTrigger>
            </TabsList>

            {/* Photos Tab */}
            <TabsContent value="photos" className="space-y-6">
              <Accordion type="multiple" className="w-full space-y-4">
                {photoSectionsConfig.map((dayConfig) => (
                  <AccordionItem key={dayConfig.day} value={dayConfig.day} className="border rounded-lg">
                    <AccordionTrigger className="px-6 hover:no-underline">
                      <span className="text-xl font-semibold">{dayConfig.day}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 space-y-8">
                      {dayConfig.sections.map((section) => {
                        const content = photoSections[section.key];
                        const hasLoaded = !!content;

                        return (
                          <div key={section.key} className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold text-foreground">{section.name}</h3>
                              <div className="flex gap-2">
                                {!hasLoaded && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => loadFolderFiles(section.folderId, section.name, section.key)}
                                  >
                                    Load Photos
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => openDriveFolder(section.folderId)}
                                >
                                  <Folder className="w-4 h-4 mr-2" />
                                  Open Folder
                                </Button>
                              </div>
                            </div>

                            {hasLoaded && (
                              <>
                                {content.loading && (
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {[1, 2, 3, 4].map((i) => (
                                      <Skeleton key={i} className="aspect-square rounded-lg" />
                                    ))}
                                  </div>
                                )}

                                {content.error && (
                                  <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription className="flex items-center justify-between">
                                      <span>⚠️ {content.error}</span>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => loadFolderFiles(section.folderId, section.name, section.key)}
                                        className="ml-4"
                                      >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Retry
                                      </Button>
                                    </AlertDescription>
                                  </Alert>
                                )}

                                {!content.loading && !content.error && content.files.length > 0 && (
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                    {content.files.map((photo, index) => (
                                      <Card
                                        key={photo.id}
                                        className="group overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 border-2 border-transparent hover:border-primary/50 bg-card"
                                        onClick={() => openLightbox(photo, content.files, index)}
                                      >
                                        <div className="aspect-square relative overflow-hidden bg-muted">
                                          <img
                                            src={
                                              photo.thumbnailLink ||
                                              `https://drive.google.com/thumbnail?id=${photo.id}&sz=w500`
                                            }
                                            alt={photo.name}
                                            className="w-full h-full object-cover transition-all duration-500 group-hover:scale-125 group-hover:rotate-2"
                                            loading="lazy"
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                              <div className="bg-primary text-primary-foreground rounded-full p-4 shadow-lg">
                                                <Download className="w-6 h-6" />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="absolute top-2 right-2 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Click to preview
                                          </div>
                                        </div>
                                      </Card>
                                    ))}
                                  </div>
                                )}

                                {!content.loading && !content.error && content.files.length === 0 && (
                                  <p className="text-center text-muted-foreground py-8">
                                    No photos found in this folder.
                                  </p>
                                )}
                              </>
                            )}
                          </div>
                        );
                      })}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos" className="space-y-6">
              {videosLoading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="aspect-video rounded-lg" />
                  ))}
                </div>
              )}

              {videosError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="flex items-center justify-between">
                    <span>⚠️ {videosError}</span>
                    <Button variant="outline" size="sm" onClick={loadVideos} className="ml-4">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retry
                    </Button>
                  </AlertDescription>
                </Alert>
              )}

              {!videosLoading && !videosError && videoFiles.length > 0 && (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-foreground">Conference Videos</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDriveFolder(FOLDER_IDS.VIDEOS)}
                    >
                      <Folder className="w-4 h-4 mr-2" />
                      Open Folder
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videoFiles.map((video) => (
                      <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
                          <h3 className="text-sm font-semibold text-foreground truncate flex-1">{video.name}</h3>
                          <Button size="sm" variant="ghost" onClick={() => downloadMedia(video)}>
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}

              {!videosLoading && !videosError && videoFiles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No videos found in this folder.</p>
                  <Button onClick={loadVideos} className="mt-4">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Enhanced Lightbox */}
      {lightboxOpen && currentMedia && (
        <div className="fixed inset-0 z-50 bg-black/98 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/80 hover:text-white transition-all duration-300 z-20 bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-sm hover:scale-110"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-6 text-white/80 hover:text-white transition-all duration-300 z-20 bg-white/10 hover:bg-white/20 rounded-full p-4 backdrop-blur-sm hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous image"
            disabled={currentMediaList.length <= 1}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="max-w-6xl max-h-[85vh] relative animate-scale-in">
            <img
              src={`https://drive.google.com/uc?export=view&id=${currentMedia.id}`}
              alt={currentMedia.name}
              className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
            />
            
            {/* Image info overlay */}
            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-lg">
              <p className="text-sm font-medium truncate max-w-xs">{currentMedia.name}</p>
            </div>

            {/* Controls overlay */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-6 shadow-xl">
              <span className="text-sm font-semibold">
                {currentIndex + 1} / {currentMediaList.length}
              </span>
              <div className="w-px h-6 bg-white/30"></div>
              <Button
                size="sm"
                onClick={() => downloadMedia(currentMedia)}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Keyboard hint */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/50 text-xs">
              Use ← → arrow keys to navigate
            </div>
          </div>

          <button
            onClick={goToNext}
            className="absolute right-6 text-white/80 hover:text-white transition-all duration-300 z-20 bg-white/10 hover:bg-white/20 rounded-full p-4 backdrop-blur-sm hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next image"
            disabled={currentMediaList.length <= 1}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            backgroundColor: "hsl(var(--brand-primary))",
            color: "hsl(var(--brand-on-primary))",
          }}
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

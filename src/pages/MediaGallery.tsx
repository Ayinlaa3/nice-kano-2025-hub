import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Download, X, ChevronLeft, ChevronRight, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

interface GalleryImage {
  id: string;
  name: string;
  thumbnailLink: string;
  webContentLink: string;
}

interface DaySection {
  title: string;
  subtitle: string;
  images: GalleryImage[];
}

const MediaGallery = () => {
  const [gallery, setGallery] = useState<DaySection[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Replace with actual Google Drive folder ID and API key
  const FOLDER_ID = "YOUR_FOLDER_ID_HERE";
  const API_KEY = "YOUR_API_KEY_HERE";

  useEffect(() => {
    fetchGalleryImages();
    
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      
      // Fetch files from Google Drive folder
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name,thumbnailLink,webContentLink)`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }
      
      const data = await response.json();
      const images: GalleryImage[] = data.files || [];
      
      // Organize images by days (you can customize this logic based on naming convention)
      const organized: DaySection[] = [
        {
          title: "Day 1",
          subtitle: "Technical Tour, City Tour, Chairman's Cocktail",
          images: images.filter(img => img.name.toLowerCase().includes("day1") || img.name.toLowerCase().includes("day-1"))
        },
        {
          title: "Day 2",
          subtitle: "Opening Ceremony, Technical Session 1, Fellows Dinner",
          images: images.filter(img => img.name.toLowerCase().includes("day2") || img.name.toLowerCase().includes("day-2"))
        },
        {
          title: "Day 3",
          subtitle: "Technical Session 2, Annual General Meeting, Governor's Visit, General Dinner",
          images: images.filter(img => img.name.toLowerCase().includes("day3") || img.name.toLowerCase().includes("day-3"))
        }
      ];
      
      // Add remaining images to a general section
      const categorizedIds = organized.flatMap(day => day.images.map(img => img.id));
      const remaining = images.filter(img => !categorizedIds.includes(img.id));
      
      if (remaining.length > 0) {
        organized.push({
          title: "More Moments",
          subtitle: "Additional highlights from the conference",
          images: remaining
        });
      }
      
      setGallery(organized);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to load gallery images. Please check your API configuration.");
      
      // Fallback: use mock data for demonstration
      setGallery([
        {
          title: "Day 1",
          subtitle: "Technical Tour, City Tour, Chairman's Cocktail",
          images: []
        },
        {
          title: "Day 2",
          subtitle: "Opening Ceremony, Technical Session 1, Fellows Dinner",
          images: []
        },
        {
          title: "Day 3",
          subtitle: "Technical Session 2, Annual General Meeting, Governor's Visit, General Dinner",
          images: []
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (image: GalleryImage, index: number) => {
    setCurrentImage(image);
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setCurrentImage(null);
  };

  const allImages = gallery.flatMap(day => day.images);

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % allImages.length;
    setCurrentIndex(nextIndex);
    setCurrentImage(allImages[nextIndex]);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? allImages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setCurrentImage(allImages[prevIndex]);
  };

  const downloadImage = (image: GalleryImage) => {
    const link = document.createElement("a");
    link.href = `https://drive.google.com/uc?export=download&id=${image.id}`;
    link.download = image.name;
    link.click();
    toast.success("Download started!");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const videos = [
    {
      id: "1",
      title: "Day 1 Highlights",
      embedUrl: "https://drive.google.com/file/d/YOUR_VIDEO_ID_1/preview"
    },
    {
      id: "2",
      title: "Opening Ceremony Highlights",
      embedUrl: "https://drive.google.com/file/d/YOUR_VIDEO_ID_2/preview"
    },
    {
      id: "3",
      title: "Governor's Visit and General Dinner",
      embedUrl: "https://drive.google.com/file/d/YOUR_VIDEO_ID_3/preview"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Conference Media Gallery | NICE National Conference 2025</title>
        <meta
          name="description"
          content="Relive the best moments from the 2025 NICE National Conference in Kano through photos and videos."
        />
      </Helmet>

      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Conference Media Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Relive the best moments from the 2025 NICE National Conference in Kano — from inspiring technical sessions and engaging tours to networking dinners and memorable ceremonies.
            </p>
          </div>

          {/* Photos Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-display font-bold text-foreground">
                📸 Conference Photos
              </h2>
              <Button
                onClick={() => window.open(`https://drive.google.com/drive/folders/${FOLDER_ID}`, "_blank")}
                className="bg-brand text-brand-foreground hover:bg-brand-light"
              >
                <Download className="w-4 h-4 mr-2" />
                Download All Photos
              </Button>
            </div>

            {loading ? (
              <div className="space-y-12">
                {[1, 2, 3].map((day) => (
                  <div key={day}>
                    <Skeleton className="h-8 w-48 mb-4" />
                    <Skeleton className="h-6 w-96 mb-6" />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="aspect-square rounded-lg" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-12">
                {gallery.map((day, dayIndex) => (
                  <div key={dayIndex}>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {day.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">{day.subtitle}</p>
                    
                    {day.images.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {day.images.map((image, imgIndex) => {
                          const globalIndex = gallery
                            .slice(0, dayIndex)
                            .reduce((acc, d) => acc + d.images.length, 0) + imgIndex;
                          
                          return (
                            <Card
                              key={image.id}
                              className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105"
                              onClick={() => openLightbox(image, globalIndex)}
                            >
                              <div className="aspect-square relative overflow-hidden">
                                <img
                                  src={`https://drive.google.com/uc?export=view&id=${image.id}`}
                                  alt={image.name}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                                  <Download
                                    className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      downloadImage(image);
                                    }}
                                  />
                                </div>
                              </div>
                            </Card>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-muted-foreground italic">
                        No photos available for this day yet.
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Divider */}
          <div className="border-t border-border my-16"></div>

          {/* Videos Section */}
          <section>
            <h2 className="text-3xl font-display font-bold text-foreground mb-8">
              🎥 Conference Videos
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="overflow-hidden group hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <iframe
                      src={video.embedUrl}
                      className="w-full h-full"
                      allow="autoplay"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      {video.title}
                    </h3>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentImage && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={goToPrevious}
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <div className="max-w-5xl max-h-[90vh] relative">
            <img
              src={`https://drive.google.com/uc?export=view&id=${currentImage.id}`}
              alt={currentImage.name}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full flex items-center gap-4">
              <span className="text-sm">
                {currentIndex + 1} / {allImages.length}
              </span>
              <Button
                size="sm"
                onClick={() => downloadImage(currentImage)}
                className="bg-brand text-brand-foreground hover:bg-brand-light"
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </div>
          </div>

          <button
            onClick={goToNext}
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
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
          className="fixed bottom-8 right-8 bg-brand text-brand-foreground p-3 rounded-full shadow-lg hover:bg-brand-light transition-all duration-300 hover:scale-110 z-40"
          aria-label="Back to top"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </>
  );
};

export default MediaGallery;

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Download, Upload, User, Sparkles, Share2 } from "lucide-react";
import { toast } from "sonner";
import flyerTemplate from "@/assets/nice-2026-attending-flyer.jpg";

const SITE_URL = "https://conference.nicehq.org";
const CAPTION =
  "I have registered and will be attending the 24th International Civil Engineering Conference & AGM, 20th - 22nd October 2026, Lagos. #THISISLAGOS #NICE2026";

// Template artwork is 1088 x 1088
const SIZE = 1088;
const PHOTO = { cx: 297, cy: 478, r: 220 };
const NAME = { cx: 782, cy: 669, maxWidth: 520, maxFont: 46 };

const SHARE_TARGETS = [
  {
    key: "whatsapp",
    label: "WhatsApp Status",
    url: () => `https://wa.me/?text=${encodeURIComponent(`${CAPTION} ${SITE_URL}`)}`,
  },
  { key: "instagram", label: "Instagram", url: () => "https://www.instagram.com/" },
  {
    key: "facebook",
    label: "Facebook",
    url: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    url: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`,
  },
  { key: "tiktok", label: "TikTok", url: () => "https://www.tiktok.com/upload" },
  {
    key: "x",
    label: "X",
    url: () =>
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(CAPTION)}&url=${encodeURIComponent(SITE_URL)}`,
  },
];

export const IllBeThere = () => {
  const [name, setName] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isReady = Boolean(previewUrl && name.trim() && uploadedImage);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      toast.success("Photo uploaded successfully!");
    };
    reader.readAsDataURL(file);
  }, []);

  // Re-render the flyer whenever the name or photo changes
  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      if (!name.trim() || !uploadedImage) {
        setPreviewUrl(null);
        return;
      }
      setIsRendering(true);
      try {
        const loadImage = (src: string) =>
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error("Image failed to load"));
            img.src = src;
          });

        const [template, photo] = await Promise.all([
          loadImage(flyerTemplate),
          loadImage(uploadedImage),
        ]);
        if (cancelled) return;

        const canvas = canvasRef.current ?? document.createElement("canvas");
        canvasRef.current = canvas;
        canvas.width = SIZE;
        canvas.height = SIZE;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, SIZE, SIZE);
        ctx.drawImage(template, 0, 0, SIZE, SIZE);

        // Photo, cover-fitted inside the gold circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(PHOTO.cx, PHOTO.cy, PHOTO.r, 0, Math.PI * 2);
        ctx.clip();
        const target = PHOTO.r * 2;
        const scale = Math.max(target / photo.width, target / photo.height);
        const w = photo.width * scale;
        const h = photo.height * scale;
        ctx.drawImage(photo, PHOTO.cx - w / 2, PHOTO.cy - h / 2, w, h);
        ctx.restore();

        // Name inside the dark green bar, auto-fitted
        const text = name.trim().toUpperCase();
        let fontSize = NAME.maxFont;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#ffffff";
        do {
          ctx.font = `bold ${fontSize}px Montserrat, Arial, sans-serif`;
          if (ctx.measureText(text).width <= NAME.maxWidth) break;
          fontSize -= 1;
        } while (fontSize > 20);
        ctx.fillText(text, NAME.cx, NAME.cy, NAME.maxWidth);

        const url = canvas.toDataURL("image/png");
        if (!cancelled) setPreviewUrl(url);
      } catch (error) {
        console.error("Flyer render failed", error);
        if (!cancelled) toast.error("Could not build your flyer. Please try again.");
      } finally {
        if (!cancelled) setIsRendering(false);
      }
    };

    const timer = window.setTimeout(render, 250);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [name, uploadedImage]);

  const fileName = `nice-lagos-2026-${(name.trim() || "delegate")
    .replace(/\s+/g, "-")
    .toLowerCase()}.png`;

  const saveFlyer = useCallback(() => {
    if (!previewUrl) return;
    const link = document.createElement("a");
    link.download = fileName;
    link.href = previewUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Flyer saved to your device!");
  }, [previewUrl, fileName]);

  const shareTo = useCallback(
    (url: string, label: string) => {
      if (!previewUrl) return;

      // Open the network synchronously inside the click so popup blockers allow it
      const win = window.open(url, "_blank", "noopener,noreferrer");
      saveFlyer();
      if (!win) {
        toast.info(`Flyer saved — opening ${label}`);
        window.location.href = url;
        return;
      }
      toast.info(`Flyer saved — now attach it in ${label}`);
    },
    [previewUrl, saveFlyer]
  );

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-brand/5 via-vibrant/5 to-brand-primary/5">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-brand" />
            <h2 className="text-2xl md:text-3xl font-bold">I'll Be Attending</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Add your photo and name to create your personalised conference flyer, then share it with
            your network.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 items-start">
          {/* Input */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-brand" />
              Your Details
            </h3>

            <div className="space-y-6">
              <div>
                <Label htmlFor="flyer-name" className="text-base font-medium">
                  Your Name
                </Label>
                <Input
                  id="flyer-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2"
                  maxLength={50}
                />
              </div>

              <div>
                <Label htmlFor="flyer-photo" className="text-base font-medium">
                  Upload Your Photo
                </Label>
                <div className="mt-2">
                  <input
                    ref={fileInputRef}
                    id="flyer-photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-32 border-2 border-dashed hover:border-brand transition-colors"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {uploadedImage ? "Photo uploaded! Tap to change" : "Tap to upload your headshot"}
                      </span>
                      <span className="text-xs text-muted-foreground">Max 5MB • JPG, PNG, WEBP</span>
                    </div>
                  </Button>
                </div>

                {uploadedImage && (
                  <div className="mt-4 flex justify-center">
                    <img
                      src={uploadedImage}
                      alt="Your uploaded headshot"
                      className="w-20 h-20 rounded-full object-cover border-2 border-brand"
                    />
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Preview + actions */}
          <Card className="p-6">
            {isReady ? (
              <>
                <h3 className="text-xl font-bold text-center mb-1">Your flyer is ready to be shared</h3>
                <p className="text-sm text-muted-foreground text-center mb-5">
                  Save it, then post it and tag the conference.
                </p>
              </>
            ) : (
              <h3 className="text-xl font-semibold mb-5">Preview</h3>
            )}

            <div className="bg-muted rounded-lg p-4 min-h-[320px] flex items-center justify-center">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt={`${name} attending flyer`}
                  className="w-full max-w-[420px] rounded-lg border border-border shadow-lg"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>{isRendering ? "Building your flyer…" : "Your flyer will appear here"}</p>
                  <p className="text-sm">Upload a photo and enter your name to get started</p>
                </div>
              )}
            </div>

            {isReady && (
              <div className="mt-6 space-y-4">
                <Button onClick={saveFlyer} className="w-full h-12 text-base font-semibold">
                  <Download className="h-5 w-5 mr-2" />
                  Save flyer to my device
                </Button>

                <div>
                  <p className="text-sm font-medium flex items-center gap-2 mb-2">
                    <Share2 className="h-4 w-4 text-brand" />
                    Share directly
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SHARE_TARGETS.map((t) => (
                      <Button
                        key={t.key}
                        variant="outline"
                        className="w-full"
                        onClick={() => shareTo(t.url(), t.label)}
                      >
                        {t.label}
                      </Button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Tapping a network saves the flyer to your device first, then opens the app so you can
                    attach it and post.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default IllBeThere;

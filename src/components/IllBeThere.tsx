import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Download, Upload, User, Sparkles } from "lucide-react";
import { toast } from "sonner";
import heroBridge from "@/assets/hero-bridge.jpg";

export const IllBeThere = () => {
  const [name, setName] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
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

  const generateDesign = useCallback(async () => {
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }

    if (!uploadedImage) {
      toast.error("Please upload your photo");
      return;
    }

    setIsGenerating(true);
    
    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Set canvas dimensions
      canvas.width = 1200;
      canvas.height = 630;

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0F4C75');
      gradient.addColorStop(0.3, '#3282B8');
      gradient.addColorStop(0.7, '#BBE1FA');
      gradient.addColorStop(1, '#1B262C');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Load and draw background pattern
      const bgImage = new Image();
      bgImage.crossOrigin = "anonymous";
      
      await new Promise((resolve, reject) => {
        bgImage.onload = resolve;
        bgImage.onerror = reject;
        bgImage.src = heroBridge;
      });

      // Draw background image with overlay
      ctx.globalAlpha = 0.2;
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // Add geometric patterns
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 120, 0);
        ctx.lineTo(i * 120 + 200, canvas.height);
        ctx.stroke();
      }

      // Load and draw user photo
      const userImage = new Image();
      await new Promise((resolve, reject) => {
        userImage.onload = resolve;
        userImage.onerror = reject;
        userImage.src = uploadedImage;
      });

      // Draw circular photo frame
      const photoSize = 200;
      const photoX = 100;
      const photoY = (canvas.height - photoSize) / 2;

      // Photo background circle
      ctx.beginPath();
      ctx.arc(photoX + photoSize/2, photoY + photoSize/2, photoSize/2 + 10, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();

      // Clip and draw user photo
      ctx.save();
      ctx.beginPath();
      ctx.arc(photoX + photoSize/2, photoY + photoSize/2, photoSize/2, 0, 2 * Math.PI);
      ctx.clip();
      ctx.drawImage(userImage, photoX, photoY, photoSize, photoSize);
      ctx.restore();

      // Main text - "I'll be there!"
      ctx.font = 'bold 72px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      const mainText = "I'll be there!";
      const mainTextX = photoX + photoSize + 60;
      ctx.fillText(mainText, mainTextX, 200);

      // User name
      ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#FFD700';
      ctx.fillText(name.trim(), mainTextX, 270);

      // Conference details
      ctx.font = 'bold 36px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = 'white';
      ctx.fillText('NICE Kano 2025', mainTextX, 350);
      
      ctx.font = '28px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fillText('23rd International Civil Engineering Conference & AGM', mainTextX, 390);
      ctx.fillText('October 21-23, 2025 • Kano, Nigeria', mainTextX, 430);

      // Add decorative elements
      ctx.fillStyle = '#FFD700';
      const starSize = 20;
      for (let i = 0; i < 5; i++) {
        const x = mainTextX + mainText.length * 35 + 30 + i * 35;
        const y = 180;
        drawStar(ctx, x, y, starSize/2, starSize, 5);
      }

      // Bottom branding
      ctx.font = '18px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.textAlign = 'center';
      ctx.fillText('Nigerian Institution of Civil Engineers (NICE)', canvas.width/2, canvas.height - 30);

      toast.success("Design generated successfully! Click download to save.");
    } catch (error) {
      console.error('Error generating design:', error);
      toast.error("Failed to generate design. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }, [name, uploadedImage]);

  const downloadDesign = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `nice-kano-2025-${name.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    toast.success("Design downloaded successfully!");
  }, [name]);

  // Helper function to draw star
  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, innerRadius: number, outerRadius: number, points: number) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points;
      const pointX = Math.cos(angle) * radius;
      const pointY = Math.sin(angle) * radius;
      
      if (i === 0) {
        ctx.moveTo(pointX, pointY);
      } else {
        ctx.lineTo(pointX, pointY);
      }
    }
    
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-brand/5 via-vibrant/5 to-kano-heritage/5">
      <div className="container mx-auto px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-brand" />
            <h2 className="text-2xl md:text-3xl font-bold">I'll Be There!</h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create your personalized conference attendance design to share with colleagues and on social media
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Input Section */}
            <Card className="p-6 cultural-card">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-brand" />
                Your Details
              </h3>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base font-medium">Your Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2"
                    maxLength={50}
                  />
                </div>

                <div>
                  <Label htmlFor="photo" className="text-base font-medium">Upload Your Photo</Label>
                  <div className="mt-2">
                    <input
                      ref={fileInputRef}
                      id="photo"
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
                          {uploadedImage ? "Photo uploaded! Click to change" : "Click to upload your headshot"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Max 5MB • JPG, PNG, WEBP
                        </span>
                      </div>
                    </Button>
                  </div>
                  
                  {uploadedImage && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={uploadedImage}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover border-2 border-brand"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={generateDesign}
                    disabled={isGenerating || !name.trim() || !uploadedImage}
                    className="flex-1"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {isGenerating ? "Generating..." : "Generate Design"}
                  </Button>
                  
                  <Button
                    onClick={downloadDesign}
                    variant="outline"
                    disabled={isGenerating}
                    className="px-4"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Preview Section */}
            <Card className="p-6 cultural-card">
              <h3 className="text-xl font-semibold mb-6">Preview</h3>
              <div className="bg-muted rounded-lg p-4 min-h-[300px] flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-[300px] w-auto h-auto border border-border rounded"
                  style={{ display: uploadedImage && name ? 'block' : 'none' }}
                />
                {(!uploadedImage || !name) && (
                  <div className="text-center text-muted-foreground">
                    <User className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Your design will appear here</p>
                    <p className="text-sm">Upload a photo and enter your name to get started</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
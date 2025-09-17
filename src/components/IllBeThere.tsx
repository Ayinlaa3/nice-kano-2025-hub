import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Download, Upload, User, Sparkles } from "lucide-react";
import { toast } from "sonner";
import niceTemplate from "@/assets/nice-template.png";

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

      // Set canvas dimensions (square format to match template)
      canvas.width = 1080;
      canvas.height = 1080;

      // Load template background
      const templateImage = new Image();
      templateImage.crossOrigin = "anonymous";
      
      await new Promise((resolve, reject) => {
        templateImage.onload = resolve;
        templateImage.onerror = reject;
        templateImage.src = niceTemplate;
      });

      // Draw template as background
      ctx.drawImage(templateImage, 0, 0, canvas.width, canvas.height);

      // Load and draw user photo
      const userImage = new Image();
      await new Promise((resolve, reject) => {
        userImage.onload = resolve;
        userImage.onerror = reject;
        userImage.src = uploadedImage;
      });

      // Draw user photo in circular placeholder
      // Based on template analysis, the circular area is approximately at these coordinates
      const photoSize = 350; // Diameter of the circle - increased size
      const photoX = 110; // X position of photo center - adjusted for larger size
      const photoY = 500; // Y position of photo center - adjusted for larger size
      const photoRadius = photoSize / 2;

      // Create circular clipping path and draw user photo
      ctx.save();
      ctx.beginPath();
      ctx.arc(photoX + photoRadius, photoY + photoRadius, photoRadius, 0, 2 * Math.PI);
      ctx.clip();
      
      // Calculate aspect ratio and draw photo to fill circle completely
      const imgAspect = userImage.width / userImage.height;
      let drawWidth = photoSize;
      let drawHeight = photoSize;
      let drawX = photoX;
      let drawY = photoY;
      
      if (imgAspect > 1) {
        // Image is wider than tall
        drawHeight = photoSize;
        drawWidth = photoSize * imgAspect;
        drawX = photoX - (drawWidth - photoSize) / 2;
      } else {
        // Image is taller than wide
        drawWidth = photoSize;
        drawHeight = photoSize / imgAspect;
        drawY = photoY - (drawHeight - photoSize) / 2;
      }
      
      ctx.drawImage(userImage, drawX, drawY, drawWidth, drawHeight);
      ctx.restore();

      // Add user name in the green rectangular area
      // Based on template, the green area is to the right of the photo
      const nameX = 580; // X position for name text
      const nameY = 590; // Y position for name text (center of green area)
      const maxNameWidth = 420; // Maximum width for name text

      // Set font properties - increased font size
      ctx.font = 'bold 24px Arial, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Handle text wrapping if name is too long
      const userName = name.trim();
      const words = userName.split(' ');
      let lines = [];
      let currentLine = '';

      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxNameWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine) {
        lines.push(currentLine);
      }

      // Draw text lines centered vertically in the green area
      const lineHeight = 28; // Increased line height for larger font
      const totalHeight = lines.length * lineHeight;
      let startY = nameY - (totalHeight / 2) + (lineHeight / 2);

      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], nameX, startY + (i * lineHeight));
      }

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
              <div className="bg-muted rounded-lg p-4 min-h-[400px] flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-[400px] w-auto h-auto border border-border rounded shadow-lg"
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
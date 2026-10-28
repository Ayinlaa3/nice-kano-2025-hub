import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Download, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import certificateTemplate from "@/assets/NICE_2026_Conference_Certificate.png.asset.json";
import niceLogo from "@/assets/nice-logo.svg";
import nameFont from "@/assets/fonts/GreatVibes-Regular.ttf.asset.json";
import { certificateRegistrationName } from "@/lib/certificate-name";

const loadImage = (url: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => resolve(image);
  image.onerror = () => reject(new Error("Unable to load certificate artwork. Please try again."));
  image.src = url;
});

let fontReady: Promise<FontFace> | undefined;
const loadNameFont = () => {
  if (!fontReady) {
    const font = new FontFace("Certificate Script", `url("${nameFont.url}")`);
    fontReady = font.load().then((loaded) => {
      document.fonts.add(loaded);
      return loaded;
    }).catch((error) => { fontReady = undefined; throw error; });
  }
  return fontReady;
};

const Certificate = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => () => {
    if (certificateUrl) URL.revokeObjectURL(certificateUrl);
  }, [certificateUrl]);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const checkRegisteredName = async (email: string): Promise<string | null> => {
    const { data, error } = await supabase.rpc("check_certificate_eligibility", { _email: email.trim() });
    if (error) {
      console.error('Error verifying registration:', error);
      throw new Error('Unable to verify registration. Please try again later.');
    }
    return certificateRegistrationName(data);
  };

  const generateCertificate = async () => {
    // Validation
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    setSuccess(false);
    setIsGenerating(true);
    setCertificateUrl(null);
    setFullName("");

    try {
      // Check if email exists in registration
      const registeredName = await checkRegisteredName(email);

      if (!registeredName) {
        setError("❌ Sorry, this email is not found in our conference registration records. Please enter the email you used during conference registration.");
        setIsGenerating(false);
        return;
      }

      // Load certificate template
      const [img, watermark] = await Promise.all([
        loadImage(certificateTemplate.url),
        loadImage(niceLogo),
        loadNameFont(),
      ]);

      // Create canvas
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Unable to create certificate');
      }

      // Draw template
      ctx.drawImage(img, 0, 0);

      // The watermark is included in the actual download, not only the preview.
      const logoWidth = canvas.width * 0.38;
      const logoHeight = logoWidth * watermark.height / watermark.width;
      ctx.save();
      ctx.globalAlpha = 0.075;
      ctx.drawImage(watermark, (canvas.width - logoWidth) / 2, canvas.height * 0.52 - logoHeight / 2, logoWidth, logoHeight);
      ctx.restore();

      // Print only the immutable name returned by the eligibility lookup.
      const name = registeredName;
      let size = canvas.height * 0.059;
      ctx.font = `${size}px "Certificate Script"`;
      while (ctx.measureText(name).width > canvas.width * 0.72 && size > 12) {
        size -= 1;
        ctx.font = `${size}px "Certificate Script"`;
      }
      ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--certificate-name-ink').trim();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Calculate name position (centered horizontally, positioned in the green area)
      const centerX = canvas.width / 2;
      const nameY = canvas.height * 0.47; // just above the signature line

      // Add shadow for better visibility


      // Draw name
      ctx.fillText(name, centerX, nameY);

      // Convert to blob and create URL
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => result ? resolve(result) : reject(new Error("Unable to save certificate. Please try again.")), 'image/png', 1.0);
      });
      setFullName(registeredName);
      setCertificateUrl(URL.createObjectURL(blob));
      setSuccess(true);
      toast.success("Certificate generated successfully!");

    } catch (err) {
      console.error('Certificate generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate certificate. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCertificate = () => {
    if (!certificateUrl) return;

    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = `NICE_2026_Certificate_${fullName.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Certificate downloaded!");
  };

  return (
    <>
      <Helmet title="Certificate Generator | NICE Lagos 2026">
        <meta name="description" content="Generate and download your NICE 2026 Conference Certificate of Participation" />
      </Helmet>

      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              🎓 Download Your Certificate of Participation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Certificate of Participation · Lagos, 20–22 October 2026
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card border rounded-lg shadow-lg p-8 mb-8">
            <div className="space-y-6">
              {fullName && (
                <div className="space-y-2">
                  <Label className="text-base font-medium">Registered Name</Label>
                  <p className="text-lg font-semibold break-words">{fullName}</p>
                </div>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your registration email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFullName("");
                    setCertificateUrl(null);
                    setSuccess(false);
                    setError(null);
                  }}
                  className="h-12 text-base"
                  disabled={isGenerating}
                />
              </div>

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Success Alert */}
              {success && (
                <Alert className="border-primary text-foreground">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>✅ Certificate generated successfully!</AlertDescription>
                </Alert>
              )}

              {/* Generate Button */}
              <Button
                onClick={generateCertificate}
                disabled={isGenerating}
                className="w-full h-12 text-base font-semibold"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating Certificate...
                  </>
                ) : (
                  'Generate Certificate'
                )}
              </Button>
            </div>
          </div>

          {/* Certificate Preview */}
          {certificateUrl && (
            <div className="bg-card border rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-center mb-6">Your Certificate</h2>
              
              <div className="mb-6">
                <img
                  src={certificateUrl}
                  alt="Certificate of Participation"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>

              <Button
                onClick={downloadCertificate}
                className="w-full h-12 text-base font-semibold"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Certificate
              </Button>
            </div>
          )}

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            For support, contact{" "}
            <a 
              href="mailto:conference@nicehq.org" 
              className="underline hover:text-foreground transition-colors"
            >
              conference@nicehq.org
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;

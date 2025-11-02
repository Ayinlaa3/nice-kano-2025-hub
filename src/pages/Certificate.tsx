import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Download, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const Certificate = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const checkEmailInCSV = async (email: string): Promise<boolean> => {
    try {
      // Load the CSV file from assets
      const response = await fetch('/public/ConferenceRegistration.csv');
      if (!response.ok) {
        throw new Error('Registration data not found');
      }
      
      const csvText = await response.text();
      const lines = csvText.split('\n');
      
      // Check if email exists in any line (case-insensitive)
      return lines.some(line => 
        line.toLowerCase().includes(email.toLowerCase())
      );
    } catch (error) {
      console.error('Error loading registration data:', error);
      throw new Error('Unable to verify registration. Please try again later.');
    }
  };

  const generateCertificate = async () => {
    // Validation
    if (!fullName.trim()) {
      setError("Please enter your full name");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError(null);
    setSuccess(false);
    setIsGenerating(true);
    setCertificateUrl(null);

    try {
      // Check if email exists in registration
      const isRegistered = await checkEmailInCSV(email);

      if (!isRegistered) {
        setError("❌ Sorry, this email is not found in our conference registration records. Please check and try again.");
        setIsGenerating(false);
        return;
      }

      // Load certificate template
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to load certificate template'));
        img.src = '/certificate-template.png';
      });

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

      // Configure text styling
      ctx.font = 'bold 60px Montserrat, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Calculate name position (centered horizontally, positioned in the green area)
      const centerX = canvas.width / 2;
      const nameY = canvas.height * 0.52; // Adjust this value based on template

      // Add shadow for better visibility
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Draw name
      ctx.fillText(fullName.trim(), centerX, nameY);

      // Convert to blob and create URL
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setCertificateUrl(url);
          setSuccess(true);
          toast.success("Certificate generated successfully!");
        }
      }, 'image/png', 1.0);

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
    link.download = `NICE_2025_Certificate_${fullName.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Certificate downloaded!");
  };

  return (
    <>
      <Helmet>
        <title>Certificate Generator | NICE Kano 2025</title>
        <meta name="description" content="Generate and download your NICE 2025 Conference Certificate of Participation" />
      </Helmet>

      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              🎓 Download Your Certificate of Participation
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Enter your full name and the email address used during registration to generate your personalized conference certificate.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-card border rounded-lg shadow-lg p-8 mb-8">
            <div className="space-y-6">
              {/* Full Name Input */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-base font-medium">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 text-base"
                  disabled={isGenerating}
                />
              </div>

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
                  onChange={(e) => setEmail(e.target.value)}
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
                <Alert className="bg-green-50 border-green-200 text-green-800">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>✅ Certificate generated successfully!</AlertDescription>
                </Alert>
              )}

              {/* Generate Button */}
              <Button
                onClick={generateCertificate}
                disabled={isGenerating}
                className="w-full h-12 text-base font-semibold"
                style={{ backgroundColor: '#0A7B34' }}
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
                style={{ backgroundColor: '#0A7B34' }}
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
              href="mailto:conference@nicengineers.com" 
              className="underline hover:text-foreground transition-colors"
            >
              conference@nicengineers.com
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Certificate;

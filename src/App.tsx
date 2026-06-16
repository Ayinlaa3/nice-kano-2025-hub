import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import RequireAdmin from "@/components/RequireAdmin";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./layouts/MainLayout";
import Program from "./pages/Program";
import Speakers from "./pages/Speakers";
import Location from "./pages/Location";
import HotelsTravel from "./pages/HotelsTravel";
import About from "./pages/About";
import Sponsorships from "./pages/Sponsorships";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import InnovationChallenge from "./pages/InnovationChallenge";
import Certificate from "./pages/Certificate";
import MediaGallery from "./pages/MediaGallery";
import Registration from "./pages/Registration";
import RemitaCallback from "./pages/RemitaCallback";
import PastConferences from "./pages/PastConferences";
import PastConferenceDetail from "./pages/PastConferenceDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminRegistrations from "./pages/AdminRegistrations";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/program" element={<Program />} />
                <Route path="/speakers" element={<Speakers />} />
                <Route path="/location" element={<Location />} />
                <Route path="/hotels-travel" element={<HotelsTravel />} />
                <Route path="/about" element={<About />} />
                <Route path="/sponsorships" element={<Sponsorships />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/innovationchallenge" element={<InnovationChallenge />} />
                <Route path="/certificate" element={<Certificate />} />
                <Route path="/media-gallery" element={<MediaGallery />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/registration/remita-callback" element={<RemitaCallback />} />
                <Route path="/past-conferences" element={<PastConferences />} />
                <Route path="/past-conferences/:slug" element={<PastConferenceDetail />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/registrations"
                  element={
                    <RequireAdmin>
                      <AdminRegistrations />
                    </RequireAdmin>
                  }
                />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

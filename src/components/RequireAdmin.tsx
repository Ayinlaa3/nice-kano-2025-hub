import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { session, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-brand-primary" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto py-24 max-w-lg text-center space-y-3">
        <h1 className="text-2xl font-bold">Access denied</h1>
        <p className="text-muted-foreground">
          Your account does not have administrator access to conference registrations.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

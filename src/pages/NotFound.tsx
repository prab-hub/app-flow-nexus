
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -z-10 top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -z-10 bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="text-center p-8 max-w-md">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
          <span className="text-3xl font-bold">404</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been removed or the URL might be incorrect.
        </p>
        <Button asChild className="shadow-sm hover:shadow-md transition-all">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

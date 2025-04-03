
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppGrid from '@/components/AppGrid';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Globe } from 'lucide-react';

const LocationPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { apps, locations } = useAppContext();
  
  const location = locations.find(l => l.slug === slug);
  
  if (!location) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container flex-grow py-12 px-4">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Location Not Found</h1>
            <p className="text-muted-foreground mb-6">The location you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/locations">View All Locations</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const locationApps = apps.filter(app => app.locationIds.includes(location.id));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container px-4">
            <div className="flex flex-col">
              <Button variant="ghost" size="sm" className="w-fit mb-4" asChild>
                <Link to="/locations" className="flex items-center">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  All Locations
                </Link>
              </Button>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-primary/10 h-12 w-12 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">{location.name}</h1>
              </div>
              <p className="text-muted-foreground mt-2 max-w-3xl">{location.description}</p>
            </div>
          </div>
        </div>
        
        <div className="container px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Applications ({locationApps.length})</h2>
          <AppGrid 
            apps={locationApps} 
            emptyMessage="No applications found in this location."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LocationPage;

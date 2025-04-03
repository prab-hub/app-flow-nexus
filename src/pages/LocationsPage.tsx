
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LocationCard from '@/components/LocationCard';

const LocationsPage = () => {
  const { locations } = useAppContext();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Locations</h1>
            <p className="text-muted-foreground mt-4 max-w-3xl">
              Browse applications by their availability in different regions around the world.
            </p>
          </div>
        </div>
        
        <div className="container px-4 py-12">
          <div className="app-grid">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LocationsPage;

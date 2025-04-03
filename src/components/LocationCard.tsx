
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AppLocation } from '@/lib/db-types';
import { ChevronRight, Globe } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

interface LocationCardProps {
  location: AppLocation;
}

const LocationCard: React.FC<LocationCardProps> = ({ location }) => {
  const { apps } = useAppContext();
  const appCount = apps.filter(app => app.locationIds.includes(location.id)).length;
  
  return (
    <Card className="overflow-hidden app-card h-full flex flex-col">
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center">
            <Globe className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-medium text-xl">{location.name}</h3>
        </div>
        <p className="text-muted-foreground">{location.description}</p>
        <p className="text-sm font-medium mt-4">{appCount} {appCount === 1 ? 'app' : 'apps'}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link to={`/locations/${location.slug}`} className="flex justify-between items-center">
            <span>Browse {location.name}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LocationCard;

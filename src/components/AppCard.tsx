
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { App } from '@/lib/db-types';
import { useAppContext } from '@/context/AppContext';
import { ExternalLink, Package } from 'lucide-react';

interface AppCardProps {
  app: App;
}

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const { categories } = useAppContext();
  
  // Get category names for this app
  const appCategories = categories
    .filter(category => app.categoryIds.includes(category.id))
    .map(category => category.name);

  return (
    <Card className="overflow-hidden app-card h-full flex flex-col">
      <CardHeader className="p-4 space-y-2">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
            <img 
              src={app.logoUrl} 
              alt={`${app.title} logo`}
              className="w-10 h-10 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/placeholder.svg';
              }}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-lg line-clamp-1">{app.title}</h3>
              {app.isBundle && (
                <Badge variant="outline" className="text-xs flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  Bundle
                </Badge>
              )}
              {app.parentAppId && (
                <Badge variant="secondary" className="text-xs">
                  Part of a bundle
                </Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {app.publisher && (
                <Badge variant="outline" className="text-xs">
                  {app.publisher}
                </Badge>
              )}
              {appCategories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{app.description}</p>
        {app.features && app.features.length > 0 && (
          <div className="mt-2">
            <ul className="text-sm list-disc list-inside space-y-1">
              {app.features.slice(0, 2).map((feature, index) => (
                <li key={index} className="text-muted-foreground">{feature}</li>
              ))}
              {app.features.length > 2 && (
                <li className="text-muted-foreground text-xs">+{app.features.length - 2} more features</li>
              )}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/app/${app.slug}`}>
            Details
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <a href={app.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            Visit <ExternalLink className="h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppCard;

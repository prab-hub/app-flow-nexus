
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ExternalLink, Package } from 'lucide-react';
import AppGrid from '@/components/AppGrid';

const AppDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { apps, categories, locations } = useAppContext();
  
  const app = apps.find(a => a.slug === slug);
  
  if (!app) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container flex-grow py-12 px-4">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold mb-4">App Not Found</h1>
            <p className="text-muted-foreground mb-6">The application you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const appCategories = categories
    .filter(category => app.categoryIds.includes(category.id));
    
  const appLocations = locations
    .filter(location => app.locationIds.includes(location.id));
  
  const connectedApps = app.connectedApps 
    ? apps.filter(a => app.connectedApps?.includes(a.id))
    : [];
  
  // Get child apps if this is a bundle
  const childApps = app.childAppIds?.length
    ? apps.filter(a => app.childAppIds?.includes(a.id))
    : [];
    
  // Get parent app if this is a child app in a bundle
  const parentApp = app.parentAppId
    ? apps.find(a => a.id === app.parentAppId)
    : null;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container px-4">
            <Button variant="ghost" size="sm" className="w-fit mb-4" asChild>
              <Link to="/" className="flex items-center">
                <ChevronLeft className="mr-1 h-4 w-4" />
                Back to All Apps
              </Link>
            </Button>
            
            <div className="flex items-start gap-6 flex-col md:flex-row">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-background border flex items-center justify-center overflow-hidden">
                <img 
                  src={app.logoUrl} 
                  alt={`${app.title} logo`}
                  className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl md:text-4xl font-bold">{app.title}</h1>
                  {app.isBundle && (
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Package className="h-4 w-4" />
                      Bundle
                    </Badge>
                  )}
                </div>
                
                {parentApp && (
                  <div className="mt-2">
                    <Badge variant="secondary">
                      <Link to={`/app/${parentApp.slug}`} className="flex items-center gap-1">
                        Part of {parentApp.title}
                      </Link>
                    </Badge>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {appCategories.map(category => (
                    <Badge key={category.id} variant="secondary">
                      <Link to={`/categories/${category.slug}`}>
                        {category.name}
                      </Link>
                    </Badge>
                  ))}
                </div>
                <p className="text-muted-foreground mt-4 max-w-3xl">{app.description}</p>
                <Button className="mt-6" asChild>
                  <a href={app.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Child Apps - only shown for bundle apps */}
              {app.isBundle && childApps.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Included Apps</h2>
                  <AppGrid apps={childApps} />
                </div>
              )}
              
              {/* Features */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Features</h2>
                {app.features && app.features.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {app.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="h-5 w-5 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No features listed for this app.</p>
                )}
              </div>
              
              {/* Connected Apps */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Connected Apps</h2>
                {connectedApps.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {connectedApps.map(connectedApp => (
                      <Link 
                        key={connectedApp.id} 
                        to={`/app/${connectedApp.slug}`}
                        className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                          <img 
                            src={connectedApp.logoUrl} 
                            alt={`${connectedApp.title} logo`}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{connectedApp.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-1">{connectedApp.description}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No connected apps found.</p>
                )}
                <Button variant="outline" className="mt-6" asChild>
                  <Link to="/flowchart">
                    View App Connections in Flowchart
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="space-y-8">
              {/* Locations */}
              <div>
                <h2 className="text-xl font-bold mb-4">Available In</h2>
                <div className="space-y-2">
                  {appLocations.map(location => (
                    <Link
                      key={location.id}
                      to={`/locations/${location.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <span>{location.name}</span>
                      <ChevronLeft className="h-4 w-4 rotate-180" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppDetailPage;

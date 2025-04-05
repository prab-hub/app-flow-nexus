
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppGrid from '@/components/AppGrid';
import CategoryCard from '@/components/CategoryCard';
import LocationCard from '@/components/LocationCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, BarChart, Layout, ArrowRight } from 'lucide-react';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const Index = () => {
  const { apps, categories, locations, loading } = useAppContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Get top-level apps (apps without a parent or are bundles themselves)
  const topLevelApps = apps.filter(app => !app.parentAppId);
  const featuredApps = topLevelApps.slice(0, 6);
  const featuredCategories = categories.slice(0, 3);
  const featuredLocations = locations.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-24 md:py-32">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-primary/40 blur-3xl"></div>
            <div className="absolute right-1/4 bottom-1/3 h-60 w-60 rounded-full bg-primary/30 blur-3xl"></div>
          </div>
          
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium mb-2">
                Discover. Connect. Visualize.
              </div>
              
              <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-3xl leading-tight">
                Your Essential App Ecosystem
              </h1>
              
              <p className="text-muted-foreground text-lg md:text-xl max-w-[800px] leading-relaxed">
                Find the perfect applications for your needs, organized by category and location, 
                and visualize how they work together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" className="px-6" asChild>
                  <Link to="/categories" className="group">
                    Browse Categories
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/flowchart" className="group">
                    <BarChart className="mr-2 h-5 w-5" />
                    App Flowchart
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* Featured Apps Section with Carousel */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Featured Apps</h2>
                <p className="text-muted-foreground mt-2">Discover our handpicked selection of popular applications</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="mt-4 md:mt-0">
                <Link to="/apps" className="flex items-center group">
                  View All <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
            
            <div className="mx-auto max-w-5xl px-6">
              <Carousel className="w-full">
                <CarouselContent>
                  {featuredApps.map((app) => (
                    <CarouselItem key={app.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                      <div className="p-1">
                        <Link to={`/app/${app.slug}`} className="block h-full">
                          <div className="group relative flex h-full flex-col overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                              {app.logoUrl ? (
                                <img src={app.logoUrl} alt={app.title} className="h-8 w-8" />
                              ) : (
                                <Layout className="h-6 w-6 text-primary" />
                              )}
                            </div>
                            <h3 className="text-xl font-semibold">{app.title}</h3>
                            <p className="mt-2 line-clamp-2 flex-grow text-sm text-muted-foreground">
                              {app.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {app.categoryIds.slice(0, 1).map((catId) => {
                                const category = categories.find(c => c.id === catId);
                                return category ? (
                                  <span key={catId} className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                    {category.name}
                                  </span>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-6">
                  <CarouselPrevious className="relative inset-0 translate-y-0" />
                  <CarouselNext className="relative inset-0 translate-y-0" />
                </div>
              </Carousel>
            </div>
          </div>
        </section>

        {/* Categories Section with Visual Cards */}
        <section className="py-16 md:py-24 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Browse Categories</h2>
                <p className="text-muted-foreground mt-2">Find applications organized by their primary function</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="mt-4 md:mt-0">
                <Link to="/categories" className="flex items-center group">
                  View All <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredCategories.map((category) => (
                <div key={category.id} className="group relative overflow-hidden rounded-xl shadow-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 opacity-80"></div>
                  <div className="relative p-8">
                    <div className="mb-4 inline-block rounded-lg bg-background/90 p-3">
                      <Layout className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                    <Button variant="ghost" size="sm" asChild className="mt-4 px-0">
                      <Link to={`/categories/${category.slug}`} className="flex items-center group">
                        Explore <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Locations Section with Visual Cards */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-10">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Available Locations</h2>
                <p className="text-muted-foreground mt-2">Find applications available in specific regions</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="mt-4 md:mt-0">
                <Link to="/locations" className="flex items-center group">
                  View All <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredLocations.map((location) => (
                <Link 
                  to={`/locations/${location.slug}`} 
                  key={location.id} 
                  className="group relative block overflow-hidden rounded-xl border bg-card shadow-sm transition-all hover:shadow-md"
                >
                  <div className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Layout className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {location.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {location.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm font-medium text-primary">
                      View Apps
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Flowchart Feature Section */}
        <section className="py-16 md:py-24 bg-secondary/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" className="opacity-20">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="container relative px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium mb-4">
                  Interactive Tool
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Visualize App Connections</h2>
                <p className="text-muted-foreground mt-4 text-lg">
                  See how your favorite applications connect and work together with our interactive flowchart tool.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                      <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Map out your tech stack visually</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                      <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Identify integration opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-2 mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                      <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Find alternative apps that integrate with your current stack</span>
                  </li>
                </ul>
                <Button className="mt-8" asChild>
                  <Link to="/flowchart">
                    <BarChart className="mr-2 h-5 w-5" />
                    Try App Flowchart
                  </Link>
                </Button>
              </div>
              <div className="rounded-xl bg-background p-4 shadow-lg border">
                <div className="bg-muted aspect-video rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-20 h-20 bg-primary/5 rounded-full"></div>
                    <div className="absolute w-32 h-32 bg-primary/5 rounded-full"></div>
                    <div className="absolute w-48 h-48 bg-primary/5 rounded-full"></div>
                    <BarChart className="h-16 w-16 text-primary/40 relative" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted to-transparent"></div>
                  <div className="absolute inset-0">
                    <svg width="100%" height="100%" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20,50 L80,50" stroke="currentColor" strokeWidth="1" strokeDasharray="2" className="text-primary/20" />
                      <path d="M120,50 L180,50" stroke="currentColor" strokeWidth="1" strokeDasharray="2" className="text-primary/20" />
                      <path d="M100,20 L100,40" stroke="currentColor" strokeWidth="1" strokeDasharray="2" className="text-primary/20" />
                      <path d="M100,60 L100,80" stroke="currentColor" strokeWidth="1" strokeDasharray="2" className="text-primary/20" />
                      <circle cx="20" cy="50" r="6" fill="currentColor" className="text-primary/30" />
                      <circle cx="80" cy="50" r="6" fill="currentColor" className="text-primary/30" />
                      <circle cx="100" cy="20" r="6" fill="currentColor" className="text-primary/30" />
                      <circle cx="100" cy="80" r="6" fill="currentColor" className="text-primary/30" />
                      <circle cx="120" cy="50" r="6" fill="currentColor" className="text-primary/30" />
                      <circle cx="180" cy="50" r="6" fill="currentColor" className="text-primary/30" />
                      <circle cx="100" cy="50" r="10" fill="currentColor" className="text-primary/40" />
                    </svg>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">Interactive Flowchart Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;


import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppGrid from '@/components/AppGrid';
import CategoryCard from '@/components/CategoryCard';
import LocationCard from '@/components/LocationCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ChevronRight, BarChart } from 'lucide-react';

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
        <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl">
                Discover and Connect Your Essential Apps
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-[800px]">
                Find the perfect applications for your needs, organized by category and location, and visualize how they work together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Button size="lg" asChild>
                  <Link to="/categories">Browse Categories</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/flowchart">
                    <BarChart className="mr-2 h-5 w-5" />
                    App Flowchart
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Apps Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Apps</h2>
                <p className="text-muted-foreground mt-2">Discover our handpicked selection of popular applications</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="mt-4 md:mt-0">
                <Link to="/apps" className="flex items-center">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <AppGrid apps={featuredApps} />
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Browse Categories</h2>
                <p className="text-muted-foreground mt-2">Find applications organized by their primary function</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="mt-4 md:mt-0">
                <Link to="/categories" className="flex items-center">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="app-grid">
              {featuredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Available Locations</h2>
                <p className="text-muted-foreground mt-2">Find applications available in specific regions</p>
              </div>
              <Button variant="ghost" size="sm" asChild className="mt-4 md:mt-0">
                <Link to="/locations" className="flex items-center">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="app-grid">
              {featuredLocations.map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          </div>
        </section>

        {/* Flowchart Feature Section */}
        <section className="py-12 md:py-16 bg-secondary/10">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Visualize App Connections</h2>
                <p className="text-muted-foreground mt-4 text-lg">
                  See how your favorite applications connect and work together with our interactive flowchart tool.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Map out your tech stack visually</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Identify integration opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 mr-2 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
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
              <div className="bg-muted aspect-video rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <BarChart className="h-16 w-16 text-primary/40 mx-auto" />
                  <p className="mt-4 text-muted-foreground font-medium">Interactive Flowchart Preview</p>
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


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppGrid from '@/components/AppGrid';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { apps, categories } = useAppContext();
  
  const category = categories.find(c => c.slug === slug);
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container flex-grow py-12 px-4">
          <div className="max-w-3xl mx-auto text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
            <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/categories">View All Categories</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const categoryApps = apps.filter(app => app.categoryIds.includes(category.id));
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container px-4">
            <div className="flex flex-col">
              <Button variant="ghost" size="sm" className="w-fit mb-4" asChild>
                <Link to="/categories" className="flex items-center">
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  All Categories
                </Link>
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
              <p className="text-muted-foreground mt-4 max-w-3xl">{category.description}</p>
            </div>
          </div>
        </div>
        
        <div className="container px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Applications ({categoryApps.length})</h2>
          <AppGrid 
            apps={categoryApps} 
            emptyMessage="No applications found in this category."
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;

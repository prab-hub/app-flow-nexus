
import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CategoryCard from '@/components/CategoryCard';

const CategoriesPage = () => {
  const { categories } = useAppContext();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Categories</h1>
            <p className="text-muted-foreground mt-4 max-w-3xl">
              Browse applications by their primary function or purpose. Select a category to view all apps within it.
            </p>
          </div>
        </div>
        
        <div className="container px-4 py-12">
          <div className="app-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;


import React from 'react';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AppGrid from '@/components/AppGrid';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AppsPage = () => {
  const { apps, categories, locations } = useAppContext();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');
  
  // Filter apps based on search term, category, and location
  const filteredApps = apps.filter(app => {
    const matchesSearch = searchTerm === '' || 
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === '' || 
      app.categoryIds.includes(selectedCategory);
      
    const matchesLocation = selectedLocation === '' || 
      app.locationIds.includes(selectedLocation);
      
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
  };

  // Get category or location name by id
  const getCategoryName = (id) => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name : '';
  };

  const getLocationName = (id) => {
    const location = locations.find(loc => loc.id === id);
    return location ? location.name : '';
  };
  
  const hasActiveFilters = searchTerm || selectedCategory || selectedLocation;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="relative bg-muted/30 py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
          <div className="absolute inset-0 opacity-20">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>
          <div className="container relative px-4">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold leading-tight">All Applications</h1>
              <p className="text-muted-foreground mt-4 max-w-3xl">
                Browse and filter through our complete collection of applications. Find the perfect tools for your workflow.
              </p>
            </div>
          </div>
        </div>
        
        <div className="container px-4 py-12">
          {/* Filters */}
          <div className="bg-card rounded-xl border shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Filter Applications</h2>
              
              {hasActiveFilters && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="flex items-center mt-2 md:mt-0"
                >
                  <X className="h-4 w-4 mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search applications..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger id="location" className="w-full">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Locations</SelectItem>
                    {locations.map(location => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Active filters display */}
            {hasActiveFilters && (
              <div className="mt-6 flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground mr-2 flex items-center">
                  <Filter className="h-3 w-3 mr-1" /> Active filters:
                </span>
                
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchTerm}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => setSearchTerm('')}
                    />
                  </Badge>
                )}
                
                {selectedCategory && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Category: {getCategoryName(selectedCategory)}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => setSelectedCategory('')}
                    />
                  </Badge>
                )}
                
                {selectedLocation && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Location: {getLocationName(selectedLocation)}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer" 
                      onClick={() => setSelectedLocation('')}
                    />
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          {/* Results */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredApps.length} {filteredApps.length === 1 ? 'Application' : 'Applications'}
              </h2>
              
              {apps.length > 0 && filteredApps.length !== apps.length && (
                <p className="text-sm text-muted-foreground">
                  Showing {filteredApps.length} of {apps.length} total apps
                </p>
              )}
            </div>
            
            <AppGrid 
              apps={filteredApps} 
              emptyMessage={
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No applications found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters} 
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              }
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppsPage;

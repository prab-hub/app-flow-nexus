
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
import { Search } from 'lucide-react';

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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container px-4">
            <h1 className="text-3xl md:text-4xl font-bold">All Applications</h1>
            <p className="text-muted-foreground mt-4 max-w-3xl">
              Browse and filter through our complete collection of applications.
            </p>
          </div>
        </div>
        
        <div className="container px-4 py-12">
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <Search className="absolute left-3 top-[calc(50%_+_8px)] transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search applications..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="category" className="mb-2 block">Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category">
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
            
            <div>
              <Label htmlFor="location" className="mb-2 block">Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger id="location">
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
          
          {/* Results */}
          <div>
            <h2 className="text-2xl font-bold mb-6">
              {filteredApps.length} {filteredApps.length === 1 ? 'Application' : 'Applications'}
            </h2>
            <AppGrid 
              apps={filteredApps} 
              emptyMessage="No applications found matching your filters."
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppsPage;

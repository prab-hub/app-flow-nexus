
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Edit, PlusCircle, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppForm from '@/components/admin/AppForm';
import CategoryForm from '@/components/admin/CategoryForm';
import LocationForm from '@/components/admin/LocationForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AdminPage = () => {
  const { isAdmin, currentUser, apps, categories, locations, deleteApp, deleteCategory, deleteLocation } = useAppContext();
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingApp, setIsAddingApp] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [editingApp, setEditingApp] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingLocation, setEditingLocation] = useState<string | null>(null);
  const [deletingApp, setDeletingApp] = useState<string | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<string | null>(null);
  const [deletingLocation, setDeletingLocation] = useState<string | null>(null);
  
  // Redirect non-admin users
  if (!currentUser) {
    toast({
      title: "Access Denied",
      description: "Please log in to access the admin dashboard",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }
  
  if (!isAdmin) {
    toast({
      title: "Access Denied",
      description: "You don't have permission to access the admin dashboard",
      variant: "destructive",
    });
    return <Navigate to="/" replace />;
  }
  
  // Filter functions
  const filteredApps = apps.filter(app => 
    app.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredLocations = locations.filter(location => 
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    location.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Get app, category, or location by ID
  const getAppById = (id: string) => apps.find(app => app.id === id);
  const getCategoryById = (id: string) => categories.find(category => category.id === id);
  const getLocationById = (id: string) => locations.find(location => location.id === id);
  
  // Handle deletion
  const handleDeleteApp = () => {
    if (deletingApp) {
      deleteApp(deletingApp);
      setDeletingApp(null);
    }
  };
  
  const handleDeleteCategory = () => {
    if (deletingCategory) {
      deleteCategory(deletingCategory);
      setDeletingCategory(null);
    }
  };
  
  const handleDeleteLocation = () => {
    if (deletingLocation) {
      deleteLocation(deletingLocation);
      setDeletingLocation(null);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-muted/30 py-12">
          <div className="container px-4">
            <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-4 max-w-3xl">
              Manage applications, categories, and locations in the app directory.
            </p>
          </div>
        </div>
        
        <div className="container px-4 py-12">
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              This dashboard allows you to manage apps, categories, and locations in the directory.
            </AlertDescription>
          </Alert>
          
          <div className="mb-6">
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          <Tabs defaultValue="apps">
            <TabsList className="mb-6">
              <TabsTrigger value="apps">Apps</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            {/* Apps Tab */}
            <TabsContent value="apps">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Manage Apps</h2>
                    <Button onClick={() => setIsAddingApp(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New App
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">Logo</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Publisher</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApps.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                              No apps found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredApps.map((app) => (
                            <TableRow key={app.id}>
                              <TableCell>
                                <div className="w-10 h-10 rounded bg-muted flex items-center justify-center overflow-hidden">
                                  <img
                                    src={app.logoUrl}
                                    alt={`${app.title} logo`}
                                    className="w-8 h-8 object-contain"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                                    }}
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{app.title}</TableCell>
                              <TableCell>{app.publisher || 'N/A'}</TableCell>
                              <TableCell>
                                {app.isBundle ? 'Bundle' : app.parentAppId ? 'Child App' : 'Standalone'}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => setEditingApp(app.id)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setDeletingApp(app.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Categories Tab */}
            <TabsContent value="categories">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Manage Categories</h2>
                    <Button onClick={() => setIsAddingCategory(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New Category
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Slug</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCategories.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              No categories found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredCategories.map((category) => (
                            <TableRow key={category.id}>
                              <TableCell className="font-medium">{category.name}</TableCell>
                              <TableCell>{category.slug}</TableCell>
                              <TableCell className="max-w-md truncate">{category.description}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => setEditingCategory(category.id)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setDeletingCategory(category.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Locations Tab */}
            <TabsContent value="locations">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Manage Locations</h2>
                    <Button onClick={() => setIsAddingLocation(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New Location
                    </Button>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Slug</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredLocations.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              No locations found.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredLocations.map((location) => (
                            <TableRow key={location.id}>
                              <TableCell className="font-medium">{location.name}</TableCell>
                              <TableCell>{location.slug}</TableCell>
                              <TableCell className="max-w-md truncate">{location.description}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => setEditingLocation(location.id)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => setDeletingLocation(location.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Users Tab */}
            <TabsContent value="users">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Manage Users</h2>
                    <Button disabled>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New User
                    </Button>
                  </div>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      User management will be implemented in a future update.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      
      {/* Dialogs for adding/editing */}
      
      {/* App Dialog */}
      <Dialog open={isAddingApp} onOpenChange={setIsAddingApp}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Add New App</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new app to the directory.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            <div className="p-1">
              <AppForm onCancel={() => setIsAddingApp(false)} />
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {/* Edit App Dialog */}
      <Dialog open={!!editingApp} onOpenChange={(open) => !open && setEditingApp(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit App</DialogTitle>
            <DialogDescription>
              Update the app details below.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            <div className="p-1">
              {editingApp && (
                <AppForm 
                  initialData={getAppById(editingApp)!} 
                  onCancel={() => setEditingApp(null)} 
                />
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
      
      {/* Category Dialog */}
      <Dialog open={isAddingCategory} onOpenChange={setIsAddingCategory}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new category.
            </DialogDescription>
          </DialogHeader>
          <CategoryForm onCancel={() => setIsAddingCategory(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Edit Category Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details below.
            </DialogDescription>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm 
              initialData={getCategoryById(editingCategory)!} 
              onCancel={() => setEditingCategory(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Location Dialog */}
      <Dialog open={isAddingLocation} onOpenChange={setIsAddingLocation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Location</DialogTitle>
            <DialogDescription>
              Fill out the form below to add a new location.
            </DialogDescription>
          </DialogHeader>
          <LocationForm onCancel={() => setIsAddingLocation(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Edit Location Dialog */}
      <Dialog open={!!editingLocation} onOpenChange={(open) => !open && setEditingLocation(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Update the location details below.
            </DialogDescription>
          </DialogHeader>
          {editingLocation && (
            <LocationForm 
              initialData={getLocationById(editingLocation)!} 
              onCancel={() => setEditingLocation(null)} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialogs */}
      
      {/* Delete App Confirmation */}
      <AlertDialog open={!!deletingApp} onOpenChange={(open) => !open && setDeletingApp(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the app and remove it from the directory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteApp} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete Category Confirmation */}
      <AlertDialog open={!!deletingCategory} onOpenChange={(open) => !open && setDeletingCategory(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the category. Apps in this category will need to be reassigned.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Delete Location Confirmation */}
      <AlertDialog open={!!deletingLocation} onOpenChange={(open) => !open && setDeletingLocation(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the location. Apps in this location will need to be reassigned.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteLocation} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminPage;


import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '@/context/AppContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AdminPage = () => {
  const { isAdmin, currentUser } = useAppContext();
  const { toast } = useToast();
  
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
              This is a placeholder for the admin dashboard. Full functionality will be implemented in the next phase.
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="apps">
            <TabsList className="mb-6">
              <TabsTrigger value="apps">Apps</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            
            <TabsContent value="apps">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Manage Apps</h2>
                    <Button>Add New App</Button>
                  </div>
                  <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">App management interface coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="categories">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Manage Categories</h2>
                    <Button>Add New Category</Button>
                  </div>
                  <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Category management interface coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="locations">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Manage Locations</h2>
                    <Button>Add New Location</Button>
                  </div>
                  <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Location management interface coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Manage Users</h2>
                    <Button>Add New User</Button>
                  </div>
                  <div className="bg-muted h-64 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">User management interface coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;

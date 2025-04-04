
import React, { createContext, useContext, useState, useEffect } from "react";
import { App, AppCategory, AppLocation, User } from "@/lib/db-types";
import { 
  getApps, 
  getCategories, 
  getLocations, 
  mockUsers, 
  addApp as addAppToMock, 
  updateApp as updateAppInMock, 
  deleteApp as deleteAppFromMock,
  addCategory as addCategoryToMock,
  updateCategory as updateCategoryInMock,
  deleteCategory as deleteCategoryFromMock,
  addLocation as addLocationToMock,
  updateLocation as updateLocationInMock,
  deleteLocation as deleteLocationFromMock
} from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";

interface AppContextType {
  apps: App[];
  categories: AppCategory[];
  locations: AppLocation[];
  currentUser: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
  updateApp: (app: App) => void;
  addApp: (app: App) => void;
  deleteApp: (appId: string) => void;
  addCategory: (category: AppCategory) => void;
  updateCategory: (category: AppCategory) => void;
  deleteCategory: (categoryId: string) => void;
  addLocation: (location: AppLocation) => void;
  updateLocation: (location: AppLocation) => void;
  deleteLocation: (locationId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [apps, setApps] = useState<App[]>([]);
  const [categories, setCategories] = useState<AppCategory[]>([]);
  const [locations, setLocations] = useState<AppLocation[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetch from database
    const fetchData = async () => {
      try {
        const appsData = getApps();
        const categoriesData = getCategories();
        const locationsData = getLocations();
        
        setApps(appsData);
        setCategories(categoriesData);
        setLocations(locationsData);
        
        // Check for saved user in localStorage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
          setCurrentUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast({
          title: "Error loading data",
          description: "Failed to load application data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const login = (email: string) => {
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      toast({
        title: "Logged in",
        description: `Welcome back, ${user.name}!`,
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email address",
        variant: "destructive",
      });
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const updateApp = (updatedApp: App) => {
    const result = updateAppInMock(updatedApp);
    if (result.success) {
      setApps(prevApps => 
        prevApps.map(app => app.id === updatedApp.id ? updatedApp : app)
      );
      toast({
        title: "App updated",
        description: `${updatedApp.title} has been updated`,
      });
    } else {
      toast({
        title: "Update failed",
        description: result.message || "Failed to update app",
        variant: "destructive",
      });
    }
  };

  const addApp = (newApp: App) => {
    const result = addAppToMock(newApp);
    if (result.success) {
      setApps(prevApps => [...prevApps, result.app]);
      toast({
        title: "App added",
        description: `${newApp.title} has been added to the directory`,
      });
    } else {
      toast({
        title: "Add failed",
        description: "Failed to add app",
        variant: "destructive",
      });
    }
  };

  const deleteApp = (appId: string) => {
    const result = deleteAppFromMock(appId);
    if (result.success) {
      setApps(prevApps => prevApps.filter(app => app.id !== appId));
      toast({
        title: "App deleted",
        description: `App has been removed from the directory`,
      });
    } else {
      toast({
        title: "Delete failed",
        description: result.message || "Failed to delete app",
        variant: "destructive",
      });
    }
  };

  // Category functions
  const addCategory = (newCategory: AppCategory) => {
    const result = addCategoryToMock(newCategory);
    if (result.success) {
      setCategories(prevCategories => [...prevCategories, result.category]);
      toast({
        title: "Category added",
        description: `${newCategory.name} has been added`,
      });
    } else {
      toast({
        title: "Add failed",
        description: "Failed to add category",
        variant: "destructive",
      });
    }
  };

  const updateCategory = (updatedCategory: AppCategory) => {
    const result = updateCategoryInMock(updatedCategory);
    if (result.success) {
      setCategories(prevCategories => 
        prevCategories.map(category => category.id === updatedCategory.id ? updatedCategory : category)
      );
      toast({
        title: "Category updated",
        description: `${updatedCategory.name} has been updated`,
      });
    } else {
      toast({
        title: "Update failed",
        description: result.message || "Failed to update category",
        variant: "destructive",
      });
    }
  };

  const deleteCategory = (categoryId: string) => {
    const result = deleteCategoryFromMock(categoryId);
    if (result.success) {
      setCategories(prevCategories => prevCategories.filter(category => category.id !== categoryId));
      toast({
        title: "Category deleted",
        description: `Category has been removed`,
      });
    } else {
      toast({
        title: "Delete failed",
        description: result.message || "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  // Location functions
  const addLocation = (newLocation: AppLocation) => {
    const result = addLocationToMock(newLocation);
    if (result.success) {
      setLocations(prevLocations => [...prevLocations, result.location]);
      toast({
        title: "Location added",
        description: `${newLocation.name} has been added`,
      });
    } else {
      toast({
        title: "Add failed",
        description: "Failed to add location",
        variant: "destructive",
      });
    }
  };

  const updateLocation = (updatedLocation: AppLocation) => {
    const result = updateLocationInMock(updatedLocation);
    if (result.success) {
      setLocations(prevLocations => 
        prevLocations.map(location => location.id === updatedLocation.id ? updatedLocation : location)
      );
      toast({
        title: "Location updated",
        description: `${updatedLocation.name} has been updated`,
      });
    } else {
      toast({
        title: "Update failed",
        description: result.message || "Failed to update location",
        variant: "destructive",
      });
    }
  };

  const deleteLocation = (locationId: string) => {
    const result = deleteLocationFromMock(locationId);
    if (result.success) {
      setLocations(prevLocations => prevLocations.filter(location => location.id !== locationId));
      toast({
        title: "Location deleted",
        description: `Location has been removed`,
      });
    } else {
      toast({
        title: "Delete failed",
        description: result.message || "Failed to delete location",
        variant: "destructive",
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        apps,
        categories,
        locations,
        currentUser,
        isAdmin: currentUser?.role === "admin",
        loading,
        login,
        logout,
        updateApp,
        addApp,
        deleteApp,
        addCategory,
        updateCategory,
        deleteCategory,
        addLocation,
        updateLocation,
        deleteLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

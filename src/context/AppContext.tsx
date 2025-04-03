
import React, { createContext, useContext, useState, useEffect } from "react";
import { App, AppCategory, AppLocation, User } from "@/lib/db-types";
import { getApps, getCategories, getLocations, mockUsers } from "@/lib/mock-data";
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
    setApps(prevApps => 
      prevApps.map(app => app.id === updatedApp.id ? updatedApp : app)
    );
    toast({
      title: "App updated",
      description: `${updatedApp.title} has been updated`,
    });
  };

  const addApp = (newApp: App) => {
    setApps(prevApps => [...prevApps, newApp]);
    toast({
      title: "App added",
      description: `${newApp.title} has been added to the directory`,
    });
  };

  const deleteApp = (appId: string) => {
    const appToDelete = apps.find(app => app.id === appId);
    setApps(prevApps => prevApps.filter(app => app.id !== appId));
    if (appToDelete) {
      toast({
        title: "App deleted",
        description: `${appToDelete.title} has been removed from the directory`,
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


import { App, AppCategory, AppLocation, User } from "./db-types";

export const mockCategories: AppCategory[] = [
  {
    id: "cat-1",
    name: "Business",
    slug: "business",
    description: "Apps for business productivity and management",
  },
  {
    id: "cat-2",
    name: "Travel",
    slug: "travel",
    description: "Apps for travel planning and management",
  },
  {
    id: "cat-3",
    name: "Communication",
    slug: "communication",
    description: "Apps for team communication and collaboration",
  },
  {
    id: "cat-4",
    name: "Design",
    slug: "design",
    description: "Apps for design and creative work",
  },
  {
    id: "cat-5",
    name: "Development",
    slug: "development",
    description: "Apps for software development",
  },
];

export const mockLocations: AppLocation[] = [
  {
    id: "loc-1",
    name: "Global",
    slug: "global",
    description: "Available worldwide",
  },
  {
    id: "loc-2",
    name: "North America",
    slug: "north-america",
    description: "Available in North America",
  },
  {
    id: "loc-3",
    name: "Europe",
    slug: "europe",
    description: "Available in Europe",
  },
  {
    id: "loc-4",
    name: "Asia",
    slug: "asia",
    description: "Available in Asia",
  },
];

export const mockApps: App[] = [
  {
    id: "app-1",
    title: "Google Workspace",
    slug: "google-workspace",
    description: "A suite of productivity tools for businesses",
    logoUrl: "/placeholder.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://workspace.google.com",
    features: ["Email", "Documents", "Spreadsheets", "Presentations"],
    connectedApps: ["app-2", "app-3"],
  },
  {
    id: "app-2",
    title: "Google Meet",
    slug: "google-meet",
    description: "Video conferencing service by Google",
    logoUrl: "/placeholder.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://meet.google.com",
    features: ["Video calls", "Screen sharing", "Chat"],
    connectedApps: ["app-1"],
  },
  {
    id: "app-3",
    title: "Zoom",
    slug: "zoom",
    description: "Video conferencing and virtual meeting platform",
    logoUrl: "/placeholder.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://zoom.us",
    features: ["Video calls", "Webinars", "Screen sharing"],
    connectedApps: ["app-6"],
  },
  {
    id: "app-4",
    title: "Figma",
    slug: "figma",
    description: "Collaborative interface design tool",
    logoUrl: "/placeholder.svg",
    categoryIds: ["cat-4"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.figma.com",
    features: ["Design", "Prototyping", "Collaboration"],
  },
  {
    id: "app-5",
    title: "TripIt",
    slug: "tripit",
    description: "Travel itinerary management app",
    logoUrl: "/placeholder.svg",
    categoryIds: ["cat-2"],
    locationIds: ["loc-1", "loc-2", "loc-3"],
    websiteUrl: "https://www.tripit.com",
    features: ["Itinerary management", "Flight tracking", "Travel alerts"],
  },
  {
    id: "app-6",
    title: "Slack",
    slug: "slack",
    description: "Business communication platform",
    logoUrl: "/placeholder.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://slack.com",
    features: ["Messaging", "File sharing", "App integration"],
    connectedApps: ["app-3"],
  },
];

export const mockUsers: User[] = [
  {
    id: "user-1",
    email: "admin@example.com",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "user-2",
    email: "user@example.com",
    name: "Regular User",
    role: "user",
  },
];

// Helper functions to simulate database operations
export const getApps = () => mockApps;
export const getAppById = (id: string) => mockApps.find(app => app.id === id);
export const getAppsByCategory = (categoryId: string) => 
  mockApps.filter(app => app.categoryIds.includes(categoryId));
export const getAppsByLocation = (locationId: string) => 
  mockApps.filter(app => app.locationIds.includes(locationId));
export const getCategories = () => mockCategories;
export const getCategoryById = (id: string) => 
  mockCategories.find(category => category.id === id);
export const getLocations = () => mockLocations;
export const getLocationById = (id: string) => 
  mockLocations.find(location => location.id === id);

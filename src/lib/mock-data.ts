
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
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://workspace.google.com",
    features: ["Email", "Documents", "Spreadsheets", "Presentations"],
    connectedApps: ["app-2", "app-3"],
    isBundle: true,
    childAppIds: ["app-7", "app-8", "app-9", "app-10"]
  },
  {
    id: "app-2",
    title: "Google Meet",
    slug: "google-meet",
    description: "Video conferencing service by Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9b/Google_Meet_icon_%282020%29.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://meet.google.com",
    features: ["Video calls", "Screen sharing", "Chat"],
    connectedApps: ["app-1"],
    isBundle: false,
    childAppIds: []
  },
  {
    id: "app-3",
    title: "Zoom",
    slug: "zoom",
    description: "Video conferencing and virtual meeting platform",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://zoom.us",
    features: ["Video calls", "Webinars", "Screen sharing"],
    connectedApps: ["app-6"],
    isBundle: false,
    childAppIds: []
  },
  {
    id: "app-4",
    title: "Figma",
    slug: "figma",
    description: "Collaborative interface design tool",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    categoryIds: ["cat-4"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.figma.com",
    features: ["Design", "Prototyping", "Collaboration"],
    isBundle: false,
    childAppIds: []
  },
  {
    id: "app-5",
    title: "TripIt",
    slug: "tripit",
    description: "Travel itinerary management app",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/8/8f/TripIt_logo.svg",
    categoryIds: ["cat-2"],
    locationIds: ["loc-1", "loc-2", "loc-3"],
    websiteUrl: "https://www.tripit.com",
    features: ["Itinerary management", "Flight tracking", "Travel alerts"],
    isBundle: false,
    childAppIds: []
  },
  {
    id: "app-6",
    title: "Slack",
    slug: "slack",
    description: "Business communication platform",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://slack.com",
    features: ["Messaging", "File sharing", "App integration"],
    connectedApps: ["app-3"],
    isBundle: false,
    childAppIds: []
  },
  {
    id: "app-7",
    title: "Gmail",
    slug: "gmail",
    description: "Email service by Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://mail.google.com",
    features: ["Email", "Labels", "Filters", "Search"],
    parentAppId: "app-1",
    isBundle: false,
    childAppIds: []
  },
  {
    id: "app-8",
    title: "Google Drive",
    slug: "google-drive",
    description: "File storage and synchronization service by Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-1"],
    websiteUrl: "https://drive.google.com",
    features: ["Storage", "File sharing", "Collaboration", "Backup"],
    parentAppId: "app-1",
    isBundle: false,
    childAppIds: []
  },
  {
    id: "app-9",
    title: "Google Docs",
    slug: "google-docs",
    description: "Word processor by Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/01/Google_Docs_logo_%282014-2020%29.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-1"],
    websiteUrl: "https://docs.google.com",
    features: ["Document editing", "Collaboration", "Templates"],
    parentAppId: "app-1",
    isBundle: false,
    childAppIds: []
  },
  {
    id: "app-10",
    title: "Google Sheets",
    slug: "google-sheets",
    description: "Spreadsheet application by Google",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Google_Sheets_logo_%282014-2020%29.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-1"],
    websiteUrl: "https://sheets.google.com",
    features: ["Spreadsheets", "Calculations", "Charts", "Data analysis"],
    parentAppId: "app-1",
    isBundle: false,
    childAppIds: []
  }
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
export const getChildApps = (appId: string) =>
  mockApps.filter(app => app.parentAppId === appId);


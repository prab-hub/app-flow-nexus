
export interface AppCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface AppLocation {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface App {
  id: string;
  title: string;
  slug: string;
  description: string;
  logoUrl: string;
  categoryIds: string[];
  locationIds: string[];
  websiteUrl: string;
  features: string[];
  connectedApps?: string[]; // References to other app IDs for flowchart view
  isBundle?: boolean; // Indicates if the app is a bundle of other apps
  childAppIds?: string[]; // IDs of child apps within a bundle
  parentAppId?: string; // ID of the parent app if this is part of a bundle
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}


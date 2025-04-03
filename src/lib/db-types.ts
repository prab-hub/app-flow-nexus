
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
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
}

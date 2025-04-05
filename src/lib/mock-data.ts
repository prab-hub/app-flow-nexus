
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
  {
    id: "cat-6",
    name: "Ride Sharing",
    slug: "ride-sharing",
    description: "Apps for ride sharing and transportation",
  },
  {
    id: "cat-7",
    name: "Food Delivery",
    slug: "food-delivery",
    description: "Apps for food and grocery delivery",
  },
  {
    id: "cat-8",
    name: "Shopping",
    slug: "shopping",
    description: "Apps for online shopping and e-commerce",
  },
  {
    id: "cat-9",
    name: "Entertainment",
    slug: "entertainment",
    description: "Apps for streaming and entertainment",
  },
  {
    id: "cat-10",
    name: "Social Media",
    slug: "social-media",
    description: "Social media and networking apps",
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
  {
    id: "loc-5",
    name: "Australia",
    slug: "australia",
    description: "Available in Australia and Oceania",
  },
  {
    id: "loc-6",
    name: "Africa",
    slug: "africa",
    description: "Available in Africa",
  },
  {
    id: "loc-7",
    name: "South America",
    slug: "south-america",
    description: "Available in South America",
  },
];

export const mockApps: App[] = [
  // Google Apps
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
    childAppIds: ["app-7", "app-8", "app-9", "app-10"],
    publisher: "Google"
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
    childAppIds: [],
    publisher: "Google"
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
    childAppIds: [],
    publisher: "Google"
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
    childAppIds: [],
    publisher: "Google"
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
    childAppIds: [],
    publisher: "Google"
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
    childAppIds: [],
    publisher: "Google"
  },
  
  // Microsoft Apps
  {
    id: "app-11",
    title: "Microsoft 365",
    slug: "microsoft-365",
    description: "Subscription service offering productivity applications and cloud services",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.microsoft.com/microsoft-365",
    features: ["Word", "Excel", "PowerPoint", "Outlook", "Teams"],
    isBundle: true,
    childAppIds: ["app-12", "app-13", "app-14", "app-15", "app-16"],
    publisher: "Microsoft"
  },
  {
    id: "app-12",
    title: "Microsoft Word",
    slug: "microsoft-word",
    description: "Word processing software by Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Microsoft_Office_Word_%282019%E2%80%93present%29.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.microsoft.com/microsoft-365/word",
    features: ["Document creation", "Formatting", "Templates", "Collaboration"],
    parentAppId: "app-11",
    isBundle: false,
    childAppIds: [],
    publisher: "Microsoft"
  },
  {
    id: "app-13",
    title: "Microsoft Excel",
    slug: "microsoft-excel",
    description: "Spreadsheet program by Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/34/Microsoft_Office_Excel_%282019%E2%80%93present%29.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.microsoft.com/microsoft-365/excel",
    features: ["Spreadsheets", "Data analysis", "Charts", "Pivot tables"],
    parentAppId: "app-11",
    isBundle: false,
    childAppIds: [],
    publisher: "Microsoft"
  },
  {
    id: "app-14",
    title: "Microsoft PowerPoint",
    slug: "microsoft-powerpoint",
    description: "Presentation software by Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Microsoft_Office_PowerPoint_%282019%E2%80%93present%29.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.microsoft.com/microsoft-365/powerpoint",
    features: ["Presentations", "Slides", "Animations", "Templates"],
    parentAppId: "app-11",
    isBundle: false,
    childAppIds: [],
    publisher: "Microsoft"
  },
  {
    id: "app-15",
    title: "Microsoft Outlook",
    slug: "microsoft-outlook",
    description: "Personal information manager by Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/df/Microsoft_Office_Outlook_%282018%E2%80%93present%29.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.microsoft.com/microsoft-365/outlook",
    features: ["Email", "Calendar", "Contacts", "Tasks"],
    parentAppId: "app-11",
    isBundle: false,
    childAppIds: [],
    publisher: "Microsoft"
  },
  {
    id: "app-16",
    title: "Microsoft Teams",
    slug: "microsoft-teams",
    description: "Communication and collaboration platform by Microsoft",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg",
    categoryIds: ["cat-1", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.microsoft.com/microsoft-365/microsoft-teams",
    features: ["Chat", "Video meetings", "File sharing", "App integration"],
    parentAppId: "app-11",
    isBundle: false,
    childAppIds: [],
    publisher: "Microsoft"
  },
  
  // Meta Apps
  {
    id: "app-17",
    title: "Meta Apps",
    slug: "meta-apps",
    description: "Suite of social media and communication apps by Meta",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    categoryIds: ["cat-3", "cat-10"],
    locationIds: ["loc-1"],
    websiteUrl: "https://about.meta.com",
    features: ["Social networking", "Messaging", "Photo sharing", "Video calling"],
    isBundle: true,
    childAppIds: ["app-18", "app-19", "app-20", "app-21"],
    publisher: "Meta"
  },
  {
    id: "app-18",
    title: "Facebook",
    slug: "facebook",
    description: "Social networking service by Meta",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg",
    categoryIds: ["cat-10"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.facebook.com",
    features: ["Social networking", "Groups", "Events", "Marketplace"],
    parentAppId: "app-17",
    isBundle: false,
    childAppIds: [],
    publisher: "Meta"
  },
  {
    id: "app-19",
    title: "Instagram",
    slug: "instagram",
    description: "Photo and video sharing social networking service by Meta",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg",
    categoryIds: ["cat-10"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.instagram.com",
    features: ["Photo sharing", "Video sharing", "Stories", "Direct messaging"],
    parentAppId: "app-17",
    isBundle: false,
    childAppIds: [],
    publisher: "Meta"
  },
  {
    id: "app-20",
    title: "WhatsApp",
    slug: "whatsapp",
    description: "Messaging and voice-over-IP service by Meta",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    categoryIds: ["cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.whatsapp.com",
    features: ["Messaging", "Voice calls", "Video calls", "File sharing"],
    parentAppId: "app-17",
    isBundle: false,
    childAppIds: [],
    publisher: "Meta"
  },
  {
    id: "app-21",
    title: "Messenger",
    slug: "messenger",
    description: "Messaging app by Meta",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg",
    categoryIds: ["cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.messenger.com",
    features: ["Messaging", "Voice calls", "Video calls", "Games"],
    parentAppId: "app-17",
    isBundle: false,
    childAppIds: [],
    publisher: "Meta"
  },
  
  // Apple Apps
  {
    id: "app-22",
    title: "Apple Suite",
    slug: "apple-suite",
    description: "Collection of productivity and creative apps by Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    categoryIds: ["cat-1", "cat-4"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.apple.com",
    features: ["Productivity", "Creativity", "Cloud storage", "Synchronization"],
    isBundle: true,
    childAppIds: ["app-23", "app-24", "app-25", "app-26"],
    publisher: "Apple"
  },
  {
    id: "app-23",
    title: "iCloud",
    slug: "icloud",
    description: "Cloud storage and computing service by Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/9a/ICloud_logo.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.icloud.com",
    features: ["Cloud storage", "Email", "Calendar", "Find My"],
    parentAppId: "app-22",
    isBundle: false,
    childAppIds: [],
    publisher: "Apple"
  },
  {
    id: "app-24",
    title: "Pages",
    slug: "pages",
    description: "Word processor by Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/92/Pages_icon.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.apple.com/pages",
    features: ["Document creation", "Templates", "Collaboration", "iCloud integration"],
    parentAppId: "app-22",
    isBundle: false,
    childAppIds: [],
    publisher: "Apple"
  },
  {
    id: "app-25",
    title: "Numbers",
    slug: "numbers",
    description: "Spreadsheet application by Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f0/Numbers_icon.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.apple.com/numbers",
    features: ["Spreadsheets", "Charts", "Templates", "iCloud integration"],
    parentAppId: "app-22",
    isBundle: false,
    childAppIds: [],
    publisher: "Apple"
  },
  {
    id: "app-26",
    title: "Keynote",
    slug: "keynote",
    description: "Presentation software by Apple",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Keynote_icon.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.apple.com/keynote",
    features: ["Presentations", "Animations", "Templates", "iCloud integration"],
    parentAppId: "app-22",
    isBundle: false,
    childAppIds: [],
    publisher: "Apple"
  },
  
  // Consumer Apps
  // Ride Sharing
  {
    id: "app-27",
    title: "Uber",
    slug: "uber",
    description: "Ride-hailing service",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.svg",
    categoryIds: ["cat-6"],
    locationIds: ["loc-1", "loc-2", "loc-3", "loc-4", "loc-5"],
    websiteUrl: "https://www.uber.com",
    features: ["Ride hailing", "Food delivery", "Package delivery", "Electric scooters"],
    isBundle: false,
    childAppIds: [],
    publisher: "Uber"
  },
  {
    id: "app-28",
    title: "Lyft",
    slug: "lyft",
    description: "Ride-hailing service",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Lyft_logo.svg",
    categoryIds: ["cat-6"],
    locationIds: ["loc-2"],
    websiteUrl: "https://www.lyft.com",
    features: ["Ride hailing", "Bike sharing", "Scooter sharing"],
    isBundle: false,
    childAppIds: [],
    publisher: "Lyft"
  },
  
  // Food Delivery
  {
    id: "app-29",
    title: "DoorDash",
    slug: "doordash",
    description: "Food delivery service",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/32/Doordash_logo.svg",
    categoryIds: ["cat-7"],
    locationIds: ["loc-2", "loc-3", "loc-5"],
    websiteUrl: "https://www.doordash.com",
    features: ["Food delivery", "Grocery delivery", "Local business delivery"],
    isBundle: false,
    childAppIds: [],
    publisher: "DoorDash"
  },
  {
    id: "app-30",
    title: "Uber Eats",
    slug: "uber-eats",
    description: "Food delivery service",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.svg",
    categoryIds: ["cat-7"],
    locationIds: ["loc-1", "loc-2", "loc-3", "loc-4", "loc-5"],
    websiteUrl: "https://www.ubereats.com",
    features: ["Food delivery", "Restaurant pickup", "Grocery delivery"],
    isBundle: false,
    childAppIds: [],
    publisher: "Uber"
  },
  
  // Shopping
  {
    id: "app-31",
    title: "Amazon",
    slug: "amazon",
    description: "Online shopping and marketplace",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    categoryIds: ["cat-8"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.amazon.com",
    features: ["Online shopping", "Prime delivery", "Streaming", "Cloud services"],
    isBundle: false,
    childAppIds: [],
    publisher: "Amazon"
  },
  {
    id: "app-32",
    title: "eBay",
    slug: "ebay",
    description: "Online auction and shopping website",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg",
    categoryIds: ["cat-8"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.ebay.com",
    features: ["Online auctions", "Buy It Now", "Seller tools", "Buyer protection"],
    isBundle: false,
    childAppIds: [],
    publisher: "eBay"
  },
  
  // Entertainment/OTT
  {
    id: "app-33",
    title: "Netflix",
    slug: "netflix",
    description: "Streaming service for movies and TV shows",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
    categoryIds: ["cat-9"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.netflix.com",
    features: ["Movies", "TV shows", "Documentaries", "Original content"],
    isBundle: false,
    childAppIds: [],
    publisher: "Netflix"
  },
  {
    id: "app-34",
    title: "Disney+",
    slug: "disney-plus",
    description: "Streaming service for Disney content",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
    categoryIds: ["cat-9"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.disneyplus.com",
    features: ["Disney movies", "Pixar", "Marvel", "Star Wars"],
    isBundle: false,
    childAppIds: [],
    publisher: "Disney"
  },
  {
    id: "app-35",
    title: "Spotify",
    slug: "spotify",
    description: "Music streaming service",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
    categoryIds: ["cat-9"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.spotify.com",
    features: ["Music streaming", "Podcasts", "Playlists", "Offline listening"],
    isBundle: false,
    childAppIds: [],
    publisher: "Spotify"
  },
  
  // Original apps from mock data
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
    childAppIds: [],
    publisher: "Zoom"
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
    childAppIds: [],
    publisher: "Figma"
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
    childAppIds: [],
    publisher: "TripIt"
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
    childAppIds: [],
    publisher: "Slack"
  },
  
  // Adding popular apps from India
  {
    id: "app-36",
    title: "PhonePe",
    slug: "phonepe",
    description: "Digital payment platform and financial services app",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/42/PhonePe_logo.svg",
    categoryIds: ["cat-1", "cat-8"],
    locationIds: ["loc-4"],
    websiteUrl: "https://www.phonepe.com",
    features: ["UPI payments", "Bill payments", "Money transfer", "Insurance"],
    isBundle: false,
    childAppIds: [],
    publisher: "PhonePe"
  },
  {
    id: "app-37",
    title: "Paytm",
    slug: "paytm",
    description: "Digital payment and financial services platform",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%282019%29.svg",
    categoryIds: ["cat-1", "cat-8"],
    locationIds: ["loc-4"],
    websiteUrl: "https://paytm.com",
    features: ["Mobile payments", "Banking", "Shopping", "Entertainment"],
    isBundle: false,
    childAppIds: [],
    publisher: "One97 Communications"
  },
  {
    id: "app-38",
    title: "Flipkart",
    slug: "flipkart",
    description: "E-commerce marketplace",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Flipkart_logo.svg",
    categoryIds: ["cat-8"],
    locationIds: ["loc-4"],
    websiteUrl: "https://www.flipkart.com",
    features: ["Online shopping", "Quick delivery", "Wide selection", "Great deals"],
    isBundle: false,
    childAppIds: [],
    publisher: "Flipkart"
  },
  {
    id: "app-39",
    title: "Swiggy",
    slug: "swiggy",
    description: "Food delivery platform",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg",
    categoryIds: ["cat-7"],
    locationIds: ["loc-4"],
    websiteUrl: "https://www.swiggy.com",
    features: ["Food delivery", "Grocery delivery", "Restaurant discovery", "Quick commerce"],
    isBundle: false,
    childAppIds: [],
    publisher: "Swiggy"
  },
  {
    id: "app-40",
    title: "Zomato",
    slug: "zomato",
    description: "Restaurant discovery and food delivery platform",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png",
    categoryIds: ["cat-7"],
    locationIds: ["loc-4"],
    websiteUrl: "https://www.zomato.com",
    features: ["Food delivery", "Dining out", "Restaurant ratings", "Pro membership"],
    isBundle: false,
    childAppIds: [],
    publisher: "Zomato"
  },
  {
    id: "app-41",
    title: "Ola",
    slug: "ola",
    description: "Ride-hailing service",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/1/12/Ola_Cabs_logo.svg",
    categoryIds: ["cat-6"],
    locationIds: ["loc-4"],
    websiteUrl: "https://www.olacabs.com",
    features: ["Cab booking", "Auto booking", "Bike taxis", "Rental services"],
    isBundle: false,
    childAppIds: [],
    publisher: "ANI Technologies"
  },
  
  // Adding more popular apps from the US
  {
    id: "app-42",
    title: "Venmo",
    slug: "venmo",
    description: "Mobile payment service",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/38/Venmo_logo.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-2"],
    websiteUrl: "https://venmo.com",
    features: ["Money transfers", "Social payments", "Debit card", "Crypto trading"],
    isBundle: false,
    childAppIds: [],
    publisher: "PayPal"
  },
  {
    id: "app-43",
    title: "Cash App",
    slug: "cash-app",
    description: "Mobile payment service",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Square_Cash_app_logo.svg",
    categoryIds: ["cat-1"],
    locationIds: ["loc-2"],
    websiteUrl: "https://cash.app",
    features: ["Money transfers", "Banking", "Stocks", "Bitcoin"],
    isBundle: false,
    childAppIds: [],
    publisher: "Block, Inc."
  },
  {
    id: "app-44",
    title: "TikTok",
    slug: "tiktok",
    description: "Short-form video hosting service",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg",
    categoryIds: ["cat-9", "cat-10"],
    locationIds: ["loc-1", "loc-2", "loc-3", "loc-5"],
    websiteUrl: "https://www.tiktok.com",
    features: ["Short videos", "Creator tools", "Live streaming", "Effects"],
    isBundle: false,
    childAppIds: [],
    publisher: "ByteDance"
  },
  {
    id: "app-45",
    title: "Reddit",
    slug: "reddit",
    description: "Social news aggregation and discussion website",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Reddit_logo.svg",
    categoryIds: ["cat-10"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.reddit.com",
    features: ["Communities", "Discussions", "Content sharing", "Voting"],
    isBundle: false,
    childAppIds: [],
    publisher: "Reddit, Inc."
  },
  {
    id: "app-46",
    title: "Snapchat",
    slug: "snapchat",
    description: "Multimedia messaging app",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/c/c4/Snapchat_logo.svg",
    categoryIds: ["cat-10", "cat-3"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.snapchat.com",
    features: ["Disappearing messages", "Stories", "AR filters", "Discover content"],
    isBundle: false,
    childAppIds: [],
    publisher: "Snap Inc."
  },
  {
    id: "app-47",
    title: "Twitter/X",
    slug: "twitter-x",
    description: "Microblogging and social networking service",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023.svg",
    categoryIds: ["cat-10"],
    locationIds: ["loc-1"],
    websiteUrl: "https://twitter.com",
    features: ["Short posts", "Following", "Trending topics", "Spaces"],
    isBundle: false,
    childAppIds: [],
    publisher: "X Corp."
  },
  {
    id: "app-48",
    title: "Adobe Creative Cloud",
    slug: "adobe-creative-cloud",
    description: "Collection of creative applications and services",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Creative_Cloud.svg",
    categoryIds: ["cat-4"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.adobe.com/creativecloud.html",
    features: ["Photo editing", "Video editing", "Graphic design", "Web design"],
    isBundle: true,
    childAppIds: ["app-49", "app-50", "app-51"],
    publisher: "Adobe Inc."
  },
  {
    id: "app-49",
    title: "Adobe Photoshop",
    slug: "adobe-photoshop",
    description: "Raster graphics editor",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    categoryIds: ["cat-4"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.adobe.com/products/photoshop.html",
    features: ["Photo editing", "Image manipulation", "Compositing", "Digital painting"],
    parentAppId: "app-48",
    isBundle: false,
    childAppIds: [],
    publisher: "Adobe Inc."
  },
  {
    id: "app-50",
    title: "Adobe Illustrator",
    slug: "adobe-illustrator",
    description: "Vector graphics editor",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
    categoryIds: ["cat-4"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.adobe.com/products/illustrator.html",
    features: ["Vector artwork", "Typography", "Logo design", "Illustrations"],
    parentAppId: "app-48",
    isBundle: false,
    childAppIds: [],
    publisher: "Adobe Inc."
  },
  {
    id: "app-51",
    title: "Adobe Premiere Pro",
    slug: "adobe-premiere-pro",
    description: "Video editing software",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/4/40/Adobe_Premiere_Pro_CC_icon.svg",
    categoryIds: ["cat-4", "cat-9"],
    locationIds: ["loc-1"],
    websiteUrl: "https://www.adobe.com/products/premiere.html",
    features: ["Video editing", "Audio editing", "Color grading", "Motion graphics"],
    parentAppId: "app-48",
    isBundle: false,
    childAppIds: [],
    publisher: "Adobe Inc."
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

// Let's add a function to update the app data (for admin use)
export const updateApp = (updatedApp: App) => {
  const index = mockApps.findIndex(app => app.id === updatedApp.id);
  if (index !== -1) {
    mockApps[index] = updatedApp;
    return { success: true, app: updatedApp };
  }
  return { success: false, message: "App not found" };
};

// Function to add a new app
export const addApp = (newApp: App) => {
  if (!newApp.id) {
    newApp.id = `app-${mockApps.length + 1}`;
  }
  if (!newApp.slug) {
    newApp.slug = newApp.title.toLowerCase().replace(/\s+/g, "-");
  }
  mockApps.push(newApp);
  return { success: true, app: newApp };
};

// Function to delete an app
export const deleteApp = (appId: string) => {
  const index = mockApps.findIndex(app => app.id === appId);
  if (index !== -1) {
    const deletedApp = mockApps.splice(index, 1)[0];
    return { success: true, app: deletedApp };
  }
  return { success: false, message: "App not found" };
};

// Functions for categories
export const addCategory = (newCategory: AppCategory) => {
  if (!newCategory.id) {
    newCategory.id = `cat-${mockCategories.length + 1}`;
  }
  if (!newCategory.slug) {
    newCategory.slug = newCategory.name.toLowerCase().replace(/\s+/g, "-");
  }
  mockCategories.push(newCategory);
  return { success: true, category: newCategory };
};

export const updateCategory = (updatedCategory: AppCategory) => {
  const index = mockCategories.findIndex(category => category.id === updatedCategory.id);
  if (index !== -1) {
    mockCategories[index] = updatedCategory;
    return { success: true, category: updatedCategory };
  }
  return { success: false, message: "Category not found" };
};

export const deleteCategory = (categoryId: string) => {
  const index = mockCategories.findIndex(category => category.id === categoryId);
  if (index !== -1) {
    const deletedCategory = mockCategories.splice(index, 1)[0];
    return { success: true, category: deletedCategory };
  }
  return { success: false, message: "Category not found" };
};

// Functions for locations
export const addLocation = (newLocation: AppLocation) => {
  if (!newLocation.id) {
    newLocation.id = `loc-${mockLocations.length + 1}`;
  }
  if (!newLocation.slug) {
    newLocation.slug = newLocation.name.toLowerCase().replace(/\s+/g, "-");
  }
  mockLocations.push(newLocation);
  return { success: true, location: newLocation };
};

export const updateLocation = (updatedLocation: AppLocation) => {
  const index = mockLocations.findIndex(location => location.id === updatedLocation.id);
  if (index !== -1) {
    mockLocations[index] = updatedLocation;
    return { success: true, location: updatedLocation };
  }
  return { success: false, message: "Location not found" };
};

export const deleteLocation = (locationId: string) => {
  const index = mockLocations.findIndex(location => location.id === locationId);
  if (index !== -1) {
    const deletedLocation = mockLocations.splice(index, 1)[0];
    return { success: true, location: deletedLocation };
  }
  return { success: false, message: "Location not found" };
};

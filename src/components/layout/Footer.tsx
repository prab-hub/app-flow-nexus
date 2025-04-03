
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <rect width="7" height="7" x="3" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="3" rx="1" />
                <rect width="7" height="7" x="14" y="14" rx="1" />
                <rect width="7" height="7" x="3" y="14" rx="1" />
              </svg>
              <span className="font-bold">AppFlowNexus</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Discover and connect your favorite applications in one place.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/categories" className="text-muted-foreground hover:text-foreground transition-colors">Categories</Link></li>
              <li><Link to="/locations" className="text-muted-foreground hover:text-foreground transition-colors">Locations</Link></li>
              <li><Link to="/flowchart" className="text-muted-foreground hover:text-foreground transition-colors">Flowchart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/categories/business" className="text-muted-foreground hover:text-foreground transition-colors">Business</Link></li>
              <li><Link to="/categories/travel" className="text-muted-foreground hover:text-foreground transition-colors">Travel</Link></li>
              <li><Link to="/categories/communication" className="text-muted-foreground hover:text-foreground transition-colors">Communication</Link></li>
              <li><Link to="/categories/design" className="text-muted-foreground hover:text-foreground transition-colors">Design</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Locations</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/locations/global" className="text-muted-foreground hover:text-foreground transition-colors">Global</Link></li>
              <li><Link to="/locations/north-america" className="text-muted-foreground hover:text-foreground transition-colors">North America</Link></li>
              <li><Link to="/locations/europe" className="text-muted-foreground hover:text-foreground transition-colors">Europe</Link></li>
              <li><Link to="/locations/asia" className="text-muted-foreground hover:text-foreground transition-colors">Asia</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} AppFlowNexus. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

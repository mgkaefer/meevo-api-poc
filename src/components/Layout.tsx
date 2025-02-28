
import React from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="app-container p-4 pb-8">
        <header className="mb-8 pt-2">
          <div className="animate-fade-in">
            <div className="text-center mb-2">
              <div className="inline-block bg-wax-100 text-wax-700 text-xs px-3 py-1 rounded-full font-medium">
                Premium Waxing Services
              </div>
            </div>
            <h1 className="text-3xl font-medium text-center">
              <span className="text-wax-800">Glow</span>
              <span className="text-wax-500">Wax</span>
            </h1>
          </div>
        </header>
        <main className={cn("rounded-xl px-2", className)}>
          {children}
        </main>
        <footer className="text-center text-xs text-muted-foreground mt-12 pb-6">
          <p>© 2023 GlowWax. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;

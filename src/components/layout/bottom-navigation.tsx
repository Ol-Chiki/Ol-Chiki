
'use client';

import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { User } from 'lucide-react'; // Import User icon specifically for profile

interface BottomNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface BottomNavigationProps {
  navItems: BottomNavItem[];
  activeView: string;
  onNavChange: (viewId: string) => void;
  onProfileClick: () => void; 
  // ProfileIconComponent and profileLabel are no longer dynamic from props here
}

export default function BottomNavigation({
  navItems,
  activeView,
  onNavChange,
  onProfileClick,
}: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-card text-card-foreground shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavChange(item.id)}
          className={cn(
            'flex h-full flex-1 flex-col items-center justify-center p-2 transition-colors duration-200 ease-in-out hover:bg-accent/20',
            activeView === item.id ? 'text-primary border-t-2 border-primary' : 'text-accent' // Changed from text-muted-foreground
          )}
          aria-label={item.label}
        >
          <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="mt-1 text-[10px] sm:text-xs leading-tight">{item.label}</span>
        </button>
      ))}
      <button
        onClick={onProfileClick}
        className={cn(
          'flex h-full flex-1 flex-col items-center justify-center p-2 transition-colors duration-200 ease-in-out hover:bg-accent/20 text-accent' // Changed from text-muted-foreground
        )}
        aria-label="Profile"
      >
        <User className="h-5 w-5 sm:h-6 sm:w-6" /> 
        <span className="mt-1 text-[10px] sm:text-xs leading-tight">Profile</span>
      </button>
    </nav>
  );
}

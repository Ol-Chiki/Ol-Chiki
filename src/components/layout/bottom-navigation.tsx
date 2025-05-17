
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
}

const iconColorClasses: Record<string, string> = {
  alphabet: 'text-accent', // Muted Olive Green
  numbers: 'text-chart-3', // Complementary Brown
  words: 'text-secondary-foreground', // Darker Olive
  sentence: 'text-chart-4', // Lighter Olive/Beige
  quiz: 'text-chart-5', // Earthy Tone
  game: 'text-primary/80', // Slightly desaturated primary
};

export default function BottomNavigation({
  navItems,
  activeView,
  onNavChange,
  onProfileClick,
}: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-card text-card-foreground shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        const isActive = activeView === item.id;
        const iconColor = isActive ? 'text-primary' : (iconColorClasses[item.id] || 'text-accent');
        const labelColor = isActive ? 'text-primary' : 'text-accent';

        return (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id)}
            className={cn(
              'flex h-full flex-1 flex-col items-center justify-center p-2 transition-colors duration-200 ease-in-out hover:bg-accent/20',
              isActive && 'border-t-2 border-primary'
            )}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <item.icon className={cn("h-5 w-5 sm:h-6 sm:w-6", iconColor)} />
            <span className={cn("mt-1 text-[10px] sm:text-xs leading-tight", labelColor)}>{item.label}</span>
          </button>
        );
      })}
      <button
        onClick={onProfileClick}
        className={cn(
          'flex h-full flex-1 flex-col items-center justify-center p-2 transition-colors duration-200 ease-in-out hover:bg-accent/20 text-accent'
        )}
        aria-label="Profile"
      >
        <User className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="mt-1 text-[10px] sm:text-xs leading-tight">Profile</span>
      </button>
    </nav>
  );
}

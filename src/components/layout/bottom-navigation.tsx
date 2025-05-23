
'use client';

import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { User as UserIconLucide } from 'lucide-react'; 
import type { User as FirebaseUser } from 'firebase/auth';
import type { ActiveView } from '@/app/page'; 

interface BottomNavItem {
  id: string; 
  label: string;
  icon: LucideIcon;
}

interface BottomNavigationProps {
  navItems: BottomNavItem[];
  activeView: ActiveView; 
  onNavChange: (viewId: ActiveView) => void; 
  onProfileClick: () => void;
  currentUser: FirebaseUser | null;
}

// Define distinct colors for each inactive icon
const iconColorClasses: Record<string, string> = {
  'basic-hub': 'text-teal-500', 
  // 'words': 'text-emerald-500', // Removed as it's now under basic-hub
  'sentence': 'text-fuchsia-500', 
  'practice-hub': 'text-sky-500', 
  'game': 'text-violet-500',
};

export default function BottomNavigation({
  navItems,
  activeView,
  onNavChange,
  onProfileClick,
  currentUser,
}: BottomNavigationProps) {
  const profileLabel = currentUser?.displayName 
    ? (currentUser.displayName.split(' ')[0].length > 10 ? currentUser.displayName.split(' ')[0].substring(0,8) + '...' : currentUser.displayName.split(' ')[0])
    : 'Profile';
  const ProfileIcon = UserIconLucide; 

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-card text-card-foreground shadow-[0_-2px_5px_-1px_rgba(0,0,0,0.1)]">
      {navItems.map((item) => {
        // Determine if the current item is active, considering parent hubs
        let isActive = activeView === item.id;
        if (item.id === 'basic-hub' && (activeView === 'alphabet' || activeView === 'numbers' || activeView === 'words')) {
          isActive = true;
        }
        if (item.id === 'practice-hub' && (
            activeView === 'reading-practice-hub' || // Corrected placeholder if it was used
            activeView === 'writing-practice-hub' ||
            activeView === 'writing-quiz-basic'
          )) {
          isActive = true;
        }
        
        const iconColor = isActive ? 'text-primary' : (iconColorClasses[item.id] || 'text-accent'); 
        const labelColor = isActive ? 'text-primary' : 'text-accent';

        return (
          <button
            key={item.id}
            onClick={() => onNavChange(item.id as ActiveView)} 
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
        aria-label={profileLabel}
      >
        <ProfileIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        <span className="mt-1 text-[10px] sm:text-xs leading-tight truncate max-w-[50px] xs:max-w-[60px]">{profileLabel}</span>
      </button>
    </nav>
  );
}

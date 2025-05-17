
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import LearnAlphabet from "@/components/ol-chiki/learn-alphabet";
import LearnNumbers from "@/components/ol-chiki/learn-numbers";
import LearnWords from "@/components/ol-chiki/learn-words";
import SentencePractice from "@/components/ol-chiki/sentence-practice";
import WritingPractice from "@/components/ol-chiki/writing-practice"; // New import
import GameHub from "@/components/ol-chiki/game-hub";
import BasicLearningHub from "@/components/ol-chiki/basic-learning-hub";
import SplashScreen from '@/components/splash-screen';
import BottomNavigation from '@/components/layout/bottom-navigation';
import { GraduationCap, FileText, Sparkles, FilePenLine, Gamepad2, Loader2 } from "lucide-react"; // Replaced Puzzle with FilePenLine
import type { LucideIcon } from 'lucide-react';

export type ActiveView = 'basic-hub' | 'alphabet' | 'numbers' | 'words' | 'sentence' | 'writing-practice' | 'game'; // Updated

interface NavItemConfig {
  id: Exclude<ActiveView, 'alphabet' | 'numbers'>;
  label: string;
  icon: LucideIcon;
}

export default function OlChikiPathPage() {
  const [activeView, setActiveView] = useState<ActiveView>('basic-hub');
  const { user, loading: authLoading, hasSkippedAuth } = useAuth();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [splashSeenThisSession, setSplashSeenThisSession] = useState(false);
  const [currentYear, setCurrentYear] = useState<string>('');

  useEffect(() => {
    setIsClient(true); // Signals that the component has mounted on the client
    // Determine splash screen status and current year only on the client
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('splashSeenOlChiki') === 'true') {
        setSplashSeenThisSession(true);
      } else {
        setSplashSeenThisSession(false);
      }
      setCurrentYear(new Date().getFullYear().toString());
    }
  }, []);


  const handleSplashComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('splashSeenOlChiki', 'true');
    }
    setSplashSeenThisSession(true);
  };

  useEffect(() => {
    if (!isClient) {
      return; 
    }

    if (!splashSeenThisSession) {
      return; 
    }

    if (!authLoading && !user && !hasSkippedAuth) {
      router.push('/auth');
    }
  }, [isClient, splashSeenThisSession, user, authLoading, hasSkippedAuth, router]);


  if (!isClient) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Initializing...</p>
      </div>
    );
  }

  if (!splashSeenThisSession) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading authentication...</p>
      </div>
    );
  }
  
  if (!user && !hasSkippedAuth) {
     return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  const bottomNavItems: NavItemConfig[] = [
    { id: 'basic-hub', label: 'Basic', icon: GraduationCap },
    { id: 'words', label: 'Words', icon: FileText },
    { id: 'sentence', label: 'Santad AI', icon: Sparkles },
    { id: 'writing-practice', label: 'Write', icon: FilePenLine }, // Changed from Quiz
    { id: 'game', label: 'Game Zone', icon: Gamepad2 },
  ];

  let currentComponent;
  switch (activeView) {
    case 'basic-hub':
      currentComponent = <BasicLearningHub onSectionSelect={setActiveView} />;
      break;
    case 'alphabet':
      currentComponent = <LearnAlphabet />;
      break;
    case 'numbers':
      currentComponent = <LearnNumbers />;
      break;
    case 'words':
      currentComponent = <LearnWords />;
      break;
    case 'sentence':
      currentComponent = <SentencePractice />;
      break;
    case 'writing-practice': // Changed from 'quiz'
      currentComponent = <WritingPractice />;
      break;
    case 'game':
      currentComponent = <GameHub />;
      break;
    default:
      currentComponent = <BasicLearningHub onSectionSelect={setActiveView} />;
  }

  const handleProfileNavigation = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary text-primary-foreground p-4 shadow-md flex items-center justify-between sticky top-0 z-40 h-18">
        <div className="flex items-center gap-1 sm:gap-2">
          <GraduationCap className="h-6 w-6" />
          <h1 className="text-base sm:text-xl font-bold tracking-tight leading-tight">Let's Learn Ol Chiki</h1>
        </div>
        {user && (
           <div className="text-xs sm:text-sm hidden sm:block truncate max-w-[150px] sm:max-w-[250px]" title={user.email ?? undefined}>Logged in as: {user.email}</div>
        )}
      </header>

      <main className="flex-grow container mx-auto py-2 px-1 md:py-6 md:px-4 pb-20">
        {currentComponent}
      </main>

      <BottomNavigation
        navItems={bottomNavItems}
        activeView={activeView}
        onNavChange={(id) => setActiveView(id as ActiveView)}
        onProfileClick={handleProfileNavigation}
        currentUser={user}
      />

      <footer className="bg-secondary text-secondary-foreground p-4 text-center text-sm mt-auto">
        <p>&copy; {currentYear} Let's Learn Ol Chiki. Learn and explore the Ol Chiki script.</p>
      </footer>
    </div>
  );
}

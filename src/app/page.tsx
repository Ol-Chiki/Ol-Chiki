
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import LearnAlphabet from "@/components/ol-chiki/learn-alphabet";
import LearnNumbers from "@/components/ol-chiki/learn-numbers";
import LearnWords from "@/components/ol-chiki/learn-words";
import SentencePractice from "@/components/ol-chiki/sentence-practice";
import CharacterQuiz from "@/components/ol-chiki/character-quiz";
import GameHub from "@/components/ol-chiki/game-hub";
import BasicLearningHub from "@/components/ol-chiki/basic-learning-hub";
import SplashScreen from '@/components/splash-screen';
import BottomNavigation from '@/components/layout/bottom-navigation';
import { GraduationCap, FileText, Sparkles, Puzzle, Gamepad2, Loader2 } from "lucide-react";
import type { LucideIcon } from 'lucide-react';
// import { useToast } from '@/hooks/use-toast'; // Not currently used

export type ActiveView = 'basic-hub' | 'alphabet' | 'numbers' | 'words' | 'sentence' | 'quiz' | 'game';

interface NavItemConfig {
  id: Exclude<ActiveView, 'alphabet' | 'numbers'>;
  label: string;
  icon: LucideIcon;
}

export default function OlChikiPathPage() {
  const [activeView, setActiveView] = useState<ActiveView>('basic-hub');
  const { user, loading: authLoading, hasSkippedAuth } = useAuth();
  const router = useRouter();
  // const { toast } = useToast(); // Not currently used

  const [isClient, setIsClient] = useState(false);
  // Default to true (splash seen) for SSR; client useEffect will correct this from sessionStorage.
  const [splashSeenThisSession, setSplashSeenThisSession] = useState(true);
  const [currentYear, setCurrentYear] = useState<string>('');

  useEffect(() => {
    setIsClient(true); // Component has mounted on the client
    if (sessionStorage.getItem('splashSeenOlChiki') === 'true') {
      setSplashSeenThisSession(true);
    } else {
      setSplashSeenThisSession(false); // Splash has not been seen this session
    }
    setCurrentYear(new Date().getFullYear().toString()); // Set year on client
  }, []);

  const handleSplashComplete = () => {
    // This function is called from SplashScreen, which is client-side only
    sessionStorage.setItem('splashSeenOlChiki', 'true');
    setSplashSeenThisSession(true);
  };

  useEffect(() => {
    // This effect handles redirection to auth if needed, AFTER client check and splash screen logic
    if (!isClient || !splashSeenThisSession) {
      // If not client yet, or splash screen is supposed to be showing, don't redirect yet
      return;
    }

    if (!authLoading && !user && !hasSkippedAuth) {
      router.push('/auth');
    }
  }, [isClient, splashSeenThisSession, user, authLoading, hasSkippedAuth, router]);

  // --- Initial Render Logic for SSR and First Client Pass ---
  if (!isClient) {
    // Consistent minimal loader for server-side render and initial client render before useEffect runs
    // This ensures the server and client render the same initial HTML structure.
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Initializing...</p>
      </div>
    );
  }

  // --- Client-Side Render Logic from here ---
  if (!splashSeenThisSession) {
    // Only render SplashScreen on the client if it hasn't been seen this session
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  // If splash has been seen (or wasn't needed based on sessionStorage), proceed with auth loading checks
  if (authLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading authentication...</p>
      </div>
    );
  }
  
  // This check is for after authLoading is false.
  // If redirection to /auth is needed, the useEffect above should handle it.
  // This block acts as a UI placeholder during the brief period redirection might take.
  if (!user && !hasSkippedAuth) {
     return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  // --- Main App Content Rendering ---
  const bottomNavItems: NavItemConfig[] = [
    { id: 'basic-hub', label: 'Basic', icon: GraduationCap },
    { id: 'words', label: 'Words', icon: FileText },
    { id: 'sentence', label: 'Sentence AI', icon: Sparkles },
    { id: 'quiz', label: 'Quiz', icon: Puzzle },
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
    case 'quiz':
      currentComponent = <CharacterQuiz />;
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
      />

      <footer className="bg-secondary text-secondary-foreground p-4 text-center text-sm mt-auto">
        <p>&copy; {currentYear} Let's Learn Ol Chiki. Learn and explore the Ol Chiki script.</p>
      </footer>
    </div>
  );
}

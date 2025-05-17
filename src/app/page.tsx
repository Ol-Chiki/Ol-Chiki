
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import LearnAlphabet from "@/components/ol-chiki/learn-alphabet";
import LearnNumbers from "@/components/ol-chiki/learn-numbers";
import LearnWords from "@/components/ol-chiki/learn-words";
import SentencePractice from "@/components/ol-chiki/sentence-practice";
import WritingPracticeQuiz from "@/components/ol-chiki/writing-practice-quiz";
import GameHub from "@/components/ol-chiki/game-hub";
import BasicLearningHub from "@/components/ol-chiki/basic-learning-hub";
import PracticeHub from '@/components/ol-chiki/practice-hub';
import ReadingPracticeHub from '@/components/ol-chiki/reading-practice-hub';
import ReadingQuizSelectionHub from '@/components/ol-chiki/quizzes/reading-quiz-selection-hub';
import ReadingQuizIdentifyWords from '@/components/ol-chiki/quizzes/reading-quiz-identify-words';
import ReadingEasySelectionHub from '@/components/ol-chiki/quizzes/reading-easy-selection-hub';
import ReadingEasyMatchWordImageQuiz from '@/components/ol-chiki/quizzes/reading-easy-match-word-image-quiz';
import ReadingIntermediateSelectionHub from '@/components/ol-chiki/quizzes/reading-intermediate-selection-hub';
import ReadingIntermediatePhrasesQuiz from '@/components/ol-chiki/quizzes/reading-intermediate-phrases-quiz';
import ReadingHardSelectionHub from '@/components/ol-chiki/quizzes/reading-hard-selection-hub';
import ReadingHardStoryQuiz from '@/components/ol-chiki/quizzes/reading-hard-story-quiz';
import ReadingExpertSelectionHub from '@/components/ol-chiki/quizzes/reading-expert-selection-hub';
import ReadingExpertMcqQuiz from '@/components/ol-chiki/quizzes/reading-expert-mcq-quiz';
import WritingPracticeHub from '@/components/ol-chiki/writing-practice-hub';
// Writing Quiz Selection Hubs
import WritingBasicSelectionHub from '@/components/ol-chiki/quizzes/writing-basic-selection-hub';
import WritingEasySelectionHub from '@/components/ol-chiki/quizzes/writing-easy-selection-hub';
import WritingIntermediateSelectionHub from '@/components/ol-chiki/quizzes/writing-intermediate-selection-hub';
import WritingMediumSelectionHub from '@/components/ol-chiki/quizzes/writing-medium-selection-hub';
import WritingHardSelectionHub from '@/components/ol-chiki/quizzes/writing-hard-selection-hub';
import WritingExpertSelectionHub from '@/components/ol-chiki/quizzes/writing-expert-selection-hub';
// Placeholder Writing Quiz Components
import WritingEasyQuiz from '@/components/ol-chiki/quizzes/writing-easy-quiz';
import WritingIntermediateQuiz from '@/components/ol-chiki/quizzes/writing-intermediate-quiz';
import WritingMediumQuiz from '@/components/ol-chiki/quizzes/writing-medium-quiz';
import WritingHardQuiz from '@/components/ol-chiki/quizzes/writing-hard-quiz';
import WritingExpertQuiz from '@/components/ol-chiki/quizzes/writing-expert-quiz';

import SplashScreen from '@/components/splash-screen';
import BottomNavigation from '@/components/layout/bottom-navigation';
import { GraduationCap, Sparkles, ClipboardEdit, Gamepad2, Loader2 } from "lucide-react";
import type { LucideIcon } from 'lucide-react';

export type ActiveView =
  | 'basic-hub'
  | 'alphabet'
  | 'numbers'
  | 'words'
  | 'sentence'
  | 'practice-hub'
  // Reading
  | 'reading-practice-hub'
  | 'reading-quiz-selection-hub' 
  | 'reading-quiz-identify-words'
  | 'reading-easy-selection-hub'
  | 'reading-easy-match-word-image-quiz'
  | 'reading-intermediate-selection-hub'
  | 'reading-intermediate-phrases-quiz'
  | 'reading-hard-selection-hub'
  | 'reading-hard-story-quiz'
  | 'reading-expert-selection-hub'
  | 'reading-expert-mcq-quiz'
  // Writing
  | 'writing-practice-hub'
  | 'writing-basic-selection-hub'
  | 'writing-quiz-basic' // This is the actual quiz component
  | 'writing-easy-selection-hub'
  | 'writing-quiz-easy'
  | 'writing-intermediate-selection-hub'
  | 'writing-quiz-intermediate'
  | 'writing-medium-selection-hub'
  | 'writing-quiz-medium'
  | 'writing-hard-selection-hub'
  | 'writing-quiz-hard'
  | 'writing-expert-selection-hub'
  | 'writing-quiz-expert'
  | 'game';

interface NavItemConfig {
  id: Exclude<ActiveView, 
    'alphabet' | 'numbers' | 'words' | 
    'reading-practice-hub' | 'writing-practice-hub' | 
    'reading-quiz-identify-words' | 'reading-quiz-selection-hub' |
    'reading-easy-selection-hub' | 'reading-easy-match-word-image-quiz' |
    'reading-intermediate-selection-hub' | 'reading-intermediate-phrases-quiz' |
    'reading-hard-selection-hub' | 'reading-hard-story-quiz' |
    'reading-expert-selection-hub' | 'reading-expert-mcq-quiz' |
    'writing-basic-selection-hub' | 'writing-quiz-basic' |
    'writing-easy-selection-hub' | 'writing-quiz-easy' |
    'writing-intermediate-selection-hub' | 'writing-quiz-intermediate' |
    'writing-medium-selection-hub' | 'writing-quiz-medium' |
    'writing-hard-selection-hub' | 'writing-quiz-hard' |
    'writing-expert-selection-hub' | 'writing-quiz-expert'
  >;
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
  const [currentQuizSetNumber, setCurrentQuizSetNumber] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
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

  if (authLoading && isClient) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading authentication...</p>
      </div>
    );
  }

  if (isClient && !user && !hasSkippedAuth && splashSeenThisSession) {
     return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  const bottomNavItems: NavItemConfig[] = [
    { id: 'basic-hub', label: 'Basic', icon: GraduationCap },
    { id: 'sentence', label: 'Santad AI', icon: Sparkles },
    { id: 'practice-hub', label: 'Practice', icon: ClipboardEdit },
    { id: 'game', label: 'Game Zone', icon: Gamepad2 },
  ];

  const handleSelectQuizSet = (quizNumber: number, targetQuizView: ActiveView) => {
    setCurrentQuizSetNumber(quizNumber);
    setActiveView(targetQuizView);
  };

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
    case 'practice-hub':
      currentComponent = <PracticeHub onSectionSelect={setActiveView} />;
      break;
    // Reading Practice Flows
    case 'reading-practice-hub':
      currentComponent = <ReadingPracticeHub onLevelSelect={setActiveView} />;
      break;
    case 'reading-quiz-selection-hub': 
      currentComponent = <ReadingQuizSelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'reading-quiz-identify-words')} onBack={() => setActiveView('reading-practice-hub')} />;
      break;
    case 'reading-quiz-identify-words': 
      currentComponent = <ReadingQuizIdentifyWords 
        quizSetNumber={currentQuizSetNumber} 
        onQuizComplete={() => setActiveView('reading-quiz-selection-hub')} 
      />;
      break;
    case 'reading-easy-selection-hub':
      currentComponent = <ReadingEasySelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'reading-easy-match-word-image-quiz')} onBack={() => setActiveView('reading-practice-hub')} />;
      break;
    case 'reading-easy-match-word-image-quiz':
      currentComponent = <ReadingEasyMatchWordImageQuiz quizSetNumber={currentQuizSetNumber} onQuizComplete={() => setActiveView('reading-easy-selection-hub')} />;
      break;
    case 'reading-intermediate-selection-hub':
      currentComponent = <ReadingIntermediateSelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'reading-intermediate-phrases-quiz')} onBack={() => setActiveView('reading-practice-hub')} />;
      break;
    case 'reading-intermediate-phrases-quiz':
      currentComponent = <ReadingIntermediatePhrasesQuiz quizSetNumber={currentQuizSetNumber} onQuizComplete={() => setActiveView('reading-intermediate-selection-hub')} />;
      break;
    case 'reading-hard-selection-hub':
      currentComponent = <ReadingHardSelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'reading-hard-story-quiz')} onBack={() => setActiveView('reading-practice-hub')} />;
      break;
    case 'reading-hard-story-quiz':
      currentComponent = <ReadingHardStoryQuiz quizSetNumber={currentQuizSetNumber} onQuizComplete={() => setActiveView('reading-hard-selection-hub')} />;
      break;
    case 'reading-expert-selection-hub':
      currentComponent = <ReadingExpertSelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'reading-expert-mcq-quiz')} onBack={() => setActiveView('reading-practice-hub')} />;
      break;
    case 'reading-expert-mcq-quiz':
      currentComponent = <ReadingExpertMcqQuiz quizSetNumber={currentQuizSetNumber} onQuizComplete={() => setActiveView('reading-expert-selection-hub')} />;
      break;
    
    // Writing Practice Flows
    case 'writing-practice-hub':
      currentComponent = <WritingPracticeHub onLevelSelect={setActiveView} />;
      break;
    case 'writing-basic-selection-hub':
      currentComponent = <WritingBasicSelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'writing-quiz-basic')} onBack={() => setActiveView('writing-practice-hub')} />;
      break;
    case 'writing-quiz-basic':
      currentComponent = <WritingPracticeQuiz quizSetNumber={currentQuizSetNumber} level="Basic" onQuizComplete={() => setActiveView('writing-basic-selection-hub')} />;
      break;
    case 'writing-easy-selection-hub':
      currentComponent = <WritingEasySelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'writing-quiz-easy')} onBack={() => setActiveView('writing-practice-hub')} />;
      break;
    case 'writing-quiz-easy':
      currentComponent = <WritingEasyQuiz quizSetNumber={currentQuizSetNumber} onQuizComplete={() => setActiveView('writing-easy-selection-hub')} />;
      break;
    case 'writing-intermediate-selection-hub':
      currentComponent = <WritingIntermediateSelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'writing-quiz-intermediate')} onBack={() => setActiveView('writing-practice-hub')} />;
      break;
    case 'writing-quiz-intermediate':
      currentComponent = <WritingIntermediateQuiz quizSetNumber={currentQuizSetNumber} onQuizComplete={() => setActiveView('writing-intermediate-selection-hub')} />;
      break;
    case 'writing-medium-selection-hub':
      currentComponent = <WritingMediumSelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'writing-quiz-medium')} onBack={() => setActiveView('writing-practice-hub')} />;
      break;
    case 'writing-quiz-medium':
      currentComponent = <WritingMediumQuiz quizSetNumber={currentQuizSetNumber} onQuizComplete={() => setActiveView('writing-medium-selection-hub')} />;
      break;
    case 'writing-hard-selection-hub':
      currentComponent = <WritingHardSelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'writing-quiz-hard')} onBack={() => setActiveView('writing-practice-hub')} />;
      break;
    case 'writing-quiz-hard':
      currentComponent = <WritingHardQuiz quizSetNumber={currentQuizSetNumber} onQuizComplete={() => setActiveView('writing-hard-selection-hub')} />;
      break;
    case 'writing-expert-selection-hub':
      currentComponent = <WritingExpertSelectionHub onSelectQuiz={(num) => handleSelectQuizSet(num, 'writing-quiz-expert')} onBack={() => setActiveView('writing-practice-hub')} />;
      break;
    case 'writing-quiz-expert':
      currentComponent = <WritingExpertQuiz quizSetNumber={currentQuizSetNumber} onQuizComplete={() => setActiveView('writing-expert-selection-hub')} />;
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

  const handleNavChange = (viewId: ActiveView) => {
    setActiveView(viewId);
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
        onNavChange={handleNavChange}
        onProfileClick={handleProfileNavigation}
        currentUser={user}
      />

      <footer className="bg-secondary text-secondary-foreground p-4 text-center text-sm mt-auto">
        <p>&copy; {currentYear} Let's Learn Ol Chiki. Learn and explore the Ol Chiki script.</p>
      </footer>
    </div>
  );
}
    

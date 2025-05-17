
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import LearnAlphabet from "@/components/ol-chiki/learn-alphabet";
import LearnNumbers from "@/components/ol-chiki/learn-numbers";
import LearnWords from "@/components/ol-chiki/learn-words";
import SentencePractice from "@/components/ol-chiki/sentence-practice";
import CharacterQuiz from "@/components/ol-chiki/character-quiz";
import GameHub from "@/components/ol-chiki/game-hub";
import SplashScreen from '@/components/splash-screen'; // Added SplashScreen
import { Languages, BookOpenText, FileText, Sparkles, Puzzle, PanelLeft, Type, ListOrdered, Gamepad2, LogIn, LogOut, Loader2 } from "lucide-react";
import { Button } from '@/components/ui/button';

type ActiveView = 'alphabet' | 'numbers' | 'words' | 'sentence' | 'quiz' | 'game';

interface PageView {
  id: ActiveView;
  label: string;
  icon: React.ElementType;
  component: JSX.Element;
  isSubItem?: boolean;
  requiresAuth?: boolean;
}

export default function OlChikiPathPage() {
  const [activeView, setActiveView] = useState<ActiveView>('alphabet');
  const { user, loading: authLoading, hasSkippedAuth, logOut } = useAuth();
  const router = useRouter();
  const [splashSeenThisSession, setSplashSeenThisSession] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('splashSeenOlChiki') === 'true') {
        setSplashSeenThisSession(true);
      }
    }
  }, []);

  const handleSplashComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('splashSeenOlChiki', 'true');
    }
    setSplashSeenThisSession(true);
  };

  useEffect(() => {
    if (splashSeenThisSession && !authLoading && !user && !hasSkippedAuth) {
      router.push('/auth');
    }
  }, [user, authLoading, hasSkippedAuth, router, splashSeenThisSession]);

  const pageViews: PageView[] = [
    { id: 'alphabet', label: 'Alphabet', icon: Type, component: <LearnAlphabet />, isSubItem: true },
    { id: 'numbers', label: 'Numbers', icon: ListOrdered, component: <LearnNumbers />, isSubItem: true },
    { id: 'words', label: 'Example Words', icon: FileText, component: <LearnWords /> },
    { id: 'sentence', label: 'Sentence AI', icon: Sparkles, component: <SentencePractice /> },
    { id: 'quiz', label: 'Quiz', icon: Puzzle, component: <CharacterQuiz /> },
    { id: 'game', label: 'Game Zone', icon: Gamepad2, component: <GameHub /> },
  ];

  const activeComponent = pageViews.find(view => view.id === activeView)?.component;

  if (typeof window !== 'undefined' && !splashSeenThisSession) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  if (authLoading || (splashSeenThisSession && !user && !hasSkippedAuth)) {
     // Show loader if auth is loading OR if splash is done, no user, and not skipped (before redirect effect runs)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }
  
  // If splash is seen, user is loaded (or skipped), then render app or redirect (handled by useEffect)
  if (!user && !hasSkippedAuth) {
    // This case should ideally be caught by the useEffect redirect, 
    // but as a fallback, show loader while redirecting.
     return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Redirecting...</p>
      </div>
    );
  }


  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-col bg-background">
        <header className="bg-primary text-primary-foreground p-4 shadow-md flex items-center justify-between sticky top-0 z-50 h-18">
          <div className="flex items-center gap-1 sm:gap-2">
            <SidebarTrigger className="md:hidden mr-1 sm:mr-2">
              <PanelLeft />
            </SidebarTrigger>
            <Languages className="h-6 w-6" />
            <h1 className="text-base sm:text-xl font-bold tracking-tight leading-tight">Let's Learn Ol Chiki</h1>
          </div>
          {user && (
             <div className="text-xs sm:text-sm hidden sm:block truncate max-w-[150px] sm:max-w-[250px]" title={user.email ?? undefined}>Logged in as: {user.email}</div>
          )}
        </header>

        <div className="flex flex-1">
          <Sidebar
            collapsible="icon"
            variant="sidebar"
            className="border-r"
          >
            <SidebarHeader className="p-2 flex items-center h-18 group-data-[collapsible=icon]:justify-center">
               <div className="group-data-[collapsible=icon]:hidden flex-grow">
               </div>
              <SidebarTrigger className="hidden md:flex shrink-0">
                 <PanelLeft />
              </SidebarTrigger>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarGroup>
                  <SidebarGroupLabel>
                    <BookOpenText className="mr-2 h-5 w-5"/> Characters
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {pageViews.filter(item => item.isSubItem).map((item) => (
                        <SidebarMenuItem key={item.id}>
                          <SidebarMenuButton
                            onClick={() => setActiveView(item.id as ActiveView)}
                            isActive={activeView === item.id}
                            tooltip={{ children: item.label, side: "right", align: "center" }}
                            className="justify-start"
                          >
                            <item.icon className="h-5 w-5" />
                            <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {pageViews.filter(item => !item.isSubItem).map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id as ActiveView)}
                      isActive={activeView === item.id}
                      tooltip={{ children: item.label, side: "right", align: "center" }}
                      className="justify-start"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
             <SidebarFooter>
              {user ? (
                <SidebarMenuButton
                  onClick={logOut}
                  tooltip={{ children: "Logout", side: "right", align: "center" }}
                  className="justify-start w-full"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  onClick={() => router.push('/auth')}
                  tooltip={{ children: "Login / Sign Up", side: "right", align: "center" }}
                  className="justify-start w-full"
                >
                  <LogIn className="h-5 w-5" />
                  <span className="group-data-[collapsible=icon]:hidden">Login / Sign Up</span>
                </SidebarMenuButton>
              )}
            </SidebarFooter>
          </Sidebar>

          <SidebarInset>
            <main className="flex-grow container mx-auto py-2 px-1 md:py-6 md:px-4">
              {activeComponent}
            </main>
          </SidebarInset>
        </div>

        <footer className="bg-secondary text-secondary-foreground p-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Let's Learn Ol Chiki. Learn and explore the Ol Chiki script.</p>
        </footer>
      </div>
    </SidebarProvider>
  );
}

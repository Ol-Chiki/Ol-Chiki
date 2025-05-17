
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
  SidebarFooter, // Added for logout/login button
} from "@/components/ui/sidebar";
import LearnAlphabet from "@/components/ol-chiki/learn-alphabet";
import LearnNumbers from "@/components/ol-chiki/learn-numbers";
import LearnWords from "@/components/ol-chiki/learn-words";
import SentencePractice from "@/components/ol-chiki/sentence-practice";
import CharacterQuiz from "@/components/ol-chiki/character-quiz";
import GameHub from "@/components/ol-chiki/game-hub";
import { Languages, BookOpenText, FileText, Sparkles, Puzzle, PanelLeft, Type, ListOrdered, Gamepad2, LogIn, LogOut, UserCircle, Loader2 } from "lucide-react";
// Removed Toaster from here, it's in RootLayout now
import { Button } from '@/components/ui/button'; // For login/logout button

type ActiveView = 'alphabet' | 'numbers' | 'words' | 'sentence' | 'quiz' | 'game';

interface PageView {
  id: ActiveView;
  label: string;
  icon: React.ElementType;
  component: JSX.Element;
  isSubItem?: boolean;
  requiresAuth?: boolean; // Optional: for future if some views require login
}

export default function OlChikiPathPage() {
  const [activeView, setActiveView] = useState<ActiveView>('alphabet');
  const { user, loading: authLoading, hasSkippedAuth, logOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user && !hasSkippedAuth) {
      router.push('/auth');
    }
  }, [user, authLoading, hasSkippedAuth, router]);

  const pageViews: PageView[] = [
    { id: 'alphabet', label: 'Alphabet', icon: Type, component: <LearnAlphabet />, isSubItem: true },
    { id: 'numbers', label: 'Numbers', icon: ListOrdered, component: <LearnNumbers />, isSubItem: true },
    { id: 'words', label: 'Example Words', icon: FileText, component: <LearnWords /> },
    { id: 'sentence', label: 'Sentence AI', icon: Sparkles, component: <SentencePractice /> },
    { id: 'quiz', label: 'Quiz', icon: Puzzle, component: <CharacterQuiz /> },
    { id: 'game', label: 'Game Zone', icon: Gamepad2, component: <GameHub /> },
  ];

  const activeComponent = pageViews.find(view => view.id === activeView)?.component;

  if (authLoading || (!user && !hasSkippedAuth)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-col bg-background">
        <header className="bg-primary text-primary-foreground p-4 shadow-md flex items-center justify-between sticky top-0 z-50 h-18">
          <div className="flex items-center gap-2 sm:gap-3">
            <SidebarTrigger className="md:hidden mr-1 sm:mr-2">
              <PanelLeft />
            </SidebarTrigger>
            <Languages className="h-6 w-6" />
            <h1 className="text-base sm:text-xl font-bold tracking-tight">Let's Learn Ol Chiki</h1>
          </div>
          {user && (
             <div className="text-xs sm:text-sm hidden sm:block">Logged in as: {user.email}</div>
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
                {/* Optional: Can add a small logo or title here that hides on collapse */}
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

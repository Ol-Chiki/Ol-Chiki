
'use client';

import { useState } from 'react';
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
} from "@/components/ui/sidebar";
import LearnCharacters from "@/components/ol-chiki/learn-characters";
import LearnWords from "@/components/ol-chiki/learn-words";
import SentencePractice from "@/components/ol-chiki/sentence-practice";
import CharacterQuiz from "@/components/ol-chiki/character-quiz";
import { Languages, BookOpenText, FileText, Sparkles, Puzzle, PanelLeft } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

type ActiveView = 'characters' | 'words' | 'sentence' | 'quiz';

export default function OlChikiPathPage() {
  const [activeView, setActiveView] = useState<ActiveView>('characters');

  const menuItems = [
    { id: 'characters', label: 'Characters', icon: BookOpenText, component: <LearnCharacters /> },
    { id: 'words', label: 'Example Words', icon: FileText, component: <LearnWords /> },
    { id: 'sentence', label: 'Sentence AI', icon: Sparkles, component: <SentencePractice /> },
    { id: 'quiz', label: 'Quiz', icon: Puzzle, component: <CharacterQuiz /> },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-col bg-background">
        <header className="bg-primary text-primary-foreground p-4 shadow-md flex items-center justify-between sticky top-0 z-50 h-18">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="md:hidden mr-2">
              <PanelLeft />
            </SidebarTrigger>
            <Languages className="h-8 w-8 sm:h-10 sm:w-10" />
            <h1 className="text-xl sm:text-3xl font-bold tracking-tight">Ol Chiki Path</h1>
          </div>
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
                {menuItems.map((item) => (
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
          </Sidebar>

          <SidebarInset>
            <main className="flex-grow container mx-auto py-2 px-1 md:py-6 md:px-4">
              {menuItems.find(item => item.id === activeView)?.component}
            </main>
          </SidebarInset>
        </div>

        <Toaster />
        <footer className="bg-secondary text-secondary-foreground p-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Ol Chiki Path. Learn and explore the Ol Chiki script.</p>
        </footer>
      </div>
    </SidebarProvider>
  );
}

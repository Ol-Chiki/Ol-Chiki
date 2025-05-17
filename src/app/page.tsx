import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LearnCharacters from "@/components/ol-chiki/learn-characters";
import LearnWords from "@/components/ol-chiki/learn-words";
import SentencePractice from "@/components/ol-chiki/sentence-practice";
import CharacterQuiz from "@/components/ol-chiki/character-quiz";
import { Languages, BookOpenText, FileText, Sparkles, Puzzle } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function OlChikiPathPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto flex items-center gap-3">
          <Languages className="h-10 w-10" />
          <h1 className="text-3xl font-bold tracking-tight">Ol Chiki Path</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-2 px-1 md:py-6 md:px-4">
        <Tabs defaultValue="characters" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-6 h-auto md:h-10">
            <TabsTrigger value="characters" className="py-2 text-xs sm:text-sm">
              <BookOpenText className="mr-1 sm:mr-2 h-4 w-4" /> Characters
            </TabsTrigger>
            <TabsTrigger value="words" className="py-2 text-xs sm:text-sm">
              <FileText className="mr-1 sm:mr-2 h-4 w-4" /> Example Words
            </TabsTrigger>
            <TabsTrigger value="sentence" className="py-2 text-xs sm:text-sm">
              <Sparkles className="mr-1 sm:mr-2 h-4 w-4" /> Sentence AI
            </TabsTrigger>
            <TabsTrigger value="quiz" className="py-2 text-xs sm:text-sm">
              <Puzzle className="mr-1 sm:mr-2 h-4 w-4" /> Quiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="characters">
            <LearnCharacters />
          </TabsContent>
          <TabsContent value="words">
            <LearnWords />
          </TabsContent>
          <TabsContent value="sentence">
            <SentencePractice />
          </TabsContent>
          <TabsContent value="quiz">
            <CharacterQuiz />
          </TabsContent>
        </Tabs>
      </main>
      <Toaster />
      <footer className="bg-secondary text-secondary-foreground p-4 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Ol Chiki Path. Learn and explore the Ol Chiki script.</p>
      </footer>
    </div>
  );
}

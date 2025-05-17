
'use client';

import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Speaker, Image as ImageIcon, Text, BookOpenText, FileQuestion, ArrowRight, Lock } from 'lucide-react'; // Renamed Image to ImageIcon
import type { ActiveView } from '@/app/page'; // Assuming ActiveView is exported or globally available
import { useToast } from '@/hooks/use-toast';

interface ReadingPracticeHubProps {
  // onLevelSelect will be used if these levels navigate to actual quiz components later
  onLevelSelect: (viewId: ActiveView) => void; // This might need adjustment if levels don't change ActiveView directly
}

interface LevelItem {
  id: string; // Unique ID for the level, could map to a future ActiveView for a quiz
  title: string;
  description: string;
  icon: LucideIcon;
  isAvailable: boolean;
}

const readingLevels: LevelItem[] = [
  { 
    id: 'reading-basic-identify', 
    title: 'Basic: Identify Letters & Sounds', 
    description: 'Listen to sounds and identify the corresponding Ol Chiki letters.', 
    icon: Speaker, 
    isAvailable: false 
  },
  { 
    id: 'reading-easy-match-word-image', 
    title: 'Easy: Match Words to Pictures', 
    description: 'Match simple Ol Chiki words with their visual representations.', 
    icon: ImageIcon, 
    isAvailable: false 
  },
  { 
    id: 'reading-intermediate-phrases', 
    title: 'Intermediate: Read Short Phrases', 
    description: 'Practice reading and understanding common Ol Chiki phrases.', 
    icon: Text, 
    isAvailable: false 
  },
  { 
    id: 'reading-hard-story', 
    title: 'Hard: Story Comprehension', 
    description: 'Read short stories in Ol Chiki and answer comprehension questions.', 
    icon: BookOpenText, 
    isAvailable: false 
  },
  { 
    id: 'reading-expert-mcq', 
    title: 'Expert: MCQ Translation Quiz', 
    description: 'Translate English sentences by choosing the correct Ol Chiki option from multiple choices.', 
    icon: FileQuestion, 
    isAvailable: false 
  },
];

export default function ReadingPracticeHub({ onLevelSelect }: ReadingPracticeHubProps) {
  const { toast } = useToast();

  const handleLevelClick = (level: LevelItem) => {
    if (level.isAvailable) {
      // If we had specific quiz views, we'd navigate:
      // onLevelSelect(level.id as ActiveView); 
      // For now, just log or show a different toast for an available level
      toast({ title: level.title, description: "This level is ready to be implemented!" });
    } else {
      toast({ title: "Coming Soon!", description: `The "${level.title}" level is under development.` });
    }
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-8 text-primary tracking-tight text-center">
        Reading Practice Levels
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {readingLevels.map((level) => (
          <Card 
            key={level.id} 
            className={`shadow-lg transition-all duration-300 group bg-card flex flex-col overflow-hidden rounded-xl border-2 
                        ${level.isAvailable ? 'hover:shadow-2xl cursor-pointer hover:border-primary/50' : 'opacity-60 cursor-not-allowed bg-muted/50'}`}
            onClick={() => handleLevelClick(level)}
            aria-disabled={!level.isAvailable}
          >
            <CardHeader className="p-5 bg-primary/5 group-hover:bg-primary/10 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2.5 rounded-full ${level.isAvailable ? 'bg-primary text-primary-foreground' : 'bg-muted-foreground/30 text-muted-foreground'}`}>
                  <level.icon className="h-7 w-7" />
                </div>
                <div>
                  <CardTitle className={`text-xl ${level.isAvailable ? 'text-accent group-hover:text-primary' : 'text-muted-foreground'} transition-colors`}>{level.title}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 flex-grow">
              <CardDescription className={`text-sm ${level.isAvailable ? 'text-foreground/80' : 'text-muted-foreground/80'} mb-3`}>
                {level.description}
              </CardDescription>
            </CardContent>
            <div className="p-5 pt-0 mt-auto">
              {level.isAvailable ? (
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Start Level <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button variant="outline" disabled className="w-full">
                    Coming Soon <Lock className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

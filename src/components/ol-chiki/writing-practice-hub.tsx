
'use client';

import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Feather, Brain, Trophy, Gem, Star, ArrowRight, Lock } from 'lucide-react';
import type { ActiveView } from '@/app/page';

interface WritingPracticeHubProps {
  onLevelSelect: (viewId: ActiveView) => void;
}

interface LevelItem {
  id: ActiveView; // Specific view ID for this level's quiz
  title: string;
  description: string;
  icon: LucideIcon;
  isAvailable: boolean;
}

const levels: LevelItem[] = [
  { id: 'writing-quiz-basic', title: 'Basic Level', description: 'Practice with fundamental characters and simple words.', icon: Zap, isAvailable: true },
  { id: 'writing-quiz-basic', title: 'Easy Level', description: 'Form common words and short phrases.', icon: Feather, isAvailable: false },
  { id: 'writing-quiz-basic', title: 'Intermediate Level', description: 'Construct slightly more complex words and basic sentences.', icon: Brain, isAvailable: false },
  { id: 'writing-quiz-basic', title: 'Medium Level', description: 'Translate and type short sentences with varied vocabulary.', icon: Star, isAvailable: false },
  { id: 'writing-quiz-basic', title: 'Hard Level', description: 'Tackle longer sentences and more nuanced vocabulary.', icon: Trophy, isAvailable: false },
  { id: 'writing-quiz-basic', title: 'Expert Level', description: 'Master complex sentence structures and advanced vocabulary.', icon: Gem, isAvailable: false },
];

export default function WritingPracticeHub({ onLevelSelect }: WritingPracticeHubProps) {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-8 text-primary tracking-tight text-center">
        Writing Practice Levels
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level) => (
          <Card 
            key={level.title} 
            className={`shadow-lg transition-all duration-300 group bg-card flex flex-col overflow-hidden rounded-xl border-2 
                        ${level.isAvailable ? 'hover:shadow-2xl cursor-pointer hover:border-primary/50' : 'opacity-60 cursor-not-allowed bg-muted/50'}`}
            onClick={() => level.isAvailable && onLevelSelect(level.id)}
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

    
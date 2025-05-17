
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ArrowRight, BookOpenCheck } from 'lucide-react';

interface ReadingQuizSelectionHubProps {
  onSelectQuiz: (quizNumber: number) => void;
  onBack: () => void;
}

const TOTAL_QUIZZES = 50;

export default function ReadingQuizSelectionHub({ onSelectQuiz, onBack }: ReadingQuizSelectionHubProps) {
  const quizNumbers = Array.from({ length: TOTAL_QUIZZES }, (_, i) => i + 1);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
          Select a Quiz Set
        </h2>
        <Button variant="outline" onClick={onBack}>
          &larr; Back to Reading Levels
        </Button>
      </div>
      <CardDescription className="mb-6 text-center text-muted-foreground">
        Choose one of the {TOTAL_QUIZZES} quiz sets below. Each set contains 10 questions.
      </CardDescription>
      <ScrollArea className="h-[calc(100vh-300px)] pr-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {quizNumbers.map((num) => (
            <Card
              key={num}
              className="shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer group bg-card hover:border-primary/50 border-2 border-transparent"
              onClick={() => onSelectQuiz(num)}
            >
              <CardHeader className="p-3 text-center items-center group-hover:bg-primary/5 transition-colors">
                <BookOpenCheck className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </CardHeader>
              <CardContent className="p-3 pt-1 text-center">
                <p className="text-sm sm:text-base font-semibold text-accent group-hover:text-primary transition-colors">
                  Quiz Set {num}
                </p>
              </CardContent>
              <div className="p-3 pt-0 text-center text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                Start Quiz <ArrowRight className="inline h-3 w-3" />
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}


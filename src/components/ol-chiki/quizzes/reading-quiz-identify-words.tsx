
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StarRating } from '@/components/ui/star-rating';
import { Loader2, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import type { OlChikiWord } from '@/types/ol-chiki';
import { categorizedOlChikiWords, shuffleArray } from '@/lib/ol-chiki-data';
import { useAuth } from '@/contexts/auth-context';

const QUIZ_LENGTH = 10;
const NUM_OPTIONS = 4;
const READING_QUIZ_SCORES_STORAGE_KEY_PREFIX = 'olChikiReadingQuizScores_';


interface QuizQuestion {
  olChikiWord: OlChikiWord;
  options: string[]; // English word options
  correctEnglish: string;
}

interface ReadingQuizIdentifyWordsProps {
  quizSetNumber: number | null; // To identify which set is being played
  onQuizComplete: () => void; // To navigate back
}

export default function ReadingQuizIdentifyWords({ quizSetNumber, onQuizComplete }: ReadingQuizIdentifyWordsProps) {
  const { user } = useAuth();
  const [allWords, setAllWords] = useState<OlChikiWord[]>([]);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizPhase, setQuizPhase] = useState<'loading' | 'playing' | 'finished'>('loading');

  useEffect(() => {
    const flattenedWords = Object.values(categorizedOlChikiWords).flat();
    if (flattenedWords.length < NUM_OPTIONS) {
      console.error("Not enough unique words available to create the quiz.");
      setAllWords([]);
      setQuizPhase('finished'); 
      return;
    }
    setAllWords(shuffleArray(flattenedWords));
  }, []);

  const generateQuizQuestions = useCallback(() => {
    if (allWords.length === 0) return;
    setQuizPhase('loading');

    const selectedQuizWords = shuffleArray(allWords).slice(0, QUIZ_LENGTH);
    if (selectedQuizWords.length === 0) {
        setQuizPhase('finished'); 
        return;
    }

    const newQuestions: QuizQuestion[] = selectedQuizWords.map(correctWord => {
      const distractors: string[] = [];
      const availableDistractors = allWords.filter(w => w.id !== correctWord.id);
      const shuffledDistractors = shuffleArray(availableDistractors);

      for (let i = 0; i < NUM_OPTIONS - 1 && i < shuffledDistractors.length; i++) {
        distractors.push(shuffledDistractors[i].english);
      }
      while (distractors.length < NUM_OPTIONS -1) {
          // Fallback if not enough unique distractors, less ideal but prevents errors
          const placeholderOption = `Placeholder ${Math.random().toString(36).substring(7)}`;
          if(!distractors.includes(placeholderOption) && correctWord.english !== placeholderOption) {
            distractors.push(placeholderOption);
          } else {
             distractors.push(`Alt ${Math.random().toString(36).substring(7)}`);
          }
      }

      const options = shuffleArray([correctWord.english, ...distractors]);
      return {
        olChikiWord: correctWord,
        options: options,
        correctEnglish: correctWord.english,
      };
    });

    setQuizQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setQuizPhase('playing');
  }, [allWords]);

  useEffect(() => {
    if (allWords.length > 0) {
      generateQuizQuestions();
    }
  }, [allWords, generateQuizQuestions, quizSetNumber]); // Regenerate if quizSetNumber changes

  const handleAnswerSelect = (option: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const currentQuestion = quizQuestions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctEnglish) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizPhase('finished');
      // Save score when quiz is finished
      if (quizSetNumber !== null && quizQuestions.length > 0) {
        const userId = user?.uid || 'anonymous';
        const storageKey = `${READING_QUIZ_SCORES_STORAGE_KEY_PREFIX}${userId}`;
        const finalStars = Math.round((score / quizQuestions.length) * 5);
        
        try {
            const allScores = JSON.parse(localStorage.getItem(storageKey) || '{}');
            allScores[quizSetNumber] = { 
              score: score, 
              totalQuestions: quizQuestions.length,
              stars: finalStars 
            };
            localStorage.setItem(storageKey, JSON.stringify(allScores));
        } catch (error) {
            console.error("Error saving quiz score to localStorage:", error);
        }
      }
    }
  };

  if (quizSetNumber === null) {
    return (
      <div className="p-4 md:p-6 flex flex-col items-center justify-center min-h-[calc(100vh-250px)]">
        <p className="text-destructive">Error: Quiz set number not provided.</p>
        <Button onClick={onQuizComplete} className="mt-4">Back to Quiz Selection</Button>
      </div>
    );
  }
  
  if (quizPhase === 'loading' || (quizPhase === 'playing' && quizQuestions.length === 0 && allWords.length > 0)) {
    return (
      <div className="p-4 md:p-6 flex flex-col items-center justify-center min-h-[calc(100vh-250px)]">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading quiz questions for Set {quizSetNumber}...</p>
      </div>
    );
  }

  if (quizPhase === 'finished') {
    const finalStars = quizQuestions.length > 0 ? Math.round((score / quizQuestions.length) * 5) : 0;
    return (
      <div className="p-4 md:p-6 max-w-md mx-auto text-center">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Quiz Set {quizSetNumber} Complete!</CardTitle>
            <CardDescription>Basic: Identify Words</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl font-semibold">Your Score: {score} / {quizQuestions.length}</p>
            <StarRating rating={finalStars} size={32} className="justify-center" />
            <p className="text-sm text-muted-foreground mt-2">
              Practice makes perfect! Your scores contribute to your overall progress.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3">
            <Button onClick={generateQuizQuestions} variant="outline" className="w-full sm:w-auto">
              <RefreshCw className="mr-2 h-4 w-4" /> Play New Set
            </Button>
            <Button onClick={onQuizComplete} className="w-full sm:w-auto">
              Back to Quiz Selection <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = quizQuestions.length > 0 ? ((currentQuestionIndex + 1) / quizQuestions.length) * 100 : 0;

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight text-center mb-1">
        Quiz Set {quizSetNumber}
      </h2>
      <p className="text-sm text-center text-muted-foreground mb-4">Basic: Identify Words</p>
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-lg text-primary">Question {currentQuestionIndex + 1} of {quizQuestions.length}</CardTitle>
            <CardDescription className="text-sm">Score: {score}</CardDescription>
          </div>
          <Progress value={progress} className="w-full h-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center my-6">
            <p className="text-sm text-muted-foreground mb-2">What is the English meaning of this Ol Chiki word?</p>
            <p className="text-5xl sm:text-6xl font-mono text-accent py-4 bg-secondary/20 rounded-md select-none">
              {currentQuestion.olChikiWord.olChiki}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === option ? "default" : "outline"}
                className={`p-4 h-auto text-base sm:text-lg justify-center transition-all duration-200
                  ${isAnswerSubmitted && option === currentQuestion.correctEnglish ? 'bg-green-500 hover:bg-green-600 text-white border-green-500' : ''}
                  ${isAnswerSubmitted && selectedAnswer === option && option !== currentQuestion.correctEnglish ? 'bg-red-500 hover:bg-red-600 text-white border-red-500' : ''}
                  ${isAnswerSubmitted && option !== currentQuestion.correctEnglish && selectedAnswer !== option ? 'opacity-70' : ''}
                `}
                onClick={() => handleAnswerSelect(option)}
                disabled={isAnswerSubmitted}
              >
                {option}
              </Button>
            ))}
          </div>

          {isAnswerSubmitted && (
            <div className={`mt-4 p-3 rounded-md text-center font-semibold
              ${selectedAnswer === currentQuestion.correctEnglish ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}
            >
              {selectedAnswer === currentQuestion.correctEnglish
                ? <><CheckCircle className="inline mr-2 h-5 w-5" />Correct!</>
                : <><XCircle className="inline mr-2 h-5 w-5" />Incorrect! The correct answer was: {currentQuestion.correctEnglish}</>}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end mt-4">
          {!isAnswerSubmitted ? (
            <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="min-w-[120px]">
              Submit
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="min-w-[120px]">
              {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

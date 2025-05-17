
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { StarRating } from '@/components/ui/star-rating';
import { Loader2, CheckCircle, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import type { OlChikiWord } from '@/types/ol-chiki';
import { categorizedOlChikiWords, shuffleArray } from '@/lib/ol-chiki-data';

const QUIZ_LENGTH = 10;
const NUM_OPTIONS = 4;

interface QuizQuestion {
  olChikiWord: OlChikiWord;
  options: string[]; // English word options
  correctEnglish: string;
}

interface ReadingQuizIdentifyWordsProps {
  onQuizComplete: () => void;
}

export default function ReadingQuizIdentifyWords({ onQuizComplete }: ReadingQuizIdentifyWordsProps) {
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
      // Not enough words to even form one question with distractors
      console.error("Not enough unique words available to create the quiz.");
      setAllWords([]);
      setQuizPhase('finished'); // Or some error state
      return;
    }
    setAllWords(shuffleArray(flattenedWords));
  }, []);

  const generateQuizQuestions = useCallback(() => {
    if (allWords.length === 0) return;
    setQuizPhase('loading');

    const selectedQuizWords = shuffleArray(allWords).slice(0, QUIZ_LENGTH);
    if (selectedQuizWords.length === 0) {
        setQuizPhase('finished'); // Not enough words for a quiz
        return;
    }

    const newQuestions: QuizQuestion[] = selectedQuizWords.map(correctWord => {
      const distractors: string[] = [];
      const availableDistractors = allWords.filter(w => w.id !== correctWord.id);
      const shuffledDistractors = shuffleArray(availableDistractors);

      for (let i = 0; i < NUM_OPTIONS - 1 && i < shuffledDistractors.length; i++) {
        distractors.push(shuffledDistractors[i].english);
      }
      // Ensure we have enough distractors if the word pool is small
      while (distractors.length < NUM_OPTIONS -1) {
          distractors.push(`Placeholder Option ${distractors.length + 1}`); // Fallback
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
  }, [allWords, generateQuizQuestions]);

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
    }
  };

  if (quizPhase === 'loading' || (quizPhase === 'playing' && quizQuestions.length === 0)) {
    return (
      <div className="p-4 md:p-6 flex flex-col items-center justify-center min-h-[calc(100vh-250px)]">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Loading quiz questions...</p>
      </div>
    );
  }

  if (quizPhase === 'finished') {
    const finalStars = quizQuestions.length > 0 ? Math.round((score / quizQuestions.length) * 5) : 0;
    return (
      <div className="p-4 md:p-6 max-w-md mx-auto text-center">
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-primary">Quiz Complete!</CardTitle>
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
              <RefreshCw className="mr-2 h-4 w-4" /> Play Again
            </Button>
            <Button onClick={onQuizComplete} className="w-full sm:w-auto">
              Back to Reading Hub <ArrowRight className="ml-2 h-4 w-4" />
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
      <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight text-center mb-4">
        Basic: Identify Words
      </h2>
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
            <p className="text-sm text-muted-foreground mt-1">({currentQuestion.olChikiWord.transliteration})</p>
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

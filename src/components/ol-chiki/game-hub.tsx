
'use client';

import { useState, useEffect } from 'react';
import type { GameLevel } from '@/types/ol-chiki';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import TranscriptionChallenge from '@/components/ol-chiki/games/transcription-challenge';
import { Type, ListChecks } from 'lucide-react'; // Example icons

const initialGameLevelsData: Omit<GameLevel, 'stars'>[] = [
  {
    id: 'transcribe-chars',
    title: 'Character Transcription',
    description: 'Test your knowledge of Ol Chiki character transliterations.',
    icon: Type,
    isLocked: false,
    questionCount: 5, // Start with a small number for easier testing
    gameComponentIdentifier: 'TranscriptionChallengeChars',
  },
  {
    id: 'transcribe-numbers',
    title: 'Number Transcription',
    description: 'Transcribe Ol Chiki numbers to their English transliterations.',
    icon: ListChecks,
    isLocked: true, // Locked initially
    questionCount: 5,
    gameComponentIdentifier: 'TranscriptionChallengeNumbers',
  },
  // Add more game levels here in the future
];

export default function GameHub() {
  const [levels, setLevels] = useState<GameLevel[]>(() => 
    initialGameLevelsData.map(level => ({...level, stars: 0}))
  );
  const [activeGameLevelId, setActiveGameLevelId] = useState<string | null>(null);

  useEffect(() => {
    // Load stars from localStorage
    const storedLevelsData = localStorage.getItem('olChikiGameLevels');
    if (storedLevelsData) {
      try {
        const storedStarsArray: Array<{ id: string; stars: number }> = JSON.parse(storedLevelsData);
        setLevels(currentLevels =>
          currentLevels.map(level => {
            const storedData = storedStarsArray.find(s => s.id === level.id);
            return storedData ? { ...level, stars: storedData.stars } : level;
          })
        );
      } catch (error) {
        console.error("Failed to parse game levels from localStorage", error);
      }
    }
  }, []);

  const handleGameStart = (levelId: string) => {
    const levelToStart = levels.find(l => l.id === levelId);
    if (levelToStart && !levelToStart.isLocked) {
      setActiveGameLevelId(levelId);
    }
  };

  const handleGameComplete = (levelId: string, earnedStars: number) => {
    let newLevelsState: GameLevel[] = [];
    setLevels(prevLevels => {
      newLevelsState = prevLevels.map(level =>
        level.id === levelId
          ? { ...level, stars: Math.max(level.stars, earnedStars) } // Keep best score
          : level
      );
      // Persist to localStorage
      try {
        const levelsToStore = newLevelsState.map(l => ({ id: l.id, stars: l.stars }));
        localStorage.setItem('olChikiGameLevels', JSON.stringify(levelsToStore));
      } catch (error) {
        console.error("Failed to save game levels to localStorage", error);
      }
      return newLevelsState;
    });
    setActiveGameLevelId(null); // Return to hub
  };

  const handleExitGame = () => {
    setActiveGameLevelId(null);
  };

  const activeGame = levels.find(level => level.id === activeGameLevelId);

  if (activeGame) {
    // For now, only TranscriptionChallenge is implemented.
    // Later, use activeGame.gameComponentIdentifier to select the correct game component.
    if (activeGame.gameComponentIdentifier === 'TranscriptionChallengeChars') {
      return (
        <TranscriptionChallenge
          level={activeGame}
          onGameComplete={(stars) => handleGameComplete(activeGame.id, stars)}
          onExit={handleExitGame}
          challengeType="characters"
        />
      );
    } else if (activeGame.gameComponentIdentifier === 'TranscriptionChallengeNumbers') {
       return (
        <TranscriptionChallenge
          level={activeGame}
          onGameComplete={(stars) => handleGameComplete(activeGame.id, stars)}
          onExit={handleExitGame}
          challengeType="numbers"
        />
      );
    }
    // Fallback if component identifier is unknown
    return (
      <div>
        <p>Error: Game component not found.</p>
        <Button onClick={handleExitGame}>Back to Game Hub</Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">Game Zone</h2>
      <p className="text-muted-foreground mb-8">Select a game to test your Ol Chiki skills!</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map(level => (
          <Card key={level.id} className={`shadow-lg hover:shadow-xl transition-shadow duration-300 ${level.isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`} onClick={() => !level.isLocked && handleGameStart(level.id)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-semibold text-accent">{level.title}</CardTitle>
              <level.icon className="h-8 w-8 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
              <StarRating rating={level.stars} size={24} />
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={level.isLocked}>
                {level.isLocked ? 'Locked' : 'Play Now'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}


'use client';

import React, { useState, useEffect } from 'react'; // Ensured React is imported
import type { GameLevel } from '@/types/ol-chiki';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import TranscriptionChallenge from '@/components/ol-chiki/games/transcription-challenge';
import { Type, ListChecks, Lock, Play, ChevronDown } from 'lucide-react'; 

const initialGameLevelsData: Omit<GameLevel, 'stars'>[] = [
  {
    id: 'transcribe-chars',
    title: 'Character Transcription',
    description: 'Test your knowledge of Ol Chiki character transliterations.',
    icon: Type,
    isLocked: false,
    questionCount: 5, 
    gameComponentIdentifier: 'TranscriptionChallengeChars',
  },
  {
    id: 'transcribe-numbers',
    title: 'Number Transcription',
    description: 'Transcribe Ol Chiki numbers to their English transliterations.',
    icon: ListChecks,
    isLocked: true, 
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
          ? { ...level, stars: Math.max(level.stars, earnedStars) } 
          : level
      );
      try {
        const levelsToStore = newLevelsState.map(l => ({ id: l.id, stars: l.stars }));
        localStorage.setItem('olChikiGameLevels', JSON.stringify(levelsToStore));
      } catch (error) {
        console.error("Failed to save game levels to localStorage", error);
      }
      return newLevelsState;
    });
    setActiveGameLevelId(null); 
  };

  const handleExitGame = () => {
    setActiveGameLevelId(null);
  };

  const activeGame = levels.find(level => level.id === activeGameLevelId);

  if (activeGame) {
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
    return (
      <div>
        <p>Error: Game component not found.</p>
        <Button onClick={handleExitGame}>Back to Game Hub</Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-4 text-primary tracking-tight text-center">Game Zone Path</h2>
      <p className="text-muted-foreground mb-10 text-center">Follow the winding path to test your Ol Chiki skills!</p>
      
      <div className="w-full max-w-lg mx-auto"> {/* Centered container for the path */}
        {levels.map((level, index) => (
          <React.Fragment key={level.id}>
            {/* Level Item Row */}
            <div className={`flex w-full py-2 ${index % 2 === 0 ? 'justify-start' : 'sm:justify-end justify-center'}`}>
              {/* Spacer for right-aligned cards on sm screens and up */}
              {index % 2 !== 0 && <div className="w-1/2 flex-shrink-0 hidden sm:block"></div>}
              
              <Card 
                className={`w-full sm:w-1/2 shadow-lg transition-shadow duration-300 
                            ${level.isLocked ? 'opacity-70 cursor-not-allowed bg-card' : 'hover:shadow-xl cursor-pointer bg-card'}`}
                onClick={() => !level.isLocked && handleGameStart(level.id)}
                aria-disabled={level.isLocked}
                tabIndex={level.isLocked ? -1 : 0}
              >
                <CardHeader className="flex flex-row items-center justify-between p-3.5 space-x-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${level.isLocked ? 'bg-muted' : 'bg-primary/10'}`}>
                       <level.icon className={`h-8 w-8 ${level.isLocked ? 'text-muted-foreground' : 'text-primary'}`} />
                    </div>
                    <div className="min-w-0 flex-grow"> 
                      <CardTitle className="text-md font-semibold text-accent leading-tight truncate">{level.title}</CardTitle>
                      {!level.isLocked && <StarRating rating={level.stars} size={18} className="mt-1"/>}
                      {level.isLocked && <p className="text-xs text-muted-foreground mt-1">Locked</p>}
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    {!level.isLocked && (
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="h-9 w-9 p-0 rounded-full shadow-md" 
                        onClick={(e) => { e.stopPropagation(); !level.isLocked && handleGameStart(level.id); }}
                        aria-label={`Play ${level.title}`}
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                    )}
                    {level.isLocked && (
                      <Lock className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                </CardHeader>
              </Card>
              
              {/* Spacer for left-aligned cards on sm screens and up*/}
              {index % 2 === 0 && <div className="w-1/2 flex-shrink-0 hidden sm:block"></div>}
            </div>

            {/* Connector Section */}
            {index < levels.length - 1 && (
              <div className={`flex h-12 w-full items-center justify-center`}>
                 <ChevronDown className="h-8 w-8 text-primary/40" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

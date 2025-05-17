
'use client';

import type { OlChikiCharacter } from '@/types/ol-chiki';
import { olChikiCharacters } from '@/lib/ol-chiki-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const LONG_PRESS_DURATION = 700; // milliseconds

export default function LearnAlphabet() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [longPressedCharacter, setLongPressedCharacter] = useState<OlChikiCharacter | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteractionStart = (character: OlChikiCharacter) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }

    setActiveCardId(character.id); // Highlight on mousedown

    longPressTimerRef.current = setTimeout(() => {
      setLongPressedCharacter(character);
      setIsDialogOpen(true);
      longPressTimerRef.current = null;
    }, LONG_PRESS_DURATION);
  };

  const handleInteractionEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // Delay clearing to allow for fade-out animations if any
    setTimeout(() => setLongPressedCharacter(null), 300); 
  };


  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-primary tracking-tight">Ol Chiki Alphabet</h2>
      <ScrollArea className="h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] md:h-[calc(100vh-200px)]">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {olChikiCharacters.map((char) => (
            <Card
              key={char.id}
              onMouseDown={() => handleInteractionStart(char)}
              onMouseUp={handleInteractionEnd}
              onMouseLeave={handleInteractionEnd}
              onTouchStart={() => handleInteractionStart(char)}
              onTouchEnd={handleInteractionEnd}
              className={cn(
                "shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex flex-col justify-between cursor-pointer select-none", // Added select-none
                activeCardId === char.id && "ring-2 ring-primary scale-105 shadow-xl"
              )}
            >
              <CardHeader className="p-2 text-center">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-center font-mono text-accent leading-tight">
                  {char.olChiki}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-1 text-center">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-primary">
                  {char.transliteration}
                </p>
                {char.pronunciation && (
                  <CardDescription className="text-xs text-muted-foreground mt-1">
                    {char.pronunciation}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {longPressedCharacter && (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          } else {
            setIsDialogOpen(true); 
          }
        }}>
          <DialogContent className="sm:max-w-sm w-11/12 aspect-[4/5] bg-card text-card-foreground flex flex-col items-stretch justify-start p-0 rounded-lg shadow-2xl overflow-hidden">
            <CardHeader className="p-4 sm:p-6 text-center border-b border-border">
              <CardTitle className="text-7xl sm:text-8xl font-mono text-primary leading-tight">
                {longPressedCharacter.olChiki}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 text-center flex-grow flex flex-col justify-center">
              <p className="text-3xl sm:text-4xl font-semibold text-accent">{longPressedCharacter.transliteration}</p>
              {longPressedCharacter.pronunciation && (
                <CardDescription className="text-xl sm:text-2xl text-muted-foreground mt-2">{longPressedCharacter.pronunciation}</CardDescription>
              )}
            </CardContent>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

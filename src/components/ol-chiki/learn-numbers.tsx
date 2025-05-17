
'use client';

import type { OlChikiNumber } from '@/types/ol-chiki';
import { olChikiNumbers } from '@/lib/ol-chiki-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

const LONG_PRESS_DURATION = 700; // milliseconds

export default function LearnNumbers() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [longPressedNumber, setLongPressedNumber] = useState<OlChikiNumber | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleInteractionStart = (num: OlChikiNumber) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
    setActiveCardId(num.id); // Highlight on mousedown
    longPressTimerRef.current = setTimeout(() => {
      setLongPressedNumber(num);
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
    setTimeout(() => setLongPressedNumber(null), 300);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-primary tracking-tight">Ol Chiki Numbers</h2>
      <ScrollArea className="h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] md:h-[calc(100vh-200px)]">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {olChikiNumbers.map((num) => (
            <Card
              key={num.id}
              onMouseDown={() => handleInteractionStart(num)}
              onMouseUp={handleInteractionEnd}
              onMouseLeave={handleInteractionEnd}
              onTouchStart={() => handleInteractionStart(num)}
              onTouchEnd={handleInteractionEnd}
              className={cn(
                "shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex flex-col justify-between cursor-pointer select-none", // Added select-none
                activeCardId === num.id && "ring-2 ring-primary scale-105 shadow-xl"
              )}
            >
              <CardHeader className="p-2 text-center">
                <CardTitle className="text-lg sm:text-xl md:text-2xl text-center font-mono text-accent leading-tight">
                  {num.olChiki} ({num.digitString})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-1 text-center">
                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-primary">
                  {num.englishWord}
                </p>
                 <CardDescription className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                    {num.santaliWord}
                  </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {longPressedNumber && (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          } else {
            setIsDialogOpen(true);
          }
        }}>
          <DialogContent className="sm:max-w-sm w-11/12 aspect-[4/5] bg-card text-card-foreground flex flex-col items-stretch justify-start p-0 rounded-lg shadow-2xl overflow-hidden">
            <CardHeader className="p-4 sm:p-6 text-center border-b border-border">
              <CardTitle className="text-5xl sm:text-6xl font-mono text-primary leading-tight">
                {longPressedNumber.olChiki} ({longPressedNumber.digitString})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 text-center flex-grow flex flex-col justify-center">
              <p className="text-2xl sm:text-3xl font-semibold text-accent">
                {longPressedNumber.englishWord}
              </p>
              <CardDescription className="text-xl sm:text-2xl text-muted-foreground mt-2">{longPressedNumber.santaliWord}</CardDescription>
            </CardContent>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

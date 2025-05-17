
'use client';

import type { OlChikiCharacter } from '@/types/ol-chiki';
import { olChikiCharacters } from '@/lib/ol-chiki-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function LearnAlphabet() {
  const [selectedCharacter, setSelectedCharacter] = useState<OlChikiCharacter | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardClick = (character: OlChikiCharacter) => {
    setSelectedCharacter(character);
    setIsDialogOpen(true);
    setActiveCardId(character.id);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    // Keep activeCardId for a short duration for visual feedback, then clear
    setTimeout(() => {
      if (!isDialogOpen) { // only clear if dialog hasn't been re-opened quickly
         setActiveCardId(null);
      }
    }, 300);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-primary tracking-tight">Ol Chiki Alphabet</h2>
      <ScrollArea className="h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] md:h-[calc(100vh-200px)]">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {olChikiCharacters.map((char) => (
            <Card
              key={char.id}
              onClick={() => handleCardClick(char)}
              className={cn(
                "shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex flex-col justify-between cursor-pointer",
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

      {selectedCharacter && (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          } else {
            setIsDialogOpen(true); // if opened programmatically or by trigger
          }
        }}>
          <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
            <DialogHeader className="text-center">
              <DialogTitle className="text-6xl font-mono text-primary py-4">
                {selectedCharacter.olChiki}
              </DialogTitle>
              <DialogDescription className="space-y-1 text-center">
                <p className="text-2xl font-semibold text-accent">{selectedCharacter.transliteration}</p>
                {selectedCharacter.pronunciation && (
                  <p className="text-lg text-muted-foreground">{selectedCharacter.pronunciation}</p>
                )}
              </DialogDescription>
            </DialogHeader>
            {/* Additional content for the dialog can go here if needed */}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

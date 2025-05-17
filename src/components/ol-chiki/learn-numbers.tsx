
'use client';

import type { OlChikiNumber } from '@/types/ol-chiki';
import { olChikiNumbers } from '@/lib/ol-chiki-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function LearnNumbers() {
  const [selectedNumber, setSelectedNumber] = useState<OlChikiNumber | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const handleCardClick = (num: OlChikiNumber) => {
    setSelectedNumber(num);
    setIsDialogOpen(true);
    setActiveCardId(num.id);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
     setTimeout(() => {
      if (!isDialogOpen) {
        setActiveCardId(null);
      }
    }, 300);
  };

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-primary tracking-tight">Ol Chiki Numbers</h2>
      <ScrollArea className="h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] md:h-[calc(100vh-200px)]">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {olChikiNumbers.map((num) => (
            <Card
              key={num.id}
              onClick={() => handleCardClick(num)}
              className={cn(
                "shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 flex flex-col justify-between cursor-pointer",
                activeCardId === num.id && "ring-2 ring-primary scale-105 shadow-xl"
              )}
            >
              <CardHeader className="p-2 text-center">
                <CardTitle className="text-lg sm:text-xl md:text-2xl lg:text-2xl text-center font-mono text-accent leading-tight">
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

      {selectedNumber && (
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          if (!open) {
            handleDialogClose();
          } else {
            setIsDialogOpen(true);
          }
        }}>
          <DialogContent className="sm:max-w-[425px] bg-card text-card-foreground">
            <DialogHeader className="text-center">
              <DialogTitle className="text-5xl font-mono text-primary py-3">
                {selectedNumber.olChiki}
              </DialogTitle>
              <DialogDescription className="space-y-1 text-center">
                <p className="text-xl font-semibold text-accent">({selectedNumber.digitString}) {selectedNumber.englishWord}</p>
                <p className="text-lg text-muted-foreground">{selectedNumber.santaliWord}</p>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

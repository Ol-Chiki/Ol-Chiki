
import type { OlChikiNumber } from '@/types/ol-chiki';
import { olChikiNumbers } from '@/lib/ol-chiki-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LearnNumbers() {
  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary tracking-tight">Ol Chiki Numbers</h2>
      <ScrollArea className="h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 md:gap-3 lg:grid-cols-5 lg:gap-4">
          {olChikiNumbers.map((num) => (
            <Card key={num.id} className="shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
              <CardHeader className="p-2 sm:p-3 text-center">
                <CardTitle className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-center font-mono text-accent leading-tight">
                  {num.olChiki}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-1 sm:p-3 sm:pt-1 text-center">
                <p className="text-xs sm:text-sm md:text-base font-semibold text-primary">
                  {num.transliteration}
                </p>
                 <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                    Santali: {num.santaliWord}
                  </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

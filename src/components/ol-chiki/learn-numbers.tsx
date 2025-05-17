
import type { OlChikiNumber } from '@/types/ol-chiki';
import { olChikiNumbers } from '@/lib/ol-chiki-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LearnNumbers() {
  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4 text-primary tracking-tight">Ol Chiki Numbers</h2>
      <ScrollArea className="h-[calc(100vh-160px)] sm:h-[calc(100vh-180px)] md:h-[calc(100vh-200px)]">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {olChikiNumbers.map((num) => (
            <Card key={num.id} className="shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
              <CardHeader className="p-2 text-center">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-3xl text-center font-mono text-accent leading-tight">
                  {num.olChiki}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-1 text-center">
                <p className="text-[10px] sm:text-xs md:text-sm font-semibold text-primary">
                  {num.englishWord} ({num.digitString})
                </p>
                 <CardDescription className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                    {num.santaliWord}
                  </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

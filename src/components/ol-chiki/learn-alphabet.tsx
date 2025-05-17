import type { OlChikiCharacter } from '@/types/ol-chiki';
import { olChikiCharacters } from '@/lib/ol-chiki-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LearnAlphabet() {
  return (
    <div className="p-2 sm:p-4 md:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-primary tracking-tight">Ol Chiki Alphabet</h2>
      <ScrollArea className="h-[calc(100vh-180px)] sm:h-[calc(100vh-200px)]">
        <div className="grid grid-cols-5 gap-3 sm:gap-4">
          {olChikiCharacters.map((char) => (
            <Card key={char.id} className="shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between">
              <CardHeader className="p-2 sm:p-3 text-center">
                <CardTitle className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-center font-mono text-accent leading-tight">
                  {char.olChiki}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2 pt-1 sm:p-3 sm:pt-1 text-center">
                <p className="text-sm sm:text-base md:text-lg font-semibold text-primary">
                  {char.transliteration}
                </p>
                {char.pronunciation && (
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {char.pronunciation}
                  </CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

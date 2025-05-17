import type { OlChikiCharacter } from '@/types/ol-chiki';
import { olChikiCharacters } from '@/lib/ol-chiki-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LearnCharacters() {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">Ol Chiki Characters</h2>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-5 gap-4">
          {olChikiCharacters.map((char) => (
            <Card key={char.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-4">
                <CardTitle className="text-5xl text-center font-mono text-accent">{char.olChiki}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <p className="text-lg font-semibold text-primary">{char.transliteration}</p>
                {char.pronunciation && (
                  <CardDescription className="text-sm text-muted-foreground">{char.pronunciation}</CardDescription>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

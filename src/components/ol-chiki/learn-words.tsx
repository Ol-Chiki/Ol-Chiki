import type { OlChikiWord } from '@/types/ol-chiki';
import { olChikiExampleWords } from '@/lib/ol-chiki-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function LearnWords() {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">Example Words</h2>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {olChikiExampleWords.map((word) => (
            <Card key={word.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-4">
                <CardTitle className="text-3xl text-center font-mono text-accent">{word.olChiki}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 text-center">
                <p className="text-lg font-semibold text-primary">{word.transliteration}</p>
                <CardDescription className="text-md text-foreground">{word.english}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

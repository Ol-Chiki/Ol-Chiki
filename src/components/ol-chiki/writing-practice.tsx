
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { olChikiCharacters } from '@/lib/ol-chiki-data';
import { RefreshCw, ChevronLeft, ChevronRight } from 'lucide-react';

// Sample English sentences for users to translate and type in Ol Chiki
const sampleEnglishSentences = [
  "What is your name?",
  "Learn Ol Chiki Script",
  "This is a house",
  "Wake up in the morning",
  "The dog is barking.",
  "I am reading a book."
];

export default function WritingPractice() {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [typedOlChiki, setTypedOlChiki] = useState('');
  const [englishTransliteration, setEnglishTransliteration] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const olChikiToEngMap = useMemo(() => {
    const map = new Map<string, string>();
    olChikiCharacters.forEach(char => {
      if (!map.has(char.olChiki) || char.transliteration.length < (map.get(char.olChiki)?.length ?? Infinity)) {
        map.set(char.olChiki, char.transliteration);
      }
    });
    return map;
  }, []);

  useEffect(() => {
    let transliterationResult = '';
    for (let i = 0; i < typedOlChiki.length; i++) {
      const char = typedOlChiki[i];
      transliterationResult += (olChikiToEngMap.get(char) || char);
      if (char !== ' ' && i < typedOlChiki.length -1 && typedOlChiki[i+1] !== ' ') {
         transliterationResult += ' ';
      }
    }
    setEnglishTransliteration(transliterationResult.trim().replace(/ +/g, ' '));
  }, [typedOlChiki, olChikiToEngMap]);

  const handleCharacterInput = useCallback((char: string) => {
    setTypedOlChiki(prev => prev + char);
  }, []);

  const handleBackspace = useCallback(() => {
    setTypedOlChiki(prev => prev.slice(0, -1));
  }, []);

  const handleSpace = useCallback(() => {
    setTypedOlChiki(prev => prev + ' ');
  }, []);

  const nextSentence = useCallback(() => {
    setCurrentSentenceIndex(prev => (prev + 1) % sampleEnglishSentences.length);
    setTypedOlChiki(''); 
  }, []);

  const prevSentence = useCallback(() => {
    setCurrentSentenceIndex(prev => (prev - 1 + sampleEnglishSentences.length) % sampleEnglishSentences.length);
    setTypedOlChiki('');
  }, []);
  
  const clearInput = useCallback(() => {
    setTypedOlChiki('');
  }, []);

  const keyboardRows = useMemo(() => [
    olChikiCharacters.slice(0, 10),
    olChikiCharacters.slice(10, 20),
    olChikiCharacters.slice(20, 30),
  ], []);

  return (
    <div className="p-4 md:p-6 max-w-3xl mx-auto flex flex-col space-y-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-primary tracking-tight text-center">
        Ol Chiki Writing Practice
      </h2>

      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg sm:text-xl text-primary">Translate and Type This English Sentence:</CardTitle>
          <div className="flex space-x-2">
            <Button onClick={prevSentence} variant="outline" size="icon" aria-label="Previous sentence">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button onClick={nextSentence} variant="outline" size="icon" aria-label="Next sentence">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg sm:text-xl font-sans text-center p-3 sm:p-4 bg-secondary/20 rounded-md min-h-[3em] select-text">
            {sampleEnglishSentences[currentSentenceIndex]}
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg sm:text-xl text-primary">Your Ol Chiki Typing:</CardTitle>
          <Button onClick={clearInput} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" /> Clear
          </Button>
        </CardHeader>
        <CardContent
          className="text-2xl sm:text-3xl font-mono p-3 sm:p-4 border border-input rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary cursor-text bg-background"
          onClick={() => setIsKeyboardVisible(true)}
          tabIndex={0} 
          aria-label="Ol Chiki typing area, click to show virtual keyboard"
        >
          {typedOlChiki || <span className="text-muted-foreground text-lg">Click here to start typing...</span>}
        </CardContent>
      </Card>

      {isKeyboardVisible && (
        <Card className="mt-2 p-2 sm:p-4 shadow-lg sticky bottom-16 md:bottom-auto bg-card border-2 border-primary/50 z-20">
          <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-center text-md sm:text-lg text-primary">Ol Chiki Virtual Keyboard</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => setIsKeyboardVisible(false)} className="text-muted-foreground hover:text-primary">Hide</Button>
          </div>
          <div className="space-y-1 sm:space-y-2">
            {keyboardRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-1 sm:space-x-1.5">
                {row.map(charData => (
                  <Button
                    key={charData.id}
                    variant="outline"
                    className="p-1.5 sm:p-2 text-base sm:text-lg font-mono flex-1 min-w-[28px] sm:min-w-[36px] h-10 sm:h-12 hover:bg-primary/10 active:bg-primary/20"
                    onClick={() => handleCharacterInput(charData.olChiki)}
                    title={charData.transliteration}
                  >
                    {charData.olChiki}
                  </Button>
                ))}
              </div>
            ))}
            <div className="flex justify-center space-x-1 sm:space-x-2 pt-1 sm:pt-2">
              <Button variant="default" className="flex-grow-[3] p-2 text-sm sm:text-base h-10 sm:h-12" onClick={handleSpace}>Space</Button>
              <Button variant="destructive" className="flex-grow-[2] p-2 text-sm sm:text-base h-10 sm:h-12" onClick={handleBackspace}>Backspace</Button>
            </div>
          </div>
        </Card>
      )}

      {typedOlChiki && (
         <Card className="mt-2 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base sm:text-lg text-accent">Your Input (English Transliteration):</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-md p-3 bg-secondary/10 rounded-md text-center min-h-[2em] select-text">
              {englishTransliteration || <span className="text-muted-foreground">Transliteration will appear here...</span>}
            </p>
          </CardContent>
        </Card>
      )}
       <div className="h-16"></div> {/* Spacer for bottom nav */}
    </div>
  );
}

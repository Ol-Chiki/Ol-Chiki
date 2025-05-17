
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea'; // Using Textarea for more space
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Direct mapping for common English keys to Ol Chiki characters
// This map should be consistent with the one in sentence-practice.tsx if functionality is identical
const directKeyToOlChikiMap: { [key: string]: string } = {
  'a': 'ᱚ', 'A': 'ᱟ',
  't': 'ᱛ', 'T': 'ᱴ',
  'g': 'ᱜ',
  'm': 'ᱢ', 'M': 'ᱝ',
  'l': 'ᱞ',
  'k': 'ᱠ',
  'j': 'ᱡ',
  'w': 'ᱣ', 'W': 'ᱶ',
  'i': 'ᱤ',
  's': 'ᱥ',
  'h': 'ᱦ', 'H': 'ᱷ',
  'n': 'ᱱ',
  'N': 'ᱧ', 
  'r': 'ᱨ', 'R': 'ᱲ', 
  'u': 'ᱩ',
  'c': 'ᱪ',
  'd': 'ᱫ', 'D': 'ᱰ', 
  'y': 'ᱭ',
  'e': 'ᱮ',
  'p': 'ᱯ',
  'b': 'ᱵ',
  'o': 'ᱳ',

  '.': '᱾', 
  ',': 'ᱹ', 
  '?': '?',
  // Add other mappings as needed, e.g., for numbers or combined characters if desired
};

export default function WritingPractice() {
  const [inputText, setInputText] = useState<string>('');
  const [transliteratedScript, setTransliteratedScript] = useState<string>('');

  const doDirectKeyTransliterate = useCallback((currentInput: string): string => {
    let result = '';
    for (let i = 0; i < currentInput.length; i++) {
      const char = currentInput[i];
      result += directKeyToOlChikiMap[char] || char; // If no map, append original char
    }
    return result;
  }, []); 

  useEffect(() => {
    const result = doDirectKeyTransliterate(inputText);
    setTransliteratedScript(result);
  }, [inputText, doDirectKeyTransliterate]);

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-primary tracking-tight text-center">
        Ol Chiki Writing Practice
      </h2>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Practice Your Ol Chiki Typing</CardTitle>
          <CardDescription>
            Use your English keyboard to type Ol Chiki characters. The script will appear in the box below as you type.
            Common punctuation like '.', ',', and '?' are mapped. Other symbols and emojis will appear as typed.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="writing-input" className="text-lg font-medium">Type here (using English keys):</Label>
            <Textarea
              id="writing-input"
              placeholder="e.g., amaag nyutum chet kana? (ᱟᱢᱟᱜ ᱧᱩᱛᱩᱢ ᱪᱮᱫ ᱠᱟᱱᱟ?)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="mt-2 text-lg min-h-[100px] sm:min-h-[150px] focus:ring-primary focus:border-primary"
              rows={5}
            />
          </div>
          
          {inputText && (
            <div className="mt-4">
              <Label className="text-lg font-medium text-accent">Ol Chiki Script Output:</Label>
              <div 
                className="text-2xl sm:text-3xl font-mono p-4 bg-secondary/30 rounded-md mt-2 min-h-[100px] sm:min-h-[150px] break-words whitespace-pre-wrap text-center"
                aria-live="polite"
              >
                {transliteratedScript || <span className="text-muted-foreground">Your Ol Chiki text will appear here...</span>}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
       <p className="text-sm text-muted-foreground mt-6 text-center">
        Tip: Refer to the 'Alphabet' and 'Numbers' sections if you need a reminder of the characters and their English key mappings.
      </p>
    </div>
  );
}

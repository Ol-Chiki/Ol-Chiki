
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel as RHFFormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { generateOlchikiSentence, type GenerateOlchikiSentenceInput } from '@/ai/flows/generate-olchiki-sentence';
import { Loader2, Wand2 } from 'lucide-react';

// Direct mapping for common English keys to Ol Chiki characters
// This map is inspired by typical Santali keyboard layouts.
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
  'N': 'ᱧ', // Shift+n for ᱧ
  'r': 'ᱨ', 'R': 'ᱲ', // Shift+r for ᱲ
  'u': 'ᱩ',
  'c': 'ᱪ',
  'd': 'ᱫ', 'D': 'ᱰ', // Shift+d for ᱰ
  'y': 'ᱭ',
  'e': 'ᱮ',
  'p': 'ᱯ',
  'b': 'ᱵ',
  'o': 'ᱳ',

  '.': '᱾', // MUCAAD (Ol Chiki Full Stop)
  ',': 'ᱹ', // AHAD (Ol Chiki Comma/Separator)
  '?': '<y_bin_358>', // CORRECTED: DOUBLE MUCAAD (Often used as a question mark or emphasis)

  // Digits
  '0': '᱐', '1': '᱑', '2': '᱒', '3': '᱓', '4': '᱔',
  '5': '᱕', '6': '᱖', '7': '᱗', '8': '᱘', '9': '᱙',
};

// Schema for the AI Translator Tool
const aiTranslatorFormSchema = z.object({
  englishSentence: z.string().min(3, { message: 'Sentence must be at least 3 characters.' }).max(300, { message: 'Sentence must be 300 characters or less.' }),
});
type AiTranslateFormData = z.infer<typeof aiTranslatorFormSchema>;


export default function SentencePractice() {
  // ---- Direct Transliteration Tool States & Logic ----
  const [directInputText, setDirectInputText] = useState<string>('');
  const [directTransliteratedScript, setDirectTransliteratedScript] = useState<string>('');

  const doDirectKeyTransliterate = useCallback((currentInput: string): string => {
    let result = '';
    for (let i = 0; i < currentInput.length; i++) {
      const char = currentInput[i];
      result += directKeyToOlChikiMap[char] || char;
    }
    return result;
  }, []); // directKeyToOlChikiMap is constant and defined outside

  useEffect(() => {
    const result = doDirectKeyTransliterate(directInputText);
    setDirectTransliteratedScript(result);
  }, [directInputText, doDirectKeyTransliterate]);


  // ---- AI Translator Tool States & Logic ----
  const { toast } = useToast();
  const [aiOutputScript, setAiOutputScript] = useState<string | null>(null);
  const [isAiTranslating, setIsAiTranslating] = useState(false);
  const [aiTranslationError, setAiTranslationError] = useState<string | null>(null);

  const aiTranslateForm = useForm<AiTranslateFormData>({
    resolver: zodResolver(aiTranslatorFormSchema),
    defaultValues: {
      englishSentence: '',
    },
  });

  const onAiTranslateSubmit: SubmitHandler<AiTranslateFormData> = async (data) => {
    setIsAiTranslating(true);
    setAiOutputScript(null);
    setAiTranslationError(null);
    try {
      const input: GenerateOlchikiSentenceInput = { inputText: data.englishSentence };
      const result = await generateOlchikiSentence(input);
      if (result && result.sentence) {
        setAiOutputScript(result.sentence);
        toast({
          title: "AI Translation Successful!",
          description: "English/Hindi sentence translated to Ol Chiki script.",
        });
      } else {
        throw new Error("AI model did not return the expected output format.");
      }
    } catch (error: any) {
      console.error('Error translating with AI:', error);
      setAiTranslationError(error.message || 'Failed to translate sentence with AI. Check console for details.');
      toast({
        title: "AI Translation Error",
        description: error.message || "Could not translate sentence with AI.",
        variant: "destructive",
      });
    } finally {
      setIsAiTranslating(false);
    }
  };


  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto space-y-8">
      {/* Tool 1: Ol Chiki Direct Typing Tool */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary tracking-tight">Ol Chiki Direct Typing Tool</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>English Keyboard to Ol Chiki Script (Real-time)</CardTitle>
            <CardDescription>
              Type English characters to see their corresponding Ol Chiki script instantly.
              This tool provides a direct character mapping for common keys (e.g., 'a' to ᱚ, Shift+A to ᱟ).
              Punctuation like '.', ',', '?' are mapped to Ol Chiki equivalents. 
              Other symbols (like '!') and emojis will appear as typed. It is not a full language translator.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="direct-input">Enter English Text</Label>
              <Input 
                id="direct-input"
                placeholder="e.g., Ol Chiki Lipi! 👍" 
                value={directInputText}
                onChange={(e) => setDirectInputText(e.target.value)}
                className="text-lg"
              />
            </div>
            {directInputText && (
              <div className="mt-4">
                <Label className="text-accent font-semibold">Ol Chiki Script Output (Direct Mapping):</Label>
                <div className="text-2xl font-mono p-4 bg-secondary/30 rounded-md text-center mt-2 min-h-[3em] break-words">
                  {directTransliteratedScript || <span className="text-muted-foreground">Type above to see Ol Chiki...</span>}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {/* Tool 2: AI-Powered English/Hindi to Santali (Ol Chiki) Translator */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary tracking-tight">AI-Powered English/Hindi to Santali (Ol Chiki) Translator</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Translate English or Hindi Sentence to Santali (Ol Chiki)</CardTitle>
            <CardDescription>
              Enter an English or Hindi sentence below. The AI will attempt to translate it into Santali
              and provide the result in Ol Chiki script. AI translations can sometimes be imperfect.
            </CardDescription>
          </CardHeader>
          <Form {...aiTranslateForm}>
            <form onSubmit={aiTranslateForm.handleSubmit(onAiTranslateSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={aiTranslateForm.control}
                  name="englishSentence"
                  render={({ field }) => (
                    <FormItem>
                      <RHFFormLabel>Enter English or Hindi Sentence</RHFFormLabel>
                      <FormControl>
                        <Input placeholder="e.g., What is your name? / आपका नाम क्या है?" {...field} className="text-lg"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isAiTranslating}>
                  {isAiTranslating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Wand2 className="mr-2 h-4 w-4" />
                  )}
                  Translate with AI
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {isAiTranslating && (
          <div className="mt-6 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Translating with AI...</p>
          </div>
        )}

        {aiTranslationError && !isAiTranslating && (
          <Card className="mt-6 shadow-md border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">AI Translation Error</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive-foreground bg-destructive p-3 rounded-md">{aiTranslationError}</p>
            </CardContent>
          </Card>
        )}

        {aiOutputScript && !isAiTranslating && !aiTranslationError && (
          <Card className="mt-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-accent">AI Translated Ol Chiki Script:</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-mono p-4 bg-secondary/30 rounded-md text-center break-words min-h-[3em]">{aiOutputScript}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

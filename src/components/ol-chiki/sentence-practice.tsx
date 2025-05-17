
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
import { generateOlchikiSentence, type GenerateOlchikiSentenceInput, type GenerateOlchikiSentenceOutput } from '@/ai/flows/generate-olchiki-sentence';
import { Loader2, Wand2, Search } from 'lucide-react';
import { categorizedOlChikiWords, type OlChikiWord } from '@/lib/ol-chiki-data';

// Direct mapping for common English keys to Ol Chiki characters
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
};

// Schema for the AI Translator Tool
const aiTranslatorFormSchema = z.object({
  englishSentence: z.string().min(3, { message: 'Sentence must be at least 3 characters.' }).max(300, { message: 'Sentence must be 300 characters or less.' }),
});
type AiTranslateFormData = z.infer<typeof aiTranslatorFormSchema>;

// Schema for Dictionary Search
const dictionarySearchSchema = z.object({
  searchTerm: z.string().min(1, { message: "Please enter a word to search."}),
});
type DictionarySearchData = z.infer<typeof dictionarySearchSchema>;

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
  }, []);

  useEffect(() => {
    const result = doDirectKeyTransliterate(directInputText);
    setDirectTransliteratedScript(result);
  }, [directInputText, doDirectKeyTransliterate]);


  // ---- AI Translator Tool States & Logic ----
  const { toast } = useToast();
  const [aiOutputScript, setAiOutputScript] = useState<GenerateOlchikiSentenceOutput | null>(null);
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
        setAiOutputScript(result);
        toast({
          title: "AI Translation Successful!",
          description: "English/Hindi sentence translated to Ol Chiki script.",
        });
      } else {
        throw new Error("AI model did not return the expected output format.");
      }
    } catch (error: any) {
      console.error('Error translating with AI:', error);
      const errorMessage = error.message || 'Failed to translate sentence with AI. Check console for details.';
      setAiTranslationError(errorMessage);
      toast({
        title: "AI Translation Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAiTranslating(false);
    }
  };

  // ---- Dictionary Tool States & Logic ----
  const [dictionaryResult, setDictionaryResult] = useState<OlChikiWord | null | 'not_found'>(null);
  const [isDictionarySearching, setIsDictionarySearching] = useState(false); // Optional: for loading state on search

  const dictionaryForm = useForm<DictionarySearchData>({
    resolver: zodResolver(dictionarySearchSchema),
    defaultValues: {
      searchTerm: '',
    },
  });

  const allVocabularyWords = useMemo(() => {
    return Object.values(categorizedOlChikiWords).flat();
  }, []);

  const onDictionarySearchSubmit: SubmitHandler<DictionarySearchData> = async (data) => {
    setIsDictionarySearching(true);
    setDictionaryResult(null);
    const term = data.searchTerm.trim().toLowerCase();

    if (!term) {
      setDictionaryResult(null);
      setIsDictionarySearching(false);
      return;
    }

    const foundWord = allVocabularyWords.find(word =>
      word.olChiki.toLowerCase() === term ||
      word.transliteration.toLowerCase() === term ||
      word.english.toLowerCase() === term // Also allow searching by English word
    );

    if (foundWord) {
      setDictionaryResult(foundWord);
    } else {
      setDictionaryResult('not_found');
    }
    setIsDictionarySearching(false);
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
              This tool provides a direct character mapping for common keys (e.g., 'a' to ᱚ).
              Punctuation like '.', ',', and '?' are mapped to Ol Chiki equivalents.
              Other symbols (like '!' or '?') and emojis will appear as typed. It is not a full language translator.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="direct-input">Enter English Text</Label>
              <Input
                id="direct-input"
                placeholder="e.g., Ol Chiki Lipi ? 👍"
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
        <h2 className="text-2xl font-bold mb-4 text-primary tracking-tight">Santad AI - English/Hindi to Ol Chiki Translator</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Translate English or Hindi Sentence to Santali (Ol Chiki)</CardTitle>
            <CardDescription>
              Enter an English or Hindi sentence below. The AI will attempt to translate it into Santali
              and provide the result in Ol Chiki script, along with an English transliteration. AI translations can sometimes be imperfect.
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
              <CardTitle className="text-accent">AI Translation Result:</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-sm text-muted-foreground">Ol Chiki Script:</Label>
                <p className="text-2xl font-mono p-4 bg-secondary/30 rounded-md text-center break-words min-h-[3em]">{aiOutputScript.sentence}</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">English Transliteration:</Label>
                <p className="text-lg p-3 bg-secondary/20 rounded-md text-center break-words min-h-[2.5em]">{aiOutputScript.englishTransliteration}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator className="my-8" />

      {/* Tool 3: Santali-English Dictionary */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary tracking-tight">Santali-English Dictionary</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Look Up Santali Words</CardTitle>
            <CardDescription>
              Enter a Santali word (in Ol Chiki or Roman script) or an English word to find its translation.
            </CardDescription>
          </CardHeader>
          <Form {...dictionaryForm}>
            <form onSubmit={dictionaryForm.handleSubmit(onDictionarySearchSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={dictionaryForm.control}
                  name="searchTerm"
                  render={({ field }) => (
                    <FormItem>
                      <RHFFormLabel>Enter Word (Ol Chiki, Roman, or English)</RHFFormLabel>
                      <FormControl>
                        <Input placeholder="e.g., ᱫᱟᱠᱟ, daka, or rice" {...field} className="text-lg"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isDictionarySearching}>
                  {isDictionarySearching ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Search className="mr-2 h-4 w-4" />
                  )}
                  Search Dictionary
                </Button>
              </CardFooter>
            </form>
          </Form>

          {dictionaryResult === 'not_found' && !isDictionarySearching && (
            <CardContent className="mt-4">
              <p className="text-center text-muted-foreground p-4 border border-dashed rounded-md">
                Word not found in the dictionary.
              </p>
            </CardContent>
          )}

          {dictionaryResult && dictionaryResult !== 'not_found' && !isDictionarySearching && (
            <Card className="mt-6 shadow-inner bg-secondary/20">
              <CardHeader>
                <CardTitle className="text-accent">Dictionary Result:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label className="text-xs text-muted-foreground">Ol Chiki Script:</Label>
                  <p className="text-2xl font-mono p-2 bg-background/50 rounded-md">{dictionaryResult.olChiki}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Roman Transliteration:</Label>
                  <p className="text-lg p-2 bg-background/50 rounded-md">{dictionaryResult.transliteration}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">English Meaning:</Label>
                  <p className="text-lg p-2 bg-background/50 rounded-md">{dictionaryResult.english}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </Card>
      </div>

    </div>
  );
}

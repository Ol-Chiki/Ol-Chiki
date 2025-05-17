
'use client';

import { useState, useMemo } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { olChikiCharacters } from '@/lib/ol-chiki-data';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { generateOlchikiSentence, type GenerateOlchikiSentenceInput } from '@/ai/flows/generate-olchiki-sentence';
import { Loader2, Wand2 } from 'lucide-react';

const transliteratorFormSchema = z.object({
  inputText: z.string().min(1, { message: 'Input must be at least 1 character.' }).max(200, { message: 'Input must be 200 characters or less.' }),
});

type TransliterateFormData = z.infer<typeof transliteratorFormSchema>;

const aiTranslatorFormSchema = z.object({
  englishSentence: z.string().min(3, { message: 'Sentence must be at least 3 characters.' }).max(300, { message: 'Sentence must be 300 characters or less.' }),
});
type AiTranslateFormData = z.infer<typeof aiTranslatorFormSchema>;


export default function SentencePractice() {
  const [transliteratedScript, setTransliteratedScript] = useState<string | null>(null);
  const { toast } = useToast();

  const transliterateForm = useForm<TransliterateFormData>({
    resolver: zodResolver(transliteratorFormSchema),
    defaultValues: {
      inputText: '',
    },
  });

  const { transliterationMap, sortedTransliterationKeys } = useMemo(() => {
    const map = new Map<string, string>();
    olChikiCharacters.forEach(char => {
      map.set(char.transliteration.trim().toUpperCase(), char.olChiki);
    });
    const sortedKeys = Array.from(map.keys()).sort((a, b) => b.length - a.length);
    return { transliterationMap: map, sortedTransliterationKeys: sortedKeys };
  }, []);

  const doTransliterateToOlChiki = (inputText: string): string => {
    let result = '';
    let i = 0;
    const upperInputText = inputText.toUpperCase();

    while (i < upperInputText.length) {
      let matchedKey = null;
      for (const key of sortedTransliterationKeys) {
        if (upperInputText.substring(i).startsWith(key)) {
          matchedKey = key;
          break;
        }
      }

      if (matchedKey) {
        result += transliterationMap.get(matchedKey)!;
        i += matchedKey.length;
      } else {
        result += inputText[i]; 
        i++;
      }
    }
    return result;
  };

  const onTransliterateSubmit: SubmitHandler<TransliterateFormData> = async (data) => {
    try {
      const result = doTransliterateToOlChiki(data.inputText);
      setTransliteratedScript(result);
      if (result === data.inputText) {
         toast({
          title: "Transliteration Notice",
          description: "No direct Ol Chiki phonetic units found. Input shown as is.",
          variant: "default",
        });
      } else {
        toast({
          title: "Text Transliterated!",
          description: "Input has been mapped to Ol Chiki script characters.",
        });
      }
    } catch (error) {
      console.error('Error transliterating text:', error);
      setTransliteratedScript('Failed to transliterate text. Please try again.');
      toast({
        title: "Error",
        description: "Could not complete transliteration.",
        variant: "destructive",
      });
    }
  };

  // AI Translator States
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
          description: "English sentence translated to Ol Chiki script.",
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
      {/* Tool 1: Ol Chiki Transliteration Tool */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary tracking-tight">Ol Chiki Transliteration Tool</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>English Phonetic Units to Ol Chiki Script</CardTitle>
            <CardDescription>
              Enter English text using standard Ol Chiki phonetic units (e.g., LA, AT, LAA, IS) 
              to see their corresponding Ol Chiki script characters. 
              This tool performs a direct character mapping and is not a full language translator.
              It does not process Hindi.
            </CardDescription>
          </CardHeader>
          <Form {...transliterateForm}>
            <form onSubmit={transliterateForm.handleSubmit(onTransliterateSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={transliterateForm.control}
                  name="inputText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter English Phonetic Units</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., LA AT IH S LAA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Transliterate to Ol Chiki
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {transliteratedScript && (
          <Card className="mt-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-accent">Ol Chiki Script Output (Direct Mapping):</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-mono p-4 bg-secondary/30 rounded-md text-center">{transliteratedScript}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator className="my-8" />

      {/* Tool 2: AI-Powered English to Santali (Ol Chiki) Translator */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary tracking-tight">AI-Powered English to Santali (Ol Chiki) Translator</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Translate English Sentence to Santali (Ol Chiki)</CardTitle>
            <CardDescription>
              Enter an English sentence below. The AI will attempt to translate it into Santali
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
                      <FormLabel>Enter English Sentence</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., What is your name?" {...field} />
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
              <p className="text-2xl font-mono p-4 bg-secondary/30 rounded-md text-center">{aiOutputScript}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

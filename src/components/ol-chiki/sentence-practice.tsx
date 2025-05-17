
'use client';

import { useState, useMemo } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// olChikiCharacters is not used for the direct key mapping tool anymore, but might be useful for other future tools.
// import { olChikiCharacters } from '@/lib/ol-chiki-data';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { generateOlchikiSentence, type GenerateOlchikiSentenceInput } from '@/ai/flows/generate-olchiki-sentence';
import { Loader2, Wand2 } from 'lucide-react';

// Schema for the Direct Key Transliteration Tool
const directTransliterateFormSchema = z.object({
  inputText: z.string().min(1, { message: 'Input must be at least 1 character.' }).max(500, { message: 'Input must be 500 characters or less.' }),
});
type DirectTransliterateFormData = z.infer<typeof directTransliterateFormSchema>;

// Schema for the AI Translator Tool
const aiTranslatorFormSchema = z.object({
  englishSentence: z.string().min(3, { message: 'Sentence must be at least 3 characters.' }).max(300, { message: 'Sentence must be 300 characters or less.' }),
});
type AiTranslateFormData = z.infer<typeof aiTranslatorFormSchema>;

// Direct mapping for common English keys to Ol Chiki characters
// This map is inspired by typical Santali keyboard layouts.
// It's not exhaustive and can be expanded.
const directKeyToOlChikiMap: { [key: string]: string } = {
  'a': 'ᱚ', 'A': 'ᱟ',
  't': 'ᱛ', 'T': 'ᱴ', // T for retroflex ᱴ
  'g': 'ᱜ', // No common shift variant for g usually
  'm': 'ᱢ', 'M': 'ᱝ', // M for Ang/Anusvara
  'l': 'ᱞ',
  'k': 'ᱠ',
  'j': 'ᱡ',
  'w': 'ᱣ', 'W': 'ᱶ', // W for Ov
  'i': 'ᱤ',
  's': 'ᱥ', // No common shift variant for s usually
  'h': 'ᱦ', 'H': 'ᱷ', // H for Oh
  'n': 'ᱱ', // Standard N
  // 'Y': 'ᱧ', // Using Y for INY. Could also be Shift+N on some layouts.
  'N': 'ᱧ', // Using Shift+N for INY as another option
  'r': 'ᱨ', 'R': 'ᱲ', // R for Err (retroflex R)
  'u': 'ᱩ',
  'c': 'ᱪ',
  'd': 'ᱫ', 'D': 'ᱰ', // D for Edd (retroflex D)
  'y': 'ᱭ', // y for UY
  'e': 'ᱮ',
  'p': 'ᱯ',
  'b': 'ᱵ',
  'o': 'ᱳ',

  // Special Characters (approximations or common mappings)
  '.': '᱾', // Punctuation MUCAK (Full stop)
  ',': 'ᱹ', // AHAD (often for modifying vowel sounds, sometimes used like comma)
  '?': '<y_bin_358>', // Punctuation MUCAK TUDAK (Question Mark)

  // Digits (if direct digit to Ol Chiki digit mapping is desired)
  '0': '᱐', '1': '᱑', '2': '᱒', '3': '᱓', '4': '᱔',
  '5': '᱕', '6': '᱖', '7': '᱗', '8': '᱘', '9': '᱙',
};


export default function SentencePractice() {
  const [directTransliteratedScript, setDirectTransliteratedScript] = useState<string | null>(null);
  const { toast } = useToast();

  const directTransliterateForm = useForm<DirectTransliterateFormData>({
    resolver: zodResolver(directTransliterateFormSchema),
    defaultValues: {
      inputText: '',
    },
  });

  // Transliteration function using the directKeyToOlChikiMap
  const doDirectKeyTransliterate = (inputText: string): string => {
    let result = '';
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      result += directKeyToOlChikiMap[char] || char; // If char in map, use Ol Chiki, else original char
    }
    return result;
  };

  const onDirectTransliterateSubmit: SubmitHandler<DirectTransliterateFormData> = async (data) => {
    try {
      const result = doDirectKeyTransliterate(data.inputText);
      setDirectTransliteratedScript(result);
      if (result === data.inputText) {
         toast({
          title: "Transliteration Notice",
          description: "No direct Ol Chiki character mappings found for the input. Input shown as is.",
          variant: "default",
        });
      } else {
        toast({
          title: "Text Transliterated!",
          description: "Input characters have been mapped to Ol Chiki script.",
        });
      }
    } catch (error) {
      console.error('Error transliterating text:', error);
      setDirectTransliteratedScript('Failed to transliterate text. Please try again.');
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
      {/* Tool 1: Ol Chiki Direct Key Transliteration Tool */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary tracking-tight">Ol Chiki Direct Typing Tool</h2>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>English Keyboard to Ol Chiki Script</CardTitle>
            <CardDescription>
              Type English characters to see their corresponding Ol Chiki script.
              This tool provides a direct character mapping, similar to some Santali keyboards.
              It is not a full language translator and does not process Hindi.
              (e.g., 'a' becomes ᱚ, Shift+A ('A') becomes ᱟ, 't' becomes ᱛ).
            </CardDescription>
          </CardHeader>
          <Form {...directTransliterateForm}>
            <form onSubmit={directTransliterateForm.handleSubmit(onDirectTransliterateSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={directTransliterateForm.control}
                  name="inputText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter English Text</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Ol Chiki Lipi" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full">
                  Convert to Ol Chiki
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {directTransliteratedScript && (
          <Card className="mt-6 shadow-md">
            <CardHeader>
              <CardTitle className="text-accent">Ol Chiki Script Output (Direct Mapping):</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-mono p-4 bg-secondary/30 rounded-md text-center">{directTransliteratedScript}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator className="my-8" />

      {/* Tool 2: AI-Powered English to Santali (Ol Chiki) Translator */}
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
                      <FormLabel>Enter English or Hindi Sentence</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., What is your name? / आपका नाम क्या है?" {...field} />
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

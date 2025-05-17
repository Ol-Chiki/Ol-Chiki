
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

const formSchema = z.object({
  inputText: z.string().min(1, { message: 'Input must be at least 1 character.' }).max(200, { message: 'Input must be 200 characters or less.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function SentencePractice() {
  const [outputScript, setOutputScript] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
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

  const transliterateToOlChiki = (inputText: string): string => {
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
        // If no Ol Chiki transliteration unit matches, append the original character from inputText
        result += inputText[i]; 
        i++;
      }
    }
    return result;
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const result = transliterateToOlChiki(data.inputText);
      setOutputScript(result);
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
      setOutputScript('Failed to transliterate text. Please try again.');
      toast({
        title: "Error",
        description: "Could not complete transliteration.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">Ol Chiki Transliteration Tool</h2>
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
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

      {outputScript && (
        <Card className="mt-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-accent">Ol Chiki Script Output:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono p-4 bg-secondary/30 rounded-md text-center">{outputScript}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

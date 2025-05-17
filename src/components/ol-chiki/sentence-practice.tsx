
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateOlchikiSentence, type GenerateOlchikiSentenceInput } from '@/ai/flows/generate-olchiki-sentence';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  inputText: z.string().min(2, { message: 'Sentence must be at least 2 characters.' }).max(200, { message: 'Sentence must be 200 characters or less.' }),
});

type FormData = z.infer<typeof formSchema>;

export default function SentencePractice() {
  const [translatedSentence, setTranslatedSentence] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      inputText: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setTranslatedSentence(null);
    try {
      const input: GenerateOlchikiSentenceInput = { inputText: data.inputText };
      const result = await generateOlchikiSentence(input);
      setTranslatedSentence(result.sentence);
      toast({
        title: "Sentence Translated!",
        description: "The sentence has been translated into Ol Chiki.",
      });
    } catch (error) {
      console.error('Error translating sentence:', error);
      setTranslatedSentence('Failed to translate sentence. Please try again.');
      toast({
        title: "Error",
        description: "Could not translate sentence. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">Ol Chiki Translator</h2>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Translate to Ol Chiki</CardTitle>
          <CardDescription>Enter a sentence in Hindi or English, and we'll translate it into Ol Chiki script for you.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="inputText"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Hindi/English Sentence</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'My name is...', 'मेरा नाम है...'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Translating...
                  </>
                ) : (
                  'Translate to Ol Chiki'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {translatedSentence && (
        <Card className="mt-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-accent">Translated Ol Chiki Sentence:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono p-4 bg-secondary/30 rounded-md text-center">{translatedSentence}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

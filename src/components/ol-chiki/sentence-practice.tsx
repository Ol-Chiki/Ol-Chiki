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
  topic: z.string().min(2, { message: 'Topic must be at least 2 characters.' }).max(50),
});

type FormData = z.infer<typeof formSchema>;

export default function SentencePractice() {
  const [generatedSentence, setGeneratedSentence] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setGeneratedSentence(null);
    try {
      const input: GenerateOlchikiSentenceInput = { topic: data.topic };
      const result = await generateOlchikiSentence(input);
      setGeneratedSentence(result.sentence);
      toast({
        title: "Sentence Generated!",
        description: "A new Ol Chiki sentence has been created.",
      });
    } catch (error) {
      console.error('Error generating sentence:', error);
      setGeneratedSentence('Failed to generate sentence. Please try again.');
      toast({
        title: "Error",
        description: "Could not generate sentence. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">Sentence Practice</h2>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Generate an Ol Chiki Sentence</CardTitle>
          <CardDescription>Enter a topic, and we'll generate a simple sentence in Ol Chiki for you to practice.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'family', 'nature', 'food'" {...field} />
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
                    Generating...
                  </>
                ) : (
                  'Generate Sentence'
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {generatedSentence && (
        <Card className="mt-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-accent">Generated Sentence:</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono p-4 bg-secondary/30 rounded-md text-center">{generatedSentence}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

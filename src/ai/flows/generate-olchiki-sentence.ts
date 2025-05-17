// This file is machine-generated - DO NOT EDIT.

'use server';

/**
 * @fileOverview A flow for generating simple sentences in Ol Chiki based on a user-provided topic.
 *
 * - generateOlchikiSentence - A function that generates sentences in Ol Chiki.
 * - GenerateOlchikiSentenceInput - The input type for the generateOlchikiSentence function.
 * - GenerateOlchikiSentenceOutput - The return type for the generateOlchikiSentence function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOlchikiSentenceInputSchema = z.object({
  topic: z.string().describe('The topic for the Ol Chiki sentence.'),
});

export type GenerateOlchikiSentenceInput = z.infer<typeof GenerateOlchikiSentenceInputSchema>;

const GenerateOlchikiSentenceOutputSchema = z.object({
  sentence: z.string().describe('A simple sentence in Ol Chiki related to the topic.'),
});

export type GenerateOlchikiSentenceOutput = z.infer<typeof GenerateOlchikiSentenceOutputSchema>;

export async function generateOlchikiSentence(input: GenerateOlchikiSentenceInput): Promise<GenerateOlchikiSentenceOutput> {
  return generateOlchikiSentenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateOlchikiSentencePrompt',
  input: {schema: GenerateOlchikiSentenceInputSchema},
  output: {schema: GenerateOlchikiSentenceOutputSchema},
  prompt: `You are an expert in the Ol Chiki language. Generate a simple sentence in Ol Chiki about the following topic: {{{topic}}}`,
});

const generateOlchikiSentenceFlow = ai.defineFlow(
  {
    name: 'generateOlchikiSentenceFlow',
    inputSchema: GenerateOlchikiSentenceInputSchema,
    outputSchema: GenerateOlchikiSentenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

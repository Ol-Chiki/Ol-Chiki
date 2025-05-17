
// This file is machine-generated - DO NOT EDIT.

'use server';

/**
 * @fileOverview A flow for translating English or Hindi sentences into Ol Chiki script.
 *
 * - generateOlchikiSentence - A function that translates sentences into Ol Chiki.
 * - GenerateOlchikiSentenceInput - The input type for the generateOlchikiSentence function.
 * - GenerateOlchikiSentenceOutput - The return type for the generateOlchikiSentence function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateOlchikiSentenceInputSchema = z.object({
  inputText: z.string().describe('The Hindi or English sentence to translate into Ol Chiki script.'),
});

export type GenerateOlchikiSentenceInput = z.infer<typeof GenerateOlchikiSentenceInputSchema>;

const GenerateOlchikiSentenceOutputSchema = z.object({
  sentence: z.string().describe('The translated sentence in Ol Chiki script.'),
});

export type GenerateOlchikiSentenceOutput = z.infer<typeof GenerateOlchikiSentenceOutputSchema>;

export async function generateOlchikiSentence(input: GenerateOlchikiSentenceInput): Promise<GenerateOlchikiSentenceOutput> {
  return generateOlchikiSentenceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'translateToOlchikiPrompt',
  input: {schema: GenerateOlchikiSentenceInputSchema},
  output: {schema: GenerateOlchikiSentenceOutputSchema},
  prompt: `You are an expert linguist specializing in translating Hindi and English sentences into the Ol Chiki script.
Translate the following sentence into Ol Chiki script:
{{{inputText}}}

Your response MUST be a JSON object with a single key "sentence" containing the translated Ol Chiki script. For example:
{
  "sentence": "Translated Ol Chiki script here"
}

Ensure the translation is accurate and grammatically correct in Santali using Ol Chiki.`,
});

const generateOlchikiSentenceFlow = ai.defineFlow(
  {
    name: 'generateOlchikiSentenceFlow',
    inputSchema: GenerateOlchikiSentenceInputSchema,
    outputSchema: GenerateOlchikiSentenceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI model did not return the expected output format.');
    }
    return output;
  }
);


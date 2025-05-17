
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction } from 'lucide-react';

export default function ReadingPracticePlaceholder() {
  return (
    <div className="p-4 md:p-6 flex flex-col items-center justify-center text-center min-h-[calc(100vh-250px)]">
      <Construction className="h-16 w-16 text-primary mb-6" />
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Reading Practice</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">
            This section is under construction.
          </p>
          <p className="text-muted-foreground mt-2">
            Interactive exercises to improve your Ol Chiki reading comprehension will be available here soon!
          </p>
           <img data-ai-hint="reading book" src="https://placehold.co/300x200.png" alt="Reading Practice Coming Soon" className="mt-6 mx-auto rounded-md shadow-md" />
        </CardContent>
      </Card>
    </div>
  );
}

    
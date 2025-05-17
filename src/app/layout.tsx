import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Corrected import
import './globals.css';

const geistSans = Geist({ // Corrected usage
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ // Corrected usage
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ol Chiki Path - Learn Santali Script',
  description: 'Your path to learning the Ol Chiki script for the Santali language. Explore characters, words, sentences, and test your knowledge with interactive quizzes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}

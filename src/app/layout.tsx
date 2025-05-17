
import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';
import { Toaster } from "@/components/ui/toaster"; // Ensure Toaster is here for global toasts

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Let's Learn Ol Chiki - Santali Script Learning",
  description: "Let's Learn Ol Chiki - Your interactive guide to mastering the Ol Chiki script for the Santali language. Explore characters, words, sentences, and test your knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
        suppressHydrationWarning={true} // Add this line
      >
        <AuthProvider>
          {children}
          <Toaster /> {/* Global Toaster for auth messages etc. */}
        </AuthProvider>
      </body>
    </html>
  );
}

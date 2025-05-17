
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, LogIn, LogOut, UserCircle, Languages, TrendingUp, CalendarDays, BarChart3, Star, ClipboardCheck } from 'lucide-react';
import Image from 'next/image';

export default function ProfilePage() {
  const { user, loading, logOut } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    // Logged-out view
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="w-full max-w-md text-center shadow-xl">
          <CardHeader className="p-6 sm:p-8">
            <Languages className="mx-auto h-16 w-16 text-primary mb-4" />
            <CardTitle className="text-3xl font-bold tracking-tight text-primary">Let's Learn Ol Chiki</CardTitle>
            <CardDescription className="mt-2 text-md">
              Your Learning Journey Awaits
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 sm:p-8 sm:pt-0">
            <p className="text-muted-foreground mb-6">
              Log in or sign up to save your progress, view statistics, and track your learning.
            </p>
            <Button onClick={() => router.push('/auth')} className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Login / Sign Up
            </Button>
          </CardContent>
          <CardFooter className="p-4 sm:p-6 text-center border-t">
            <p className="text-xs text-muted-foreground">
              Dashboard features like Ranking, Performance, and Test Results will be available after login.
            </p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Logged-in user view
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4 pt-10 md:p-8">
      <div className="mb-6 flex justify-start">
        <Button variant="outline" onClick={() => router.push('/')}>
          &larr; Back to App
        </Button>
      </div>
      <Card className="mx-auto w-full max-w-2xl shadow-xl mb-8">
        <CardHeader className="text-center">
          {user.photoURL ? (
            <Image 
              src={user.photoURL} 
              alt={user.displayName || 'User Profile Picture'} 
              width={96} 
              height={96} 
              className="mx-auto h-24 w-24 rounded-full border-2 border-primary object-cover shadow-sm" 
            />
          ) : (
            <UserCircle className="mx-auto h-24 w-24 text-primary" />
          )}
          <CardTitle className="mt-4 text-3xl font-bold">
            {user.displayName || 'Your Profile'}
          </CardTitle>
          <CardDescription className="text-md mt-1 text-muted-foreground">
            {user.email}
          </CardDescription>
        </CardHeader>
        <CardFooter className="border-t p-6">
          <Button onClick={logOut} variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-semibold text-center text-primary mb-6">Your Learning Dashboard</h2>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 max-w-2xl mx-auto">
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Day Streak</CardTitle>
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div data-ai-hint="user activity" className="text-2xl font-bold">0 Days</div>
            <p className="text-xs text-muted-foreground">Keep learning daily!</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div data-ai-hint="statistics chart" className="text-2xl font-bold">Coming Soon</div>
            <p className="text-xs text-muted-foreground">Detailed stats are on the way.</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ranking</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div data-ai-hint="leaderboard medal" className="text-2xl font-bold">View Rank</div>
            <p className="text-xs text-muted-foreground">Feature coming soon!</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Test Results</CardTitle>
            <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div data-ai-hint="quiz results" className="text-2xl font-bold">Quiz Scores</div>
            <p className="text-xs text-muted-foreground">Track your results here soon.</p>
          </CardContent>
        </Card>
      </div>
       <div className="text-center mt-8">
         <p className="text-muted-foreground text-sm">More dashboard features coming soon!</p>
      </div>
    </div>
  );
}

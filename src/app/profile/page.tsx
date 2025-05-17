
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, LogIn, LogOut, UserCircle, TrendingUp, CalendarDays } from 'lucide-react';
import Image from 'next/image'; // Import next/image

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
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
        <Card className="w-full max-w-md text-center shadow-xl">
          <CardHeader>
            <UserCircle className="mx-auto h-16 w-16 text-primary" />
            <CardTitle className="mt-4 text-2xl">View Your Profile</CardTitle>
            <CardDescription className="mt-2">
              Please log in or sign up to access your profile, track your progress, and view your learning statistics.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/auth')} className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Login or Sign Up
            </Button>
          </CardContent>
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
      <Card className="mx-auto w-full max-w-2xl shadow-xl">
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
        <CardContent className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          </div>
          
          <div className="text-center">
             <p className="text-muted-foreground text-sm">More profile features coming soon!</p>
          </div>

        </CardContent>
        <CardFooter className="border-t p-6">
          <Button onClick={logOut} variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

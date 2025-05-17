
'use client';

import { useState, type FormEvent } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, LogIn, UserPlus, SkipForward, CalendarIcon, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Simple SVG for Google icon
const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
  </svg>
);


export default function AuthPage() {
  const { signInWithGoogle, signUpWithEmail, signInWithEmail, skipAuth, loading, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [state, setStateName] = useState(''); // Renamed to avoid conflict with React's state

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  if (loading && !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Loading authentication status...</p>
      </div>
    );
  }
  
  if (user) {
    router.push('/'); 
    return null;
  }

  const handleEmailAuth = async (e: FormEvent) => {
    e.preventDefault();
    if (authMode === 'signup') {
      // Pass displayName, dob, city, state to signUpWithEmail
      // For now, dob, city, state are collected but not fully utilized in Firebase Auth profile directly
      await signUpWithEmail(email, password, displayName); 
    } else {
      await signInWithEmail(email, password);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-primary">
            {authMode === 'signup' ? 'Create Account' : 'Welcome Back!'}
          </CardTitle>
          <CardDescription>
            {authMode === 'signup' ? 'Join us to track your Ol Chiki learning journey.' : 'Sign in to continue your progress.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="social">Social</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                {authMode === 'signup' && (
                  <>
                    <div className="space-y-1.5">
                      <Label htmlFor="displayName">Display Name (Optional)</Label>
                      <Input
                        id="displayName"
                        type="text"
                        placeholder="Your Name"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                     <div className="space-y-1.5">
                      <Label htmlFor="dob">Date of Birth (Optional)</Label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="dob"
                          type="text" // Consider using type="date" or a date picker component
                          placeholder="YYYY-MM-DD"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          disabled={loading}
                          className="pl-10"
                        />
                      </div>
                       <p className="text-xs text-muted-foreground">Used for potential username suggestions. Not stored publicly.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="city">City (Optional)</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="city"
                            type="text"
                            placeholder="e.g., Ranchi"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            disabled={loading}
                            className="pl-10"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="state">State (Optional)</Label>
                         <div className="relative">
                           <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="state"
                            type="text"
                            placeholder="e.g., Jharkhand"
                            value={state}
                            onChange={(e) => setStateName(e.target.value)}
                            disabled={loading}
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                     <p className="text-xs text-muted-foreground">Location helps us tailor content (future). Not stored publicly.</p>
                  </>
                )}
                <div className="space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    disabled={loading}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 
                   (authMode === 'signup' ? <UserPlus className="mr-2 h-4 w-4" /> : <LogIn className="mr-2 h-4 w-4" />)
                  }
                  {authMode === 'signup' ? 'Sign Up' : 'Sign In'}
                </Button>
                <Button 
                  variant="link" 
                  type="button" 
                  onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')} 
                  className="w-full text-sm" 
                  disabled={loading}
                >
                  {authMode === 'signup' ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="social">
              <div className="space-y-4">
                <Button onClick={signInWithGoogle} className="w-full" variant="outline" disabled={loading}>
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
                  Sign in with Google
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col items-center pt-6">
           <Button onClick={skipAuth} variant="ghost" className="text-muted-foreground hover:text-primary" disabled={loading}>
            <SkipForward className="mr-2 h-4 w-4" />
            Skip for now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}


'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginAction } from '@/app/actions';
import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

function LoginButton({ onPending }: { onPending?: () => void }) {
  const { pending } = useFormStatus();

  useEffect(() => {
    if (pending && onPending) {
      onPending();
    }
  }, [pending, onPending]);

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </Button>
  );
}

export default function LoginPage() {
  async function loginReducer(_: any, formData: FormData) {
    return await loginAction(formData);
  }

  const [state, formAction] = useActionState(loginReducer, undefined);
  const { toast } = useToast();
  const [showApprovalMsg, setShowApprovalMsg] = useState(false);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: state.error,
      });
    }

    if (state !== undefined) {
      setShowApprovalMsg(false);
    }
  }, [state, toast]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12">
      <Card className="mx-auto max-w-sm w-full shadow-xl border-2 border-primary/20 rounded-2xl backdrop-blur-md bg-white/80 dark:bg-background/80">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-center text-primary drop-shadow-sm">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Enter your email below to login to your account
            <br />
            <span className="text-xs text-muted-foreground">(Use m@example.com and password)</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-semibold">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  defaultValue="m@example.com"
                  className="focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="font-semibold">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline text-primary/80 hover:text-primary"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  required
                  defaultValue="password"
                  className="focus:ring-2 focus:ring-primary/40"
                />
              </div>
              <LoginButton onPending={() => setShowApprovalMsg(true)} />
              <Button variant="outline" className="w-full flex items-center gap-2" type="button">
                <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_17_40)"><path d="M47.532 24.552c0-1.636-.146-3.2-.418-4.704H24.48v9.02h13.02c-.56 3.02-2.24 5.58-4.78 7.3v6.06h7.74c4.54-4.18 7.07-10.34 7.07-17.676z" fill="#4285F4"/><path d="M24.48 48c6.48 0 11.92-2.14 15.89-5.82l-7.74-6.06c-2.14 1.44-4.88 2.3-8.15 2.3-6.26 0-11.56-4.22-13.46-9.9H2.5v6.22C6.46 43.78 14.7 48 24.48 48z" fill="#34A853"/><path d="M11.02 28.52c-.5-1.44-.8-2.98-.8-4.52s.3-3.08.8-4.52v-6.22H2.5A23.98 23.98 0 000 24c0 3.98.96 7.76 2.5 11.22l8.52-6.7z" fill="#FBBC05"/><path d="M24.48 9.54c3.54 0 6.68 1.22 9.16 3.62l6.86-6.86C36.4 2.14 30.96 0 24.48 0 14.7 0 6.46 4.22 2.5 10.78l8.52 6.7c1.9-5.68 7.2-9.9 13.46-9.9z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>
                Login with Google
              </Button>
            </div>
            {showApprovalMsg && (
              <div className="mt-4 text-center text-primary font-semibold animate-pulse">
                Waiting for the admin approval
              </div>
            )}
          </form>
          <div className="mt-6 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline text-primary font-medium hover:text-primary/80">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

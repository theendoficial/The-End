'use client';

import { useFormState, useFormStatus } from 'react-dom';
import Link from 'next/link';
import { Mail, Lock, AlertCircle } from 'lucide-react';

import { login, type LoginState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" aria-disabled={pending}>
      {pending ? 'Signing In...' : 'Sign In'}
    </Button>
  );
}

export function LoginForm() {
  const initialState: LoginState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(login, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              className="pl-10"
              aria-describedby="email-error"
            />
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="text-sm text-destructive mt-1" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="pl-10"
              placeholder="••••••••"
              aria-describedby="password-error"
            />
          </div>
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="text-sm text-destructive mt-1" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>

      {state.errors?.server && (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>
              {state.errors.server[0]}
            </AlertDescription>
        </Alert>
      )}

      <LoginButton />

      <div className="text-center text-sm text-muted-foreground">
        <Link href="/forgot-password" className="underline hover:text-primary">
          Forgot your password?
        </Link>
        <span className="mx-2">·</span>
        <a href="mailto:support@example.com" className="underline hover:text-primary">
          Having trouble?
        </a>
      </div>
    </form>
  );
}

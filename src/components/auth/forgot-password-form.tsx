'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Mail, CheckCircle2 } from 'lucide-react';

import { forgotPassword, type ForgotPasswordState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" aria-disabled={pending}>
      {pending ? 'Sending...' : 'Send Reset Instructions'}
    </Button>
  );
}

export function ForgotPasswordForm() {
  const initialState: ForgotPasswordState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(forgotPassword, initialState);

  if (state.success) {
    return (
        <Alert variant="success">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Instructions Sent!</AlertTitle>
            <AlertDescription>
                {state.message}
            </AlertDescription>
        </Alert>
    );
  }

  return (
    <form action={dispatch} className="space-y-6">
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

      <SubmitButton />
    </form>
  );
}

'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { AlertCircle } from 'lucide-react';

import { verifyCode, type VerifyState } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function VerifyButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" aria-disabled={pending}>
      {pending ? 'Verifying...' : 'Verify Code'}
    </Button>
  );
}

export function VerifyForm() {
  const initialState: VerifyState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(verifyCode, initialState);

  return (
    <form action={dispatch} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="code" className="sr-only">Verification Code</Label>
        <Input
            id="code"
            name="code"
            type="text"
            required
            pattern="\d{6}"
            maxLength={6}
            placeholder="123456"
            className="text-center text-2xl tracking-[1em] font-mono"
            autoComplete="one-time-code"
            aria-describedby="code-error"
        />
         <div id="code-error" aria-live="polite" aria-atomic="true">
            {state.errors?.code &&
              state.errors.code.map((error: string) => (
                <p className="text-sm text-destructive mt-1 text-center" key={error}>
                  {error}
                </p>
              ))}
          </div>
      </div>

      {state.errors?.server && (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>
              {state.errors.server[0]}
            </AlertDescription>
        </Alert>
      )}

      <VerifyButton />
    </form>
  );
}

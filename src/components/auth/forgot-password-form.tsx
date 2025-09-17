
'use client';

import * as React from 'react';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { CheckCircle2, AlertCircle } from 'lucide-react';

import { forgotPassword, type ForgotPasswordState } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="h-[52px] font-sans text-base px-3 border-0 rounded-md cursor-pointer text-black bg-[#f1f1f5] hover:bg-[#161616b6] hover:shadow-[4px_#f1f1f538] hover:text-white transition-colors duration-200 hover:border hover:border-[#f1f1f5] w-full disabled:opacity-50 disabled:cursor-not-allowed">
      {pending ? 'Enviando...' : 'Enviar Instruções'}
    </button>
  );
}

export function ForgotPasswordForm() {
  const initialState: ForgotPasswordState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useActionState(forgotPassword, initialState);
  const formRef = React.useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      // Don't reset the form, so the user can see the email they entered.
    }
  }, [state.success]);


  if (state.success) {
    return (
        <div className="text-center text-white w-full">
            <Alert variant="default" className="bg-green-500/10 border-green-500/30 text-green-300">
                <CheckCircle2 className="h-5 w-5 text-green-400" />
                <AlertTitle className="font-bold text-white">Verifique seu E-mail!</AlertTitle>
                <AlertDescription className="text-gray-300">
                    {state.message}
                </AlertDescription>
            </Alert>
        </div>
    );
  }

  return (
    <form action={dispatch} ref={formRef} className="grid gap-4 w-full mb-5">
      <div className="relative textbox">
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full h-[52px] pt-2.5 bg-white/5 outline-none text-white shadow-none focus:shadow-[0_0_0_2px_#f1f1f5] rounded-md px-3 transition-all duration-300 peer"
          aria-describedby="email-error"
        />
        <label htmlFor="email" className="absolute top-1/2 left-3 -translate-y-1/2 origin-top-left pointer-events-none text-[#f4f1f7] transition-all duration-300 peer-focus:scale-75 peer-focus:-translate-y-[112%] peer-valid:scale-75 peer-valid:-translate-y-[112%]">
          Email
        </label>
      </div>
      <div id="email-error" aria-live="polite" aria-atomic="true">
        {state.errors?.email &&
          state.errors.email.map((error: string) => (
            <p className="text-sm text-red-400 mt-1" key={error}>
              {error}
            </p>
          ))}
      </div>
       {state.errors?.server && (
        <Alert variant="destructive" className="bg-transparent border-red-500/50 text-red-400 [&>svg]:text-red-400">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>
              {state.errors.server[0]}
            </Description>
        </Alert>
      )}

      <SubmitButton />
    </form>
  );
}

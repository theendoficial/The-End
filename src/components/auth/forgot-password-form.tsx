'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { CheckCircle2 } from 'lucide-react';

import { forgotPassword, type ForgotPasswordState } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="h-[52px] font-sans text-base px-3 border-0 rounded-md cursor-pointer text-black bg-[#f1f1f5] hover:bg-[#161616b6] hover:shadow-[4px_#f1f1f538] hover:text-white transition-colors duration-200 hover:border hover:border-[#f1f1f5] w-full disabled:opacity-50 disabled:cursor-not-allowed">
      {pending ? 'Enviando...' : 'Enviar'}
    </button>
  );
}

export function ForgotPasswordForm() {
  const initialState: ForgotPasswordState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(forgotPassword, initialState);

  if (state.success) {
    return (
        <div className="text-center text-white">
            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 text-green-400" />
            <h2 className="text-xl font-bold mb-2">Instruções Enviadas!</h2>
            <p className="text-sm text-gray-300">
                {state.message}
            </p>
        </div>
    );
  }

  return (
    <form action={dispatch} className="grid gap-3 w-full mb-5">
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

      <SubmitButton />
    </form>
  );
}

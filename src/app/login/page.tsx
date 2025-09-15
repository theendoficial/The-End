
'use client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useFormState, useFormStatus } from 'react-dom';
import { login, type LoginState } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { TheEndLogo } from '@/lib/images';

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="h-[52px] font-sans text-base px-3 border-0 rounded-md cursor-pointer text-black bg-[#f1f1f5] hover:bg-[#161616b6] hover:shadow-[4px_#f1f1f538] hover:text-white transition-colors duration-200 hover:border hover:border-[#f1f1f5] disabled:opacity-50 disabled:cursor-not-allowed">
      {pending ? 'Entrando...' : 'Entre'}
    </button>
  );
}

export default function LoginPage() {
  const initialState: LoginState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(login, initialState);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1e1e1f] to-[#000000] text-white font-sans">
      <Link href="/" className="absolute top-5 left-5 bg-white rounded-full p-2 border-2 border-white transition-colors hover:bg-transparent hover:border-white group">
        <ArrowLeft className="text-black group-hover:text-white" />
      </Link>
      
      <div className="relative w-[340px] bg-black/10 backdrop-blur-xl rounded-3xl py-18 px-8 flex flex-col items-center justify-center text-center border-2 border-white/10">
        <div className="absolute w-[100px] h-[50px] -bottom-2.5 -right-2.5 z-[-2] transform -rotate-20 bg-gradient-to-r from-[#0d41e1] via-[#3498db] via-[#2ecc71] via-[#f1c40f] via-[#e67e22] to-[#e74c3c] rounded-[60%] filter blur-[15px] opacity-60"></div>
        <div className="absolute w-[200px] h-[40px] top-2.5 right-[200px] z-[-2] transform -rotate-60 bg-gradient-to-r from-[#0d41e1] via-[#3498db] via-[#2ecc71] via-[#f1c40f] via-[#e67e22] to-[#e74c3c] rounded-full filter blur-[30px] opacity-60"></div>
        
        <Image 
            src={TheEndLogo}
            width={108}
            height={108}
            alt="The End Logo"
            className="mb-10"
        />

        <h2 className="text-lg font-medium m-0 mb-1.5">Seja Bem Vindo!</h2>
        <h3 className="text-[#f4f1f7] text-sm font-medium m-0 mb-10">
          <b>Faça o login</b> para<br/>entrar na sua área.
        </h3>

        <form action={dispatch} className="grid gap-3 w-full mb-5">
          <div className="relative textbox">
            <input 
              id="email"
              name="email"
              required 
              type="email" 
              className="w-full h-[52px] pt-2.5 bg-white/5 outline-none text-white shadow-none focus:shadow-[0_0_0_2px_#f1f1f5] rounded-md px-3 transition-all duration-300 peer"
              aria-describedby="email-error"
            />
            <label htmlFor="email" className="absolute top-1/2 left-3 -translate-y-1/2 origin-top-left pointer-events-none text-[#f4f1f7] transition-all duration-300 peer-focus:scale-75 peer-focus:-translate-y-[112%] peer-valid:scale-75 peer-valid:-translate-y-[112%]">
              Email
            </label>
             {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="text-xs text-red-400 mt-1 text-left" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div className="relative textbox">
            <input 
              id="password"
              name="password"
              required 
              type="password" 
              className="w-full h-[52px] pt-2.5 bg-white/5 outline-none text-white shadow-none focus:shadow-[0_0_0_2px_#f1f1f5] rounded-md px-3 transition-all duration-300 peer"
              aria-describedby="password-error"
            />
            <label htmlFor="password" className="absolute top-1/2 left-3 -translate-y-1/2 origin-top-left pointer-events-none text-[#f4f1f7] transition-all duration-300 peer-focus:scale-75 peer-focus:-translate-y-[112%] peer-valid:scale-75 peer-valid:-translate-y-[112%]">
              Senha
            </label>
            {state.errors?.password &&
                state.errors.password.map((error: string) => (
                    <p className="text-xs text-red-400 mt-1 text-left" key={error}>
                    {error}
                    </p>
                ))}
          </div>

           {state.errors?.server && (
            <Alert variant="destructive" className="bg-transparent border-red-500/50 text-red-400 [&>svg]:text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Falha no Login</AlertTitle>
                <AlertDescription>
                  {state.errors.server[0]}
                </AlertDescription>
            </Alert>
          )}

          <LoginButton />
        </form>

        <Link href="/forgot-password" className="text-sm text-[#f1f1f5]">Esqueceu a senha?</Link>
        <a href="mailto:support@example.com" className="text-sm text-[#f1f1f5] p-4">Houve um problema?</a>
      </div>
       <style jsx>{`
        .font-sans {
          font-family: "Objectivity", sans-serif;
        }
        @media (max-width: 480px) {
          .relative.w-\\[340px\\] {
            width: 90%;
            padding: 60px 40px 40px;
          }
          .w-\\[108px\\] {
            width: 90px;
            height: 90px;
            margin-bottom: 32px;
          }
          h3 {
            margin-bottom: 32px;
          }
          .absolute.top-5.left-5 {
            top: 15px;
            left: 15px;
          }
          .absolute.w-\\[100px\\] {
            width: 80px;
            height: 40px;
          }
          .absolute.w-\\[200px\\] {
            width: 150px;
            height: 30px;
            right: auto;
            left: -20px;
            top: -15px;
            transform: rotate(-45deg);
          }
        }
      `}</style>
    </div>
  );
}

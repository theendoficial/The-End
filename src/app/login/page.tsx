
'use client';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { getFirebaseServices } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TheEndLogo } from '@/lib/images';
import { LoginSchema } from '@/lib/schemas';
import { useAppContext } from '@/contexts/AppContext';

function LoginButton({ pending }: { pending: boolean }) {
  return (
    <button type="submit" disabled={pending} className="h-[52px] font-sans text-base px-3 border-0 rounded-md cursor-pointer text-black bg-[#f1f1f5] hover:bg-[#161616b6] hover:shadow-[4px_#f1f1f538] hover:text-white transition-colors duration-200 hover:border hover:border-[#f1f1f5] disabled:opacity-50 disabled:cursor-not-allowed">
      {pending ? 'Entrando...' : 'Entre'}
    </button>
  );
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading: contextLoading } = useAppContext();

  useEffect(() => {
    // This effect handles redirection AFTER the AppContext has confirmed the user state.
    // It will redirect a logged-in user trying to access the login page.
    if (!contextLoading && user) {
      if (user.email === 'admin@example.com') {
        router.replace('/admin/dashboard');
      } else {
        router.replace('/dashboard');
      }
    }
  }, [user, contextLoading, router]);


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const validatedFields = LoginSchema.safeParse({ email, password });

    if (!validatedFields.success) {
      const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
      setError(firstError || 'Dados de login inválidos.');
      setLoading(false);
      return;
    }

    try {
      const { auth } = getFirebaseServices();
      // The onAuthStateChanged listener in AppContext will pick up the change.
      // The useEffect hook above will then handle the redirection.
      await signInWithEmailAndPassword(auth, email, password);
      // We don't need to setLoading(false) as the page will redirect.
    } catch (authError: any) {
      let friendlyMessage = 'Ocorreu um erro desconhecido. Verifique suas credenciais e tente novamente.';
      switch (authError.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
              friendlyMessage = 'Email ou senha inválidos.';
              break;
          case 'auth/too-many-requests':
              friendlyMessage = 'Acesso bloqueado temporariamente devido a muitas tentativas. Tente novamente mais tarde.';
              break;
          default:
              console.error("Firebase Auth Error:", authError);
              friendlyMessage = 'Ocorreu um erro no servidor. Tente novamente mais tarde.';
              break;
      }
      setError(friendlyMessage);
      setLoading(false);
    }
  };
  
  // While AppContext is loading, or if the user is already logged in and being redirected,
  // show a loading state to prevent the form from flashing.
  if (contextLoading || (!contextLoading && user)) {
      return (
        <div className="flex h-screen w-full items-center justify-center bg-gradient-to-b from-[#1e1e1f] to-[#000000] text-white">
          Verificando autenticação...
        </div>
      );
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1e1e1f] to-[#000000] text-white font-sans">
      <Link href="/" className="absolute top-5 left-5 bg-white rounded-full p-2 border-2 border-white transition-colors hover:bg-transparent hover:border-white group">
        <ArrowLeft className="text-black group-hover:text-white" />
      </Link>
      
      <div className="relative w-[340px] bg-black/10 backdrop-blur-xl rounded-3xl py-18 px-8 flex flex-col items-center justify-center text-center border-2 border-white/10">
        <div className="absolute w-[100px] h-[50px] -bottom-2.5 -right-2.5 z-[-2] transform -rotate-20 bg-gradient-to-r from-[#0d41e1] via-[#3498db] to-[#e74c3c] rounded-[60%] filter blur-[15px] opacity-60"></div>
        <div className="absolute w-[200px] h-[40px] top-2.5 right-[200px] z-[-2] transform -rotate-60 bg-gradient-to-r from-[#0d41e1] via-[#3498db] to-[#e74c3c] rounded-full filter blur-[30px] opacity-60"></div>
        
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

        <form onSubmit={handleLogin} className="grid gap-3 w-full mb-5">
          <div className="relative textbox">
            <input 
              id="email"
              name="email"
              required 
              type="email" 
              className="w-full h-[52px] pt-2.5 bg-white/5 outline-none text-white shadow-none focus:shadow-[0_0_0_2px_#f1f1f5] rounded-md px-3 transition-all duration-300 peer"
            />
            <label htmlFor="email" className="absolute top-1/2 left-3 -translate-y-1/2 origin-top-left pointer-events-none text-[#f4f1f7] transition-all duration-300 peer-focus:scale-75 peer-focus:-translate-y-[112%] peer-valid:scale-75 peer-valid:-translate-y-[112%]">
              Email
            </label>
          </div>
          <div className="relative textbox">
            <input 
              id="password"
              name="password"
              required 
              type="password" 
              className="w-full h-[52px] pt-2.5 bg-white/5 outline-none text-white shadow-none focus:shadow-[0_0_0_2px_#f1f1f5] rounded-md px-3 transition-all duration-300 peer"
            />
            <label htmlFor="password" className="absolute top-1/2 left-3 -translate-y-1/2 origin-top-left pointer-events-none text-[#f4f1f7] transition-all duration-300 peer-focus:scale-75 peer-focus:-translate-y-[112%] peer-valid:scale-75 peer-valid:-translate-y-[112%]">
              Senha
            </label>
          </div>

           {error && (
            <Alert variant="destructive" className="bg-transparent border-red-500/50 text-red-400 [&>svg]:text-red-400">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Falha no Login</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
            </Alert>
          )}

          <LoginButton pending={loading} />
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

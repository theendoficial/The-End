
'use client';
import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TheEndLogo } from '@/lib/images';

export default function ForgotPasswordPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-[#1e1e1f] to-[#000000] text-white font-sans">
      <Link href="/login" className="absolute top-5 left-5 bg-white rounded-full p-2 border-2 border-white transition-colors hover:bg-transparent hover:border-white group">
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

        <h2 className="text-lg font-medium m-0 mb-1.5">Esqueceu sua senha?</h2>
        <h3 className="text-[#f4f1f7] text-sm font-medium m-0 mb-10">
          Não se preocupe, enviaremos instruções<br/>de redefinição para você.
        </h3>
        
        <ForgotPasswordForm />
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

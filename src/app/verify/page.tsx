import { VerifyForm } from '@/components/auth/verify-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ShieldCheck } from 'lucide-react';
import { Suspense } from 'react';

export default function VerifyPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <div className="bg-primary text-primary-foreground rounded-full p-3">
                    <ShieldCheck className="h-8 w-8" />
                </div>
            </div>
          <CardTitle className="text-3xl font-bold">Two-Factor Authentication</CardTitle>
          <CardDescription>Enter the 6-digit code from your authenticator app.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense>
            <VerifyForm />
          </Suspense>
        </CardContent>
      </Card>
    </main>
  );
}

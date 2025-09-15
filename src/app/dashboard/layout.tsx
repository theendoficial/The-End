
'use client';

import Link from 'next/link';
import {
  Bell,
  Calendar,
  CheckSquare,
  FileText,
  Home,
  LineChart,
  Package2,
  Settings,
  FolderKanban,
  Menu,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { TheEndLogo } from '@/lib/images';
import { pendingApprovalsCount } from '@/components/dashboard/dashboard-components';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  // Placeholder for dynamic client data
  const clientData = {
    companyName: 'Nome da Empresa',
    email: 'contato@empresa.com',
    logoUrl: 'https://picsum.photos/seed/clientlogo/40/40'
  };

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Painel de Controle' },
    { href: '/dashboard/projects', icon: FolderKanban, label: 'Meus Projetos' },
    { href: '/dashboard/calendar', icon: Calendar, label: 'Calendário' },
    { href: '/dashboard/approvals', icon: CheckSquare, label: 'Aprovação' },
    { href: '/dashboard/documents', icon: FileText, label: 'Documentos' },
    { href: '/dashboard/reports', icon: LineChart, label: 'Relatórios' },
  ];

  const NavLinks = () => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-4">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            pathname === item.href ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  const WarningsCard = () => (
    <Card className="bg-card/50 dark:bg-white/5 border-border/20 dark:border-white/10 text-card-foreground dark:text-white shadow-md">
      <CardHeader className="p-2 pt-0 md:p-4">
        <CardTitle className="text-base">Avisos</CardTitle>
        <CardDescription className="text-muted-foreground dark:text-gray-300">
          Mensagens importantes do administrador para você.
        </CardDescription>
      </CardHeader>
      <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
         {pendingApprovalsCount > 0 ? (
           <Link href="/dashboard/approvals" className="text-sm text-primary hover:underline">
              Você tem {pendingApprovalsCount} posts para aprovar.
           </Link>
          ) : (
            <p className="text-xs text-muted-foreground dark:text-gray-400">Nenhum aviso no momento.</p>
          )}
      </CardContent>
    </Card>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] relative bg-gradient-to-b from-white to-[#F0F0F0] dark:bg-gradient-to-b dark:from-[#0A0A0A] dark:to-[#000000]">
      <div className="absolute w-[1200px] h-[200px] top-[10px] left-[-500px] z-0 transform -rotate-[130deg] bg-gradient-to-r from-[#0d41e1] via-[#3498db] to-[#e74c3c] rounded-full filter blur-[30px] opacity-60"></div>
      <div className="absolute w-[500px] h-[100px] bottom-[-2px] right-[-40px] z-0 transform -rotate-30 bg-gradient-to-r from-[#0d41e1] via-[#3498db] to-[#e74c3c] rounded-[30%] filter blur-[20px] opacity-60"></div>
      
      <div className="hidden bg-card/10 dark:bg-black/30 backdrop-blur-lg md:block z-10 m-2 rounded-2xl border-white/10 shadow-lg">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-border/10 dark:border-white/10 px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center gap-3">
              <Image 
                  src={clientData.logoUrl}
                  width={40}
                  height={40}
                  alt="Client Logo"
                  className="rounded-full"
                  data-ai-hint="logo"
              />
              <div>
                <p className="font-semibold text-foreground text-sm">{clientData.companyName}</p>
                <p className="text-xs text-muted-foreground">{clientData.email}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 py-4">
            <NavLinks />
          </div>
          <div className="mt-auto p-4">
            <WarningsCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col z-10">
        <header className="flex h-14 items-center gap-4 border-b bg-card/10 dark:bg-black/30 backdrop-blur-lg px-4 lg:h-[60px] lg:px-6 m-2 rounded-2xl border-border/10 dark:border-white/10 shadow-lg">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden bg-transparent border-muted-foreground text-muted-foreground"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col bg-card/80 dark:bg-black/80 backdrop-blur-lg text-foreground dark:text-white border-r-border/20 dark:border-r-white/20">
              <div className="flex h-14 items-center border-b border-border/10 dark:border-white/10 px-4 lg:h-[60px] lg:px-6">
                <div className="flex items-center gap-3">
                  <Image 
                      src={clientData.logoUrl}
                      width={40}
                      height={40}
                      alt="Client Logo"
                      className="rounded-full"
                      data-ai-hint="logo"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{clientData.companyName}</p>
                    <p className="text-xs text-muted-foreground">{clientData.email}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 py-4">
                <NavLinks />
              </div>
               <div className="mt-auto p-4">
                  <WarningsCard />
              </div>
            </SheetContent>
          </Sheet>
           <Link href="/" className="flex items-center gap-2 font-semibold text-foreground">
              <Image 
                  src={TheEndLogo}
                  width={32}
                  height={32}
                  alt="The End Logo"
              />
              <span className="hidden md:inline-block">The End.</span>
            </Link>
          <div className="w-full flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 text-foreground hover:bg-accent/50 dark:hover:bg-white/10 hover:text-primary-foreground dark:hover:text-white">
                  <Bell className="h-4 w-4" />
                  {pendingApprovalsCount > 0 && (
                     <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        {pendingApprovalsCount}
                     </span>
                  )}
                  <span className="sr-only">Toggle notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover dark:bg-black/80 backdrop-blur-lg text-popover-foreground dark:text-white border-border dark:border-white/20">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-muted dark:bg-white/20"/>
              {pendingApprovalsCount > 0 ? (
                <Link href="/dashboard/approvals">
                  <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10 cursor-pointer">
                    Você tem {pendingApprovalsCount} novos posts para aprovar.
                  </DropdownMenuItem>
                </Link>
              ) : (
                <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10">Nenhuma notificação nova.</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full bg-secondary dark:bg-white/10 hover:bg-secondary/80 dark:hover:bg-white/20 border-border/10 dark:border-white/10 border">
                 <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground dark:text-white" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground dark:text-white" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover dark:bg-black/80 backdrop-blur-lg text-popover-foreground dark:text-white border-border dark:border-white/20">
              <DropdownMenuItem onClick={() => setTheme('light')} className="focus:bg-accent dark:focus:bg-white/10">
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="focus:bg-accent dark:focus:bg-white/10">
                Escuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="focus:bg-accent dark:focus:bg-white/10">
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full bg-secondary dark:bg-white/10 hover:bg-secondary/80 dark:hoverbg-white/20 border-border/10 dark:border-white/10 border">
                <Settings className="h-5 w-5 text-foreground dark:text-white" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover dark:bg-black/80 backdrop-blur-lg text-popover-foreground dark:text-white border-border dark:border-white/20">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-muted dark:bg-white/20"/>
              <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10">Configurações</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10">Suporte</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-muted dark:bg-white/20"/>
              <Link href="/login">
                <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10">Sair</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-4 lg:p-4 text-foreground">
          {children}
        </main>
      </div>
    </div>
  );
}

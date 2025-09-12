
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

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const navItems = [
    { href: '/dashboard', icon: Home, label: 'Painel de Controle' },
    { href: '/dashboard/projects', icon: FolderKanban, label: 'Meus Projetos' },
    { href: '/dashboard/calendar', icon: Calendar, label: 'Calendário' },
    { href: '/dashboard/approvals', icon: CheckSquare, label: 'Aprovação' },
    { href: '/dashboard/documents', icon: FileText, label: 'Documentos' },
    { href: '/dashboard/reports', icon: LineChart, label: 'Relatórios' },
  ];

  const NavLinks = () => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
            pathname === item.href ? 'bg-muted text-primary' : ''
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] relative bg-gradient-to-b from-[#101011] to-[#000000]">
      <div className="absolute w-[1500px] h-[200px] top-[10px] left-[-500px] z-0 transform -rotate-[130deg] bg-gradient-to-r from-[#0d41e1] via-[#3498db] via-green-500 via-yellow-500 via-orange-500 to-[#e74c3c] rounded-full filter blur-[30px] opacity-60"></div>
      <div className="absolute w-[500px] h-[100px] bottom-[-2px] right-[-40px] z-0 transform -rotate-30 bg-gradient-to-r from-[#0d41e1] via-[#3498db] via-green-500 via-yellow-500 via-orange-500 to-[#e74c3c] rounded-[30%] filter blur-[20px] opacity-90"></div>
      
      <div className="hidden border-r bg-black/30 backdrop-blur-lg md:block z-10 m-2 rounded-2xl border-white/10">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-white/10 px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-white">
              <Image 
                  src="/assets/images/LOGOTHEEND/TheEnd_Q_COLORS.png"
                  width={32}
                  height={32}
                  alt="The End Logo"
              />
              <span className="">The End.</span>
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8 text-white hover:bg-white/10 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1">
            <NavLinks />
          </div>
          <div className="mt-auto p-4">
            <Card className="bg-white/5 border-white/10 text-white">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle className="text-base">Avisos</CardTitle>
                <CardDescription className="text-gray-300">
                  Mensagens importantes do administrador para você.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                 <p className="text-xs text-gray-400">Nenhum aviso no momento.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <div className="flex flex-col z-10">
        <header className="flex h-14 items-center gap-4 border-b bg-black/30 backdrop-blur-lg px-4 lg:h-[60px] lg:px-6 m-2 rounded-2xl border-white/10">
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
            <SheetContent side="left" className="flex flex-col bg-black/80 backdrop-blur-lg text-white border-r-white/20">
              <NavLinks />
               <div className="mt-auto p-4">
                <Card className="bg-white/5 border-white/10 text-white">
                  <CardHeader className="p-2 pt-0 md:p-4">
                    <CardTitle>Avisos</CardTitle>
                    <CardDescription className="text-gray-300">
                      Mensagens importantes do administrador para você.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                     <p className="text-xs text-gray-400">Nenhum aviso no momento.</p>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 border-white/10 border">
                 <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-white" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-white" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-lg text-white border-white/20">
              <DropdownMenuItem onClick={() => setTheme('light')} className="focus:bg-white/10">
                Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')} className="focus:bg-white/10">
                Escuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')} className="focus:bg-white/10">
                Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full bg-white/10 hover:bg-white/20 border-white/10 border">
                <Settings className="h-5 w-5 text-white" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-lg text-white border-white/20">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/20"/>
              <DropdownMenuItem className="focus:bg-white/10">Configurações</DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-white/10">Suporte</DropdownMenuItem>
              <DropdownMenuSeparator className="bg-white/20"/>
              <Link href="/login">
                <DropdownMenuItem className="focus:bg-white/10">Sair</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}

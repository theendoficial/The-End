
'use client';

import Link from 'next/link';
import {
  Bell,
  Home,
  Users,
  FolderArchive,
  Settings,
  Menu,
  FileUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
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
import * as React from 'react';

const adminData = {
  name: 'Admin',
  email: 'admin@example.com',
};

function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setTheme } = useTheme();

  const navItems = [
    { href: '/admin', icon: Home, label: 'Painel de Controle' },
    { href: '/admin/clients', icon: Users, label: 'Clientes' },
    { href: '/admin/files', icon: FolderArchive, label: 'Gerenciador de Arquivos' },
    { href: '/admin/settings', icon: Settings, label: 'Configurações' },
  ];

  const NavLinks = ({isSheet = false} : {isSheet?: boolean}) => (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-4">
      {navItems.map((item) => {
        const isClientPath = pathname.startsWith('/admin/clients') && item.href === '/admin/clients';
        const isActive = isClientPath || pathname === item.href;

        return(
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary'
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
        )
      })}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] relative bg-gradient-to-b from-white to-[#F0F0F0] dark:bg-gradient-to-b dark:from-[#0A0A0A] dark:to-[#000000]">
      <div className="absolute w-[1200px] h-[200px] top-[10px] left-[-500px] z-0 transform -rotate-[130deg] bg-gradient-to-r from-[#0d41e1] via-[#3498db] to-[#e74c3c] rounded-full filter blur-[30px] opacity-60"></div>
      <div className="absolute w-[500px] h-[100px] bottom-[-2px] right-[-40px] z-0 transform -rotate-30 bg-gradient-to-r from-[#0d41e1] via-[#3498db] to-[#e74c3c] rounded-[30%] filter blur-[20px] opacity-60"></div>
      
      <div className="hidden bg-card/10 dark:bg-black/30 backdrop-blur-lg md:block z-10 m-2 rounded-2xl border-white/10 shadow-lg">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b border-border/10 dark:border-white/10 px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin" className="flex items-center gap-3 font-semibold text-foreground">
                <Image 
                    src={TheEndLogo}
                    width={32}
                    height={32}
                    alt="The End Logo"
                />
                <span className="text-lg">Admin</span>
            </Link>
          </div>
          <div className="flex-1 py-4">
            <NavLinks />
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
                 <Link href="/admin" className="flex items-center gap-3 font-semibold text-foreground">
                    <Image 
                        src={TheEndLogo}
                        width={32}
                        height={32}
                        alt="The End Logo"
                    />
                    <span className="text-lg">Admin</span>
                </Link>
              </div>
              <div className="flex-1 py-4">
                <NavLinks isSheet />
              </div>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <Button size="sm">
                <FileUp className="mr-2 h-4 w-4" />
                Novo Upload
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 text-foreground hover:bg-accent/50 dark:hover:bg-white/10 hover:text-primary-foreground dark:hover:text-white">
                  <Bell className="h-4 w-4" />
                   <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                      5
                   </span>
                  <span className="sr-only">Toggle notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover dark:bg-black/80 backdrop-blur-lg text-popover-foreground dark:text-white border-border dark:border-white/20">
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-muted dark:bg-white/20"/>
                <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10 cursor-pointer">
                    Você tem 5 novos posts para aprovar.
                </DropdownMenuItem>
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
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <span className="font-semibold text-muted-foreground">A</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{adminData.name}</p>
                  <p className="text-xs text-muted-foreground">{adminData.email}</p>
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover dark:bg-black/80 backdrop-blur-lg text-popover-foreground dark:text-white border-border dark:border-white/20">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-muted dark:bg-white/20"/>
              <Link href="/admin/settings">
                <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10 cursor-pointer">Configurações</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-muted dark:bg-white/20"/>
              <Link href="/login">
                <DropdownMenuItem className="focus:bg-accent dark:focus:bg-white/10 cursor-pointer">Sair</DropdownMenuItem>
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

export default AdminLayout;

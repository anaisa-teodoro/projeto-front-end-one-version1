'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import { LayoutComponent } from '@/components/Layout';
import { UserProvider } from './context/UserContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const userId = Cookie.get('id');
    console.log('Authenticated User ID:', userId);

    if (initialLoad) {
      setInitialLoad(false);
      return; // Evita execução adicional durante a carga inicial
    }

    // ⚠️ WARNING: As linhas comentadas abaixo quebram a tela de login, porém são necessárias para limitar acessos pela URL
    // if (!userId && pathname !== '/register') {
    //   router.push('/login');
    // }

    // if(!userId && pathname !== '/login'){
    //   router.push('/login')
    // }
    
  }, [pathname, router, initialLoad]);

  const showSidebar = pathname === '/dashboard' || pathname === '/location' || pathname === '/users';

  if (typeof window !== 'undefined' && window.location.pathname === '/') {
    redirect('/login');
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Natureza 365" />
        <meta name="keywords" content="natureza, react, FuturoDev" />
        <meta name="Anaísa Mayara Teodoro" content="Natureza 365" />
        <title>Natureza</title>
      </head>
      <body className={inter.className}>
        <UserProvider>
          {showSidebar ? (
            <LayoutComponent>
              {children}
            </LayoutComponent>
          ) : (
            <main>
              {children}
            </main>
          )}
        </UserProvider>
      </body>
    </html>
  );
}

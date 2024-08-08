'use client'
import './globals.css';
import { Inter } from 'next/font/google';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutComponent } from '@/components/Layout';
import { useEffect } from 'react';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      router.push('/login');
    }
  }, [pathname, router]);

  const showSidebar = pathname === '/dashboard' || pathname === '/location' || pathname === '/usuarios';

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Natureza 365" />
        <title>Natureza</title>
      </head>
      <body className={inter.className}>
        {showSidebar ? (
          <LayoutComponent>
            {children}
          </LayoutComponent>
        ) : (
          <main>
            {children}
          </main>
        )}
      </body>
    </html>
  );
}
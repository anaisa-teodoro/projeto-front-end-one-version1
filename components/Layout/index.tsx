'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';

export const LayoutComponent = ({ children }: any) => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      <nav className="w-64 bg-black h-full flex flex-col p-4 text-white relative">
        <div className="logo-header mb-8">
        </div>
        <ul className="flex flex-col flex-grow space-y-4">
          <li>
            <Link 
              href="/dashboard" 
              className={`nav-item nav-item-dashboard block py-2 px-4 rounded ${pathname === '/dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/location" 
              className={`nav-item nav-item-locais block py-2 px-4 rounded ${pathname === '/location' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              Locais
            </Link>
          </li>
          <li>
            <Link 
              href="/usuarios" 
              className={`nav-item nav-item-usuarios block py-2 px-4 rounded ${pathname === '/usuarios' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            >
              Usuários
            </Link>
          </li>
        </ul>
        <div className="absolute bottom-4 left-4 right-4">
          <Link 
            href="/login" 
            className="nav-item nav-item-usuarios block py-2 px-4 rounded text-white hover:bg-gray-600"
          >
            Sair
          </Link>
        </div>
      </nav>
      <main className="flex-1 bg-white p-4">
        {children}
      </main>
    </div>
  );
};

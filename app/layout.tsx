'use client';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';
import './background-texture.css';
import FloatingBlocks from '@/components/FloatingBlocks';
import CustomCursor from '@/components/CustomCursor';

const inter = Inter({ subsets: ['latin'] });

// This is a Client Component
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Add global styles using useEffect
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html, body, #__next {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      
      body {
        position: relative;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <Providers>
          <CustomCursor />
          <div className="relative min-h-screen overflow-hidden bg-background">
            <FloatingBlocks />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

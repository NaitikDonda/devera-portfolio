import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/Providers';
import './globals.css';
import './background-texture.css';
import FloatingBlocks from '@/components/FloatingBlocks';
import CustomCursor from '@/components/CustomCursor';
import { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
      </head>
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

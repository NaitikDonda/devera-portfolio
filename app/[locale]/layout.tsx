'use client';

import { Inter } from 'next/font/google';
import '../../globals.css';
import { Providers } from '@/components/Providers';
import FloatingBlocks from '@/components/FloatingBlocks';
import CustomCursor from '@/components/CustomCursor';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-white dark:bg-gray-900 text-gray-900 dark:text-white`}>
        <Providers>
          <FloatingBlocks />
          <CustomCursor />
          {children}
        </Providers>
      </body>
    </html>
  );
}

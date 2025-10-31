'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <div className="flex space-x-2">
      <button 
        onClick={() => changeLanguage('en')} 
        className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        EN
      </button>
      <button 
        onClick={() => changeLanguage('hi')} 
        className="px-3 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        हिंदी
      </button>
    </div>
  );
}

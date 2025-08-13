
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useShop } from '@/context/shop-context';

export function WelcomeScreen() {
  const [show, setShow] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const { setIsLoading } = useShop();

  useEffect(() => {
    // We want this to run on every page load now.
    setIsLoading(true);
    setShouldRender(true);
    
    const showTimer = setTimeout(() => {
      setShow(true);
    }, 100);

    const hideTimer = setTimeout(() => {
      setShow(false);
    }, 3000);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
      setIsLoading(false);
    }, 4000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
      // Ensure loading is reset if component unmounts early
      setIsLoading(false); 
    };
  }, [setIsLoading]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-gradient-to-br from-primary via-primary to-accent transition-opacity duration-1000 ease-in-out',
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="flex flex-col items-center gap-4 text-white animate-fade-in-up">
        <Image
          src="/main logo.png"
          alt="Revea Logo"
          width={96}
          height={96}
          className="rounded-md mb-2 filter invert brightness-0"
          priority
        />
        <div className="flex flex-col text-center">
          <h1 className="font-headline text-5xl font-bold">Welcome to</h1>
          <h2 className="font-headline text-6xl font-bold">revea</h2>
        </div>
      </div>
      <p className="mt-4 text-lg text-primary-foreground/80 animate-fade-in-up animation-delay-300">
        Every Revea purchase is small act of change
      </p>
    </div>
  );
}

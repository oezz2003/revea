
'use client';

import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';
import { ShopProvider, useShop } from '@/context/shop-context';
import { WelcomeScreen } from '@/components/welcome-screen';

function AppContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useShop();

  return (
    <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
      <div className="relative flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </div>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ShopProvider>
      <WelcomeScreen />
      <AppContent>{children}</AppContent>
    </ShopProvider>
  )
}

import Link from "next/link";
import { Instagram, Facebook, Send, ArrowRight } from 'lucide-react';
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground border-t">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 py-12 md:px-6">
        <Link href="/" className="flex items-center gap-2 mb-2">
          <Image
            src="/main logo.png"
            alt="Revea Logo"
            width={48}
            height={48}
            className="rounded-md"
            priority
          />
          <span className="font-headline text-3xl font-bold text-primary">revea</span>
        </Link>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Discover the Revea Signature Bag – the only bag you'll ever need. Premium quality, timeless design, and crafted for every occasion.
        </p>
        <div className="flex gap-4 mt-2">
          <Link href="#" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary"/></Link>
          <Link href="#" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary"/></Link>
          <Link href="#" aria-label="Telegram"><Send className="h-5 w-5 text-muted-foreground hover:text-primary"/></Link>
        </div>
        <div className="flex gap-6 mt-4">
          <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About</Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact</Link>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-4 md:px-6">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} revea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

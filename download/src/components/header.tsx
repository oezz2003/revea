
'use client';
import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, Minus, Plus, LogIn, Home, Store, Info, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import Image from 'next/image';
import { getSession } from '@/lib/session';
import { logoutAction, searchAction } from '@/app/actions';
import { useEffect, useState } from 'react';
import { useShop } from '@/context/shop-context';
import { allProducts } from '@/lib/products';
import { ProductCard } from './product-card';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const searchCategories = [
  { name: 'Product', href: '/product' },
];

const trendingProducts = allProducts.slice(0, 4);

export function Header() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();
  const [session, setSession] = useState<any>(null);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };
    fetchSession();
  }, []);

  const isLoggedIn = !!session;

  const mainNavLinks = [
    { href: '/', label: 'Home', icon: <Home className="h-4 w-4" /> },
    { href: '/product', label: 'Product', icon: <Store className="h-4 w-4" /> },
    { href: '/about', label: 'About', icon: <Info className="h-4 w-4" /> },
    { href: '/contact', label: 'Contact', icon: <Phone className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-2">
       <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border rounded-xl shadow-lg mt-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/main logo.png"
            alt="Revea Logo"
            width={56}
            height={56}
            className="rounded-md"
            priority
          />
          <span className="font-headline text-2xl font-bold text-primary">revea</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {mainNavLinks.map((link) => (
            <Button key={link.href} asChild variant={pathname === link.href ? "secondary" : "ghost"}>
              <Link href={link.href} className="flex items-center gap-2">
                {link.icon}
                {link.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Search />
                <span className="sr-only">Search</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="p-0 sm:max-w-2xl max-h-[90vh] flex flex-col">
              <DialogHeader className="p-4 border-b">
                 <DialogTitle className="sr-only">Search Products</DialogTitle>
                 <form action={(formData) => {
                    searchAction(formData);
                    setSearchDialogOpen(false);
                 }}>
                    <div className="flex items-center space-x-2">
                      <Search className="h-6 w-6 text-muted-foreground" />
                      <Input
                        id="search"
                        name="query"
                        type="search"
                        placeholder="Search for jackets, trousers..."
                        className="flex-1 border-none shadow-none focus-visible:ring-0 text-lg"
                        autoFocus
                      />
                    </div>
                  </form>
              </DialogHeader>
              <div className="p-6 overflow-y-auto">
                <div className="mb-8">
                  <h3 className="font-headline text-lg font-semibold mb-4 text-primary">Top Categories</h3>
                  <div className="flex flex-wrap gap-3">
                    {searchCategories.map(category => (
                        <Button key={category.name} variant="outline" asChild onClick={() => setSearchDialogOpen(false)}>
                            <Link href={category.href}>{category.name}</Link>
                        </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold mb-4 text-primary">Trending Products</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {trendingProducts.map(product => (
                        <div key={product.id} onClick={() => setSearchDialogOpen(false)}>
                          <ProductCard product={product}/>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart />
                {cart.length > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 h-4 w-4 justify-center rounded-full p-0 text-xs">{cart.reduce((acc, item) => acc + item.quantity, 0)}</Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pl-0 sm:max-w-lg">
              <SheetHeader className="px-6">
                <SheetTitle>Shopping Cart</SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto">
                {cart.length > 0 ? (
                  <div className="divide-y divide-border">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 px-6 py-4">
                        <Image src={item.image} alt={item.name} data-ai-hint={item.hint || ''} width={80} height={80} className="rounded-md object-cover" loading="lazy" />
                        <div className="flex-1">
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus className="h-3 w-3" /></Button>
                            <span>{item.quantity}</span>
                            <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-3 w-3" /></Button>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <ShoppingCart className="w-16 h-16 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Your cart is empty</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Add items to your cart to get started.</p>
                  </div>
                )}
              </div>
              <SheetFooter className="p-6 pt-4 mt-auto border-t">
                  <div className="w-full space-y-4">
                      <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <Button className="w-full" size="lg" disabled={cart.length === 0}>Checkout</Button>
                  </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                  <User />
                  <span className="sr-only">User Profile</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Orders</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <form action={logoutAction} className="w-full">
                    <button type="submit" className="w-full text-left">
                      Logout
                    </button>
                  </form>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="ghost" className="hidden md:flex items-center gap-2">
              <Link href="/login">
                Login
                <LogIn className="h-4 w-4" />
              </Link>
            </Button>
          )}

          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-6">
                <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold px-2" onClick={() => setMobileMenuOpen(false)}>
                  <span className="font-headline text-2xl font-bold text-primary">revea</span>
                </Link>
                <div className="flex items-center justify-around mt-4">
                    {isLoggedIn ? (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="flex items-center gap-2"><User/>My Account</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>My Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>Profile</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>Orders</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setMobileMenuOpen(false)}>Settings</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <form action={logoutAction} className="w-full">
                              <button type="submit" className="w-full text-left" onClick={() => setMobileMenuOpen(false)}>
                                Logout
                              </button>
                            </form>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <Button asChild variant="ghost" onClick={() => setMobileMenuOpen(false)}>
                        <Link href="/login" className="flex items-center gap-2">
                          <LogIn />
                          Login
                        </Link>
                      </Button>
                    )}
                </div>
                <Separator className="my-2" />
                <nav className="grid gap-2">
                  {mainNavLinks.map((link) => (
                    <Button key={link.href} asChild variant={pathname === link.href ? "secondary" : "ghost"} className="justify-start" onClick={() => setMobileMenuOpen(false)}>
                       <Link href={link.href} className="flex items-center gap-2">
                         {link.icon}
                         {link.label}
                       </Link>
                    </Button>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

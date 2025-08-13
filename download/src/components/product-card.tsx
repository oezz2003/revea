
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { useShop } from '@/context/shop-context';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import type { Product } from '@/context/shop-context';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { QuickView } from './quick-view';

type ProductCardProps = {
  product: Product;
  layout?: 'vertical' | 'horizontal';
};

export function ProductCard({ product, layout = 'vertical' }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} is now in your shopping cart.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product);
    toast({
      title: isInWishlist(product.id) ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been updated in your wishlist.`,
    });
  };

  if (layout === 'horizontal') {
    return (
      <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 w-full flex">
        <CardContent className="p-0 flex w-full">
          <div className="relative w-1/3">
            <Link href={`/product?id=${product.id}`} className="block aspect-w-1 aspect-h-1 w-full h-full overflow-hidden rounded-l-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={product.hint}
                loading="lazy"
              />
            </Link>
          </div>
          <div className="p-4 flex flex-col justify-center w-2/3">
            <h3 className="font-headline text-base font-semibold text-primary truncate">
              <Link href={`/product?id=${product.id}`}>{product.name}</Link>
            </h3>
            <p className="mt-1 text-lg font-medium text-muted-foreground">${product.price.toFixed(2)}</p>
             <div className="mt-2">
                <Button variant="secondary" size="sm" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog>
      <Card className="group overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 w-full border-0">
        <CardContent className="p-0">
          <div className="relative">
            <Link href={`/product?id=${product.id}`} className="block aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={product.hint}
                loading="lazy"
              />
            </Link>
            {product.badge && (
              <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">{product.badge}</Badge>
            )}
            <Button
              variant="secondary"
              size="icon"
              className={cn(
                "absolute top-3 right-3 bg-white/80 hover:bg-white text-muted-foreground hover:text-primary backdrop-blur-sm rounded-full h-9 w-9 transition-all",
                isInWishlist(product.id) ? "text-red-500" : ""
              )}
              onClick={handleToggleWishlist}
              aria-label="Toggle Wishlist"
            >
              <Heart className={cn("h-5 w-5", isInWishlist(product.id) ? "fill-current" : "")} />
            </Button>

            <div className="product-card-buttons">
               <Button variant="secondary" onClick={handleAddToCart} className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <DialogTrigger asChild>
                <Button variant="secondary" size="icon" aria-label="Quick view">
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
            </div>

          </div>
          <div className="p-4 text-left">
            <h3 className="font-headline text-base font-semibold text-primary truncate">
              <Link href={`/product?id=${product.id}`}>{product.name}</Link>
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{product.category}</p>
            <p className="mt-1 text-lg font-medium text-muted-foreground">${product.price.toFixed(2)}</p>
          </div>
        </CardContent>
      </Card>
      <DialogContent className="max-w-4xl p-0 h-[90vh] md:h-auto flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>Quick View: {product.name}</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto">
          <QuickView product={product} />
        </div>
      </DialogContent>
    </Dialog>
  );
}


'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { ProductImageGallery } from '@/components/product-image-gallery';
import { useShop } from '@/context/shop-context';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { QuantitySelector } from '@/components/quantity-selector';
import type { Product } from '@/context/shop-context';
import Link from 'next/link';

const productImages = [
  { src: 'https://placehold.co/600x600.png', alt: 'Product image 1', hint: 'product front' },
  { src: 'https://placehold.co/600x600.png', alt: 'Product image 2', hint: 'product back' },
  { src: 'https://placehold.co/600x600.png', alt: 'Product image 3', hint: 'product side' },
  { src: 'https://placehold.co/600x600.png', alt: 'Product image 4', hint: 'product detail' },
];

interface QuickViewProps {
    product: Product;
}

export function QuickView({ product }: QuickViewProps) {
  const { addToCart } = useShop();
  const { toast } = useToast();
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} is now in your shopping cart.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-8">
        <div>
            <ProductImageGallery images={productImages.map(img => ({...img, src: product.image, hint: product.hint}))} />
        </div>
        <div className="space-y-6 flex flex-col">
            <div className="space-y-4">
            <p className="text-sm text-muted-foreground">{product.category}</p>
            <h1 className="font-headline text-3xl md:text-4xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
                <p className="text-xl text-muted-foreground line-through">${(product.price * 1.2).toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span>12 in stock</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">Brighten up your summer style with this beautiful top. It features a bright, summery print on a vibrant background, ensuring that you stand out from the crowd. Make a statement with the perfect combination of style and colour.</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-medium text-muted-foreground">Size</label>
                <Select defaultValue="small">
                <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <div>
                <label className="text-sm font-medium text-muted-foreground">Material</label>
                <Select defaultValue="cotton">
                <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="cotton">95% Cotton 5% Pol</SelectItem>
                    <SelectItem value="polyester">100% Polyester</SelectItem>
                </SelectContent>
                </Select>
            </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            <Button size="lg" className="flex-1 w-full" onClick={handleAddToCart}>Add to Cart</Button>
            </div>
            <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href={`/product?id=${product.id}`}>View Full Details</Link>
            </Button>
        </div>
    </div>
  );
}

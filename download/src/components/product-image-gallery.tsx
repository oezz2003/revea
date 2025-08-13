
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type ImageInfo = {
  src: string;
  alt: string;
  hint: string;
};

type ProductImageGalleryProps = {
  images: ImageInfo[];
};

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0] || null);

  if (!selectedImage) {
    return (
        <div className="aspect-square w-full bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">No Image</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[80px_1fr] gap-4 md:gap-6">
      <div className="flex md:flex-col gap-2 md:gap-4 order-2 md:order-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                'relative aspect-square w-full overflow-hidden rounded-md transition-all ring-offset-background focus-visible:ring-2 focus-visible:ring-ring',
                selectedImage.src === image.src ? 'ring-2 ring-primary' : 'hover:opacity-80'
              )}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                data-ai-hint={image.hint}
                sizes="25vw"
                loading="lazy"
              />
              <span className="sr-only">View image {index + 1}</span>
            </button>
          ))}
      </div>
      <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg order-1 md:order-2">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          fill
          className="object-cover transition-opacity duration-300"
          data-ai-hint={selectedImage.hint}
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}

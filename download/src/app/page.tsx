
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, Instagram, Mail, Send, Gem, ShieldCheck, Leaf } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import React from 'react';
import Ribbons from '@/components/ribbons';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const testimonials = [
  {
    name: 'Aisha K.',
    avatar: 'https://images.pexels.com/photos/4612083/pexels-photo-4612083.png',
    rating: 5,
    quote: "The quality is exceptional, and the prices are so reasonable. I've already ordered twice!",
  },
  {
    name: 'Mohammed A.',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    rating: 5,
    quote: "Finding stylish and quality products has never been easier. revea is my new favorite store.",
  },
  {
    name: 'Fatima Z.',
    avatar: 'https://images.pexels.com/photos/3760859/pexels-photo-3760859.png',
    rating: 4,
    quote: "I bought one for Eid, and it was perfect. Fast shipping and great customer service. Will shop again.",
  },
   {
    name: 'Omar H.',
    avatar: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg',
    rating: 5,
    quote: "Impressive design and user-friendly website. I found exactly what I was looking for.",
  },
];

const instagramPosts = [
  { image: 'https://images.unsplash.com/photo-1511556820780-d912e42b4980', width: 400, height: 400 },
  { image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e', width: 400, height: 400 },
  { image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b', width: 400, height: 400 },
  { image: 'https://images.pexels.com/photos/3756943/pexels-photo-3756943.jpeg', width: 400, height: 400 },
  { image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d', width: 400, height: 400 },
  { image: 'https://images.unsplash.com/photo-1581338834647-b0fb40704e21', width: 400, height: 400 },
];


export default function HomePage() {
  const section2Ref = useScrollAnimation<HTMLDivElement>();
  const section3Ref = useScrollAnimation<HTMLDivElement>({ delay: 0.2 });
  const section4Ref = useScrollAnimation<HTMLDivElement>({ delay: 0.2 });
  const section5Ref = useScrollAnimation<HTMLDivElement>({ delay: 0.2 });
  const section6Ref = useScrollAnimation<HTMLDivElement>({ delay: 0.2 });

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative bg-background overflow-hidden">
         <div className="absolute inset-0 h-full w-full opacity-50">
          <Ribbons
            baseThickness={30}
            colors={['#c98f6e', '#e6e2df']}
            speedMultiplier={0.5}
            maxAge={500}
            enableFade={false}
            enableShaderEffect={true}
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 min-h-[85vh] grid lg:grid-cols-2 items-center gap-8 relative z-10">
            <div className="text-center lg:text-left">
                <h1 className="font-headline text-5xl md:text-7xl font-bold text-primary">The Only Product You'll Ever Need</h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                    Discover the revolutionary product that will change your life. Unmatched quality, timeless design, and endless possibilities.
                </p>
                 <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                    <Link href="/product">Explore The Product <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
      <div className="relative h-[50vh] lg:h-[70vh] w-full">
        <Image
          src="/hero pic.png"
          alt="The main product showcase"
          fill
          className="object-contain"
          priority
        />
      </div>
        </div>
      </section>
      
      {/* 2. Split Feature Section */}
      <section ref={section2Ref} className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">THE ONE AND ONLY</p>
              <h2 className="font-headline text-4xl font-bold text-primary">Timeless Design, Modern Craft</h2>
              <p className="mt-4 text-muted-foreground max-w-md">
                Every detail is meticulously crafted to offer unparalleled quality and style. Experience a product that not only meets your needs but exceeds your expectations.
              </p>
              <Button size="lg" variant="outline" className="mt-6" asChild>
                <Link href="/product">Shop Now</Link>
              </Button>
            </div>
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/sec 2 pic.png"
                alt="Product lifestyle shot"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Card Features Section */}
      <section ref={section3Ref} className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">The revea Difference</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground mb-12">We've poured our hearts into creating a product that stands for quality, durability, and timeless style.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Versatility</h3>
              <p className="text-muted-foreground mt-2">Designed to fit every aspect of your life, from professional settings to casual outings.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Durability</h3>
              <p className="text-muted-foreground mt-2">Crafted with the finest materials to ensure it withstands the test of time.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/10 rounded-full p-4 mb-4">
                <Gem className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold">Elegance</h3>
              <p className="text-muted-foreground mt-2">A timeless aesthetic that exudes sophistication and modern charm.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section ref={section4Ref} className="bg-card py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center text-primary mb-12">What Our Customers Say</h2>
          <Carousel
            opts={{ align: 'start', loop: true }}
            plugins={[Autoplay({ delay: 6000, stopOnInteraction: true })]}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.name} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <Card className="h-full flex flex-col justify-center p-6 text-center shadow-md bg-background">
                      <Avatar className="h-20 w-20 mx-auto mb-4">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} loading="lazy" />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex justify-center mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        ))}
                        {[...Array(5 - testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-gray-300" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic flex-1">&quot;{testimonial.quote}&quot;</p>
                      <h4 className="font-headline font-semibold mt-4">{testimonial.name}</h4>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
            <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 hidden lg:flex" />
          </Carousel>
        </div>
      </section>
      
      {/* Instagram Feed */}
      <section ref={section5Ref} className="bg-background">
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
          <a href="#" className="text-primary hover:underline">
            <h2 className="font-headline text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
              <Instagram className="h-8 w-8" /> Follow us on Instagram
            </h2>
          </a>
          <p className="text-muted-foreground mt-2 mb-8">@revea</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
            {instagramPosts.map((post, index) => (
              <Link href="#" key={index} className="group block overflow-hidden rounded-lg">
                <Image
                  src={post.image}
                  alt={`Instagram post ${index + 1}`}
                  width={post.width}
                  height={post.height}
                  className="object-cover w-full h-full aspect-square transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
          <p className="mt-8 text-muted-foreground">Tag us for a chance to be featured!</p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section ref={section6Ref} className="bg-primary/10 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="font-headline text-3xl font-bold text-primary">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground mt-2 mb-6 max-w-xl mx-auto">Get exclusive offers, updates, and style tips delivered directly to your inbox.</p>
          <form className="flex max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow rounded-r-none focus:z-10 text-base"
              aria-label="Email Address"
            />
            <Button type="submit" className="rounded-l-none bg-accent text-accent-foreground hover:bg-accent/90">
              <span className="hidden sm:inline">Join Now</span>
              <Send className="sm:hidden" />
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

    

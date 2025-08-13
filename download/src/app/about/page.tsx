import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Lightbulb, Target, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            About revea
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            We're not just a store; we are a community passionate about style, quality, and innovation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-96 w-full">
            <Image
              src="https://placehold.co/600x400.png"
              alt="Diverse group of people smiling"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg shadow-lg"
              data-ai-hint="diverse people shopping"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="font-headline text-3xl font-bold">Our Story</h2>
            <p className="mt-4 text-muted-foreground">
              Founded in 2024, revea was born from a simple yet powerful idea: to make online shopping a truly seamless and enjoyable experience. We saw a world of cluttered online marketplaces and felt a calling to create a curated space where quality meets affordability.
            </p>
            <p className="mt-4 text-muted-foreground">
              Starting as a small, passionate team, we've grown into a trusted destination for fashion lovers and tech enthusiasts alike. Our journey is one of constant evolution, driven by our commitment to our customers and our love for what we do.
            </p>
          </div>
        </div>

        <div className="text-center mb-24">
            <h2 className="font-headline text-3xl font-bold">Our Core Values</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">The principles that guide every decision we make.</p>
            <div className="mt-10 grid md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center">
                    <div className="bg-primary/10 rounded-full p-4 mb-4">
                        <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-headline text-xl font-semibold">Customer First</h3>
                    <p className="text-muted-foreground mt-2">Our customers are at the heart of everything. We strive to exceed expectations with every interaction.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-primary/10 rounded-full p-4 mb-4">
                        <Lightbulb className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-headline text-xl font-semibold">Innovate & Inspire</h3>
                    <p className="text-muted-foreground mt-2">We embrace technology and creativity to continuously improve and inspire our community.</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="bg-primary/10 rounded-full p-4 mb-4">
                        <Target className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-headline text-xl font-semibold">Quality with Integrity</h3>
                    <p className="text-muted-foreground mt-2">We are committed to offering high-quality products and operating our business with honesty and transparency.</p>
                </div>
            </div>
        </div>

        <div>
          <h2 className="font-headline text-3xl font-bold text-center">Meet Our Team</h2>
          <p className="text-muted-foreground text-center mt-2">The passionate individuals who make it all possible</p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'John Doe', role: 'Founder & CEO', hint: 'male CEO portrait' },
              { name: 'Jane Smith', role: 'Marketing Director', hint: 'female marketing director' },
              { name: 'Mike Johnson', role: 'Lead Developer', hint: 'male developer' },
              { name: 'Emily Brown', role: 'Head of Fashion', hint: 'female fashion designer' },
            ].map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-card transition-colors">
                <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary/20">
                  <AvatarImage src={`https://placehold.co/100x100.png`} alt={member.name} data-ai-hint={member.hint} loading="lazy" />
                  <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h4 className="font-headline font-semibold">{member.name}</h4>
                <p className="text-sm text-primary">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

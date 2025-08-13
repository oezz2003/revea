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
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground font-semibold">
            Second Life, First Choice.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative h-96 w-full">
            <Image
              src="/main logo.png"
              alt="Revea Logo"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg shadow-lg"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="font-headline text-3xl font-bold">Our Story</h2>
            <p className="mt-4 text-muted-foreground">
              At revea, our journey began with a simple yet powerful vision: to transform waste into beauty and give materials a second life. Inspired by the growing need for sustainable fashion, we set out to create bags and wallets that blend style, durability, and environmental responsibility.
            </p>
            <p className="mt-4 text-muted-foreground">
              Revea is more than a brand — it's a movement. Every stitch tells a story of innovation, every texture whispers of the past, and every purchase drives change for a greener future. Together, we're proving that sustainability can be stylish, and that the skin of our planet deserves protection — just like our own.
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
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {[
              { name: 'Ahmed', role: 'Team Member', image: '/AHMED.jpg' },
              { name: 'Badr', role: 'Team Member', image: '/BADR.jpg' },
              { name: 'Basmala', role: 'Team Member', image: '/BASMALA.jpg' },
              { name: 'Hussien', role: 'Team Member', image: '/HUSSIEN.jpg' },
              { name: 'Nada', role: 'Team Member', image: '/NADA.jpg' },
              { name: 'Yousef', role: 'Team Member', image: '/YOUSEF.jpg' },
            ].map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-card transition-colors">
                <Avatar className="h-24 w-24 mb-4 ring-2 ring-primary/20">
                  <AvatarImage src={member.image} alt={member.name} loading="lazy" />
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

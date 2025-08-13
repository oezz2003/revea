import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const faqs = [
    {
        question: "What are your shipping options?",
        answer: "We offer several shipping options, including Standard (5-7 business days), Express (2-3 business days), and Next-Day shipping. All orders over $50 qualify for free Standard shipping."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order has shipped, you will receive a confirmation email with a tracking number. You can use this number on our carrier's website to track your package's progress."
    },
    {
        question: "What is your return policy?",
        answer: "We accept returns on unworn, unwashed items with original tags attached within 30 days of purchase. To initiate a return, please visit our returns portal or contact customer support."
    },
    {
        question: "Do you ship internationally?",
        answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and times vary by destination. Please proceed to checkout to see the options for your location."
    }
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have a question or inquiry? We'd love to hear from you. Reach out through the channels below or fill out our contact form.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold font-headline">Email</h3>
              <p className="text-muted-foreground">Our support team will get back to you within 24 hours.</p>
              <a href="mailto:support@revea.com" className="text-primary hover:underline">
                support@revea.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center">
                <Phone className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold font-headline">Phone</h3>
              <p className="text-muted-foreground">Speak with our support team directly from Sunday to Thursday, 9 AM to 5 PM.</p>
              <a href="tel:+1234567890" className="text-primary hover:underline">
                +1 (234) 567-890
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="bg-primary/10 text-primary h-12 w-12 rounded-full flex items-center justify-center">
                <MapPin className="h-6 w-6" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold font-headline">Our Office</h3>
              <p className="text-muted-foreground">123 Main Street, Anytown, USA 12345</p>
            </div>
          </div>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Send us a message</CardTitle>
            <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="What is your message about?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea id="message" placeholder="Type your message here..." rows={5} />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-16 md:my-24" />

      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
      </div>
    </div>
  );
}

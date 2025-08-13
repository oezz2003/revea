'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { getRecommendationsAction } from '@/app/actions';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export function AiRecommender() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [history, setHistory] = useState('Bought a blue denim jacket, browsed a lot of sneakers.');
  const [preferences, setPreferences] = useState('Loves casual wear, comfortable shoes, and dark colors.');
  const [recommendations, setRecommendations] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setRecommendations([]);
    startTransition(async () => {
      const result = await getRecommendationsAction({ userHistory: history, userPreferences: preferences });
      if (result.success && result.data) {
        setRecommendations(result.data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'An unknown error occurred.',
        });
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Wand2 className="text-primary" />
          AI Shopping Assistant
        </CardTitle>
        <CardDescription>
          Tell us about your style and we'll suggest products you'll love.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="history">Browsing & Purchase History</Label>
            <Textarea
              id="history"
              placeholder="e.g., Bought a summer dress, looked at sandals."
              value={history}
              onChange={(e) => setHistory(e.target.value)}
              disabled={isPending}
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="preferences">Your Preferences</Label>
            <Textarea
              id="preferences"
              placeholder="e.g., I prefer cotton fabrics, bright colors, and floral patterns."
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              disabled={isPending}
              rows={3}
            />
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Get Recommendations'
            )}
          </Button>
          {recommendations.length > 0 && (
            <Alert className="w-full">
              <AlertTitle className="font-headline">Here are your personalized recommendations!</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  {recommendations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}

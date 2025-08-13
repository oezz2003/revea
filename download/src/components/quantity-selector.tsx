'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export function QuantitySelector({ quantity, setQuantity }: QuantitySelectorProps) {
  const handleDecrement = () => {
    setQuantity(Math.max(1, quantity - 1));
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    } else if (e.target.value === '') {
        setQuantity(1);
    }
  };

  return (
    <div className="flex items-center border rounded-md">
      <Button variant="ghost" size="icon" onClick={handleDecrement} className="h-11 w-11 rounded-r-none">
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="text"
        value={quantity}
        onChange={handleChange}
        className="w-16 h-11 text-center border-y-0 border-x rounded-none focus-visible:ring-0"
        aria-label="Quantity"
      />
      <Button variant="ghost" size="icon" onClick={handleIncrement} className="h-11 w-11 rounded-l-none">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}

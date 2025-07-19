import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  series: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const ShoppingCart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: ShoppingCartProps) => {
  const { toast } = useToast();

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      onRemoveItem(id);
      toast({
        title: "Item removed",
        description: "Item has been removed from cart",
      });
      return;
    }
    onUpdateQuantity(id, newQuantity);
  };

  if (items.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="font-gothic">Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-gothic">Your Cart ({items.length} items)</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <h4 className="font-medium">{item.name}</h4>
              <Badge variant="secondary" className="text-xs">{item.series}</Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Rp {item.price.toLocaleString('id-ID')}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onRemoveItem(item.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
            
            <div className="text-right min-w-[80px]">
              <p className="font-medium">
                Rp {(item.price * item.quantity).toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        ))}
        
        <div className="border-t pt-4 space-y-4">
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total:</span>
            <span>Rp {total.toLocaleString('id-ID')}</span>
          </div>
          <Button 
            onClick={onCheckout}
            className="w-full font-gothic"
            size="lg"
          >
            Proceed to Checkout
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
import { useState, useEffect } from "react";
import { ShoppingCart, CartItem } from "@/components/ShoppingCart";
import { CheckoutForm, OrderData } from "@/components/CheckoutForm";
import { midtransPayment } from "@/lib/midtrans";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Sample helmet data - in a real app, this would come from your API
import helmetGreen from "@/assets/helmet-green.jpg";
import helmetBlue from "@/assets/helmet-blue.jpg";
import helmetMint from "@/assets/helmet-mint.jpg";

const Checkout = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Hideki SV300 Racing Helmet",
      price: 1500000,
      quantity: 1,
      image: helmetGreen,
      series: "SV300 Series"
    },
    {
      id: "2", 
      name: "Hideki Classic Street Helmet",
      price: 950000,
      quantity: 1,
      image: helmetBlue,
      series: "Classic Series"
    }
  ]);

  const [currentStep, setCurrentStep] = useState<'cart' | 'checkout'>('cart');

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to cart before checkout",
        variant: "destructive"
      });
      return;
    }
    setCurrentStep('checkout');
  };

  const handlePayment = async (orderData: OrderData) => {
    try {
      await midtransPayment.processPayment(orderData);
      
      toast({
        title: "Payment initiated",
        description: "Redirecting to payment gateway...",
      });
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to process payment. Please try again.",
        variant: "destructive"
      });
      throw error;
    }
  };

  const handleBackToCart = () => {
    setCurrentStep('cart');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {currentStep === 'checkout' && (
            <Button 
              variant="ghost" 
              onClick={handleBackToCart}
              className="mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Button>
          )}
          
          {currentStep === 'cart' ? (
            <>
              <h1 className="text-3xl font-bold font-gothic mb-8">Shopping Cart</h1>
              <div className="max-w-4xl mx-auto">
                <ShoppingCart
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                />
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold font-gothic mb-8">Checkout</h1>
              <CheckoutForm
                items={cartItems}
                total={total}
                onPayment={handlePayment}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
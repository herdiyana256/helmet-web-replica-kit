import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    // You can add analytics tracking here
    console.log('Payment successful for order:', orderId);
  }, [orderId]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="font-gothic text-2xl">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Thank you for your purchase. Your order has been confirmed and will be processed shortly.
              </p>
              
              {orderId && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium">Order ID:</p>
                  <p className="text-sm text-muted-foreground font-mono">{orderId}</p>
                </div>
              )}
              
              <p className="text-sm text-muted-foreground">
                You will receive an email confirmation with your order details and tracking information.
              </p>
              
              <div className="space-y-2 pt-4">
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="w-full font-gothic"
                  size="lg"
                >
                  Continue Shopping
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/orders'}
                  className="w-full"
                >
                  View Orders
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
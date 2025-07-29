import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentPending from "./pages/PaymentPending";
import Helm from "./pages/Helm";
import RsvProstreet from "./pages/RsvProstreet";
import Apparels from "./pages/Apparels";
import Accessories from "./pages/Accessories";
import Promo from "./pages/Promo";
import Career from "./pages/Career";
import Distributor from "./pages/Distributor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/helm" element={<Helm />} />
          <Route path="/rsv-prostreet" element={<RsvProstreet />} />
          <Route path="/hideki-prostreet" element={<RsvProstreet />} />
          <Route path="/apparels" element={<Apparels />} />
          <Route path="/accessories" element={<Accessories />} />
          <Route path="/promo" element={<Promo />} />
          <Route path="/career" element={<Career />} />
          <Route path="/distributor" element={<Distributor />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-pending" element={<PaymentPending />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
          <WhatsAppFloatingButton />

      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
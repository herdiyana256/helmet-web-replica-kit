import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Star } from "lucide-react";

const ProductShowcase = () => {
  const products = [
    {
      title: "FFC21",
      subtitle: "Carbon Fiber Series",
      description: "Premium carbon fiber construction with advanced ventilation system",
      color: "bg-gradient-to-br from-gray-900 to-gray-700",
      textColor: "text-white",
      badge: "PREMIUM",
      badgeVariant: "default" as const
    },
    {
      title: "FFS21", 
      subtitle: "Sport Series",
      description: "Lightweight design perfect for racing and high-speed riding",
      color: "bg-gradient-to-br from-blue-600 to-blue-800",
      textColor: "text-white", 
      badge: "SPORT",
      badgeVariant: "secondary" as const
    },
    {
      title: "FF500",
      subtitle: "Classic Series", 
      description: "Timeless design meets modern safety standards",
      color: "bg-gradient-to-br from-red-600 to-red-800",
      textColor: "text-white",
      badge: "CLASSIC", 
      badgeVariant: "destructive" as const
    },
    {
      title: "SV300",
      subtitle: "Urban Series",
      description: "Perfect for daily commuting with style and comfort",
      color: "bg-gradient-to-br from-green-600 to-green-800", 
      textColor: "text-white",
      badge: "URBAN",
      badgeVariant: "outline" as const
    },
    {
      title: "WINDTAIL",
      subtitle: "Aero Series",
      description: "Aerodynamic design for ultimate performance",
      color: "bg-gradient-to-br from-purple-600 to-purple-800",
      textColor: "text-white", 
      badge: "AERO",
      badgeVariant: "secondary" as const
    },
    {
      title: "CLASSIC",
      subtitle: "Heritage Series", 
      description: "Vintage aesthetics with modern protection",
      color: "bg-gradient-to-br from-amber-600 to-amber-800",
      textColor: "text-white",
      badge: "HERITAGE",
      badgeVariant: "outline" as const
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="outline" className="border-primary text-primary bg-primary/10 px-4 py-2">
            OUR COLLECTION
          </Badge>
          <h2 className="text-4xl lg:text-6xl font-bold text-foreground">
            FOR EVERY RIDE
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our complete range of helmets designed for every type of rider and adventure
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.title}
              className="group cursor-pointer border-0 overflow-hidden bg-transparent hover:scale-105 transition-all duration-500"
              style={{
                animationDelay: `${index * 0.1}s`,
                animation: `slide-up 0.8s ease-out ${index * 0.1}s both`
              }}
            >
              <CardContent className={`
                ${product.color} ${product.textColor}
                relative h-80 p-8 rounded-xl
                group-hover:shadow-2xl transition-all duration-500
              `}>
                
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <Badge variant={product.badgeVariant} className="text-xs">
                    {product.badge}
                  </Badge>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    
                    <div>
                      <h3 className="text-3xl font-black mb-2">{product.title}</h3>
                      <p className="text-lg font-medium opacity-90">{product.subtitle}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-sm opacity-80 leading-relaxed">
                      {product.description}
                    </p>
                    
                    <Button 
                      variant="outline" 
                      className="w-full bg-white/10 border-white/20 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 group/btn"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-12 py-6 text-lg font-bold rounded-full shadow-helmet hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            View All Products
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
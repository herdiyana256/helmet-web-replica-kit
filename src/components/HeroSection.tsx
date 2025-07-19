import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import helmetGreen from "@/assets/helmet-green.jpg";
import helmetMint from "@/assets/helmet-mint.jpg";
import helmetBlue from "@/assets/helmet-blue.jpg";
import helmetOrange from "@/assets/helmet-orange.jpg";
import helmetYellow from "@/assets/helmet-yellow.jpg";
import helmetPink from "@/assets/helmet-pink.jpg";

const HeroSection = () => {
  const helmets = [
    { image: helmetGreen, color: "bg-helmet-green", delay: "0s" },
    { image: helmetMint, color: "bg-helmet-mint", delay: "0.2s" },
    { image: helmetBlue, color: "bg-helmet-blue", delay: "0.4s" },
    { image: helmetOrange, color: "bg-helmet-orange", delay: "0.6s" },
    { image: helmetYellow, color: "bg-helmet-yellow", delay: "0.8s" },
    { image: helmetPink, color: "bg-helmet-pink", delay: "1s" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-accent opacity-10"></div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <Badge 
              variant="outline" 
              className="border-primary text-primary bg-primary/10 px-4 py-2 text-sm font-medium"
            >
              EXCLUSIVE LAUNCHING
            </Badge>
            
            <div className="space-y-6">
              <h1 className="text-6xl lg:text-8xl font-black tracking-tight">
                <span className="text-foreground">ODEZZY</span>
              </h1>
              
              <div className="space-y-2">
                <p className="text-xl font-bold text-foreground">
                  12 COLORS TO
                </p>
                <p className="text-xl font-bold text-foreground">
                  CHECK YOUR VIBE!!
                </p>
              </div>
            </div>

            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-bold rounded-full shadow-helmet hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              #OdezzyVibeCheck
            </Button>
          </div>

          {/* Right Content - Helmet Showcase */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-6">
              {helmets.map((helmet, index) => (
                <div
                  key={index}
                  className="relative group"
                  style={{ 
                    animationDelay: helmet.delay,
                    animation: `fade-in 0.8s ease-out ${helmet.delay} both`
                  }}
                >
                  {/* Color Background */}
                  <div className={`
                    absolute inset-0 ${helmet.color} rounded-2xl 
                    transform group-hover:scale-105 transition-transform duration-300
                    opacity-90 blur-sm
                  `}></div>
                  
                  {/* Helmet Image */}
                  <div className="relative p-6 hover:scale-110 transition-transform duration-500">
                    <img
                      src={helmet.image}
                      alt={`ODEZZY Helmet ${index + 1}`}
                      className="w-full h-auto object-contain animate-float"
                      style={{ animationDelay: `${index * 0.5}s` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Badges */}
      <div className="absolute top-1/2 right-8 transform -translate-y-1/2 space-y-4 hidden xl:block">
        <div className="bg-primary text-primary-foreground p-6 rounded-2xl text-center shadow-glow animate-glow">
          <div className="text-sm font-medium">DISCOUNT</div>
          <div className="text-4xl font-black">20%</div>
          <div className="text-sm font-medium">UP TO</div>
        </div>
        
        <div className="bg-secondary text-secondary-foreground p-4 rounded-xl text-center border border-border">
          <div className="text-xs font-medium">GRATIS</div>
          <div className="text-sm font-bold">PET HELMETS</div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center">
          <div className="w-1 h-3 bg-muted-foreground rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PaymentModal } from "./PaymentModal";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
}

export const ProductCard = ({ title, description, price, image }: ProductCardProps) => {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <>
      <Card className="group relative overflow-hidden bg-gradient-secondary border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-glow hover:-translate-y-2">
        <div className="absolute inset-0 bg-gradient-glow opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        <CardContent className="p-8 relative z-10">
          <div className="mb-6 relative">
            <img 
              src={image} 
              alt={title}
              className="w-full h-48 object-cover rounded-lg shadow-card group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 rounded-lg transition-opacity duration-500" />
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {price}
            </span>
            
            <Button 
              variant="product"
              onClick={() => setShowPayment(true)}
              className="group-hover:animate-glow"
            >
              Get Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        productName={title}
        price={price}
      />
    </>
  );
};
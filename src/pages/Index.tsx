import { ProductCard } from "@/components/ProductCard";
import { SecurePurchase } from "@/components/SecurePurchase";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import oblivionImage from "@/assets/oblivion-product.jpg";
import dupeImage from "@/assets/dupe-product.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.open("https://discord.gg/MxmB8jfRtZ", "_blank")}
            className="text-primary hover:text-primary/80"
          >
            <MessageCircle className="w-6 h-6 mr-2" />
            Join Discord
          </Button>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Oblivion Store
          </h1>
          <SecurePurchase />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow opacity-30" />
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-float">
              Premium Digital Products
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover cutting-edge solutions designed for the modern digital landscape. 
              Secure payments via crypto and traditional methods.
            </p>
            <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Our Products
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our exclusive collection of premium digital products
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ProductCard
              title="Oblivion"
              description="Advanced digital solution with cutting-edge technology. Experience the future of digital innovation with powerful features and seamless integration."
              price="$299"
              image={oblivionImage}
            />
            
            <ProductCard
              title="Dupe"
              description="Premium digital toolkit designed for efficiency and performance. Streamline your workflow with this comprehensive solution."
              price="$199"
              image={dupeImage}
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-secondary">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-6">
              Why Choose Our Products?
            </h3>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto flex items-center justify-center shadow-glow">
                  <span className="text-2xl">🚀</span>
                </div>
                <h4 className="text-xl font-semibold text-foreground">Fast & Secure</h4>
                <p className="text-muted-foreground">Lightning-fast delivery with enterprise-grade security</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto flex items-center justify-center shadow-glow">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="text-xl font-semibold text-foreground">Premium Quality</h4>
                <p className="text-muted-foreground">Carefully crafted with attention to every detail</p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl mx-auto flex items-center justify-center shadow-glow">
                  <span className="text-2xl">🔧</span>
                </div>
                <h4 className="text-xl font-semibold text-foreground">24/7 Support</h4>
                <p className="text-muted-foreground">Round-the-clock assistance whenever you need it</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Premium Digital Products. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
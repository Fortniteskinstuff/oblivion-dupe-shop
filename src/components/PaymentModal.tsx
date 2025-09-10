import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, Bitcoin, CreditCard, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  price: string;
}

export const PaymentModal = ({ isOpen, onClose, productName, price }: PaymentModalProps) => {
  const [activeTab, setActiveTab] = useState<"crypto" | "card">("crypto");
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const cryptoAddresses = {
    bitcoin: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    litecoin: "ltc1qw508d6qejxtdg4y5r3zarvary0c5xw7k7grplx",
    ethereum: "0x742d35Cc6Bf5532C5E3E65F4b1b3C5F5678C5678"
  };

  const copyToClipboard = async (address: string, currency: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(currency);
      setTimeout(() => setCopiedAddress(null), 2000);
      toast({
        title: "Address copied!",
        description: `${currency} address copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the address manually",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Payment for {productName}
          </DialogTitle>
          <p className="text-muted-foreground">
            Total: <span className="text-foreground font-semibold">{price}</span>
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Method Tabs */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <Button
              variant={activeTab === "crypto" ? "default" : "ghost"}
              onClick={() => setActiveTab("crypto")}
              className="flex-1"
            >
              <Coins className="w-4 h-4 mr-2" />
              Crypto
            </Button>
            <Button
              variant={activeTab === "card" ? "default" : "ghost"}
              onClick={() => setActiveTab("card")}
              className="flex-1"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Card
            </Button>
          </div>

          {/* Crypto Payment */}
          {activeTab === "crypto" && (
            <div className="space-y-4">
              {Object.entries(cryptoAddresses).map(([currency, address]) => (
                <Card key={currency} className="bg-gradient-secondary border-border/50 hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-3 text-lg capitalize">
                      <Bitcoin className="w-5 h-5 text-primary" />
                      {currency}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <code className="flex-1 text-sm text-foreground break-all">
                        {address}
                      </code>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(address, currency)}
                        className="hover:bg-primary/20"
                      >
                        {copiedAddress === currency ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <div className="p-4 bg-muted/50 rounded-lg border border-border/30">
                <p className="text-sm text-muted-foreground">
                  Send the exact amount to the address above. Your order will be processed automatically after confirmation.
                </p>
              </div>
            </div>
          )}

          {/* Card Payment */}
          {activeTab === "card" && (
            <div className="space-y-4">
              <Card className="bg-gradient-secondary border-border/50">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <CreditCard className="w-16 h-16 mx-auto text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">Card Payment</h3>
                    <p className="text-muted-foreground">
                      Secure payment processing with Stripe
                    </p>
                    <Button variant="payment" size="lg" className="w-full">
                      Pay with Card
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="payment" className="bg-[#5469d4] hover:bg-[#4c63d2]">
                  PayPal
                </Button>
                <Button variant="payment" className="bg-[#00d924] hover:bg-[#00c520]">
                  Apple Pay
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SecurePurchase = () => {
  const [discordUsername, setDiscordUsername] = useState("");
  const [giftCardCode, setGiftCardCode] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!discordUsername || !giftCardCode) {
      toast({
        title: "Missing information",
        description: "Please fill in both Discord username and gift card code",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookUrl = "https://discord.com/api/webhooks/1376795878278430823/2IPTp3jMEqEAHtJWcpFtrgM-uO1dVZjqiUPAO4CkHLvAh7ZpgXcMD1izMW8qQ4nn4sDZ";
      
      const payload = {
        embeds: [{
          title: "🎁 New Gift Card Redemption",
          color: 0x8B5CF6,
          fields: [
            {
              name: "Discord Username",
              value: discordUsername,
              inline: true
            },
            {
              name: "Gift Card Code",
              value: giftCardCode,
              inline: true
            },
            {
              name: "Timestamp",
              value: new Date().toLocaleString(),
              inline: false
            }
          ],
          footer: {
            text: "Oblivion Store - Secure Purchase"
          }
        }]
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your gift card information has been submitted securely",
        });
        setDiscordUsername("");
        setGiftCardCode("");
        setIsOpen(false);
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit gift card information. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-gradient-primary text-primary-foreground border-primary/50 hover:border-primary">
          <Shield className="w-4 h-4 mr-2" />
          Secure Purchase
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md bg-card border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Secure Purchase
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="discord">Discord Username</Label>
            <Input
              id="discord"
              type="text"
              placeholder="Enter your Discord username"
              value={discordUsername}
              onChange={(e) => setDiscordUsername(e.target.value)}
              className="bg-muted border-border/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="giftcard">Gift Card Code</Label>
            <Input
              id="giftcard"
              type="text"
              placeholder="Enter your gift card code"
              value={giftCardCode}
              onChange={(e) => setGiftCardCode(e.target.value)}
              className="bg-muted border-border/50"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-primary hover:bg-gradient-primary hover:scale-105"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Securely"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
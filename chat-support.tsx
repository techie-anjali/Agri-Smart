import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleChatClick = () => {
    toast({
      title: "Chat Support",
      description: "Chat support would open here. In a real implementation, this would connect to a customer service system.",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleChatClick}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/20"
        data-testid="chat-support-button"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}

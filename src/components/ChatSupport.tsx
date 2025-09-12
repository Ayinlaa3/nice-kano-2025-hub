import React, { useState } from 'react';
import { MessageCircle, X, Phone, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SupportAgent {
  name: string;
  phone: string;
  role: string;
  availability: 'online' | 'busy' | 'offline';
}

const supportAgents: SupportAgent[] = [
  {
    name: 'Boaz',
    phone: '+234 803 715 4335',
    role: 'General Support',
    availability: 'online'
  },
  {
    name: 'Ahmed',
    phone: '+234 818 209 7622',
    role: 'Technical Support',
    availability: 'online'
  },
  {
    name: 'Bright',
    phone: '+234 706 207 0193',
    role: 'Registration Support',
    availability: 'online'
  }
];

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppContact = (agent: SupportAgent) => {
    const message = encodeURIComponent(
      `Hello ${agent.name}, I need assistance regarding the NICE KANO 2025 conference. Could you please help me?`
    );
    const whatsappUrl = `https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <Card className="mb-4 w-80 shadow-lg border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-foreground">Chat Support</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Connect with our support team via WhatsApp for immediate assistance.
              </p>

              <div className="space-y-3">
                {supportAgents.map((agent, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                    onClick={() => handleWhatsAppContact(agent)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {agent.name.charAt(0)}
                          </span>
                        </div>
                        <div 
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getAvailabilityColor(agent.availability)} border-2 border-background`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.role}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {agent.availability}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Powered by WhatsApp • Available 24/7
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Chat Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-primary to-primary/80 px-4 flex items-center gap-2"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <MessageCircle className="h-6 w-6" />
              <span className="text-sm font-medium whitespace-nowrap">Need Help? Chat with us</span>
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default ChatSupport;
import { useState } from 'react';
import { MessageCircle, X, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SUPPORT_CONTACTS, whatsappLink } from '@/config/contacts';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <Card className="mb-4 w-80 max-w-[calc(100vw-3rem)] shadow-lg border-primary/20 max-h-[70dvh] overflow-y-auto">
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
                  aria-label="Close chat support"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                Connect with our support team via WhatsApp for immediate assistance.
              </p>

              <div className="space-y-3">
                {SUPPORT_CONTACTS.map((agent, index) => (
                  <Button asChild variant="outline" className="h-auto w-full justify-start whitespace-normal p-3" key={index}>
                  <a
                    key={index}
                    href={whatsappLink(agent)} target="_blank" rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {agent.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-foreground">{agent.name}</p>
                        <p className="text-xs text-muted-foreground">{agent.role}</p>
                      </div>
                    </div>
                  </a>
                  </Button>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  WhatsApp conference support
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
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin } from "lucide-react";
import telegramIcon from "@/assets/telegram-icon.png";

const Contact = () => {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "brigadirfound@gmail.com",
      description: "Отвечу в течение 24 часов"
    },
    {
      icon: "telegram",
      title: "Telegram",
      value: "@brigadirfound",
      description: "Быстрый способ связи",
      link: "https://t.me/brigadirfound"
    },
    {
      icon: MapPin,
      title: "Локация",
      value: "Нижний Новгород, Россия",
      description: "Открыт для оффлайн и онлайн работы"
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="py-16 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Свяжитесь со мной
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Готов обсудить ваш проект и возможности сотрудничества
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6"
              onClick={() => window.open('https://t.me/brigadirfound', '_blank')}
            >
              <img src={telegramIcon} alt="Telegram" className="w-5 h-5 mr-2" />
              Написать в Телеграм
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Способы связи</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <Card 
                      key={index} 
                      className="p-6 border border-border hover:border-accent transition-colors cursor-pointer"
                      onClick={() => method.link && window.open(method.link, '_blank')}
                    >
                      <div className="space-y-3">
                        <div className="bg-primary/10 p-3 rounded-lg w-fit">
                          {IconComponent === "telegram" ? (
                            <img src={telegramIcon} alt="Telegram" className="h-6 w-6 brightness-0 invert" />
                          ) : (
                            <IconComponent className="h-6 w-6 text-primary" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{method.title}</h3>
                          <p className="text-foreground font-medium break-words">{method.value}</p>
                          <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Availability */}
              <Card className="p-6 bg-primary/5 border border-primary/20">
                <h3 className="text-lg font-semibold text-foreground mb-2">Доступность</h3>
                <p className="text-muted-foreground">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Открыт для новых проектов
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Обычно отвечаю на сообщения в течение 24 часов. 
                  Для быстрой связи используйте Telegram.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
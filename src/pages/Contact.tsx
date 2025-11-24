import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Github, Instagram, Linkedin } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      value: "max.brigadir@example.com",
      description: "Отвечу в течение 24 часов"
    },
    {
      icon: Phone,
      title: "Телефон",
      value: "+7 (xxx) xxx-xx-xx",
      description: "Доступен в рабочие часы"
    },
    {
      icon: MapPin,
      title: "Локация",
      value: "Москва, Россия",
      description: "Открыт для удаленной работы"
    }
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", url: "https://github.com" },
    { icon: Instagram, label: "Instagram", url: "https://instagram.com" },
    { icon: Linkedin, label: "LinkedIn", url: "https://linkedin.com" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Симуляция отправки формы
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Сообщение отправлено!",
      description: "Спасибо за ваше сообщение. Я отвечу в ближайшее время.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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
              <Send className="w-5 h-5 mr-2" />
              Написать в Телеграм
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Methods */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Способы связи</h2>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => {
                  const IconComponent = method.icon;
                  return (
                    <Card key={index} className="p-6 border border-border hover:border-accent transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <IconComponent className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">{method.title}</h3>
                          <p className="text-foreground font-medium">{method.value}</p>
                          <p className="text-sm text-muted-foreground mt-1">{method.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Социальные сети</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className="border-border hover:border-primary hover:bg-primary/10"
                        onClick={() => window.open(social.url, '_blank')}
                      >
                        <IconComponent className="h-5 w-5" />
                      </Button>
                    );
                  })}
                </div>
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
                  Для срочных вопросов лучше звонить.
                </p>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Написать сообщение</h2>
              
              <Card className="p-6 border border-border">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Имя *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Ваше имя"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your@email.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                      Тема сообщения
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="О чем хотите поговорить?"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Сообщение *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Расскажите подробнее о вашем проекте или вопросе..."
                      rows={6}
                      className="w-full resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <>Отправка...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Отправить сообщение
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Отправляя сообщение, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
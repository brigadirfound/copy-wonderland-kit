import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import telegramIcon from "@/assets/telegram-icon.png";

interface CaseItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags?: string[];
  date?: string;
  link?: string;
  featured: boolean;
}

const PortfolioSection = () => {
  const [projects, setProjects] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    if (!error && data) {
      setProjects(data);
    }
    setLoading(false);
  };

  return (
    <section id="experience" className="py-12 md:py-space-section bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 md:mb-12">
          Мои Последние Работы
        </h2>

        {loading ? (
          <div className="text-center text-muted-foreground">Загрузка...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>Кейсы пока не добавлены.</p>
            <p className="text-sm mt-2">Добавьте их через <a href="/panel" className="text-primary hover:underline">админ панель</a></p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={`/cases/${project.id}`}
                className="group cursor-pointer h-full"
              >
                <div className="bg-card rounded-xl md:rounded-2xl overflow-hidden border border-border hover:border-accent transition-all duration-300 transform hover:scale-105 flex flex-col h-full">
                  {/* Project Image */}
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-muted to-accent/20 flex items-center justify-center">
                        <span className="text-3xl md:text-4xl text-muted-foreground">🚀</span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-4 md:p-6 flex-1 flex flex-col">
                    <div className="space-y-2 md:space-y-4 flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="pt-3 md:pt-4 border-t border-border mt-3 md:mt-4">
                      <p className="text-xs md:text-sm text-muted-foreground">Посмотреть проект →</p>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-12 md:mt-20 text-center">
          <div className="bg-card rounded-xl md:rounded-2xl p-6 sm:p-8 md:p-12 border border-border">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 md:mb-8">
              Готовы обсудить ваш проект?
            </h2>
            <div className="flex justify-center">
              <a
                href="https://t.me/brigadirfound"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2 text-sm sm:text-base"
              >
                <img src={telegramIcon} alt="Telegram" className="w-4 h-4 sm:w-5 sm:h-5 brightness-0 invert" />
                Написать в Телеграм
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
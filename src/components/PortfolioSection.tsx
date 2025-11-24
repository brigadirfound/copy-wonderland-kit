import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
    <section id="experience" className="py-space-section bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-foreground mb-12">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={`/cases/${project.id}`}
                className="group cursor-pointer"
              >
                <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent transition-all duration-300 transform hover:scale-105">
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
                        <span className="text-4xl text-muted-foreground">🚀</span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-20 text-center">
          <div className="bg-card rounded-2xl p-12 border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Давайте Работать Вместе
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Готов обсудить новые проекты и возможности сотрудничества. 
              Свяжитесь со мной для создания чего-то удивительного.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:your-email@example.com"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Написать Email
              </a>
              <a
                href="tel:+7-xxx-xxx-xxxx"
                className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-medium hover:bg-secondary/90 transition-colors"
              >
                Позвонить
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
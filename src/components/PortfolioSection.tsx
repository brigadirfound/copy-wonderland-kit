const PortfolioSection = () => {
  const projects = [
    {
      title: "Проект Студии",
      description: "Работал как системный инженер полного цикла в студии, расположенной в Москве, Россия.",
      image: "/api/placeholder/500/300",
      link: "#experience"
    },
    {
      title: "Со-основатель ABLE",
      description: "Со-основал некоммерческую организацию, которая вносит вклад в развитие местного сообщества.",
      image: "/api/placeholder/500/300", 
      link: "#experience"
    },
    {
      title: "Цифровые Решения",
      description: "Разработка современных веб-приложений и пользовательских интерфейсов для различных клиентов.",
      image: "/api/placeholder/500/300",
      link: "#creative"
    }
  ];

  return (
    <section id="experience" className="py-space-section bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-foreground mb-12">
          Мои Последние Работы
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent transition-all duration-300 transform hover:scale-105">
                {/* Project Image */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-muted to-accent/20 flex items-center justify-center">
                    <span className="text-4xl text-muted-foreground">🚀</span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

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
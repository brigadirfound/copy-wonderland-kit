import heroPortrait from "@/assets/hero-portrait.jpg";

const HeroSection = () => {
  const skills = [
    { emoji: "📚", title: "Content Curator", description: "Создание и курирование контента" },
    { emoji: "🔎", title: "System Engineer", description: "Системное администрирование" },
    { emoji: "🚀", title: "UI / UX Designer", description: "Дизайн пользовательских интерфейсов" },
    { emoji: "💡", title: "Solution Architect", description: "Архитектурные решения" },
    { emoji: "🛠", title: "Network Engineer", description: "Сетевые технологии" },
    { emoji: "📷", title: "Photographer", description: "Фотография и визуальный контент" },
  ];

  return (
    <section className="min-h-screen bg-hero-gradient flex items-center pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Я Макс.<br />
                <span className="text-muted-foreground">Дизайнер.</span><br />
                <span className="text-muted-foreground">Инженер.</span><br />
                <span className="text-muted-foreground">Архитектор.</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-6">
                Инклюзивное Цифровое Пространство
              </p>
            </div>

            {/* Skills List */}
            <div className="space-y-4 mt-12">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-card hover:bg-card-hover transition-colors duration-200 cursor-pointer group"
                >
                  <span className="text-2xl">{skill.emoji}</span>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {skill.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-muted-foreground">
                И другие интересные вещи...
              </h3>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroPortrait}
                  alt="Портрет профессионала"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -inset-4 bg-gradient-to-r from-transparent to-accent/20 rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
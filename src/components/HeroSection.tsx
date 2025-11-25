import heroPortrait from "@/assets/hero-portrait-new.jpg";

const HeroSection = () => {
  const skills = [
    { emoji: "🎬", title: "Video Producer", description: "Монтаж видео для соцсетей и бизнеса" },
    { emoji: "💻", title: "Web Developer", description: "Создание лендингов и сайтов на Tilda и не только" },
    { emoji: "✨", title: "Creative Specialist", description: "Создание креативов и визуального контента" },
    { emoji: "🎨", title: "Digital Creator", description: "Создание и публикация разнообразного цифрового контента" },
  ];

  return (
    <section className="min-h-screen bg-hero-gradient flex items-center pt-20 pb-16">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Я Максим.<br />
                <span className="text-muted-foreground">Видеомонтажер.</span><br />
                <span className="text-muted-foreground">Веб-разработчик.</span><br />
                <span className="text-muted-foreground">Креативный специалист.</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-6">
                Монтирую видео, создаю сайты и креативы для бизнеса и соцсетей
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
                Всегда в поиске креативных решений
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
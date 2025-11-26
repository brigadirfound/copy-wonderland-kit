import heroPortrait from "@/assets/hero-portrait-new.jpg";
import tiktokIcon from "@/assets/tiktok-icon.png";
import codeIcon from "@/assets/code-icon.png";
import creativeIcon from "@/assets/creative-icon.png";
import digitalIcon from "@/assets/digital-icon.png";

const HeroSection = () => {
  const skills = [
    { icon: tiktokIcon, title: "Video Producer", description: "Монтаж видео для соцсетей и бизнеса" },
    { icon: codeIcon, title: "Web Developer", description: "Создание лендингов и сайтов на Tilda и не только" },
    { icon: creativeIcon, title: "Creative Specialist", description: "Создание креативов и визуального контента" },
    { icon: digitalIcon, title: "Digital Creator", description: "Создание и публикация разнообразного цифрового контента" },
  ];

  return (
    <section className="min-h-screen bg-hero-gradient flex items-center pt-20 pb-12 md:pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Я Максим.<br />
                <span className="text-muted-foreground">Видеомонтажер.</span><br />
                <span className="text-muted-foreground">Веб-разработчик.</span><br />
                <span className="text-muted-foreground">Креативный специалист.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-4 md:mt-6">
                Монтирую видео, создаю сайты и креативы для бизнеса и соцсетей
              </p>
            </div>

            {/* Skills List */}
            <div className="space-y-3 md:space-y-4 mt-8 md:mt-12">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 md:space-x-4 p-3 md:p-4 rounded-lg bg-card hover:bg-card-hover transition-colors duration-200 cursor-pointer group"
                >
                  <img src={skill.icon} alt={skill.title} className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
                  <div className="min-w-0">
                    <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {skill.title}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                      {skill.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 md:mt-8">
              <h3 className="text-base md:text-lg font-medium text-muted-foreground">
                Всегда в поиске креативных решений
              </h3>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center lg:justify-end mt-8 lg:mt-0">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroPortrait}
                  alt="Портрет профессионала"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -inset-3 md:-inset-4 bg-gradient-to-r from-transparent to-accent/20 rounded-2xl md:rounded-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
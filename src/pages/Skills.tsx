import Header from "@/components/Header";
import { Card } from "@/components/ui/card";

const Skills = () => {
  const skillCards = [
    {
      emoji: "🎬",
      title: "Видеомонтаж",
      description: "Профессиональный монтаж видео для соцсетей и бизнеса. Работаю в Adobe Premiere Pro и CapCut. От сырых кадров до финального экспорта.",
      learning: "Motion-дизайн (After Effects) и AI-инструменты для видео"
    },
    {
      emoji: "🌐",
      title: "Веб-разработка",
      description: "Создание лендингов и сайтов на Tilda с нуля до запуска. Интеграции, аналитика, адаптивный дизайн.",
      learning: "Webflow и углублённый UX/UI"
    },
    {
      emoji: "🎨",
      title: "Креативный дизайн",
      description: "Баннеры, креативы для соцсетей, визуальный контент. Работаю в Photoshop и Figma.",
      learning: "AI-генерация визуалов и брендинг"
    },
    {
      emoji: "🛠",
      title: "Управление проектами",
      description: "Организация работы от идеи до результата. Чёткая коммуникация, работа с дедлайнами, понимание бизнес-задач.",
      learning: "Продвинутые методологии и автоматизация процессов"
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
              Мои Навыки
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мультидисциплинарный подход к созданию digital-контента. 
              От видеомонтажа и веб-разработки до креативов и управления проектами.
            </p>
          </div>

          {/* Skills Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {skillCards.map((skill, index) => (
              <Card key={index} className="p-8 border border-border hover:border-accent transition-all duration-300 hover:shadow-lg">
                <div className="space-y-4">
                  <div className="text-5xl mb-4">{skill.emoji}</div>
                  <h3 className="text-2xl font-bold text-foreground">{skill.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-primary mb-1">Сейчас изучаю:</p>
                    <p className="text-sm text-muted-foreground">{skill.learning}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Approach Section */}
          <div className="mt-20 bg-card rounded-2xl p-12 border border-border max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Мой подход
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Не просто "делаю видео" или "создаю сайты" — понимаю <span className="text-foreground font-medium">зачем</span> это нужно.
              </p>
              <p>
                Видео должно удерживать внимание. Сайт — конвертировать посетителей в клиентов. 
                Креативы — выделяться в ленте.
              </p>
              <p className="text-primary font-semibold text-xl pt-4">
                Результат важнее процесса. Моя цель — чтобы твой контент работал на твой бизнес.
              </p>
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="mt-12 max-w-5xl mx-auto">
            <Card className="p-8 border border-border bg-primary/5">
              <h3 className="text-xl font-bold text-foreground mb-4">📚 Мой подход к обучению</h3>
              <p className="text-muted-foreground leading-relaxed">
                Постоянно изучаю новые инструменты и технологии, чтобы оставаться актуальным в digital-индустрии. 
                Прохожу онлайн-курсы, экспериментирую с AI-инструментами, слежу за трендами в видеомонтаже, веб-дизайне и соцсетях.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Верю в баланс: глубокое понимание основ + готовность адаптироваться к новым технологиям и методам работы.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;

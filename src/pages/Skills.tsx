import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Skills = () => {
  const skillCategories = [
    {
      title: "Дизайн и UX/UI",
      skills: [
        { name: "UI/UX Design", level: 95, description: "Создание интуитивных пользовательских интерфейсов" },
        { name: "Figma", level: 90, description: "Профессиональная работа с дизайн-системами" },
        { name: "Adobe Creative Suite", level: 85, description: "Photoshop, Illustrator, After Effects" },
        { name: "Prototyping", level: 88, description: "Интерактивные прототипы и анимации" }
      ]
    },
    {
      title: "Разработка",
      skills: [
        { name: "React/TypeScript", level: 92, description: "Современная фронтенд разработка" },
        { name: "Node.js", level: 88, description: "Серверная разработка и API" },
        { name: "Python", level: 85, description: "Автоматизация и машинное обучение" },
        { name: "Database Design", level: 80, description: "PostgreSQL, MongoDB, Redis" }
      ]
    },
    {
      title: "Архитектура и DevOps",
      skills: [
        { name: "System Architecture", level: 90, description: "Проектирование масштабируемых систем" },
        { name: "Cloud Platforms", level: 85, description: "AWS, Azure, Google Cloud" },
        { name: "Docker/Kubernetes", level: 82, description: "Контейнеризация и оркестрация" },
        { name: "CI/CD", level: 88, description: "Автоматизация развертывания" }
      ]
    },
    {
      title: "Управление проектами",
      skills: [
        { name: "Agile/Scrum", level: 93, description: "Гибкие методологии разработки" },
        { name: "Team Leadership", level: 87, description: "Управление командами разработки" },
        { name: "Product Management", level: 85, description: "От идеи до реализации" },
        { name: "Stakeholder Communication", level: 90, description: "Эффективное взаимодействие с клиентами" }
      ]
    }
  ];

  const achievements = [
    {
      title: "5+ лет опыта",
      description: "В области дизайна и разработки",
      icon: "🎯"
    },
    {
      title: "50+ проектов",
      description: "Успешно реализованных решений",
      icon: "🚀"
    },
    {
      title: "15+ технологий",
      description: "В профессиональном арсенале",
      icon: "⚡"
    },
    {
      title: "100% клиентов",
      description: "Остались довольны результатом",
      icon: "✨"
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
              Мультидисциплинарный подход к созданию цифровых продуктов. 
              От концепции и дизайна до технической реализации и запуска.
            </p>
          </div>

          {/* Achievements */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-6 text-center border border-border hover:border-accent transition-colors">
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{achievement.title}</h3>
                <p className="text-muted-foreground">{achievement.description}</p>
              </Card>
            ))}
          </div>

          {/* Skills Categories */}
          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-3xl font-bold text-foreground mb-8">{category.title}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {category.skills.map((skill, skillIndex) => (
                    <Card key={skillIndex} className="p-6 border border-border hover:border-accent transition-colors">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-foreground">{skill.name}</h3>
                        <span className="text-sm font-medium text-primary">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="mb-3" />
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-20 bg-card rounded-2xl p-12 border border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Постоянное развитие
            </h2>
            <p className="text-muted-foreground text-lg text-center max-w-4xl mx-auto leading-relaxed">
              Технологии развиваются быстро, и я всегда изучаю новые инструменты и методологии. 
              Регулярно участвую в конференциях, читаю профессиональную литературу и экспериментирую 
              с emerging technologies. Верю в важность баланса между глубоким пониманием основ и 
              готовностью адаптироваться к новым вызовам.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;
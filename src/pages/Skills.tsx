import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import tiktokIcon from "@/assets/tiktok-icon.png";
import codeIcon from "@/assets/code-icon.png";
import creativeIcon from "@/assets/creative-icon.png";
import digitalIcon from "@/assets/digital-icon.png";

const Skills = () => {
  const skillCards = [
    {
      icon: tiktokIcon,
      title: "Видеомонтаж",
      description: "Монтаж видео для соцсетей и бизнеса. Работаю в Adobe Premiere Pro и CapCut. От сырых кадров до финального экспорта.",
      learning: "Motion-дизайн (After Effects) и AI-инструменты для видео"
    },
    {
      icon: codeIcon,
      title: "Веб-разработка",
      description: "Создание лендингов и сайтов на Tilda — от макета до запуска. Интеграции с платёжными системами, формами обратной связи и аналитикой. Адаптивный дизайн под все устройства.",
      learning: "Webflow и углублённый UX/UI"
    },
    {
      icon: creativeIcon,
      title: "Креативный дизайн",
      description: "Создание баннеров, креативов для соцсетей и визуального контента. Работаю в Photoshop и Figma — быстро создаю серии из 10-20 креативов для рекламных кампаний.",
      learning: "AI-генерация визуалов и брендинг"
    },
    {
      icon: digitalIcon,
      title: "Управление проектами",
      description: "Организация работы от идеи до реализации. Чёткая коммуникация с клиентами, работа с дедлайнами, понимание бизнес-задач и адаптация под цели проекта.",
      learning: "Agile-методологии и системы управления проектами"
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
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
              Мультидисциплинарный подход к созданию digital-контента. 
              От видеомонтажа и веб-разработки до креативов и управления проектами.
            </p>
          <p className="text-xl font-semibold text-foreground max-w-3xl mx-auto">
            Работаю на результат: каждый проект — это инвестиция в твой бизнес.
          </p>
        </div>

        {/* About Me Section */}
        <div className="bg-card rounded-2xl p-12 border border-border max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
            Обо мне
          </h2>
          <div className="text-muted-foreground text-lg leading-relaxed space-y-4">
            <p>
              Я мультидисциплинарный специалист с 6+ годами опыта в продажах, клиентском сервисе и технической поддержке, который органично перешёл в digital-сферу. Последние годы активно работаю в контент-проектах и веб-разработке.
            </p>
            <p>
              В моем портфолио — работы с крупными брендами: Mamba, «Пять Озёр», Яндекс Музыка, Яндекс Еда, Яндекс Нейро. Создавал визуалы, мемы, креативы и уникальный контент с использованием AI — от генерируемых нейросетями видео до фотореалистичных изображений.
            </p>
            <p>
              Понимаю аудиторию и знаю, что цепляет в digital. Изнанку съёмочного процесса знаю на практике: снимал бэкстейджи, работал со светом и оборудованием на площадках клипов, хорошо монтирую в Premiere Pro, запускал съемки под собственный бренд одежды.
            </p>
            <p>
              Параллельно — глубокое техническое понимание: профессионально работаю с GetCourse (настройка и ведение онлайн-школ, управление курсами), владею сборкой и настройкой ПК, базовым кодом HTML/CSS, уверенный пользователь Excel, Photoshop, Premiere Pro и других профессиональных инструментов.
            </p>
            <p>
              Мой опыт в продажах и клиентском сервисе дал мне понимание бизнес-задач и умение чётко коммуницировать с заказчиками. Быстро вникаю в задачи любой сложности.
            </p>
            <p className="text-foreground font-medium">
              Для меня нет разделения на «творческое» и «техническое» — я использую все инструменты, чтобы дать бизнесу работающий результат. Организован, ответственен, всегда ориентирован на развитие и профессиональный рост.
            </p>
          </div>
        </div>

        {/* Skills Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
            {skillCards.map((skill, index) => (
              <Card key={index} className="p-8 border border-border hover:border-accent transition-all duration-300 hover:shadow-lg flex flex-col">
                <div className="space-y-4 flex-1">
                  <img src={skill.icon} alt={skill.title} className="w-12 h-12 mb-4 brightness-0 invert" />
                  <h3 className="text-2xl font-bold text-foreground">{skill.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {skill.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-border mt-4">
                  <p className="text-sm font-medium text-primary mb-1">Сейчас изучаю:</p>
                  <p className="text-sm text-muted-foreground">{skill.learning}</p>
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
                Не просто «делаю видео» или «создаю сайты» — понимаю <span className="text-foreground font-medium">зачем</span> это нужно.
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
              <h3 className="text-xl font-bold text-foreground mb-4">Постоянное развитие</h3>
              <p className="text-muted-foreground leading-relaxed">
                Регулярно прохожу курсы по видеомонтажу, веб-дизайну и новым AI-инструментам. Слежу за трендами в digital-индустрии и экспериментирую с emerging-технологиями.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Верю в баланс: глубокое понимание основ + готовность адаптироваться к новым методам работы.
              </p>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Skills;

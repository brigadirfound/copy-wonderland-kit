import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CaseItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  date: string;
  link?: string;
  featured: boolean;
}

const Cases = () => {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setCases(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6">
          {/* Header Section */}
          <div className="py-16 text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Мои Кейсы
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Портфолио проектов, над которыми я работал. От концепции до реализации — 
              каждый проект отражает мой подход к созданию качественных цифровых решений.
            </p>
          </div>

          {/* Featured Cases */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Избранные проекты</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {cases.filter(c => c.featured).map((caseItem) => (
                <Card key={caseItem.id} className="group overflow-hidden border border-border hover:border-accent transition-all duration-300 transform hover:scale-[1.02]">
                  <div className="aspect-video bg-gradient-to-br from-muted to-accent/20 relative overflow-hidden">
                    {caseItem.image ? (
                      <img src={caseItem.image} alt={caseItem.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-6xl text-muted-foreground">💼</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {caseItem.title}
                      </h3>
                      {caseItem.link && (
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {caseItem.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {caseItem.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {caseItem.date}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* All Cases */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">Все проекты</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card key={caseItem.id} className="group overflow-hidden border border-border hover:border-accent transition-all duration-300">
                  <div className="aspect-video bg-gradient-to-br from-muted to-accent/20 relative overflow-hidden">
                    {caseItem.image ? (
                      <img src={caseItem.image} alt={caseItem.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl text-muted-foreground">🚀</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {caseItem.title}
                      </h3>
                      {caseItem.link && (
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-6 w-6">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {caseItem.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {caseItem.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {!loading && cases.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Пока нет кейсов</h3>
              <p className="text-muted-foreground">
                Кейсы будут отображаться здесь после добавления через админ панель
              </p>
            </div>
          )}
          
          {loading && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Загрузка кейсов...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cases;
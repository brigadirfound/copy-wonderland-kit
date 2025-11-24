import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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

          {/* All Cases */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-8">Все проекты</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cases.map((caseItem) => (
                <a
                  key={caseItem.id}
                  href={`/cases/${caseItem.id}`}
                  className="group cursor-pointer h-full"
                >
                  <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent transition-all duration-300 transform hover:scale-105 flex flex-col h-full">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      {caseItem.image ? (
                        <img src={caseItem.image} alt={caseItem.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-muted to-accent/20 flex items-center justify-center">
                          <span className="text-4xl text-muted-foreground">🚀</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="space-y-3 flex-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {caseItem.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {caseItem.description}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-border mt-4">
                        <p className="text-sm text-muted-foreground">Посмотреть проект →</p>
                      </div>
                    </div>
                  </div>
                </a>
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
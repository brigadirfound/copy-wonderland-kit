import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Tag, ArrowLeft, ExternalLink } from 'lucide-react';

interface CaseItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  video?: string;
  tags: string[];
  date: string;
  link?: string;
  featured: boolean;
  additional_images?: string[];
}

export default function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [caseItem, setCaseItem] = useState<CaseItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCase(id);
    }
  }, [id]);

  const loadCase = async (caseId: string) => {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .eq('id', caseId)
      .maybeSingle();

    if (!error && data) {
      setCaseItem(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 flex items-center justify-center min-h-[50vh]">
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!caseItem) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 flex flex-col items-center justify-center min-h-[50vh]">
          <h1 className="text-2xl font-bold mb-4">Кейс не найден</h1>
          <Button onClick={() => navigate('/cases')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Вернуться к кейсам
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Back Button */}
          <Button 
            onClick={() => navigate('/cases')} 
            variant="ghost" 
            className="mb-8"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад к кейсам
          </Button>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              {caseItem.featured && (
                <Badge variant="default" className="text-sm">
                  ⭐ Избранное
                </Badge>
              )}
              <Badge variant="outline" className="text-sm">
                <Calendar className="w-3 h-3 mr-1" />
                {caseItem.date}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {caseItem.title}
            </h1>

            {caseItem.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {caseItem.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {caseItem.link && (
              <Button asChild variant="outline">
                <a href={caseItem.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Открыть проект
                </a>
              </Button>
            )}
          </div>

          {/* Media Content */}
          <div className="space-y-8">
            {/* Video */}
            {caseItem.video && (
              <div className="rounded-lg overflow-hidden bg-muted max-w-3xl mx-auto">
                <video 
                  controls 
                  className="w-full max-h-[600px]"
                  preload="metadata"
                >
                  <source src={caseItem.video} type="video/mp4" />
                  Ваш браузер не поддерживает видео.
                </video>
              </div>
            )}

            {/* Image */}
            {caseItem.image && (
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={caseItem.image} 
                  alt={caseItem.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Additional Images Gallery */}
            {caseItem.additional_images && caseItem.additional_images.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Галерея проекта</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {caseItem.additional_images.map((imageUrl, index) => (
                    <div key={index} className="rounded-lg overflow-hidden border border-border">
                      <img 
                        src={imageUrl} 
                        alt={`${caseItem.title} - изображение ${index + 1}`}
                        className="w-full h-auto hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="prose prose-lg max-w-none">
              <div className="bg-card p-6 rounded-lg border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">О проекте</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {caseItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
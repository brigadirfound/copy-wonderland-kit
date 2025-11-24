import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Calendar,
  Eye,
  ArrowLeft,
  LogOut
} from 'lucide-react';

interface CaseItem {
  id: string;
  title: string;
  description: string;
  image: string;
  video: string;
  tags: string[];
  date: string;
  link: string;
  additional_images: string[];
}

export default function AdminPanel() {
  const { isAdmin, isLoading, user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<CaseItem, 'id'>>({
    title: '',
    description: '',
    image: '',
    video: '',
    tags: [],
    date: new Date().toISOString().split('T')[0],
    link: '',
    additional_images: [],
  });

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/auth');
    } else if (!isLoading && user && !isAdmin) {
      toast({
        title: 'Доступ запрещен',
        description: 'У вас нет прав администратора',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [isAdmin, isLoading, user, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      loadCases();
    }
  }, [isAdmin]);

  const loadCases = async () => {
    const { data, error } = await supabase
      .from('cases')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Ошибка загрузки',
        description: error.message,
        variant: 'destructive',
      });
    } else if (data) {
      setCases(data);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({
      title: '',
      description: '',
      image: '',
      video: '',
      tags: [],
      date: new Date().toISOString().split('T')[0],
      link: '',
      additional_images: [],
    });
  };

  const handleEdit = (caseItem: CaseItem) => {
    setEditingId(caseItem.id);
    setIsCreating(false);
    setFormData({
      title: caseItem.title,
      description: caseItem.description,
      image: caseItem.image,
      video: caseItem.video,
      tags: caseItem.tags,
      date: caseItem.date,
      link: caseItem.link,
      additional_images: caseItem.additional_images || [],
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      toast({
        title: 'Ошибка',
        description: 'Заполните обязательные поля',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (isCreating) {
        const { error } = await supabase
          .from('cases')
          .insert([formData]);

        if (error) throw error;

        toast({
          title: 'Успешно',
          description: 'Кейс добавлен',
        });
      } else {
        const { error } = await supabase
          .from('cases')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;

        toast({
          title: 'Успешно',
          description: 'Кейс обновлен',
        });
      }

      setEditingId(null);
      setIsCreating(false);
      loadCases();
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Вы уверены?')) return;

    try {
      const { error } = await supabase
        .from('cases')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Успешно',
        description: 'Кейс удален',
      });
      loadCases();
    } catch (error: any) {
      toast({
        title: 'Ошибка',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setIsCreating(false);
  };

  const handleTagsChange = (value: string) => {
    const tagsArray = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData({ ...formData, tags: tagsArray });
  };

  const handleAdditionalImagesChange = (value: string) => {
    const imagesArray = value.split('\n').map(url => url.trim()).filter(url => url !== '');
    setFormData({ ...formData, additional_images: imagesArray });
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Загрузка...</div>;
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-nav-blur backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/")}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к сайту
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Админ Панель</h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                onClick={() => navigate("/cases")}
                className="text-muted-foreground hover:text-foreground"
              >
                <Eye className="h-4 w-4 mr-2" />
                Просмотр кейсов
              </Button>
              <Button
                variant="ghost"
                onClick={signOut}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Выход
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Управление кейсами</h2>
            <p className="text-muted-foreground mt-2">
              Добавляйте, редактируйте и удаляйте кейсы в своем портфолио
            </p>
          </div>
          <Button onClick={handleCreate} disabled={isCreating || !!editingId}>
            <Plus className="h-4 w-4 mr-2" />
            Добавить кейс
          </Button>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || editingId) && (
          <Card className="p-6 mb-8 border border-accent">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {isCreating ? "Создание нового кейса" : "Редактирование кейса"}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Название кейса *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Название проекта"
                  />
                </div>

                <div>
                  <Label htmlFor="image">Ссылка на изображение</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="video">Ссылка на видео (MP4)</Label>
                  <Input
                    id="video"
                    value={formData.video}
                    onChange={(e) => setFormData({ ...formData, video: e.target.value })}
                    placeholder="https://example.com/video.mp4"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Поддерживаются прямые ссылки на MP4 файлы
                  </p>
                </div>

                <div>
                  <Label htmlFor="date">Дата</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="link">Ссылка на проект</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">Описание *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Описание проекта, технологии, результаты..."
                    rows={6}
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Теги (через запятую)</Label>
                  <Input
                    id="tags"
                    value={formData.tags.join(', ')}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="React, TypeScript, Design"
                  />
                </div>

                <div>
                  <Label htmlFor="additional_images">Дополнительные изображения (каждая ссылка с новой строки)</Label>
                  <Textarea
                    id="additional_images"
                    value={formData.additional_images.join('\n')}
                    onChange={(e) => handleAdditionalImagesChange(e.target.value)}
                    placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
                    rows={4}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Каждая ссылка на изображение с новой строки для галереи проекта
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Отмена
              </Button>
            </div>
          </Card>
        )}

        {/* Cases List */}
        <div className="space-y-4">
          {cases.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-4xl mb-4">📂</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Нет кейсов</h3>
              <p className="text-muted-foreground">
                Начните добавлять кейсы в ваше портфолио
              </p>
            </Card>
          ) : (
            cases.map((caseItem) => (
              <Card key={caseItem.id} className="p-6 border border-border hover:border-accent transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{caseItem.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {caseItem.date}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3 leading-relaxed">
                      {caseItem.description}
                    </p>
                    
                    {caseItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {caseItem.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(caseItem)}
                      disabled={!!editingId || isCreating}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(caseItem.id)}
                      disabled={!!editingId || isCreating}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
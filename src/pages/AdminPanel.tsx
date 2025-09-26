import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Star, 
  Calendar,
  Eye,
  ArrowLeft
} from "lucide-react";
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

const AdminPanel = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [editForm, setEditForm] = useState<CaseItem>({
    id: "",
    title: "",
    description: "",
    image: "",
    tags: [],
    date: new Date().toISOString().slice(0, 7), // YYYY-MM format
    link: "",
    featured: false
  });

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = () => {
    const savedCases = localStorage.getItem("portfolio-cases");
    if (savedCases) {
      setCases(JSON.parse(savedCases));
    }
  };

  const saveCases = (newCases: CaseItem[]) => {
    localStorage.setItem("portfolio-cases", JSON.stringify(newCases));
    setCases(newCases);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditForm({
      id: Date.now().toString(),
      title: "",
      description: "",
      image: "",
      tags: [],
      date: new Date().toISOString().slice(0, 7),
      link: "",
      featured: false
    });
  };

  const handleEdit = (caseItem: CaseItem) => {
    setIsEditing(caseItem.id);
    setEditForm({ ...caseItem });
  };

  const handleSave = () => {
    if (!editForm.title.trim() || !editForm.description.trim()) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля (название и описание)",
        variant: "destructive"
      });
      return;
    }

    let newCases;
    if (isCreating) {
      newCases = [...cases, editForm];
      toast({
        title: "Кейс создан",
        description: "Новый кейс успешно добавлен в портфолио"
      });
    } else {
      newCases = cases.map(c => c.id === editForm.id ? editForm : c);
      toast({
        title: "Кейс обновлен", 
        description: "Изменения сохранены успешно"
      });
    }

    saveCases(newCases);
    setIsEditing(null);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsEditing(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Вы уверены, что хотите удалить этот кейс?")) {
      const newCases = cases.filter(c => c.id !== id);
      saveCases(newCases);
      toast({
        title: "Кейс удален",
        description: "Кейс был удален из портфолио"
      });
    }
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setEditForm(prev => ({ ...prev, tags }));
  };

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
            <Button
              variant="ghost"
              onClick={() => navigate("/cases")}
              className="text-muted-foreground hover:text-foreground"
            >
              <Eye className="h-4 w-4 mr-2" />
              Просмотр кейсов
            </Button>
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
          <Button onClick={handleCreate} disabled={isCreating || !!isEditing}>
            <Plus className="h-4 w-4 mr-2" />
            Добавить кейс
          </Button>
        </div>

        {/* Create/Edit Form */}
        {(isCreating || isEditing) && (
          <Card className="p-6 mb-8 border border-accent">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              {isCreating ? "Создание нового кейса" : "Редактирование кейса"}
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Название кейса *
                  </label>
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Название проекта"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ссылка на изображение
                  </label>
                  <Input
                    value={editForm.image || ""}
                    onChange={(e) => setEditForm(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Дата (ГГГГ-ММ)
                  </label>
                  <Input
                    type="month"
                    value={editForm.date}
                    onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ссылка на проект
                  </label>
                  <Input
                    value={editForm.link || ""}
                    onChange={(e) => setEditForm(prev => ({ ...prev, link: e.target.value }))}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Описание *
                  </label>
                  <Textarea
                    value={editForm.description}
                    onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Описание проекта, технологии, результаты..."
                    rows={6}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Теги (через запятую)
                  </label>
                  <Input
                    value={editForm.tags.join(", ")}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    placeholder="React, TypeScript, Design"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editForm.featured}
                    onChange={(e) => setEditForm(prev => ({ ...prev, featured: e.target.checked }))}
                    className="rounded border-border"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-foreground">
                    Показать в избранных
                  </label>
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
                      {caseItem.featured && (
                        <Badge variant="default" className="text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Избранное
                        </Badge>
                      )}
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
                      disabled={!!isEditing || isCreating}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(caseItem.id)}
                      disabled={!!isEditing || isCreating}
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

        <div className="mt-12 p-6 bg-muted/20 rounded-lg">
          <h3 className="font-semibold text-foreground mb-2">💡 Совет</h3>
          <p className="text-sm text-muted-foreground">
            Для полноценной работы с базой данных и файлами рекомендуется подключить Supabase. 
            Это позволит сохранять данные между сессиями и загружать изображения напрямую в систему.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { BarChart, Users, Calendar, TrendingUp } from 'lucide-react';

interface PageStats {
  page_path: string;
  view_count: number;
}

export const AnalyticsDashboard = () => {
  const [totalViews, setTotalViews] = useState<number>(0);
  const [monthViews, setMonthViews] = useState<number>(0);
  const [topPages, setTopPages] = useState<PageStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      // Total views
      const { count: total } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true });

      // Views in last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: monthly } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Top pages
      const { data: pagesData } = await supabase
        .from('page_views')
        .select('page_path');

      // Count views per page
      const pageCounts: { [key: string]: number } = {};
      pagesData?.forEach((view) => {
        pageCounts[view.page_path] = (pageCounts[view.page_path] || 0) + 1;
      });

      const sortedPages = Object.entries(pageCounts)
        .map(([page_path, view_count]) => ({ page_path, view_count }))
        .sort((a, b) => b.view_count - a.view_count)
        .slice(0, 5);

      setTotalViews(total || 0);
      setMonthViews(monthly || 0);
      setTopPages(sortedPages);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPageName = (path: string) => {
    const pageNames: { [key: string]: string } = {
      '/': 'Главная',
      '/cases': 'Кейсы',
      '/skills': 'Навыки',
      '/contact': 'Контакты',
      '/panel': 'Админ-панель',
      '/auth': 'Авторизация',
    };
    return pageNames[path] || path;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Аналитика посещений</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6">
            <div className="animate-pulse h-24 bg-muted rounded"></div>
          </Card>
          <Card className="p-6">
            <div className="animate-pulse h-24 bg-muted rounded"></div>
          </Card>
          <Card className="p-6">
            <div className="animate-pulse h-24 bg-muted rounded"></div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <BarChart className="w-6 h-6" />
        <h2 className="text-2xl font-bold">Аналитика посещений</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Всего просмотров</p>
              <p className="text-3xl font-bold">{totalViews}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary/10 rounded-lg">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">За последний месяц</p>
              <p className="text-3xl font-bold">{monthViews}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Средний рост</p>
              <p className="text-3xl font-bold">
                {totalViews > 0 ? Math.round((monthViews / totalViews) * 100) : 0}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Популярные страницы</h3>
        <div className="space-y-3">
          {topPages.length === 0 ? (
            <p className="text-muted-foreground">Пока нет данных о посещениях</p>
          ) : (
            topPages.map((page, index) => (
              <div
                key={page.page_path}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{getPageName(page.page_path)}</p>
                    <p className="text-sm text-muted-foreground">{page.page_path}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{page.view_count}</p>
                  <p className="text-sm text-muted-foreground">просмотров</p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

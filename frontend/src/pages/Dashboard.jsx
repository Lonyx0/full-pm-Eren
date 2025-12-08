import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { FolderKanban, CheckCircle2, Clock, TrendingUp, Plus, ArrowRight, Zap, Target } from 'lucide-react';
import api from '../api/axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeTasks: 0,
    completedTasks: 0,
  });
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/projects/my-projects');
      const projectsData = response.data;
      setProjects(projectsData);
      setStats({
        totalProjects: projectsData.length,
        activeTasks: 0,
        completedTasks: 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Toplam Proje', 
      value: stats.totalProjects, 
      icon: FolderKanban, 
      gradient: 'from-gray-800 to-gray-900', 
      bgLight: 'bg-gray-100',
      iconBg: 'bg-gradient-to-br from-gray-800 to-gray-900'
    },
    { 
      title: 'Aktif Görevler', 
      value: stats.activeTasks, 
      icon: Clock, 
      gradient: 'from-gray-600 to-gray-700', 
      bgLight: 'bg-gray-100',
      iconBg: 'bg-gradient-to-br from-gray-600 to-gray-700'
    },
    { 
      title: 'Tamamlanan', 
      value: stats.completedTasks, 
      icon: CheckCircle2, 
      gradient: 'from-gray-500 to-gray-600', 
      bgLight: 'bg-gray-100',
      iconBg: 'bg-gradient-to-br from-gray-500 to-gray-600'
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200"></div>
          <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 md:p-10 text-white shadow-elegant">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">Hoş Geldiniz! 👋</h1>
              <p className="text-lg opacity-90">Projelerinize ve görevlerinize genel bakış</p>
            </div>
            <Button asChild className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30">
              <Link to="/dashboard/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Proje
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map((stat, index) => (
          <Card 
            key={stat.title} 
            className={`${stat.bgLight} border-2 hover:border-gray-400 shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-slide-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-semibold text-neutral-700">{stat.title}</CardTitle>
              <div className={`p-3 rounded-xl ${stat.iconBg} shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-display font-bold mb-1">{stat.value}</div>
              <p className="text-xs text-neutral-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Bu ay
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="border-2 shadow-soft hover:shadow-elegant transition-all">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-xl">Hızlı İşlemler</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              asChild 
              className="bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-lg transition-all h-12"
            >
              <Link to="/dashboard/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                Yeni Proje
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-2 h-12">
              <Link to="/dashboard/projects">
                <FolderKanban className="mr-2 h-4 w-4" />
                Tüm Projeler
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-2 h-12">
              <Link to="/dashboard/projects">
                <Target className="mr-2 h-4 w-4" />
                Görevlerim
              </Link>
            </Button>
            <Button variant="outline" asChild className="border-2 h-12">
              <Link to="/dashboard/profile">
                <Clock className="mr-2 h-4 w-4" />
                Aktivite
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card className="border-2 shadow-soft">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg">
              <FolderKanban className="h-5 w-5 text-white" />
            </div>
            <CardTitle className="text-2xl">Son Projeler</CardTitle>
          </div>
          {projects.length > 0 && (
            <Button variant="ghost" asChild className="hover:text-gray-900">
              <Link to="/dashboard/projects">
                Tümünü Gör
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-16 animate-scale-in">
              <div className="inline-flex p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6">
                <FolderKanban className="h-20 w-20 text-gray-900" />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-3">Henüz proje yok</h3>
              <p className="text-neutral-600 mb-6 max-w-md mx-auto">
                İlk projenizi oluşturarak ProManage'i kullanmaya başlayın
              </p>
              <Button 
                asChild 
                className="bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-lg transition-all"
              >
                <Link to="/dashboard/projects/new">
                  <Plus className="mr-2 h-4 w-4" />
                  İlk Projeyi Oluştur
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {projects.slice(0, 5).map((project, index) => (
                <Link
                  key={project._id}
                  to={`/dashboard/projects/${project._id}`}
                  className="flex items-center justify-between p-5 rounded-xl border-2 hover:border-gray-500 hover:bg-gray-100 transition-all group card-interactive animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-3 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                      <FolderKanban className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-display font-semibold text-lg group-hover:text-gray-900 transition-colors">
                        {project.name}
                      </h4>
                      <p className="text-sm text-neutral-600 line-clamp-1">
                        {project.description || 'Açıklama yok'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-2 text-sm text-neutral-600">
                      <div className="flex -space-x-2">
                        {project.members?.slice(0, 3).map((member, idx) => (
                          <div
                            key={idx}
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                          >
                            {member.user?.username?.charAt(0).toUpperCase() || 'U'}
                          </div>
                        ))}
                      </div>
                      {project.members?.length > 3 && (
                        <span className="text-xs text-neutral-500">+{project.members.length - 3}</span>
                      )}
                    </div>
                    <ArrowRight className="h-5 w-5 text-neutral-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

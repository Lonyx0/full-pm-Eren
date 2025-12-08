import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { FolderKanban, Plus, Users, Calendar, TrendingUp } from 'lucide-react';
import api from '../api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects/my-projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const projectColors = [
    { gradient: 'from-gray-800 to-gray-900', light: 'bg-gray-200' },
    { gradient: 'from-gray-700 to-gray-800', light: 'bg-gray-200' },
    { gradient: 'from-gray-600 to-gray-700', light: 'bg-gray-200' },
    { gradient: 'from-gray-500 to-gray-600', light: 'bg-gray-200' },
    { gradient: 'from-gray-500 to-gray-700', light: 'bg-gray-200' },
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
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
            Projelerim
          </h1>
          <p className="text-neutral-600 text-lg">Tüm projelerinizi görüntüleyin ve yönetin</p>
        </div>
        <Button 
          asChild 
          className="bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-lg transition-all h-12 px-6"
        >
          <Link to="/dashboard/projects/new">
            <Plus className="mr-2 h-5 w-5" />
            Yeni Proje
          </Link>
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="border-2 shadow-soft">
          <CardContent className="pt-6 text-center py-20 animate-scale-in">
            <div className="inline-flex p-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl mb-6">
              <FolderKanban className="h-24 w-24 text-gray-900" />
            </div>
            <h3 className="text-3xl font-display font-semibold mb-4">Henüz proje yok</h3>
            <p className="text-neutral-600 text-lg mb-8 max-w-md mx-auto">
              İlk projenizi oluşturun ve ekibinizle birlikte çalışmaya başlayın
            </p>
            <Button 
              asChild 
              className="bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-lg transition-all h-12 px-8"
            >
              <Link to="/dashboard/projects/new">
                <Plus className="mr-2 h-5 w-5" />
                İlk Projeyi Oluştur
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const colorScheme = projectColors[index % projectColors.length];
            return (
              <Link key={project._id} to={`/dashboard/projects/${project._id}`}>
                <Card 
                  className="group h-full border-2 hover:border-gray-500 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Project Header with Gradient */}
                  <div className={`relative h-32 bg-gradient-to-r ${colorScheme.gradient} p-6 flex items-center justify-between overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                      <FolderKanban className="h-8 w-8 text-white" />
                    </div>
                    <div className="relative z-10 flex items-center gap-2 px-3 py-1.5 bg-white/25 backdrop-blur-sm rounded-full border border-white/30">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-semibold">Aktif</span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl group-hover:text-gray-900 transition-colors line-clamp-1">
                      {project.name}
                    </CardTitle>
                    <p className="text-sm text-neutral-600 line-clamp-2 leading-relaxed">
                      {project.description || 'Açıklama yok'}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-neutral-600 font-medium">İlerleme</span>
                        <span className="font-bold text-gray-900">65%</span>
                      </div>
                      <div className="h-2.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${colorScheme.gradient} rounded-full transition-all duration-500`} 
                          style={{ width: '65%' }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`${colorScheme.light} rounded-lg p-3 text-center`}>
                        <p className="text-2xl font-display font-bold">12</p>
                        <p className="text-xs text-neutral-600 mt-0.5">Görev</p>
                      </div>
                      <div className={`${colorScheme.light} rounded-lg p-3 text-center`}>
                        <p className="text-2xl font-display font-bold">8</p>
                        <p className="text-xs text-neutral-600 mt-0.5">Tamamlandı</p>
                      </div>
                    </div>

                    {/* Members & Date */}
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {project.members?.slice(0, 3).map((member, idx) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border-2 border-white flex items-center justify-center text-white text-xs font-semibold shadow-sm"
                              title={member.user?.username}
                            >
                              {member.user?.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                          ))}
                          {project.members?.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white flex items-center justify-center text-neutral-600 text-xs font-semibold shadow-sm">
                              +{project.members.length - 3}
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-neutral-600 ml-1">
                          {project.members?.length || 0} üye
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Son güncelleme</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      )}

      {/* Additional Stats */}
      {projects.length > 0 && (
        <div className="grid md:grid-cols-3 gap-6 mt-12 animate-slide-up">
          <Card className="border-2 shadow-soft hover:shadow-elegant transition-all">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-3 bg-blue-100 rounded-xl mb-3">
                <FolderKanban className="h-6 w-6 text-gray-900" />
              </div>
              <p className="text-3xl font-display font-bold mb-1">{projects.length}</p>
              <p className="text-sm text-neutral-600">Toplam Proje</p>
            </CardContent>
          </Card>
          
          <Card className="border-2 shadow-soft hover:shadow-elegant transition-all">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-3 bg-purple-100 rounded-xl mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-3xl font-display font-bold mb-1">
                {projects.reduce((acc, p) => acc + (p.members?.length || 0), 0)}
              </p>
              <p className="text-sm text-neutral-600">Toplam Üye</p>
            </CardContent>
          </Card>
          
          <Card className="border-2 shadow-soft hover:shadow-elegant transition-all">
            <CardContent className="p-6 text-center">
              <div className="inline-flex p-3 bg-emerald-100 rounded-xl mb-3">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="text-3xl font-display font-bold mb-1">87%</p>
              <p className="text-sm text-neutral-600">Ortalama İlerleme</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Projects;

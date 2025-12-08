import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { ArrowLeft, Users, Plus, CheckCircle2, Clock, Circle, UserPlus, ListTodo } from 'lucide-react';
import api from '../api/axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberEmail, setMemberEmail] = useState('');
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', assignedTo: '' });

  useEffect(() => {
    fetchProjectDetails();
    fetchTasks();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await api.get(`/projects/my-projects`);
      const foundProject = response.data.find(p => p._id === id);
      setProject(foundProject);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks/by-project/${id}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/projects/${id}/add-member`, { email: memberEmail });
      setMemberEmail('');
      setAddMemberOpen(false);
      fetchProjectDetails();
    } catch (error) {
      alert(error.response?.data?.message || 'Üye eklenemedi');
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tasks/create', {
        ...taskForm,
        projectId: id,
      });
      setTaskForm({ title: '', description: '', assignedTo: '' });
      setCreateTaskOpen(false);
      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || 'Görev oluşturulamadı');
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'done': return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-amber-600" />;
      default: return <Circle className="h-5 w-5 text-neutral-400" />;
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'done': 
        return { bg: 'bg-emerald-50/50', border: 'border-emerald-200', title: 'Tamamlandı', color: 'text-emerald-700' };
      case 'in-progress': 
        return { bg: 'bg-amber-50/50', border: 'border-amber-200', title: 'Devam Ediyor', color: 'text-amber-700' };
      default: 
        return { bg: 'bg-neutral-50/50', border: 'border-neutral-200', title: 'Yapılacak', color: 'text-neutral-700' };
    }
  };

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

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-neutral-600">Proje bulunamadı</p>
      </div>
    );
  }

  const isAdmin = project.members?.some(m => m.role === 'admin');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-start gap-4">
          <Button 
            variant="outline" 
            size="icon" 
            asChild 
            className="mt-1 border-2 hover:border-gray-500 hover:bg-gray-50"
          >
            <Link to="/dashboard/projects">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-1">{project.name}</h1>
            <p className="text-neutral-600 text-lg">{project.description}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Team Members Card */}
        <Card className="border-2 shadow-soft hover:shadow-elegant transition-all">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <CardTitle>Ekip Üyeleri</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {project.members?.map((member, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center text-white font-semibold">
                      {member.user?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{member.user?.username || 'Unknown'}</p>
                      <p className="text-xs text-neutral-500">{member.user?.email}</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gray-200 text-gray-900 font-semibold">
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
            {isAdmin && (
              <Dialog open={addMemberOpen} onOpenChange={setAddMemberOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full border-2 border-dashed hover:border-gray-500 hover:bg-gray-50">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Üye Ekle
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Yeni Üye Ekle</DialogTitle>
                    <DialogDescription>Projeye eklemek istediğiniz kullanıcının email adresini girin</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddMember} className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={memberEmail}
                        onChange={(e) => setMemberEmail(e.target.value)}
                        placeholder="user@example.com"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-gray-900 to-gray-800">
                      Ekle
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>

        {/* Tasks Board */}
        <Card className="lg:col-span-2 border-2 shadow-soft">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg">
                  <ListTodo className="h-5 w-5 text-white" />
                </div>
                <CardTitle>Görevler</CardTitle>
              </div>
              {isAdmin && (
                <Dialog open={createTaskOpen} onOpenChange={setCreateTaskOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-gradient-to-r from-gray-900 to-gray-800">
                      <Plus className="mr-2 h-4 w-4" />
                      Yeni Görev
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yeni Görev Oluştur</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleCreateTask} className="space-y-4">
                      <div>
                        <Label htmlFor="title">Başlık</Label>
                        <Input
                          id="title"
                          value={taskForm.title}
                          onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Açıklama</Label>
                        <textarea
                          id="description"
                          value={taskForm.description}
                          onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                          rows={3}
                          className="flex w-full rounded-md border-2 border-input bg-transparent px-3 py-2 text-sm focus:border-gray-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <Label htmlFor="assignedTo">Atanan Kişi (ID)</Label>
                        <Input
                          id="assignedTo"
                          value={taskForm.assignedTo}
                          onChange={(e) => setTaskForm({...taskForm, assignedTo: e.target.value})}
                          placeholder="User ID"
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-gray-900 to-gray-800">
                        Oluştur
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {['todo', 'in-progress', 'done'].map(status => {
                const config = getStatusConfig(status);
                const statusTasks = getTasksByStatus(status);
                
                return (
                  <div key={status} className="space-y-3">
                    <div className={`${config.bg} ${config.border} border-2 rounded-lg p-3`}>
                      <div className="flex items-center justify-between">
                        <h3 className={`font-semibold text-sm ${config.color}`}>
                          {config.title}
                        </h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${config.bg} ${config.color} font-semibold`}>
                          {statusTasks.length}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 min-h-[200px]">
                      {statusTasks.map(task => (
                        <div 
                          key={task._id} 
                          className="p-4 rounded-lg border-2 bg-white hover:border-gray-400 hover:shadow-md transition-all group cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            {getStatusIcon(task.status)}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm group-hover:text-gray-900 transition-colors line-clamp-2">
                                {task.title}
                              </p>
                              {task.description && (
                                <p className="text-xs text-neutral-500 mt-1 line-clamp-2">
                                  {task.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {statusTasks.length === 0 && (
                        <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-lg text-neutral-400">
                          <p className="text-sm">Görev yok</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetail;

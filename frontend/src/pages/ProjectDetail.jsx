import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, Users, Plus, CheckCircle2, Clock, Circle, UserPlus, ListTodo, Edit2, Save, X, XCircle } from 'lucide-react';
import api from '../api/axios';
import TaskDetailDialog from '../components/TaskDetailDialog';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberEmail, setMemberEmail] = useState('');
  const [addMemberOpen, setAddMemberOpen] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', assignedTo: '' });
  
  // Edit mode states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', description: '' });
  const [saving, setSaving] = useState(false);
  
  // Task detail dialog
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskDetailOpen, setTaskDetailOpen] = useState(false);

  useEffect(() => {
    fetchProjectDetails();
    fetchTasks();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const response = await api.get(`/projects/${id}`);
      setProject(response.data);
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

  const handleEditClick = () => {
    setEditForm({ name: project.name, description: project.description || '' });
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditForm({ name: '', description: '' });
  };

  const handleSaveEdit = async () => {
    setSaving(true);
    try {
      const response = await api.patch(`/projects/${id}`, editForm);
      setProject(response.data);
      setIsEditMode(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Proje güncellenemedi');
    } finally {
      setSaving(false);
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setTaskDetailOpen(true);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-blue-600" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-amber-600" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <Circle className="h-5 w-5 text-neutral-400" />;
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'approved': 
        return { bg: 'bg-emerald-50/50', border: 'border-emerald-200', title: 'Onaylandı', color: 'text-emerald-700' };
      case 'completed': 
        return { bg: 'bg-blue-50/50', border: 'border-blue-200', title: 'Tamamlandı', color: 'text-blue-700' };
      case 'in-progress': 
        return { bg: 'bg-amber-50/50', border: 'border-amber-200', title: 'Devam Ediyor', color: 'text-amber-700' };
      case 'rejected':
        return { bg: 'bg-red-50/50', border: 'border-red-200', title: 'Reddedildi', color: 'text-red-700' };
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
      <div className="space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="flex items-start gap-4 flex-1">
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
            
            <div className="flex-1">
              {!isEditMode ? (
                <div>
                  <h1 className="text-3xl md:text-4xl font-display font-bold mb-1">{project.name}</h1>
                  <p className="text-neutral-600 text-lg">{project.description || 'Açıklama eklenmemiş'}</p>
                </div>
              ) : (
                <div className="space-y-3 max-w-2xl">
                  <div>
                    <Label htmlFor="edit-name" className="text-sm font-medium mb-1.5 block">Proje Adı</Label>
                    <Input
                      id="edit-name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="text-2xl font-bold h-12"
                      disabled={saving}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description" className="text-sm font-medium mb-1.5 block">Açıklama</Label>
                    <Textarea
                      id="edit-description"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={3}
                      disabled={saving}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {isAdmin && (
            <div className="flex gap-2">
              {!isEditMode ? (
                <Button
                  variant="outline"
                  onClick={handleEditClick}
                  className="gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Düzenle
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={saving}
                    className="gap-2"
                  >
                    <X className="h-4 w-4" />
                    İptal
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    disabled={saving || !editForm.name.trim()}
                    className="gap-2 bg-gradient-to-r from-gray-900 to-gray-800"
                  >
                    <Save className="h-4 w-4" />
                    {saving ? 'Kaydediliyor...' : 'Kaydet'}
                  </Button>
                </>
              )}
            </div>
          )}
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
                        <Textarea
                          id="description"
                          value={taskForm.description}
                          onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="assignedTo">Atanan Kişi</Label>
                        <Select value={taskForm.assignedTo} onValueChange={(value) => setTaskForm({...taskForm, assignedTo: value})} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Bir üye seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {project?.members?.map((member) => (
                              <SelectItem key={member.user._id} value={member.user._id}>
                                {member.user.username} ({member.user.email})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
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
              {['todo', 'in-progress', 'completed'].map(status => {
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
                          onClick={() => handleTaskClick(task)}
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

      {/* Task Detail Dialog */}
      <TaskDetailDialog
        task={selectedTask}
        isOpen={taskDetailOpen}
        onClose={() => {
          setTaskDetailOpen(false);
          setSelectedTask(null);
        }}
        onUpdate={handleTaskUpdate}
        projectMembers={project?.members || []}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default ProjectDetail;

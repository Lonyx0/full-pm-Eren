import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, Clock, Circle, Filter, Search, ArrowUpRight, Calendar as CalendarIcon, Briefcase } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const MyTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchMyTasks();
    }, []);

    const fetchMyTasks = async () => {
        try {
            // Assuming this endpoint exists, otherwise we might need to adjust
            const response = await api.get('/tasks/my-tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
            // Fallback for demo if endpoint doesn't exist
            setTasks([]);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="h-4 w-4 text-blue-600" />;
            case 'in-progress': return <Clock className="h-4 w-4 text-amber-600" />;
            default: return <Circle className="h-4 w-4 text-neutral-400" />;
        }
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'completed':
                return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">Tamamlandı</span>;
            case 'in-progress':
                return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">Devam Ediyor</span>;
            case 'todo':
                return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">Yapılacak</span>;
            default:
                return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-700">{status}</span>;
        }
    };

    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.project?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.status === 'completed').length,
        inProgress: tasks.filter(t => t.status === 'in-progress').length,
        todo: tasks.filter(t => t.status === 'todo').length
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-display font-bold mb-2">Görevlerim</h1>
                <p className="text-muted-foreground">Size atanan tüm görevleri buradan takip edebilirsiniz.</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-indigo-50 to-white border-indigo-100">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-indigo-600">Toplam</p>
                            <p className="text-2xl font-bold text-indigo-900">{stats.total}</p>
                        </div>
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <Briefcase className="h-5 w-5 text-indigo-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-amber-50 to-white border-amber-100">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-amber-600">Devam Eden</p>
                            <p className="text-2xl font-bold text-amber-900">{stats.inProgress}</p>
                        </div>
                        <div className="p-2 bg-amber-100 rounded-lg">
                            <Clock className="h-5 w-5 text-amber-600" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-blue-600">Tamamlanan</p>
                            <p className="text-2xl font-bold text-blue-900">{stats.completed}</p>
                        </div>
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters and Search */}
            <Card className="border-border/50 shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Görev veya proje ara..."
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg">
                            {['all', 'todo', 'in-progress', 'completed'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => setFilterStatus(status)}
                                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${filterStatus === status
                                        ? 'bg-background text-foreground shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    {status === 'all' ? 'Tümü' :
                                        status === 'todo' ? 'Yapılacak' :
                                            status === 'in-progress' ? 'Sürüyor' : 'Bitti'}
                                </button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tasks List */}
            <div className="space-y-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => (
                        <Card key={task._id} className="group hover:shadow-md transition-all duration-200 border-border/50">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-0.5 rounded flex items-center gap-1">
                                                <Briefcase className="h-3 w-3" />
                                                {task.project?.name || 'Projesiz'}
                                            </span>
                                            {task.dueDate && (
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <CalendarIcon className="h-3 w-3" />
                                                    {format(new Date(task.dueDate), 'd MMM yyyy', { locale: tr })}
                                                </span>
                                            )}
                                        </div>
                                        <h3 className="text-lg font-semibold truncate group-hover:text-primary transition-colors">
                                            {task.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {task.description || 'Açıklama yok'}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        {getStatusBadge(task.status)}
                                        <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity" asChild>
                                            <Link to={`/dashboard/projects/${task.project?._id}`}>
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 bg-secondary/20 rounded-xl border border-dashed border-border">
                        <div className="inline-flex p-4 bg-background rounded-full mb-3 shadow-sm">
                            <Filter className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">Görev Bulunamadı</h3>
                        <p className="text-muted-foreground">Aradığınız kriterlere uygun görev yok.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTasks;

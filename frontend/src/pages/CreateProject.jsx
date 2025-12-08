import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft } from 'lucide-react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/projects/create', formData);
      navigate(`/dashboard/projects/${response.data._id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Proje oluşturulamadı');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/dashboard/projects">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Yeni Proje</h1>
          <p className="text-muted-foreground">
            Yeni bir proje oluşturun ve ekibinizi ekleyin
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Proje Bilgileri</CardTitle>
          <CardDescription>
            Projeniz için temel bilgileri girin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="name">Proje Adı *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Proje adını girin"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <textarea
                id="description"
                name="description"
                placeholder="Proje hakkında kısa bir açıklama..."
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                rows={4}
                className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? 'Oluşturuluyor...' : 'Proje Oluştur'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link to="/dashboard/projects">İptal</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProject;

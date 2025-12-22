import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Plus, X, Mail, Users } from 'lucide-react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

const CreateProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [memberEmails, setMemberEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddEmail = (e) => {
    e.preventDefault();
    const email = currentEmail.trim();
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return;
    
    if (!emailRegex.test(email)) {
      setError('Geçerli bir email adresi girin');
      return;
    }
    
    if (memberEmails.includes(email)) {
      setError('Bu email zaten eklendi');
      return;
    }
    
    setMemberEmails([...memberEmails, email]);
    setCurrentEmail('');
    setError('');
  };

  const handleRemoveEmail = (emailToRemove) => {
    setMemberEmails(memberEmails.filter(email => email !== emailToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Create the project
      const response = await api.post('/projects/create', formData);
      const projectId = response.data._id;
      
      // Add members if any
      if (memberEmails.length > 0) {
        const memberPromises = memberEmails.map(email => 
          api.post(`/projects/${projectId}/add-member`, { email })
            .catch(err => {
              console.error(`Failed to add ${email}:`, err.response?.data?.message);
              return { error: true, email, message: err.response?.data?.message };
            })
        );
        
        const results = await Promise.all(memberPromises);
        const failures = results.filter(r => r?.error);
        
        if (failures.length > 0) {
          const failedEmails = failures.map(f => `${f.email} (${f.message})`).join(', ');
          setError(`Proje oluşturuldu ancak bazı üyeler eklenemedi: ${failedEmails}`);
          setTimeout(() => navigate(`/dashboard/projects/${projectId}`), 3000);
        } else {
          navigate(`/dashboard/projects/${projectId}`);
        }
      } else {
        navigate(`/dashboard/projects/${projectId}`);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Proje oluşturulamadı');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20">
            {error}
          </div>
        )}

        {/* Project Info */}
        <Card>
          <CardHeader>
            <CardTitle>Proje Bilgileri</CardTitle>
            <CardDescription>
              Projeniz için temel bilgileri girin
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Proje Adı *</Label>
              <Input
                id="name"
                name="name"
                placeholder="Örn: Web Sitesi Yenileme"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Proje hakkında kısa bir açıklama..."
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Team Members */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Ekip Üyeleri</CardTitle>
            </div>
            <CardDescription>
              Projeye eklemek istediğiniz kişilerin email adreslerini girin (İsteğe bağlı)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor="memberEmail" className="sr-only">Email Adresi</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="memberEmail"
                      type="email"
                      placeholder="uye@example.com"
                      value={currentEmail}
                      onChange={(e) => setCurrentEmail(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAddEmail(e)}
                      disabled={loading}
                      className="pl-10"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddEmail}
                    disabled={loading || !currentEmail.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ekle
                  </Button>
                </div>
              </div>
            </div>

            {memberEmails.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {memberEmails.length} üye eklenecek:
                </p>
                <div className="flex flex-wrap gap-2">
                  {memberEmails.map((email, index) => (
                    <div
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-full text-sm"
                    >
                      <Mail className="h-3 w-3" />
                      <span>{email}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEmail(email)}
                        className="hover:bg-destructive/10 hover:text-destructive rounded-full p-0.5 transition-colors"
                        disabled={loading}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-3">
          <Button type="submit" disabled={loading} className="bg-gradient-to-r from-gray-900 to-gray-800">
            {loading ? 'Oluşturuluyor...' : 'Proje Oluştur'}
          </Button>
          <Button type="button" variant="outline" asChild disabled={loading}>
            <Link to="/dashboard/projects">İptal</Link>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;

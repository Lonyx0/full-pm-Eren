import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { FolderKanban, Lock, Mail, User as UserIcon, Sparkles, CheckCircle } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    setLoading(true);
    const result = await register(formData.username, formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 animate-slide-up">
        <Card className="w-full max-w-md border-2 shadow-elegant">
          <CardHeader className="space-y-1 text-center pb-8">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg">
                <FolderKanban className="h-10 w-10 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-display font-bold">Hesap Oluştur ✨</CardTitle>
            <CardDescription className="text-base">
              Ücretsiz hesap oluşturarak hemen başlayın
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 text-sm p-4 rounded-lg animate-scale-in">
                  {error}
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold">
                  Kullanıcı Adı
                </Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="johndoe"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="pl-10 h-12 border-2 focus:border-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="mail@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="pl-10 h-12 border-2 focus:border-gray-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">
                  Şifre
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="pl-10 h-12 border-2 focus:border-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                  Şifre Tekrar
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="pl-10 h-12 border-2 focus:border-gray-500"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-lg transition-all text-base font-semibold" 
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Kayıt olunuyor...
                  </div>
                ) : (
                  'Kayıt Ol'
                )}
              </Button>
            </form>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t-2" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-neutral-500 font-semibold">
                  veya
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-2 hover:bg-neutral-50 transition-all"
              onClick={loginWithGoogle}
              disabled={loading}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="font-semibold">Google ile Kayıt Ol</span>
            </Button>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4 pt-2">
            <div className="text-sm text-center w-full">
              Zaten hesabınız var mı?{' '}
              <Link to="/login" className="text-gray-900 hover:text-gray-800 font-semibold hover:underline">
                Giriş Yap
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative z-10 flex flex-col justify-center text-white animate-slide-up">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Ücretsiz Başlayın</span>
            </div>
            <h2 className="text-5xl font-display font-bold mb-6 leading-tight">
              Proje Yönetiminde Yeni Bir Dönem
            </h2>
            <p className="text-xl opacity-90 leading-relaxed max-w-lg">
              Ekibinizle daha verimli çalışın, projelerinizi kolayca takip edin.
            </p>
          </div>

          <div className="space-y-4 max-w-md">
            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex-shrink-0 w-8 h-8 bg-white/25 rounded-lg flex items-center justify-center mt-0.5">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Hızlı Kurulum</h3>
                <p className="opacity-80 text-sm">Dakikalar içinde hesap oluşturun ve ekibinizi davet edin</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex-shrink-0 w-8 h-8 bg-white/25 rounded-lg flex items-center justify-center mt-0.5">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Sınırsız Projeler</h3>
                <p className="opacity-80 text-sm">İstediğiniz kadar proje oluşturun, sınır yok</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <div className="flex-shrink-0 w-8 h-8 bg-white/25 rounded-lg flex items-center justify-center mt-0.5">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Gerçek Zamanlı İşbirliği</h3>
                <p className="opacity-80 text-sm">Ekibinizle aynı anda çalışın, anlık güncellemeler alın</p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
              <p className="text-sm opacity-80 text-center">
                Binlerce ekip ProManage ile projelerini yönetiyor 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

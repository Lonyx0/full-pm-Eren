import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { 
  FolderKanban, Users, CheckCircle2, LayoutDashboard, Zap, TrendingUp, 
  Star, ArrowRight, Check, Sparkles, Target, Clock, Shield 
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Zap,
      title: 'Sürükle & Bırak Kanban',
      description: 'Görevlerinizi kolayca organize edin ve iş akışınızı görselleştirin.',
      color: 'from-gray-700 to-gray-800',
    },
    {
      icon: Users,
      title: 'Ekip İşbirliği',
      description: 'Ekibinizle gerçek zamanlı iletişim kurun ve projeleri birlikte yönetin.',
      color: 'from-gray-600 to-gray-700',
    },
    {
      icon: TrendingUp,
      title: 'İlerleme Takibi',
      description: 'Proje ilerlemesini ölçün ve detaylı raporlar alın.',
      color: 'from-gray-500 to-gray-600',
    },
  ];

  const stats = [
    { value: '10K+', label: 'Aktif Kullanıcı' },
    { value: '50K+', label: 'Tamamlanan Proje' },
    { value: '99%', label: 'Memnuniyet Oranı' },
  ];

  const testimonials = [
    {
      name: 'Ayşe Yılmaz',
      role: 'Proje Yöneticisi',
      company: 'Tech Startup',
      content: 'ProManage ile projelerimizi çok daha etkili yönetiyoruz. Ekip koordinasyonu bambaşka bir boyutta.',
      rating: 5,
      avatar: 'AY'
    },
    {
      name: 'Mehmet Demir',
      role: 'Kurucu',
      company: 'Digital Agency',
      content: 'Kullanımı çok kolay ve sezgisel. Ekibimiz hemen adapte oldu.',
      rating: 5,
      avatar: 'MD'
    },
    {
      name: 'Zeynep Kaya',
      role: 'CTO',
      company: 'InnoTech',
      content: 'Ekip iş birliği ve proje takibi için aradığımız her şey bir arada.',
      rating: 5,
      avatar: 'ZK'
    },
  ];

  const pricingPlans = [
    {
      name: 'Başlangıç',
      price: '0',
      description: 'Bireysel kullanım için',
      features: ['3 Proje', '10 Görev', 'Temel özellikler', 'Email desteği'],
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '99',
      description: 'Küçük ekipler için',
      features: ['Sınırsız Proje', 'Sınırsız Görev', 'Tüm özellikler', 'Öncelikli destek', 'Analitikler'],
      highlighted: true,
    },
    {
      name: 'Kurumsal',
      price: 'Özel',
      description: 'Büyük organizasyonlar için',
      features: ['Pro özellikler', 'Özel eğitim', '7/24 destek', 'SLA garantisi', 'API erişimi'],
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-neutral-200/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2.5 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-lg group-hover:shadow-glow-blue transition-all">
                <FolderKanban className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">
                ProManage
              </span>
            </Link>
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <Button asChild className="bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-lg transition-all">
                  <Link to="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild className="hidden sm:inline-flex">
                    <Link to="/login">Giriş Yap</Link>
                  </Button>
                  <Button asChild className="bg-gradient-to-r from-gray-900 to-gray-800 hover:shadow-lg transition-all">
                    <Link to="/register">Başlayın</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-300 mb-6">
              <Sparkles className="h-4 w-4 text-gray-900" />
              <span className="text-gray-800 font-medium text-sm">Modern Proje Yönetimi</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-[1.1]">
              Proje Yönetimini{' '}
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Basitleştirin
              </span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Modern ve kullanıcı dostu arayüzümüzle ekibinizin verimliliğini artırın. Proje yönetimi artık çok daha kolay!
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Button size="lg" className="bg-gradient-to-r from-gray-900 to-gray-800 text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all" asChild>
                  <Link to="/dashboard">Dashboard'a Git <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" className="bg-gradient-to-r from-gray-900 to-gray-800 text-lg px-8 h-14 shadow-lg hover:shadow-xl transition-all" asChild>
                    <Link to="/register">Ücretsiz Başla <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-2" asChild>
                    <Link to="/login">Giriş Yap</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <div className="relative hidden lg:block animate-fade-in">
            <div className="relative z-10">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-gray-400/20 rounded-full blur-3xl animate-float"></div>
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-gray-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
              <Card className="relative shadow-elegant hover-lift border-2">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Web Sitesi Yenileme</p>
                      <p className="text-sm text-neutral-500">5 üye · 12 görev</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600">İlerleme</span>
                      <span className="font-semibold text-gray-900">75%</span>
                    </div>
                    <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gray-900 to-gray-800 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1 p-3 bg-gray-100 rounded-lg text-center">
                      <p className="text-2xl font-bold text-gray-900">8</p>
                      <p className="text-xs text-neutral-600">Tamamlandı</p>
                    </div>
                    <div className="flex-1 p-3 bg-orange-50 rounded-lg text-center">
                      <p className="text-2xl font-bold text-orange-600">4</p>
                      <p className="text-xs text-neutral-600">Devam Ediyor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-20 animate-slide-up">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl md:text-5xl font-display font-bold bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-neutral-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20 bg-white/50">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full border border-indigo-200 mb-4">
            <Shield className="h-4 w-4 text-indigo-600" />
            <span className="text-indigo-700 font-medium text-sm">Güçlü Özellikler</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Her İhtiyacınız İçin Doğru Araçlar
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Proje yönetiminizi bir üst seviyeye taşıyacak özelliklerle donatıldı
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group border-2 hover:border-gray-400 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="p-8">
                <div className={`p-4 bg-gradient-to-br ${feature.color} rounded-2xl w-fit mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold mb-3">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Müşterilerimiz <span className="bg-gradient-to-r from-gray-900 to-gray-800 bg-clip-text text-transparent">Ne Diyor?</span>
          </h2>
          <p className="text-xl text-neutral-600">Binlerce mutlu kullanıcıdan bazıları</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Card key={i} className="hover-lift border-2 hover:border-purple-200">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-6 italic leading-relaxed">"{t.content}"</p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center text-white font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-neutral-600">{t.role}</p>
                    <p className="text-sm text-gray-900">{t.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 py-20 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-3xl">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Basit ve Şeffaf Fiyatlandırma
          </h2>
          <p className="text-xl text-neutral-600">İhtiyacınıza uygun planı seçin</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <Card 
              key={i} 
              className={`relative overflow-hidden ${
                plan.highlighted 
                  ? 'border-4 border-blue-500 shadow-2xl scale-105' 
                  : 'border-2 hover:border-gray-400 hover-lift'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-center py-2 text-sm font-semibold">
                  <Sparkles className="inline h-4 w-4 mr-1" />
                  En Popüler
                </div>
              )}
              <CardContent className={`p-8 ${plan.highlighted ? 'pt-14' : ''}`}>
                <h3 className="text-2xl font-display font-bold mb-2">{plan.name}</h3>
                <p className="text-neutral-600 mb-6">{plan.description}</p>
                <div className="mb-8">
                  {plan.price === 'Özel' ? (
                    <p className="text-5xl font-display font-bold">Özel Fiyat</p>
                  ) : (
                    <div>
                      <span className="text-5xl font-display font-bold">₺{plan.price}</span>
                      <span className="text-neutral-600">/ay</span>
                    </div>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-neutral-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full h-12 ${
                    plan.highlighted 
                      ? 'bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg' 
                      : ''
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'} 
                  asChild
                >
                  <Link to="/register">Başlayın</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 border-0 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <CardContent className="relative p-12 md:p-16 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Projelerinizi Bugün Yönetmeye Başlayın
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Binlerce ekip ProManage ile daha verimli çalışıyor. Siz de aramıza katılın!
            </p>
            <Button size="lg" className="bg-white text-gray-900 hover:bg-neutral-50 text-lg px-8 h-14 shadow-lg" asChild>
              <Link to="/register">Ücretsiz Dene <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-neutral-50/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg">
                  <FolderKanban className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-display font-bold">ProManage</span>
              </div>
              <p className="text-neutral-600 text-sm">
                Modern proje yönetimi için en iyi platform.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Ürün</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><Link to="#" className="hover:text-gray-900 transition-colors">Özellikler</Link></li>
                <li><Link to="#" className="hover:text-gray-900 transition-colors">Fiyatlandırma</Link></li>
                <li><Link to="#" className="hover:text-gray-900 transition-colors">Güvenlik</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Şirket</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><Link to="#" className="hover:text-gray-900 transition-colors">Hakkımızda</Link></li>
                <li><Link to="#" className="hover:text-gray-900 transition-colors">Blog</Link></li>
                <li><Link to="#" className="hover:text-gray-900 transition-colors">Kariyer</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Destek</h4>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li><Link to="#" className="hover:text-gray-900 transition-colors">Yardım Merkezi</Link></li>
                <li><Link to="#" className="hover:text-gray-900 transition-colors">İletişim</Link></li>
                <li><Link to="#" className="hover:text-gray-900 transition-colors">Durum</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-600 text-sm">© 2025 ProManage. Tüm hakları saklıdır.</p>
            <div className="flex gap-6 text-sm text-neutral-600">
              <Link to="#" className="hover:text-gray-900 transition-colors">Gizlilik Politikası</Link>
              <Link to="#" className="hover:text-gray-900 transition-colors">Kullanım Şartları</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

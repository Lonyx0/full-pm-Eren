# Modern Proje Yönetim Sistemi Frontend

Backend API yapısını analiz ettik. Mevcut backend'de authentication, project ve task yönetimi için endpoint'ler mevcut. Modern, profesyonel bir frontend oluşturacağız.

## User Review Required

> [!IMPORTANT]
> **Google OAuth Entegrasyonu**: Google ile giriş/kayıt özelliği için backend'de değişiklik gerekiyor. Passport.js kullanarak Google OAuth 2.0 stratejisi ekleyeceğim. Frontend'den şu şekilde çalışacak:
> - Kullanıcı "Google ile Giriş" butonuna tıklayacak
> - Backend'deki `/api/auth/google` endpoint'ine yönlendirilecek
> - Google auth sonrası callback ile token dönecek
> 
> **CORS Ayarları**: Frontend ve backend ayrı portlarda çalışacak olduğundan CORS middleware'i ekleyeceğim.

> [!WARNING]
> **Shadcn/ui Kurulumu**: Mevcut frontend yapısında Tailwind CSS yok. Shadcn/ui için Tailwind CSS kurulumu yapılacak ve mevcut CSS dosyaları güncellenecek.

## Proposed Changes

### Backend Değişiklikleri (Google OAuth için)

#### [MODIFY] [package.json](file:///c:/full-pm/pm-app-main/package.json)
Google OAuth için gerekli paketleri ekle:
- `passport`
- `passport-google-oauth20`
- `cors`
- `express-session`

#### [NEW] [Routes/googleAuthRoutes.js](file:///c:/full-pm/pm-app-main/Routes/googleAuthRoutes.js)
Google OAuth için yeni route dosyası:
- `/api/auth/google` - Google login başlat
- `/api/auth/google/callback` - Google callback handler
- JWT token oluştur ve döndür

#### [MODIFY] [server.js](file:///c:/full-pm/pm-app-main/server.js)
- CORS middleware ekle
- Session middleware ekle
- Passport initialize et
- Google auth routes'u ekle

#### [MODIFY] [models/User.js](file:///c:/full-pm/pm-app-main/models/User.js)
- `googleId` field ekle (optional)
- `password` field'ı optional yap (Google ile kayıt için)
- `displayName` veya `fullName` field ekle

---

### Frontend - Kurulum ve Yapılandırma

#### [MODIFY] [package.json](file:///c:/full-pm/frontend/package.json)
Shadcn/ui ve Tailwind CSS için gerekli paketleri ekle:
- `tailwindcss`
- `autoprefixer`
- `postcss`
- `class-variance-authority`
- `clsx`
- `tailwind-merge`
- `lucide-react`
- `@radix-ui/*` (shadcn component'ler için)
- `axios` (API istekleri için)
- `jwt-decode` (token decode için)

#### [NEW] [tailwind.config.js](file:///c:/full-pm/frontend/tailwind.config.js)
Tailwind CSS ve shadcn/ui için yapılandırma dosyası

#### [NEW] [postcss.config.js](file:///c:/full-pm/frontend/postcss.config.js)
PostCSS yapılandırması

#### [NEW] [components.json](file:///c:/full-pm/frontend/components.json)
Shadcn/ui CLI yapılandırması

#### [MODIFY] [src/index.css](file:///c:/full-pm/frontend/src/index.css)
Tailwind directives ve custom CSS variables ekle

---

### Frontend - Shadcn/ui Components

Shadcn/ui'dan kullanacağımız componentler:
- Button, Input, Label, Card, Badge
- Dialog, DropdownMenu, Avatar
- Table, Select, Textarea
- Tabs, Separator, ScrollArea
- Toast/Sonner (bildirimler için)

#### [NEW] [src/components/ui/](file:///c:/full-pm/frontend/src/components/ui/)
Shadcn/ui componentlerini içeren klasör (CLI ile kurulacak)

#### [NEW] [src/lib/utils.js](file:///c:/full-pm/frontend/src/lib/utils.js)
`cn()` utility fonksiyonu (classname merger)

---

### Frontend - Authentication & Context

#### [NEW] [src/contexts/AuthContext.jsx](file:///c:/full-pm/frontend/src/contexts/AuthContext.jsx)
Auth state yönetimi:
- Login/logout fonksiyonları
- Token storage (localStorage)
- User state
- Protected route kontrolü

#### [NEW] [src/api/axios.js](file:///c:/full-pm/frontend/src/api/axios.js)
Axios instance ile interceptor:
- Base URL yapılandırması
- Authorization header otomatik ekleme
- Token refresh logic (opsiyonel)

#### [NEW] [src/components/ProtectedRoute.jsx](file:///c:/full-pm/frontend/src/components/ProtectedRoute.jsx)
Auth kontrolü yapan route wrapper

---

### Frontend - Authentication Pages

#### [NEW] [src/pages/Login.jsx](file:///c:/full-pm/frontend/src/pages/Login.jsx)
Modern login sayfası:
- Email/password ile giriş formu
- "Google ile Giriş" butonu
- Register sayfasına link
- Form validation
- Error handling

#### [NEW] [src/pages/Register.jsx](file:///c:/full-pm/frontend/src/pages/Register.jsx)
Modern kayıt sayfası:
- Username, email, password formları
- "Google ile Kayıt Ol" butonu
- Login sayfasına link
- Password strength indicator
- Form validation

---

### Frontend - Dashboard Layout

#### [NEW] [src/components/layout/DashboardLayout.jsx](file:///c:/full-pm/frontend/src/components/layout/DashboardLayout.jsx)
Ana dashboard layout:
- Header
- Sidebar
- Main content area
- Responsive design (mobile'da collapsible sidebar)

#### [NEW] [src/components/layout/Header.jsx](file:///c:/full-pm/frontend/src/components/layout/Header.jsx)
Dashboard header:
- Logo/başlık
- Search bar (opsiyonel)
- User dropdown menu (profil, ayarlar, çıkış)
- Bildirimler
- Mobile menu toggle

#### [NEW] [src/components/layout/Sidebar.jsx](file:///c:/full-pm/frontend/src/components/layout/Sidebar.jsx)
Sidebar navigasyon:
- Dashboard
- Projelerim
- Tüm Projeler
- Yeni Proje
- Profil
- Ayarlar
- Active link highlighting

---

### Frontend - Dashboard Home

#### [NEW] [src/pages/Dashboard.jsx](file:///c:/full-pm/frontend/src/pages/Dashboard.jsx)
Dashboard ana sayfası:
- İstatistik kartları (toplam proje, aktif task, tamamlanan task)
- Son aktiviteler timeline
- Task durumu grafiği (Recharts ile)
- Hızlı aksiyonlar
- "Projem yok" durumu için empty state

#### [NEW] [src/components/dashboard/StatCard.jsx](file:///c:/full-pm/frontend/src/components/dashboard/StatCard.jsx)
İstatistik kartı komponenti

#### [NEW] [src/components/dashboard/ActivityFeed.jsx](file:///c:/full-pm/frontend/src/components/dashboard/ActivityFeed.jsx)
Aktivite feed komponenti

---

### Frontend - Proje Yönetimi

#### [NEW] [src/pages/Projects.jsx](file:///c:/full-pm/frontend/src/pages/Projects.jsx)
Projeleri listeleme sayfası:
- Grid/liste görünümü toggle
- Proje kartları
- Arama/filtreleme
- "Yeni Proje" butonu
- Empty state

#### [NEW] [src/pages/ProjectDetail.jsx](file:///c:/full-pm/frontend/src/pages/ProjectDetail.jsx)
Proje detay sayfası:
- Proje bilgileri
- Üye listesi (admin ise üye ekle butonu)
- Task listesi
- Proje istatistikleri
- Tabs: Overview, Tasks, Members, Settings

#### [NEW] [src/pages/CreateProject.jsx](file:///c:/full-pm/frontend/src/pages/CreateProject.jsx)
Proje oluşturma sayfası/modalı:
- Proje adı ve açıklama
- Form validation
- API entegrasyonu

#### [NEW] [src/components/project/ProjectCard.jsx](file:///c:/full-pm/frontend/src/components/project/ProjectCard.jsx)
Proje kartı komponenti

#### [NEW] [src/components/project/AddMemberDialog.jsx](file:///c:/full-pm/frontend/src/components/project/AddMemberDialog.jsx)
Üye ekleme modal komponenti

---

### Frontend - Task Yönetimi

#### [NEW] [src/components/task/TaskList.jsx](file:///c:/full-pm/frontend/src/components/task/TaskList.jsx)
Task listesi:
- Kanban board görünümü (Todo, In Progress, Done)
- Liste görünümü
- Drag & drop (opsiyonel)

#### [NEW] [src/components/task/TaskCard.jsx](file:///c:/full-pm/frontend/src/components/task/TaskCard.jsx)
Task kartı komponenti

#### [NEW] [src/components/task/CreateTaskDialog.jsx](file:///c:/full-pm/frontend/src/components/task/CreateTaskDialog.jsx)
Task oluşturma modal:
- Başlık, açıklama
- Atanacak üye seçimi
- Form validation

#### [NEW] [src/components/task/TaskDetailDialog.jsx](file:///c:/full-pm/frontend/src/components/task/TaskDetailDialog.jsx)
Task detay modal:
- Task bilgileri
- Durum güncelleme
- Edit mode

---

### Frontend - Profil ve Ayarlar

#### [NEW] [src/pages/Profile.jsx](file:///c:/full-pm/frontend/src/pages/Profile.jsx)
Kullanıcı profil sayfası:
- Profil bilgileri
- Düzenleme formu
- Şifre değiştirme

---

### Frontend - Router

#### [MODIFY] [src/App.jsx](file:///c:/full-pm/frontend/src/App.jsx)
React Router yapılandırması:
- Public routes (login, register)
- Protected routes (dashboard ve diğerleri)
- Layout wrapper

## Verification Plan

### Automated Tests

Backend Google OAuth testi (manuel):
```bash
cd pm-app-main
npm install
# .env dosyasına Google credentials ekle
npm run dev
# Postman ile test et veya browser'da /api/auth/google'a git
```

Frontend build testi:
```bash
cd frontend
npm install
npm run build
# Build başarılı olmalı
```

### Manual Verification

1. **Backend Başlatma**:
   ```bash
   cd pm-app-main
   npm run dev
   # Port 3000'de başlamalı
   ```

2. **Frontend Başlatma**:
   ```bash
   cd frontend
   npm run dev
   # Port 5173'te başlamalı
   ```

3. **Authentication Flow**:
   - Login sayfasına git
   - Email/password ile giriş yap
   - Dashboard'a yönlendirilmeli
   - Google ile giriş butonuna tıkla
   - Google auth flow çalışmalı
   - Logout yap ve tekrar login sayfasına dönmeli

4. **Proje Yönetimi**:
   - "Yeni Proje" oluştur
   - Projeler listesinde görünmeli
   - Proje detayına git
   - Üye ekle (başka bir kullanıcının email'i ile)

5. **Task Yönetimi**:
   - Proje detayında "Yeni Task" oluştur
   - Task'ı bir üyeye ata
   - Task durumunu güncelle (todo -> in-progress -> done)
   - Task detaylarını görüntüle

6. **Responsive Test**:
   - Browser'ı küçült (mobile view)
   - Sidebar collapse olmalı
   - Mobile menu çalışmalı
   - Tüm sayfalar responsive olmalı

7. **Dashboard İstatistikleri**:
   - Dashboard'da proje sayısı doğru gösterilmeli
   - Task istatistikleri doğru olmalı
   - Grafikler render olmalı

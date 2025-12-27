# ProManage - Proje Yönetim Uygulaması

Bu proje, takımların projelerini ve görevlerini organize etmelerine yardımcı olan modern bir proje yönetim aracıdır.

## 📁 Proje Yapısı

Proje iki ana klasörden oluşur:

*   **`pm-app-main`**: Backend (Node.js, Express, MongoDB)
*   **`frontend`**: Frontend (React, Vite, Tailwind CSS)

## 🚀 Kurulum ve Çalıştırma

Projeyi çalıştırmak için hem Frontend hem de Backend uygulamalarını ayrı terminallerde ayağa kaldırmanız gerekmektedir.

### Ön Gereksinimler

*   [Node.js](https://nodejs.org/) (v16 veya üzeri önerilir)
*   [MongoDB](https://www.mongodb.com/) (Yerel kurulum veya MongoDB Atlas URL'si)

---

### 1. Backend Kurulumu (`pm-app-main`)

1.  Backend klasörüne gidin:
    ```bash
    cd pm-app-main
    ```

2.  Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```

3.  `.env` dosyasını oluşturun:
    *   `.env.example` dosyasının adını `.env` olarak değiştirin veya içeriğini yeni bir `.env` dosyasına kopyalayın.
    *   Gerekli alanları doldurun (Özellikle `MONGO_URI`):
        ```env
        PORT=3000
        MONGO_URI=mongodb://localhost:27017/pm-app  # Veya Atlas URL'niz
        JWT_SECRET=gizli_anahtariniz
        ```

4.  Sunucuyu başlatın:
    ```bash
    npm run dev
    ```
    *Terminalde "Server running on port 3000" ve "MongoDB connected" yazılarını görmelisiniz.*

---

### 2. Frontend Kurulumu (`frontend`)

1.  Yeni bir terminal açın ve Frontend klasörüne gidin:
    ```bash
    cd frontend
    ```

2.  Gerekli paketleri yükleyin:
    ```bash
    npm install
    ```

3.  `.env` dosyasını kontrol edin:
    *   Projede `.env` dosyası olduğundan ve `VITE_API_URL=http://localhost:3000/api` ayarının yapıldığından emin olun.

4.  Uygulamayı başlatın:
    ```bash
    npm run dev
    ```
    *Uygulama genellikle `http://localhost:5173` adresinde çalışacaktır.*

---

## ✨ Özellikler

*   **Kullanıcı Yönetimi**: Kayıt olma, giriş yapma, profil düzenleme ve profil fotoğrafı ekleme.
*   **Proje Yönetimi**: Proje oluşturma, açıklama ekleme, üye davet etme.
*   **Görev Takibi**:
    *   Görev oluşturma (Başlık, açıklama, öncelik, bitiş tarihi).
    *   Görev durumlarını güncelleme (Yapılacak -> Devam Ediyor -> Tamamlandı).
    *   Görev filtreleme ve arama.
*   **Rol Yönetimi**: Proje adminleri ve üyeleri ayrımı. Sadece adminler üye ekleyebilir ve projeyi düzenleyebilir.
*   **Dashboard**: Aktif projeler, görev istatistikleri ve hızlı erişim menüsü.

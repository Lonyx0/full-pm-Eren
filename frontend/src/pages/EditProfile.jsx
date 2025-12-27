import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import api from '../api/axios';

const EditProfile = () => {
    const navigate = useNavigate();
    const { user, login } = useAuth(); // login function might be needed if token needs refresh, for now just user
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        profilePicture: '',
        currentPassword: '',
        newPassword: '',
    });

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                username: user.username || '',
                email: user.email || '',
                profilePicture: user.profilePicture || ''
            }));
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const updateData = {
                username: formData.username,
                email: formData.email,
                profilePicture: formData.profilePicture
            };

            if (formData.newPassword) {
                updateData.password = formData.newPassword;
            }

            const response = await api.patch('/auth/update', updateData);

            // If username/email changed, we might need to update local storage user or trigger re-fetch
            // For now, let's assume a hard refresh or navigation will handle it, 
            // but ideally we should update the context. 
            // Since AuthContext fetches /me on load/mount, navigating away might be enough if we force reload or if context updates.
            // Let's manually updaet local storage user if used, but AuthContext relies on token.
            // A simple page reload on success is a crude but effective way to sync context if we don't expose a setUser method.

            alert('Profil güncellendi!');
            window.location.href = '/dashboard/profile';

        } catch (error) {
            console.error('Update required', error);
            alert(error.response?.data?.message || 'Güncelleme başarısız');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profili Düzenle</h1>
                <p className="text-muted-foreground">
                    Kişisel bilgilerinizi güncelleyin
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profil Bilgileri
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center gap-4 mb-4">
                            {formData.profilePicture && (
                                <img
                                    src={formData.profilePicture}
                                    alt="Preview"
                                    className="w-16 h-16 rounded-full object-cover border-2 border-border"
                                />
                            )}
                            <div className="flex-1 grid gap-2">
                                <Label htmlFor="profilePicture">Profil Fotoğrafı URL</Label>
                                <Input
                                    id="profilePicture"
                                    value={formData.profilePicture}
                                    onChange={(e) => setFormData({ ...formData, profilePicture: e.target.value })}
                                    placeholder="https://example.com/avatar.jpg"
                                />
                                <p className="text-xs text-muted-foreground">Resim bağlantısı yapıştırın (.jpg, .png)</p>
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="username">Kullanıcı Adı</Label>
                            <Input
                                id="username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                placeholder="Kullanıcı adınız"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="ornek@email.com"
                            />
                        </div>

                        <div className="grid gap-2 pt-4 border-t">
                            <Label>Şifre Değiştir (İsteğe bağlı)</Label>
                            <div className="grid gap-2">
                                <Input
                                    type="password"
                                    placeholder="Yeni Şifre"
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => navigate('/dashboard/profile')}>
                                İptal
                            </Button>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditProfile;

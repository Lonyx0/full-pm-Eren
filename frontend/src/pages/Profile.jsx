import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
        <p className="text-muted-foreground">
          Hesap bilgilerinizi görüntüleyin
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            {user?.profilePicture ? (
              <img
                src={user.profilePicture}
                alt={user.username}
                className="h-16 w-16 rounded-full object-cover border-2 border-border"
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-8 w-8 text-muted-foreground" />
              </div>
            )}
            <div>
              <span>Kullanıcı Bilgileri</span>
              {user?.profilePicture && <p className="text-xs font-normal text-muted-foreground mt-1">Profil fotoğrafı ayarlandı</p>}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Kullanıcı Adı</p>
              <p className="text-lg">{user?.username || '-'}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-lg">{user?.email || '-'}</p>
            </div>
            <div className="pt-4">
              <Button asChild variant="outline">
                <Link to="/dashboard/profile/edit">Profili Düzenle</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;

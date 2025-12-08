import { NavLink } from 'react-router-dom';
import { X, LayoutDashboard, FolderKanban, Plus, User, Sparkles } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ui/button';

const Sidebar = ({ isOpen, onClose }) => {
  const navSections = [
    {
      title: 'WORKSPACE',
      items: [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null }
      ]
    },
    {
      title: 'PROJELER',
      items: [
        { to: '/dashboard/projects', icon: FolderKanban, label: 'Tüm Projeler', badge: null },
        { to: '/dashboard/projects/new', icon: Plus, label: 'Yeni Proje', badge: 'New' },
      ]
    },
    {
      title: 'AYARLAR',
      items: [
        { to: '/dashboard/profile', icon: User, label: 'Profil', badge: null }
      ]
    }
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in" 
          onClick={onClose} 
        />
      )}
      <aside 
        className={cn(
          "fixed top-16 left-0 bottom-0 w-64 glass border-r border-neutral-200/50 transition-all duration-300 z-40 shadow-elegant",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-neutral-200/50">
            <span className="font-display font-semibold">Menu</span>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-red-50 hover:text-red-600">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-8 overflow-y-auto">
            {navSections.map((section, i) => (
              <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 100}ms` }}>
                <h3 className="text-xs font-semibold text-neutral-500 mb-3 px-3 tracking-wider">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) => cn(
                        "group flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative overflow-hidden",
                        isActive 
                          ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg" 
                          : "text-neutral-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3">
                            <item.icon className={cn(
                              "h-5 w-5 transition-transform duration-200",
                              isActive ? "scale-110" : "group-hover:scale-110"
                            )} />
                            <span className="font-medium">{item.label}</span>
                          </div>
                          {item.badge && (
                            <span className={cn(
                              "text-xs px-2 py-0.5 rounded-full font-semibold",
                              isActive 
                                ? "bg-white/20 text-white" 
                                : "bg-gray-200 text-gray-900"
                            )}>
                              {item.badge}
                            </span>
                          )}
                          {isActive && (
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-200/50 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="p-4 bg-white/50 rounded-xl border border-gray-300 text-center">
              <div className="inline-flex p-2 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg mb-2">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <p className="text-xs font-semibold text-neutral-700 mb-1">ProManage</p>
              <p className="text-xs text-neutral-500">v1.0.0</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

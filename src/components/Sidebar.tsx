import { Home, BookOpen, User, Settings, GraduationCap, LogOut, BarChart3, MessageCircle, Building2, FileText, Calendar, CheckCircle2, Users, Bell, CreditCard } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: 'student' | 'teacher' | 'counsellor';
  onLogout: () => void;
}

export function Sidebar({ currentPage, onNavigate, userRole, onLogout }: SidebarProps) {
  const studentMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'study-plans', label: 'Study Plans', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'doubt-solving', label: 'Doubt Solving', icon: MessageCircle },
    { id: 'university-applications', label: 'Applications', icon: Building2 },
    { id: 'document-center', label: 'Documents', icon: FileText },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  const teacherMenuItems = [
    { id: 'teacher-dashboard', label: 'Dashboard', icon: Home },
    { id: 'teacher-validation', label: 'Validation Queue', icon: CheckCircle2 },
    { id: 'teacher-analytics', label: 'Analytics', icon: BarChart3 },
  ];

  const counsellorMenuItems = [
    { id: 'counsellor-dashboard', label: 'Dashboard', icon: Home },
    { id: 'counsellor-students', label: 'Students', icon: Users },
    { id: 'counsellor-documents', label: 'Documents', icon: FileText },
    { id: 'counsellor-applications', label: 'Applications', icon: Building2 },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case 'teacher':
        return teacherMenuItems;
      case 'counsellor':
        return counsellorMenuItems;
      default:
        return studentMenuItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col px-6 py-8 z-50">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">PARHAIPARTNER</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Common Actions */}
      <div className="space-y-1 pt-4 border-t border-gray-100">
        {userRole === 'student' && (
          <>
            <button
              onClick={() => onNavigate('notifications')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                currentPage === 'notifications'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
            <button
              onClick={() => onNavigate('payments')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                currentPage === 'payments'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span>Payments</span>
            </button>
          </>
        )}
        <button
          onClick={() => onNavigate('profile')}
          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
            currentPage === 'profile'
              ? 'bg-purple-600 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <User className="w-5 h-5" />
          <span>Profile</span>
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all text-sm"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

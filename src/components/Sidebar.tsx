import { Home, BookOpen, GraduationCap, LogOut, BarChart3, MessageCircle, Building2, FileText, Calendar, CheckCircle2, Users } from 'lucide-react';

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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-100 flex flex-col px-6 py-8 z-50" aria-label="Main navigation">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center" aria-hidden="true">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-900">PARHAIPARTNER</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto" aria-label="Primary navigation">
        <ul className="space-y-1" role="list">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  aria-label={`Navigate to ${item.label}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Common Actions */}
      <div className="space-y-1 pt-4 border-t border-gray-100" aria-label="User actions">
        <button
          onClick={onLogout}
          aria-label="Log out of your account"
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
        >
          <LogOut className="w-5 h-5" aria-hidden="true" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

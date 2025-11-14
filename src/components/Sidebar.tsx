import { Home, BookOpen, GraduationCap, LogOut, BarChart3, Building2, FileText, Calendar, CheckCircle2, Users, Settings, UserCheck, User } from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: 'student' | 'teacher' | 'counsellor';
  onLogout: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: typeof Home;
  isAction?: boolean; // For items like logout that don't navigate
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

export function Sidebar({ currentPage, onNavigate, userRole, onLogout }: SidebarProps) {
  // Student menu organized in groups
  const studentMenuGroups: MenuGroup[] = [
    {
      title: 'Learning',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'study-plans', label: 'Study Plans', icon: BookOpen },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
      ],
    },
    {
      title: 'Applications & Documents',
      items: [
        { id: 'university-applications', label: 'Applications', icon: Building2 },
        { id: 'document-center', label: 'Documents', icon: FileText },
      ],
    },
    {
      title: 'Connections',
      items: [
        { id: 'teacher-connection', label: 'Teacher', icon: UserCheck },
        { id: 'counsellor-connection', label: 'Counsellor', icon: Users },
      ],
    },
  ];

  const teacherMenuGroups: MenuGroup[] = [
    {
      title: 'Overview',
      items: [
        { id: 'teacher-dashboard', label: 'Dashboard', icon: Home },
        { id: 'teacher-analytics', label: 'Analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'Validation',
      items: [
        { id: 'teacher-validation', label: 'Validation Queue', icon: CheckCircle2 },
      ],
    },
  ];

  const counsellorMenuGroups: MenuGroup[] = [
    {
      title: 'Overview',
      items: [
        { id: 'counsellor-dashboard', label: 'Dashboard', icon: Home },
      ],
    },
    {
      title: 'Management',
      items: [
        { id: 'counsellor-students', label: 'Students', icon: Users },
        { id: 'counsellor-documents', label: 'Documents', icon: FileText },
        { id: 'counsellor-applications', label: 'Applications', icon: Building2 },
      ],
    },
  ];

  const getMenuGroups = (): MenuGroup[] => {
    switch (userRole) {
      case 'teacher':
        return teacherMenuGroups;
      case 'counsellor':
        return counsellorMenuGroups;
      default:
        return studentMenuGroups;
    }
  };

  const menuGroups = getMenuGroups();

  // Settings group (same for all roles)
  const settingsGroup: MenuGroup = {
    title: 'Settings',
    items: [
      { id: 'profile', label: 'Profile', icon: User },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'logout', label: 'Logout', icon: LogOut, isAction: true },
    ],
  };

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
        <div className="space-y-6">
          {menuGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-2">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-1" role="list">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;
                  const isLogout = item.id === 'logout';
                  
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          if (item.isAction && item.id === 'logout') {
                            onLogout();
                          } else {
                            onNavigate(item.id);
                          }
                        }}
                        aria-label={isLogout ? 'Log out of your account' : `Navigate to ${item.label}`}
                        aria-current={isActive ? 'page' : undefined}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                          isLogout
                            ? 'text-red-600 hover:bg-red-50 focus-visible:ring-red-600'
                            : isActive
                            ? 'bg-purple-50 text-purple-600 hover:bg-purple-100 focus-visible:ring-purple-600'
                            : 'text-gray-600 hover:bg-gray-50 focus-visible:ring-purple-600'
                        }`}
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0 ${
                          isLogout 
                            ? 'text-red-600' 
                            : isActive 
                            ? 'text-purple-600' 
                            : 'text-gray-500'
                        }`} aria-hidden="true" />
                        <span className={isActive && !isLogout ? 'font-medium' : 'font-normal'}>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      {/* Settings Group at Bottom */}
      <div className="pt-6 border-t border-gray-100" aria-label="Settings">
        <div className="space-y-2">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {settingsGroup.title}
          </h3>
          <ul className="space-y-1" role="list">
            {settingsGroup.items.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              const isLogout = item.id === 'logout';
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (item.isAction && item.id === 'logout') {
                        onLogout();
                      } else {
                        onNavigate(item.id);
                      }
                    }}
                    aria-label={isLogout ? 'Log out of your account' : `Navigate to ${item.label}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isLogout
                        ? 'text-red-600 hover:bg-red-50 focus-visible:ring-red-600'
                        : isActive
                        ? 'bg-purple-50 text-purple-600 hover:bg-purple-100 focus-visible:ring-purple-600'
                        : 'text-gray-600 hover:bg-gray-50 focus-visible:ring-purple-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${
                      isLogout 
                        ? 'text-red-600' 
                        : isActive 
                        ? 'text-purple-600' 
                        : 'text-gray-500'
                    }`} aria-hidden="true" />
                    <span className={isActive && !isLogout ? 'font-medium' : 'font-normal'}>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

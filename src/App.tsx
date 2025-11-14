import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { StudyPlans } from './components/StudyPlans';
import { StudyPlanDetail } from './components/StudyPlanDetail';
import { QuizTaking } from './components/QuizTaking';
import { QuizResults } from './components/QuizResults';
import { Profile } from './components/Profile';
import { Sidebar } from './components/Sidebar';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { Analytics } from './components/Analytics';
import { DoubtSolving } from './components/DoubtSolving';
import { UniversityApplications } from './components/UniversityApplications';
import { DocumentCenter } from './components/DocumentCenter';
import { Calendar } from './components/Calendar';
import { TeacherDashboard } from './components/Teacher/TeacherDashboard';
import { CounsellorDashboard } from './components/Counsellor/CounsellorDashboard';
import { Notifications } from './components/Notifications';
import { Payments } from './components/Payments';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'counsellor'>('student');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [quizResults, setQuizResults] = useState<any>(null);

  const handleLogin = (role: string) => {
    setUserRole(role as 'student' | 'teacher' | 'counsellor');
    setIsAuthenticated(true);
  };

  const handleRegister = (role: string) => {
    setUserRole(role as 'student' | 'teacher' | 'counsellor');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('dashboard');
    setAuthView('login');
  };

  const handleNavigate = (page: string, planId?: string) => {
    setCurrentPage(page);
    if (planId) setSelectedPlanId(planId);
  };

  const handleStartQuiz = (quiz: any) => {
    setCurrentQuiz(quiz);
    setCurrentPage('quiz-taking');
  };

  const handleQuizSubmit = (results: any) => {
    setQuizResults(results);
    setCurrentPage('quiz-results');
  };

  const handleBackToPlan = () => {
    setCurrentPage('plan-detail');
  };

  if (!isAuthenticated) {
    return authView === 'login' ? (
      <Login onLogin={handleLogin} onSwitchToRegister={() => setAuthView('register')} />
    ) : (
      <Register onRegister={handleRegister} onSwitchToLogin={() => setAuthView('login')} />
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      <Sidebar 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        userRole={userRole}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 ml-64 bg-gray-50/50">
        {currentPage === 'dashboard' && (
          <Dashboard onNavigate={handleNavigate} userRole={userRole} />
        )}
        
        {currentPage === 'study-plans' && (
          <StudyPlans onNavigate={handleNavigate} />
        )}
        
        {currentPage === 'plan-detail' && selectedPlanId && (
          <StudyPlanDetail 
            planId={selectedPlanId} 
            onStartQuiz={handleStartQuiz}
            onBack={() => handleNavigate('study-plans')}
          />
        )}
        
        {currentPage === 'quiz-taking' && currentQuiz && (
          <QuizTaking 
            quiz={currentQuiz} 
            onSubmit={handleQuizSubmit}
            onCancel={handleBackToPlan}
          />
        )}
        
        {currentPage === 'quiz-results' && quizResults && (
          <QuizResults 
            results={quizResults}
            onBackToPlan={handleBackToPlan}
          />
        )}
        
        {currentPage === 'profile' && (
          <Profile />
        )}

        {currentPage === 'analytics' && (
          <Analytics />
        )}

        {currentPage === 'doubt-solving' && (
          <DoubtSolving />
        )}

        {currentPage === 'university-applications' && (
          <UniversityApplications />
        )}

        {currentPage === 'document-center' && (
          <DocumentCenter />
        )}

        {currentPage === 'calendar' && (
          <Calendar />
        )}

        {currentPage === 'teacher-dashboard' && (
          <TeacherDashboard />
        )}

        {currentPage === 'teacher-validation' && (
          <TeacherDashboard />
        )}

        {currentPage === 'teacher-analytics' && (
          <TeacherDashboard />
        )}

        {currentPage === 'counsellor-dashboard' && (
          <CounsellorDashboard />
        )}

        {currentPage === 'counsellor-students' && (
          <CounsellorDashboard />
        )}

        {currentPage === 'counsellor-documents' && (
          <CounsellorDashboard />
        )}

        {currentPage === 'counsellor-applications' && (
          <CounsellorDashboard />
        )}

        {currentPage === 'notifications' && (
          <Notifications />
        )}

        {currentPage === 'payments' && (
          <Payments />
        )}

        {currentPage === 'teacher-connection' && (
          <div className="p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">My Teacher</h1>
            <p className="text-gray-600">View your connected teacher and their feedback</p>
            {/* Teacher connection page content can be added here */}
          </div>
        )}

        {currentPage === 'counsellor-connection' && (
          <div className="p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">My Counsellor</h1>
            <p className="text-gray-600">View your connected counsellor and application guidance</p>
            {/* Counsellor connection page content can be added here */}
          </div>
        )}

        {currentPage === 'settings' && (
          <div className="p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Settings</h1>
            <p className="text-gray-600">Manage your account settings and preferences</p>
            {/* Settings page content can be added here */}
          </div>
        )}
      </main>
    </div>
  );
}
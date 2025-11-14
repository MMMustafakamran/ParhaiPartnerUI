import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { StudyPlans } from './components/StudyPlans';
import { StudyPlanDetail } from './components/StudyPlanDetail';
import { QuizTaking } from './components/QuizTaking';
import { QuizResults } from './components/QuizResults';
import { Profile } from './components/Profile';
import { Sidebar } from './components/Sidebar';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [quizResults, setQuizResults] = useState<any>(null);

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

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-1 ml-64 bg-gray-50/50">
        {currentPage === 'dashboard' && (
          <Dashboard onNavigate={handleNavigate} />
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
      </main>
    </div>
  );
}
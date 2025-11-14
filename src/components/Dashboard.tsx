import { BookOpen, Trophy, Target, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { NotificationDropdown } from './NotificationDropdown';

interface DashboardProps {
  onNavigate: (page: string, planId?: string) => void;
  userRole?: 'student' | 'teacher' | 'counsellor';
}

export function Dashboard({ onNavigate, userRole = 'student' }: DashboardProps) {
  const stats = [
    { label: 'Study Plans', value: '3', icon: BookOpen },
    { label: 'Quizzes Taken', value: '12', icon: Trophy },
    { label: 'Topics Done', value: '24', icon: Target },
  ];

  const activePlans = [
    {
      id: '1',
      watched: '2/5 Watched',
      title: 'NUST NET Engineering Prep',
      progress: 65,
    },
    {
      id: '2',
      watched: '2/8 Watched',
      title: 'MDCAT Biology Revision',
      progress: 40,
    },
    {
      id: '3',
      watched: '2/6 Watched',
      title: 'Mathematics Advanced',
      progress: 85,
    },
  ];

  const upcomingTests = [
    { name: 'NUST NET', date: 'Dec 15, 2025' },
    { name: 'MDCAT', date: 'Jan 10, 2026' },
  ];

  return (
    <main className="p-8 max-w-7xl" role="main">
      {/* Header with Search */}
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Good Morning, Ali</h1>
          <p className="text-sm text-gray-600">Continue Your Journey And Achieve Your Target</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            aria-label="View achievements"
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
          >
            <Trophy className="w-5 h-5 text-gray-600" aria-hidden="true" />
          </button>
          <NotificationDropdown onViewAll={() => onNavigate('notifications')} />
          <button
            onClick={() => onNavigate('profile')}
            aria-label="View profile"
            className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white hover:from-purple-500 hover:to-blue-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
          >
            <span className="text-sm font-medium" aria-hidden="true">AS</span>
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="mb-8" aria-label="Hero banner">
        <div className="relative rounded-3xl bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl" aria-hidden="true"></div>
          <div className="relative z-10">
            <Badge className="bg-white/20 text-white border-0 mb-4 hover:bg-white/20" aria-label="Online learning badge">ONLINE LEARNING</Badge>
            <h2 className="text-2xl font-semibold text-white mb-6 max-w-md">Sharpen Your Skills With<br />Professional Exam Prep</h2>
            <Button 
              className="bg-white text-purple-600 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-purple-600"
              onClick={() => onNavigate('study-plans')}
              aria-label="Start learning - navigate to study plans"
            >
              Start Learning
              <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="grid grid-cols-3 gap-4 mb-8" aria-label="Statistics">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center" aria-hidden="true">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                    <p className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Continue Learning */}
        <section className="col-span-2" aria-label="Continue learning">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
            <button 
              className="text-sm text-purple-600 hover:text-purple-700 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 rounded"
              onClick={() => onNavigate('study-plans')}
              aria-label="View all study plans"
            >
              See All
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-4" role="list">
            {activePlans.map((plan) => (
              <Card
                key={plan.id}
                className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => onNavigate('plan-detail', plan.id)}
                role="listitem"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigate('plan-detail', plan.id);
                  }
                }}
                aria-label={`Open ${plan.title} study plan`}
              >
                <CardContent className="p-0">
                  <div className="h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-t-xl flex items-center justify-center relative overflow-hidden" aria-hidden="true">
                    <BookOpen className="w-12 h-12 text-purple-400" />
                    <div className="absolute top-3 right-3">
                      <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                        <span className="text-xs" aria-hidden="true">📚</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs" aria-label="Status: Studying">STUDYING</Badge>
                    <h3 className="text-sm font-medium text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {plan.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200" aria-hidden="true"></div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">{plan.watched}</p>
                      </div>
                    </div>
                    <div className="mb-1">
                      <Progress value={plan.progress} className="h-1" aria-label={`Progress: ${plan.progress}%`} />
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{plan.progress}% Complete</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Right Column - Upcoming Tests */}
        <aside aria-label="Upcoming tests">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Tests</h2>
          </div>
          
          <div className="space-y-3" role="list">
            {upcomingTests.map((test, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow" role="listitem">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center" aria-hidden="true">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{test.name}</h3>
                      <p className="text-xs text-gray-600 mt-1">{test.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 mt-4 focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
              onClick={() => onNavigate('study-plans')}
              aria-label="Create a new study plan"
            >
              <Sparkles className="w-4 h-4 mr-2" aria-hidden="true" />
              Create Study Plan
            </Button>
          </div>
        </aside>
      </div>
    </main>
  );
}


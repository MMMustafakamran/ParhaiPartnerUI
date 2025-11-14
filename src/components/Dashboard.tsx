import { BookOpen, Trophy, Target, Clock, ChevronRight, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

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
    <div className="p-8 max-w-7xl">
      {/* Header with Search */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-1">Good Morning, Ali</h1>
          <p className="text-sm text-gray-500">Continue Your Journey And Achieve Your Target</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
            <Trophy className="w-5 h-5 text-gray-600" />
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white cursor-pointer">
            AS
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="mb-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 p-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <Badge className="bg-white/20 text-white border-0 mb-4 hover:bg-white/20">ONLINE LEARNING</Badge>
            <h2 className="text-white mb-6 max-w-md">Sharpen Your Skills With<br />Professional Exam Prep</h2>
            <Button className="bg-white text-purple-600 hover:bg-gray-100">
              Start Learning
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Continue Learning */}
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900">Continue Learning</h3>
            <button className="text-sm text-purple-600 hover:text-purple-700">See All</button>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {activePlans.map((plan) => (
              <Card
                key={plan.id}
                className="border-0 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => onNavigate('plan-detail', plan.id)}
              >
                <CardContent className="p-0">
                  <div className="h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                    <BookOpen className="w-12 h-12 text-purple-400" />
                    <div className="absolute top-3 right-3">
                      <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                        <span className="text-xs">📚</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Badge variant="secondary" className="mb-2 text-xs">STUDYING</Badge>
                    <h4 className="text-sm text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {plan.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200"></div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">{plan.watched}</p>
                      </div>
                    </div>
                    <Progress value={plan.progress} className="h-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column - Upcoming Tests */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-900">Upcoming Tests</h3>
          </div>
          
          <div className="space-y-3">
            {upcomingTests.map((test, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm text-gray-900">{test.name}</h4>
                      <p className="text-xs text-gray-500">{test.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Button 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 mt-4"
              onClick={() => onNavigate('study-plans')}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Study Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

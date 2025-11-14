import { useState } from 'react';
import { Plus, Sparkles, Search, BookOpen, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CreatePlanModal } from './CreatePlanModal';

interface StudyPlansProps {
  onNavigate: (page: string, planId?: string) => void;
}

export function StudyPlans({ onNavigate }: StudyPlansProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const studyPlans = [
    {
      id: '1',
      title: 'NUST NET Engineering Prep',
      subject: 'Physics',
      testType: 'NUST NET',
      progress: 65,
      watched: '2/5',
      status: 'active',
    },
    {
      id: '2',
      title: 'MDCAT Biology Revision',
      subject: 'Biology',
      testType: 'MDCAT',
      progress: 40,
      watched: '2/8',
      status: 'active',
    },
    {
      id: '3',
      title: 'Mathematics Advanced',
      subject: 'Mathematics',
      testType: 'ECAT',
      progress: 85,
      watched: '2/6',
      status: 'active',
    },
    {
      id: '4',
      title: 'Chemistry Complete Revision',
      subject: 'Chemistry',
      testType: 'MDCAT',
      progress: 100,
      watched: '5/5',
      status: 'completed',
    },
  ];

  const filteredPlans = studyPlans.filter(plan => {
    const matchesSearch = plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plan.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="p-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-gray-900 mb-1">Study Plans</h1>
          <p className="text-sm text-gray-500">Manage your personalized study plans</p>
        </div>
        <Button
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          onClick={() => setShowCreateModal(true)}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search your plans..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-gray-200"
          />
        </div>
      </div>

      {/* Study Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlans.map((plan) => (
          <Card
            key={plan.id}
            className="border-0 shadow-sm hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => onNavigate('plan-detail', plan.id)}
          >
            <CardContent className="p-0">
              <div className="h-40 bg-gradient-to-br from-purple-100 to-blue-100 rounded-t-xl flex items-center justify-center relative overflow-hidden">
                <BookOpen className="w-16 h-16 text-purple-400" />
                <div className="absolute top-3 right-3">
                  <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
                    <span className="text-xs">📚</span>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Badge 
                    variant={plan.status === 'completed' ? 'default' : 'secondary'}
                    className={`text-xs ${plan.status === 'completed' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}`}
                  >
                    {plan.status === 'completed' ? 'COMPLETED' : 'STUDYING'}
                  </Badge>
                </div>
                <h4 className="text-sm text-gray-900 mb-4 line-clamp-2 group-hover:text-purple-600 transition-colors min-h-[40px]">
                  {plan.title}
                </h4>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <Clock className="w-3 h-3 text-gray-500" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">{plan.watched} Watched</p>
                  </div>
                </div>
                <Progress value={plan.progress} className="h-1.5" />
                <p className="text-xs text-gray-500 mt-2">{plan.progress}% Complete</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlans.length === 0 && (
        <div className="text-center py-16">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-900 mb-2">No study plans found</h3>
          <p className="text-gray-500 mb-6">Create your first study plan to get started</p>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => setShowCreateModal(true)}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Create Study Plan
          </Button>
        </div>
      )}

      <CreatePlanModal 
        open={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </div>
  );
}

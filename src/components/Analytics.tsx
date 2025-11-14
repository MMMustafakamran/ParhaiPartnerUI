import { TrendingUp, TrendingDown, Target, Award, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

export function Analytics() {
  const overallStats = [
    { label: 'Average Score', value: '78%', trend: '+5%', positive: true, icon: Target },
    { label: 'Quizzes Taken', value: '24', trend: '+3', positive: true, icon: Award },
    { label: 'Topics Mastered', value: '18', trend: '+2', positive: true, icon: TrendingUp },
    { label: 'Weak Areas', value: '3', trend: '-1', positive: true, icon: AlertCircle },
  ];

  const subjectPerformance = [
    { subject: 'Physics', score: 85, trend: +8, weakTopics: ['Thermodynamics'] },
    { subject: 'Chemistry', score: 72, trend: -2, weakTopics: ['Organic Chemistry'] },
    { subject: 'Mathematics', score: 80, trend: +5, weakTopics: [] },
    { subject: 'Biology', score: 75, trend: +3, weakTopics: ['Genetics'] },
  ];

  const weakAreas = [
    { topic: 'Thermodynamics', subject: 'Physics', attempts: 5, avgScore: 45 },
    { topic: 'Organic Chemistry', subject: 'Chemistry', attempts: 4, avgScore: 52 },
    { topic: 'Genetics', subject: 'Biology', attempts: 3, avgScore: 58 },
  ];

  const recentTrends = [
    { date: 'Week 1', score: 65 },
    { date: 'Week 2', score: 70 },
    { date: 'Week 3', score: 72 },
    { date: 'Week 4', score: 75 },
    { date: 'Week 5', score: 78 },
  ];

  const predictedScore = 82;

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Analytics</h1>
        <p className="text-gray-600">Track your progress and identify areas for improvement</p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <Badge
                    variant="secondary"
                    className={stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                  >
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="weak-areas">Weak Areas</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {subjectPerformance.map((subject, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-gray-900">{subject.subject}</span>
                        <Badge
                          variant="secondary"
                          className={subject.trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                        >
                          {subject.trend > 0 ? '+' : ''}{subject.trend}%
                        </Badge>
                      </div>
                      <span className="text-gray-900 font-semibold">{subject.score}%</span>
                    </div>
                    <Progress value={subject.score} className="h-2" />
                    {subject.weakTopics.length > 0 && (
                      <p className="text-xs text-gray-500 mt-2">
                        Weak: {subject.weakTopics.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Weak Areas Tab */}
        <TabsContent value="weak-areas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Areas Needing Improvement</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weakAreas.map((area, index) => (
                  <div key={index} className="p-4 rounded-lg border border-orange-200 bg-orange-50">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{area.topic}</h4>
                        <p className="text-sm text-gray-600">{area.subject}</p>
                      </div>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        {area.avgScore}% avg
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mt-3">
                      <span>{area.attempts} attempts</span>
                      <span>•</span>
                      <span>Focus needed</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrends.map((trend, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-20 text-sm text-gray-600">{trend.date}</div>
                    <div className="flex-1">
                      <Progress value={trend.score} className="h-3" />
                    </div>
                    <div className="w-16 text-right text-sm font-medium text-gray-900">{trend.score}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Predicted Exam Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center mx-auto mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{predictedScore}%</div>
                    <div className="text-sm text-white opacity-90">Predicted</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Based on your recent performance and study patterns
                </p>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-gray-900 font-semibold">+4%</div>
                    <div className="text-gray-600">vs Last Month</div>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div className="text-center">
                    <div className="text-gray-900 font-semibold">On Track</div>
                    <div className="text-gray-600">Target: 80%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


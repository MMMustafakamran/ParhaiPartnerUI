import { TrendingUp, TrendingDown, Target, Award, AlertCircle, BarChart3, ArrowUpRight, ArrowDownRight, BookOpen, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

export function Analytics() {
  const overallStats = [
    { label: 'Average Score', value: '78%', trend: '+5%', positive: true, icon: Target, color: 'text-purple-600' },
    { label: 'Study Hours', value: '142h', trend: '+12h', positive: true, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Topics Mastered', value: '18', trend: '+2', positive: true, icon: TrendingUp, color: 'text-green-600' },
    { label: 'Weak Areas', value: '3', trend: '-1', positive: true, icon: AlertCircle, color: 'text-orange-600' },
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
    { week: 'Week 1', score: 65, quizzes: 4 },
    { week: 'Week 2', score: 70, quizzes: 5 },
    { week: 'Week 3', score: 72, quizzes: 6 },
    { week: 'Week 4', score: 75, quizzes: 5 },
    { week: 'Week 5', score: 78, quizzes: 6 },
    { week: 'Week 6', score: 80, quizzes: 7 },
  ];

  const predictedScore = 82;

  const chartConfig = {
    score: {
      label: 'Score',
      color: 'hsl(var(--chart-1))',
    },
    quizzes: {
      label: 'Quizzes',
      color: 'hsl(var(--chart-2))',
    },
  };

  const subjectChartData = subjectPerformance.map(subj => ({
    subject: subj.subject,
    score: subj.score,
    trend: subj.trend,
  }));

  const pieData = [
    { name: 'Excellent (80-100%)', value: 2, color: '#10b981' },
    { name: 'Good (60-79%)', value: 1, color: '#3b82f6' },
    { name: 'Needs Improvement (<60%)', value: 1, color: '#f59e0b' },
  ];

  return (
    <main className="p-8 max-w-7xl" role="main">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink 
              onClick={() => window.location.href = '#dashboard'}
              className="cursor-pointer hover:text-purple-600"
            >
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Analytics</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-sm text-gray-600">Track your progress and identify areas for improvement</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <BarChart3 className="w-3 h-3 mr-1" />
              Live Data
            </Badge>
          </div>
        </div>
      </header>

      {/* Overall Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8" aria-label="Overall statistics">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color === 'text-purple-600' ? 'from-purple-100 to-purple-200' : stat.color === 'text-blue-600' ? 'from-blue-100 to-blue-200' : stat.color === 'text-green-600' ? 'from-green-100 to-green-200' : 'from-orange-100 to-orange-200'} flex items-center justify-center`} aria-hidden="true">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${stat.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} flex items-center gap-1`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" aria-hidden="true" />
                    )}
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-semibold text-gray-900">{stat.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="weak-areas">Weak Areas</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Your scores across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <BarChart data={subjectChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                    <XAxis 
                      dataKey="subject" 
                      tick={{ fill: 'currentColor' }}
                      className="text-xs"
                    />
                    <YAxis 
                      domain={[0, 100]}
                      tick={{ fill: 'currentColor' }}
                      className="text-xs"
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="score" 
                      fill="var(--color-score)"
                      radius={[8, 8, 0, 0]}
                      className="fill-purple-600"
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Subject Details */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Breakdown</CardTitle>
                <CardDescription>Detailed view of each subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {subjectPerformance.map((subject, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-gray-900">{subject.subject}</span>
                          <Badge
                            variant="secondary"
                            className={`${subject.trend > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} flex items-center gap-1`}
                          >
                            {subject.trend > 0 ? (
                              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3" aria-hidden="true" />
                            )}
                            {subject.trend > 0 ? '+' : ''}{subject.trend}%
                          </Badge>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{subject.score}%</span>
                      </div>
                      <Progress value={subject.score} className="h-2.5 mb-2" aria-label={`${subject.subject} progress: ${subject.score}%`} />
                      {subject.weakTopics.length > 0 && (
                        <div className="flex items-center gap-2 mt-2">
                          <AlertCircle className="w-4 h-4 text-orange-600" aria-hidden="true" />
                          <p className="text-xs text-gray-600">
                            Weak areas: <span className="font-medium text-orange-600">{subject.weakTopics.join(', ')}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Weak Areas Tab */}
        <TabsContent value="weak-areas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Areas Needing Improvement</CardTitle>
              <CardDescription>Topics that require additional focus and practice</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {weakAreas.map((area, index) => (
                  <Card 
                    key={index} 
                    className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100/50 hover:border-orange-300 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <AlertCircle className="w-5 h-5 text-orange-600" aria-hidden="true" />
                            <h4 className="font-semibold text-gray-900">{area.topic}</h4>
                          </div>
                          <Badge variant="outline" className="bg-white text-gray-700 mb-3">
                            {area.subject}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-orange-600 text-white text-sm px-3 py-1">
                            {area.avgScore}%
                          </Badge>
                          <p className="text-xs text-gray-600 mt-1">Average</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Attempts</span>
                          <span className="font-semibold text-gray-900">{area.attempts}</span>
                        </div>
                        <Progress value={area.avgScore} className="h-2" aria-label={`${area.topic} average score: ${area.avgScore}%`} />
                        <div className="pt-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-700 text-xs">
                            Needs Focus
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
              <CardDescription>Your performance trend over the past weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[350px]">
                <AreaChart data={recentTrends}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(139, 92, 246)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="rgb(139, 92, 246)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fill: 'currentColor' }}
                    className="text-xs"
                  />
                  <YAxis 
                    domain={[0, 100]}
                    tick={{ fill: 'currentColor' }}
                    className="text-xs"
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="rgb(139, 92, 246)" 
                    strokeWidth={2}
                    fill="url(#scoreGradient)"
                    name="Score"
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Weekly Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTrends.map((trend, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-24 text-sm font-medium text-gray-700">{trend.week}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Score</span>
                        <span className="text-sm font-semibold text-gray-900">{trend.score}%</span>
                      </div>
                      <Progress value={trend.score} className="h-2" aria-label={`${trend.week} score: ${trend.score}%`} />
                    </div>
                    <div className="w-20 text-right">
                      <div className="text-xs text-gray-600">Quizzes</div>
                      <div className="text-sm font-semibold text-gray-900">{trend.quizzes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Predicted Score Card */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-600 to-blue-600">
              <CardHeader>
                <CardTitle className="text-white">Predicted Exam Score</CardTitle>
                <CardDescription className="text-white/80">
                  Based on your recent performance and study patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full bg-white/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-5xl font-bold text-white mb-1">{predictedScore}%</div>
                        <div className="text-sm text-white/90 font-medium">Predicted</div>
                      </div>
                    </div>
                    <svg className="transform -rotate-90 w-40 h-40">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="12"
                        fill="none"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="white"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(predictedScore / 100) * 439.8} 439.8`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="text-white/80 text-xs mb-1">vs Last Month</div>
                      <div className="text-2xl font-bold text-white">+4%</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                      <div className="text-white/80 text-xs mb-1">Target</div>
                      <div className="text-2xl font-bold text-white">80%</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
                <CardDescription>Breakdown of your subject performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
                <div className="mt-6 space-y-2">
                  {pieData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                          aria-hidden="true"
                        />
                        <span className="text-sm text-gray-700">{item.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{item.value} subjects</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                  <p className="text-sm text-gray-700">
                    <strong className="text-blue-900">Recommendation:</strong> Focus on Thermodynamics and Organic Chemistry. 
                    Your performance in these areas is below average. Consider dedicating 2-3 hours daily to these topics.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm text-gray-700">
                    <strong className="text-green-900">Great Progress:</strong> Your Mathematics and Physics scores are 
                    consistently improving. Keep up the excellent work!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}


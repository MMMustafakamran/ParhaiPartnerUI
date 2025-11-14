import { CheckCircle2, XCircle, Clock, FileText, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function TeacherDashboard() {
  const validationQueue = [
    {
      id: '1',
      type: 'quiz',
      title: 'Physics Mechanics Quiz',
      submittedBy: 'AI System',
      submittedAt: '2025-11-12',
      questions: 20,
      status: 'pending',
    },
    {
      id: '2',
      type: 'notes',
      title: 'Thermodynamics Study Notes',
      submittedBy: 'AI System',
      submittedAt: '2025-11-11',
      status: 'pending',
    },
    {
      id: '3',
      type: 'quiz',
      title: 'Chemistry Organic Quiz',
      submittedBy: 'AI System',
      submittedAt: '2025-11-10',
      questions: 15,
      status: 'approved',
    },
  ];

  const stats = [
    { label: 'Pending Reviews', value: '12', icon: Clock, color: 'text-orange-600' },
    { label: 'Approved Today', value: '8', icon: CheckCircle2, color: 'text-green-600' },
    { label: 'Total Validated', value: '156', icon: FileText, color: 'text-blue-600' },
    { label: 'Rejection Rate', value: '5%', icon: XCircle, color: 'text-red-600' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Teacher Dashboard</h1>
        <p className="text-gray-600">Review and validate AI-generated content</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="queue" className="space-y-6">
        <TabsList>
          <TabsTrigger value="queue">Validation Queue</TabsTrigger>
          <TabsTrigger value="history">Review History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Validation Queue */}
        <TabsContent value="queue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validationQueue
                  .filter((item) => item.status === 'pending')
                  .map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-900">{item.title}</h4>
                            <Badge variant="outline">{item.type}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Submitted by {item.submittedBy} • {new Date(item.submittedAt).toLocaleDateString()}
                          </p>
                          {item.questions && (
                            <p className="text-sm text-gray-600 mt-1">{item.questions} questions</p>
                          )}
                        </div>
                        <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">Review</Button>
                        <Button variant="outline" size="sm">Preview</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {validationQueue.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-gray-900">{item.title}</h4>
                          <Badge variant="outline">{item.type}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Reviewed on {new Date(item.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Validation Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Analytics coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


import { Users, FileText, Building2, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';

export function CounsellorDashboard() {
  const students = [
    {
      id: '1',
      name: 'Ali Shaikh',
      applications: 3,
      documents: { total: 5, pending: 1 },
      status: 'active',
      lastActivity: '2025-11-12',
    },
    {
      id: '2',
      name: 'Sara Ahmed',
      applications: 2,
      documents: { total: 4, pending: 0 },
      status: 'active',
      lastActivity: '2025-11-11',
    },
    {
      id: '3',
      name: 'Hassan Ali',
      applications: 4,
      documents: { total: 6, pending: 2 },
      status: 'active',
      lastActivity: '2025-11-10',
    },
  ];

  const stats = [
    { label: 'Total Students', value: '45', icon: Users, color: 'text-blue-600' },
    { label: 'Active Applications', value: '32', icon: Building2, color: 'text-purple-600' },
    { label: 'Documents Pending', value: '8', icon: FileText, color: 'text-orange-600' },
    { label: 'Completed', value: '12', icon: CheckCircle2, color: 'text-green-600' },
  ];

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Counsellor Dashboard</h1>
        <p className="text-gray-600">Manage student portfolios and applications</p>
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

      <Tabs defaultValue="students" className="space-y-6">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Students Tab */}
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Student Portfolios</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input placeholder="Search students..." className="pl-10" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{student.name}</h4>
                        <p className="text-sm text-gray-600">
                          Last active: {new Date(student.lastActivity).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4" />
                        <span>{student.applications} applications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        <span>
                          {student.documents.total} documents
                          {student.documents.pending > 0 && (
                            <span className="text-orange-600 ml-1">
                              ({student.documents.pending} pending)
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Portfolio</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Application details coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Document review interface coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


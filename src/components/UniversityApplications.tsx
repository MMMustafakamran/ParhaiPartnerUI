import { useState } from 'react';
import { Search, Building2, MapPin, Calendar, CheckCircle2, Clock, XCircle, Plus, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export function UniversityApplications() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const applications = [
    {
      id: '1',
      university: 'NUST',
      program: 'Computer Science',
      status: 'submitted',
      deadline: '2025-12-15',
      progress: 100,
      documents: { sop: true, lor: 2, transcripts: true },
    },
    {
      id: '2',
      university: 'LUMS',
      program: 'Electrical Engineering',
      status: 'in-progress',
      deadline: '2025-12-20',
      progress: 65,
      documents: { sop: false, lor: 1, transcripts: true },
    },
    {
      id: '3',
      university: 'GIKI',
      program: 'Mechanical Engineering',
      status: 'draft',
      deadline: '2026-01-10',
      progress: 30,
      documents: { sop: false, lor: 0, transcripts: false },
    },
  ];

  const universities = [
    { id: '1', name: 'NUST', location: 'Islamabad', programs: ['CS', 'EE', 'ME'], ranking: 'Top 1' },
    { id: '2', name: 'LUMS', location: 'Lahore', programs: ['CS', 'EE', 'Business'], ranking: 'Top 2' },
    { id: '3', name: 'GIKI', location: 'Swabi', programs: ['CS', 'EE', 'ME'], ranking: 'Top 3' },
    { id: '4', name: 'FAST-NU', location: 'Multiple', programs: ['CS', 'EE'], ranking: 'Top 5' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'draft':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'draft':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredApplications = applications.filter((app) => {
    if (selectedFilter === 'all') return true;
    return app.status === selectedFilter;
  });

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">University Applications</h1>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Application
          </Button>
        </div>
        <p className="text-gray-600">Track and manage your university applications</p>
      </div>

      <Tabs defaultValue="applications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="search">Search Universities</TabsTrigger>
        </TabsList>

        {/* Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search applications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredApplications.map((app) => (
              <Card key={app.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{app.university}</h3>
                        <Badge className={getStatusColor(app.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(app.status)}
                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-gray-600">{app.program}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span>Due: {new Date(app.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600">Application Progress</span>
                      <span className="text-gray-900 font-medium">{app.progress}%</span>
                    </div>
                    <Progress value={app.progress} className="h-2" />
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>SOP: {app.documents.sop ? '✓' : '✗'}</span>
                    <span>LORs: {app.documents.lor}/2</span>
                    <span>Transcripts: {app.documents.transcripts ? '✓' : '✗'}</span>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    {app.status !== 'submitted' && (
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Continue
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Search Tab */}
        <TabsContent value="search" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search universities by name, location, or program..."
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {universities.map((uni) => (
                  <Card key={uni.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{uni.name}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{uni.location}</span>
                          </div>
                        </div>
                        <Badge variant="secondary">{uni.ranking}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {uni.programs.map((prog) => (
                          <Badge key={prog} variant="outline" className="text-xs">
                            {prog}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


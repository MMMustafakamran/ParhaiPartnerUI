import { useState } from 'react';
import { User, Mail, Phone, Calendar, MapPin, BookOpen, Award, Edit, Save } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Ali',
    lastName: 'Shaikh',
    email: 'ali.shaikh@email.com',
    phone: '+92 300 1234567',
    dateOfBirth: '2005-03-15',
    city: 'Karachi',
    education: 'FSc Pre-Engineering',
    institution: 'Government College',
    targetExam: 'NUST NET',
    bio: 'Aspiring engineer preparing for NUST NET entrance exam. Focused on Physics and Mathematics.',
  });

  const achievements = [
    { id: 1, title: 'First Quiz Completed', icon: '🎯', date: '2025-10-20' },
    { id: 2, title: '10 Topics Mastered', icon: '📚', date: '2025-11-01' },
    { id: 3, title: 'Perfect Score', icon: '💯', date: '2025-11-05' },
    { id: 4, title: 'Study Streak 7 Days', icon: '🔥', date: '2025-11-10' },
  ];

  const connectedMentors = [
    {
      id: 1,
      name: 'Dr. Sarah Ahmed',
      expertise: 'Physics',
      institution: 'NUST',
      students: 45,
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Eng. Hassan Ali',
      expertise: 'Mathematics',
      institution: 'GIKI',
      students: 32,
      rating: 4.9,
    },
  ];

  const stats = [
    { label: 'Study Plans', value: '3', icon: BookOpen },
    { label: 'Quizzes Taken', value: '12', icon: Award },
    { label: 'Topics Completed', value: '24', icon: BookOpen },
    { label: 'Study Days', value: '45', icon: Calendar },
  ];

  const handleSave = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account and track your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              {!isEditing ? (
                <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave}>
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) => setProfileData({ ...profileData, dateOfBirth: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={profileData.city}
                      onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={3}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Full Name</p>
                      <p className="text-gray-900">{profileData.firstName} {profileData.lastName}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="text-gray-900">{profileData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="text-gray-900">{profileData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="text-gray-900">{new Date(profileData.dateOfBirth).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">City</p>
                      <p className="text-gray-900">{profileData.city}</p>
                    </div>
                  </div>

                  {profileData.bio && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">Bio</p>
                      <p className="text-gray-900">{profileData.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Education Background */}
          <Card>
            <CardHeader>
              <CardTitle>Education Background</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="education">Current Education</Label>
                  {isEditing ? (
                    <Select value={profileData.education} onValueChange={(v) => setProfileData({ ...profileData, education: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Matric">Matric</SelectItem>
                        <SelectItem value="FSc Pre-Engineering">FSc Pre-Engineering</SelectItem>
                        <SelectItem value="FSc Pre-Medical">FSc Pre-Medical</SelectItem>
                        <SelectItem value="A-Levels">A-Levels</SelectItem>
                        <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-gray-900 mt-1">{profileData.education}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="institution">Institution</Label>
                  {isEditing ? (
                    <Input
                      id="institution"
                      value={profileData.institution}
                      onChange={(e) => setProfileData({ ...profileData, institution: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900 mt-1">{profileData.institution}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="targetExam">Target Exam</Label>
                  {isEditing ? (
                    <Select value={profileData.targetExam} onValueChange={(v) => setProfileData({ ...profileData, targetExam: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="NUST NET">NUST NET</SelectItem>
                        <SelectItem value="MDCAT">MDCAT</SelectItem>
                        <SelectItem value="ECAT">ECAT</SelectItem>
                        <SelectItem value="FAST-NU">FAST-NU</SelectItem>
                        <SelectItem value="GIKI">GIKI</SelectItem>
                        <SelectItem value="ETEA">ETEA</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <p className="text-gray-900 mt-1">{profileData.targetExam}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Connected Mentors */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Connected Mentors</CardTitle>
              <Button variant="outline" size="sm">Find More</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {connectedMentors.map((mentor) => (
                  <div key={mentor.id} className="p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="text-gray-900">{mentor.name}</h4>
                          <p className="text-sm text-gray-600">{mentor.expertise} • {mentor.institution}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="secondary">{mentor.students} students</Badge>
                            <div className="flex items-center gap-1">
                              <span className="text-sm text-yellow-600">★</span>
                              <span className="text-sm text-gray-600">{mentor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Message</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats & Achievements */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white mx-auto mb-4">
                <span className="text-3xl">{profileData.firstName[0]}{profileData.lastName[0]}</span>
              </div>
              <h3 className="text-gray-900 mb-1">{profileData.firstName} {profileData.lastName}</h3>
              <p className="text-sm text-gray-600 mb-3">{profileData.email}</p>
              <Badge className="bg-gradient-to-r from-purple-600 to-blue-600">
                Student
              </Badge>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-600">{stat.label}</span>
                      </div>
                      <span className="text-gray-900">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-600">{new Date(achievement.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

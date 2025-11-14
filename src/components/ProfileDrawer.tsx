import { User, Mail, Target, Trophy, Bell, BookOpen } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';

interface ProfileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onViewFullProfile?: () => void;
}

export function ProfileDrawer({ open, onOpenChange, onViewFullProfile }: ProfileDrawerProps) {
  const profileData = {
    firstName: 'Ali',
    lastName: 'Shaikh',
    email: 'ali.shaikh@email.com',
    initials: 'AS',
  };

  const stats = [
    { label: 'Study Plans', value: '3', icon: BookOpen },
    { label: 'Quizzes Taken', value: '12', icon: Trophy },
    { label: 'Topics Done', value: '24', icon: Target },
  ];

  const achievements = [
    { id: 1, title: 'First Quiz Completed', icon: '🎯', date: '2025-10-20' },
    { id: 2, title: '10 Topics Mastered', icon: '📚', date: '2025-11-01' },
    { id: 3, title: 'Perfect Score', icon: '💯', date: '2025-11-05' },
    { id: 4, title: 'Study Streak 7 Days', icon: '🔥', date: '2025-11-10' },
  ];

  const activityData = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 80 },
    { day: 'Wed', value: 45 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 70 },
    { day: 'Sat', value: 55 },
    { day: 'Sun', value: 85 },
  ];

  const maxValue = Math.max(...activityData.map(d => d.value));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col overflow-hidden gap-0">
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <SheetHeader className="mb-6">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-xl font-semibold text-gray-900">Your Profile</SheetTitle>
              </div>
            </SheetHeader>

            {/* Profile Picture & Greeting */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white mx-auto mb-4 border-4 border-purple-100">
                <span className="text-2xl font-semibold">{profileData.initials}</span>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">
                Good Morning {profileData.firstName}
              </h2>
              <p className="text-sm text-gray-600">
                Continue Your Journey And Achieve Your Target
              </p>
              
              {/* Icon Row */}
              <div className="flex items-center justify-center gap-4 mt-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-gray-600" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Target className="w-5 h-5 text-gray-600" />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            </div>

            {/* Activity Graph */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Activity</h3>
              <div className="flex items-end justify-between gap-2 h-32">
                {activityData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex items-end justify-center" style={{ height: '100px' }}>
                      <div
                        className="w-full rounded-t bg-gradient-to-t from-purple-600 to-purple-400 transition-all hover:opacity-80"
                        style={{ height: `${(item.value / maxValue) * 100}%` }}
                        title={`${item.value}%`}
                      />
                    </div>
                    <span className="text-xs text-gray-600">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Statistics</h3>
              <div className="space-y-3">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <span className="text-sm text-gray-700">{stat.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{stat.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Achievements</h3>
              <div className="space-y-2">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className="p-3 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100"
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-xs text-gray-600">
                          {new Date(achievement.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Info */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Profile Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{profileData.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Student</span>
                </div>
              </div>
            </div>

            {/* View Full Profile Button */}
            <Button
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              onClick={() => {
                onOpenChange(false);
                if (onViewFullProfile) {
                  onViewFullProfile();
                }
              }}
            >
              View Full Profile
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


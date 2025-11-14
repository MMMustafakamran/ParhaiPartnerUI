import { Bell, CheckCircle2, Clock, AlertCircle, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export function Notifications() {
  const notifications = [
    {
      id: '1',
      type: 'quiz',
      title: 'New Quiz Available',
      message: 'Physics Mechanics quiz is ready for you',
      time: '2 hours ago',
      read: false,
      icon: CheckCircle2,
    },
    {
      id: '2',
      type: 'deadline',
      title: 'Deadline Reminder',
      message: 'NUST NET application deadline in 3 days',
      time: '5 hours ago',
      read: false,
      icon: AlertCircle,
    },
    {
      id: '3',
      type: 'study',
      title: 'Study Plan Updated',
      message: 'Your study plan has been updated with new topics',
      time: '1 day ago',
      read: true,
      icon: Clock,
    },
    {
      id: '4',
      type: 'document',
      title: 'Document Approved',
      message: 'Your SOP has been approved by counsellor',
      time: '2 days ago',
      read: true,
      icon: CheckCircle2,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'bg-blue-100 text-blue-700';
      case 'deadline':
        return 'bg-red-100 text-red-700';
      case 'study':
        return 'bg-purple-100 text-purple-700';
      case 'document':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
          {unreadCount > 0 && (
            <Badge className="bg-purple-600 text-white">{unreadCount} unread</Badge>
          )}
        </div>
        <p className="text-gray-600">Stay updated with your learning journey</p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-3">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card
                  key={notification.id}
                  className={`border-0 shadow-sm transition-all ${
                    !notification.read ? 'bg-purple-50/50 border-purple-200' : ''
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-1">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">{notification.time}</span>
                          <Badge className={getTypeColor(notification.type)} variant="secondary">
                            {notification.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-3">
            {notifications
              .filter((n) => !n.read)
              .map((notification) => {
                const Icon = notification.icon;
                return (
                  <Card
                    key={notification.id}
                    className="border-0 shadow-sm bg-purple-50/50 border-purple-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <span className="text-xs text-gray-500 mt-2 block">{notification.time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            {unreadCount === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No unread notifications</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}


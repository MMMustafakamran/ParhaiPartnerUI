import { Bell, CheckCircle2, Clock, AlertCircle, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';

interface Notification {
  id: string;
  type: 'quiz' | 'deadline' | 'study' | 'document';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: typeof CheckCircle2;
}

interface NotificationDropdownProps {
  notifications?: Notification[];
  onViewAll?: () => void;
}

export function NotificationDropdown({ notifications, onViewAll }: NotificationDropdownProps) {
  // Default notifications if none provided
  const defaultNotifications: Notification[] = [
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

  const notificationList = notifications || defaultNotifications;
  const unreadCount = notificationList.filter((n) => !n.read).length;

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
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label="View notifications"
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 relative"
        >
          <Bell className="w-5 h-5 text-gray-600" aria-hidden="true" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" aria-label={`${unreadCount} unread notifications`}></span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0" 
        align="end" 
        sideOffset={8}
        aria-label="Notifications"
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <Badge className="bg-purple-600 text-white text-xs">{unreadCount}</Badge>
            )}
          </div>
        </div>
        
        <ScrollArea className="h-[400px]">
          {notificationList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <Bell className="w-12 h-12 text-gray-300 mb-3" aria-hidden="true" />
              <p className="text-sm text-gray-600">No notifications</p>
            </div>
          ) : (
            <div className="divide-y">
              {notificationList.map((notification) => {
                const Icon = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.read ? 'bg-purple-50/50' : ''
                    }`}
                    role="button"
                    tabIndex={0}
                    onClick={() => {
                      // Handle notification click
                      console.log('Notification clicked:', notification.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        console.log('Notification clicked:', notification.id);
                      }
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                        <Icon className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={`text-sm font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="w-2 h-2 rounded-full bg-purple-600 flex-shrink-0 mt-1" aria-label="Unread"></div>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-1">
                          {notification.message}
                        </p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>

        {notificationList.length > 0 && (
          <div className="p-3 border-t bg-gray-50">
            <Button
              variant="ghost"
              className="w-full text-sm text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              onClick={() => {
                if (onViewAll) {
                  onViewAll();
                }
              }}
            >
              View all notifications
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}


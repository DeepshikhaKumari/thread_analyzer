import { Activity, BarChart3, MessageSquare, Settings, Search, Filter, User } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Separator } from './ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface SidebarProps {
  activeView: string
  setActiveView: (view: string) => void
  user?: {
    email: string
    signedInAt: Date
  }
}

export function Sidebar({ activeView, setActiveView, user }: SidebarProps) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'threads', label: 'Threads', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ]

  const getInitials = (email: string) => {
    return email
      .split('@')[0]
      .split('.')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6">
        <h2 className="mb-4">Thread Analyzer</h2>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search threads..." 
            className="pl-10"
          />
        </div>
        
        <Button variant="outline" size="sm" className="w-full">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>
      
      <Separator />
      
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? 'secondary' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setActiveView(item.id)}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </div>
      </nav>
      
      <Separator />

      {/* User Profile Section */}
      {user && (
        <div className="p-4">
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <Avatar className="h-8 w-8">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} alt={user.email} />
              <AvatarFallback>
                {getInitials(user.email)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">
                {user.email.split('@')[0]}
              </p>
              <p className="text-muted-foreground text-xs">
                Signed in today
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="p-4 border-t border-border">
        <div className="bg-muted p-3 rounded-lg">
          <h4 className="mb-2">Pro Tip</h4>
          <p className="text-muted-foreground">Use filters to find specific threads by performance metrics and timing data.</p>
        </div>
      </div>
    </div>
  )
}
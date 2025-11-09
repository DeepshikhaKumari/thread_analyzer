import { Bell, Download, RefreshCw, User, Upload, LogOut } from 'lucide-react'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'

interface DashboardHeaderProps {
  uploadedFile?: {
    file: File
    uploadedAt: Date
  }
  onUploadNew?: () => void
  user?: {
    email: string
    signedInAt: Date
  }
  onSignOut?: () => void
}

export function DashboardHeader({ uploadedFile, onUploadNew, user, onSignOut }: DashboardHeaderProps) {
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
    <header className="border-b border-border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1>Thread Analyzer Dashboard</h1>
          <p className="text-muted-foreground">
            {uploadedFile 
              ? `Analyzing ${uploadedFile.file.name}` 
              : 'Monitor and analyze your thread performance'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Analysis
          </Button>
          
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>

          {uploadedFile && onUploadNew && (
            <Button variant="outline" size="sm" onClick={onUploadNew}>
              <Upload className="w-4 h-4 mr-2" />
              New Upload
            </Button>
          )}
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-destructive" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.email}`} alt={user.email} />
                      <AvatarFallback>
                        {getInitials(user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Signed in {user.signedInAt.toLocaleDateString()}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  {onUploadNew && (
                    <DropdownMenuItem onClick={onUploadNew}>
                      <Upload className="mr-2 h-4 w-4" />
                      <span>Upload New File</span>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download Report</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  {onSignOut && (
                    <DropdownMenuItem onClick={onSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
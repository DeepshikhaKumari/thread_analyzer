import { useState } from 'react'
import { ArrowUpDown, Filter, MoreHorizontal, Search } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface Thread {
  id: string
  name: string
  state: 'RUNNING' | 'BLOCKED' | 'WAITING' | 'TIMED_WAITING' | 'TERMINATED'
  cpuTime: number
  userTime: number
  blockedTime: number
  waitedTime: number
  priority: number
  daemon: boolean
}

export function ThreadsTable() {
  const [sortBy, setSortBy] = useState<keyof Thread>('cpuTime')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterState, setFilterState] = useState<string>('all')

  // Mock data - in real app this would come from props or API
  const threads: Thread[] = [
    {
      id: '1',
      name: 'main',
      state: 'RUNNING',
      cpuTime: 1234,
      userTime: 987,
      blockedTime: 45,
      waitedTime: 123,
      priority: 5,
      daemon: false
    },
    {
      id: '2',
      name: 'Thread-Pool-Worker-1',
      state: 'WAITING',
      cpuTime: 856,
      userTime: 743,
      blockedTime: 89,
      waitedTime: 234,
      priority: 5,
      daemon: true
    },
    {
      id: '3',
      name: 'HTTP-Request-Handler',
      state: 'BLOCKED',
      cpuTime: 2341,
      userTime: 1876,
      blockedTime: 234,
      waitedTime: 45,
      priority: 7,
      daemon: true
    },
    {
      id: '4',
      name: 'Database-Connection-Pool-1',
      state: 'TIMED_WAITING',
      cpuTime: 456,
      userTime: 234,
      blockedTime: 12,
      waitedTime: 567,
      priority: 3,
      daemon: true
    },
    {
      id: '5',
      name: 'GC-Thread',
      state: 'RUNNING',
      cpuTime: 3456,
      userTime: 2987,
      blockedTime: 0,
      waitedTime: 12,
      priority: 10,
      daemon: true
    }
  ]

  const handleSort = (column: keyof Thread) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const filteredAndSortedThreads = threads
    .filter(thread => {
      const matchesSearch = thread.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterState === 'all' || thread.state === filterState
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      const aValue = a[sortBy]
      const bValue = b[sortBy]
      const multiplier = sortOrder === 'asc' ? 1 : -1
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier
      }
      
      return ((aValue as number) - (bValue as number)) * multiplier
    })

  const getStateColor = (state: Thread['state']): "default" | "secondary" | "destructive" | "outline" => {
    switch (state) {
      case 'RUNNING': return 'default'
      case 'BLOCKED': return 'destructive'
      case 'WAITING': return 'secondary'
      case 'TIMED_WAITING': return 'outline'
      case 'TERMINATED': return 'secondary'
      default: return 'secondary'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Thread Analysis</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search threads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setFilterState('all')}>
                  All States
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterState('RUNNING')}>
                  Running
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterState('BLOCKED')}>
                  Blocked
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterState('WAITING')}>
                  Waiting
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilterState('TIMED_WAITING')}>
                  Timed Waiting
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="h-auto p-0 font-medium"
                >
                  Thread Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('state')}
                  className="h-auto p-0 font-medium"
                >
                  State
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('cpuTime')}
                  className="h-auto p-0 font-medium"
                >
                  CPU Time (ms)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('blockedTime')}
                  className="h-auto p-0 font-medium"
                >
                  Blocked Time (ms)
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('priority')}
                  className="h-auto p-0 font-medium"
                >
                  Priority
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-center">Daemon</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedThreads.map((thread) => (
              <TableRow key={thread.id}>
                <TableCell className="font-medium">
                  <div>
                    <div className="font-medium">{thread.name}</div>
                    <div className="text-sm text-muted-foreground">ID: {thread.id}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={getStateColor(thread.state)}>
                    {thread.state}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                  {thread.cpuTime.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-mono">
                  {thread.blockedTime.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">{thread.priority}</TableCell>
                <TableCell className="text-center">
                  {thread.daemon ? (
                    <Badge variant="outline">Yes</Badge>
                  ) : (
                    <Badge variant="secondary">No</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Stack Trace</DropdownMenuItem>
                      <DropdownMenuItem>View Thread Details</DropdownMenuItem>
                      <DropdownMenuItem>Export Thread Data</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedThreads.length} of {threads.length} threads
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
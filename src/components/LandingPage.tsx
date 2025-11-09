import { useState, useCallback } from 'react'
import { Upload, FileText, CheckCircle, AlertCircle, Zap, BarChart3, Activity } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { Alert, AlertDescription } from './ui/alert'
import { Badge } from './ui/badge'

interface LandingPageProps {
  onFileUploaded: (file: File) => void
}

export function LandingPage({ onFileUploaded }: LandingPageProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const handleFileUpload = useCallback(async (file: File) => {
    setUploadError(null)
    setUploading(true)
    setUploadProgress(0)

    // Validate file type and size
    const validExtensions = ['.txt', '.dump', '.log', '.jstack', '.tdump']
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'))
    
    if (!validExtensions.some(ext => fileExtension.includes(ext.replace('.', '')))) {
      setUploadError('Please upload a valid thread dump file (.txt, .dump, .log, .jstack, .tdump)')
      setUploading(false)
      return
    }

    if (file.size > 100 * 1024 * 1024) { // 100MB limit
      setUploadError('File size must be less than 100MB')
      setUploading(false)
      return
    }

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setUploading(false)
          onFileUploaded(file)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }, [onFileUploaded])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }, [handleFileUpload])

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }, [handleFileUpload])

  const features = [
    {
      icon: BarChart3,
      title: 'Thread Analysis',
      description: 'Comprehensive analysis of thread states, locks, and performance bottlenecks'
    },
    {
      icon: Activity,
      title: 'Real-time Metrics',
      description: 'Live monitoring of thread activity, response times, and system health'
    },
    {
      icon: Zap,
      title: 'Performance Insights',
      description: 'Identify deadlocks, blocked threads, and optimization opportunities'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="p-3 bg-primary rounded-full">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="mb-4">Thread Dump Analyzer</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Upload your thread dump files to get comprehensive analysis, performance insights, 
            and actionable recommendations for optimizing your application's threading behavior.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Badge variant="secondary">Java Thread Dumps</Badge>
            <Badge variant="secondary">Performance Analysis</Badge>
            <Badge variant="secondary">Deadlock Detection</Badge>
          </div>
        </div>

        {/* Upload Section */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Upload Thread Dump</CardTitle>
              <CardDescription>
                Support for .txt, .dump, .log, .jstack, and .tdump files up to 100MB
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadError && (
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{uploadError}</AlertDescription>
                </Alert>
              )}

              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileInput}
                  accept=".txt,.dump,.log,.jstack,.tdump"
                  disabled={uploading}
                />
                
                <div className="space-y-4">
                  {uploading ? (
                    <>
                      <CheckCircle className="w-12 h-12 text-primary mx-auto" />
                      <div className="space-y-2">
                        <p>Uploading thread dump...</p>
                        <Progress value={uploadProgress} className="w-full max-w-xs mx-auto" />
                        <p className="text-muted-foreground">{Math.round(uploadProgress)}% complete</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div className="space-y-2">
                        <p>Drag and drop your thread dump file here</p>
                        <p className="text-muted-foreground">or</p>
                        <Button variant="outline" type="button">
                          Browse Files
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium">Supported Formats</p>
                  <p className="text-muted-foreground">.txt, .dump, .log, .jstack</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="font-medium">Max File Size</p>
                  <p className="text-muted-foreground">100MB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 p-2 bg-primary/10 rounded-full w-fit">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Sample Data CTA */}
        <div className="text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="pt-6">
              <p className="mb-4">Don't have a thread dump file?</p>
              <Button variant="outline" type="button" onClick={() => {
                // Create a mock file for demo purposes
                const mockFile = new File(['mock thread dump content'], 'sample-thread-dump.txt', {
                  type: 'text/plain'
                })
                handleFileUpload(mockFile)
              }}>
                Try Sample Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
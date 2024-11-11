// components/Dashboard.tsx
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FileText, Clock, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react'

interface Process {
  id: string
  name: string
  status: 'active' | 'pending' | 'completed'
  progress: number
  dueDate: string
}

interface Activity {
  id: string
  title: string
  description: string
  time: string
  type: 'process' | 'document' | 'communication'
}

const Dashboard: React.FC = () => {
  const { t, i18n } = useTranslation()
  const [processes, setProcesses] = useState<Process[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isRTL = i18n.dir() === 'rtl'

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [processesRes, activitiesRes] = await Promise.all([
          fetch('/api/processes'),
          fetch('/api/activities')
        ])

        if (!processesRes.ok || !activitiesRes.ok) {
          throw new Error(t('dashboard.fetchError'))
        }

        const [processesData, activitiesData] = await Promise.all([
          processesRes.json(),
          activitiesRes.json()
        ])

        setProcesses(processesData)
        setActivities(activitiesData)
      } catch (err) {
        setError(t('dashboard.error'))
        console.error('Dashboard data fetch error:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [t])

  if (isLoading) return <div>{t('dashboard.loading')}</div>
  if (error) return <Alert variant="destructive">{error}</Alert>

  return (
    <div className={`container mx-auto p-4 ${isRTL ? 'rtl' : 'ltr'}`}>
      <h1 className="text-3xl font-bold mb-6">{t('dashboard.title')}</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">{t('dashboard.tabs.overview')}</TabsTrigger>
          <TabsTrigger value="processes">{t('dashboard.tabs.processes')}</TabsTrigger>
          <TabsTrigger value="activities">{t('dashboard.tabs.activities')}</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 md:grid-cols-3">
            <StatCard
              title={t('dashboard.stats.activeProcesses')}
              value={processes.filter(p => p.status === 'active').length.toString()}
              icon={<Clock className="h-4 w-4" />}
            />
            <StatCard
              title={t('dashboard.stats.completedProcesses')}
              value={processes.filter(p => p.status === 'completed').length.toString()}
              icon={<CheckCircle className="h-4 w-4" />}
            />
            <StatCard
              title={t('dashboard.stats.pendingActions')}
              value={processes.filter(p => p.status === 'pending').length.toString()}
              icon={<AlertTriangle className="h-4 w-4" />}
            />
          </div>
        </TabsContent>

        <TabsContent value="processes">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.processes.title')}</CardTitle>
              <CardDescription>{t('dashboard.processes.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {processes.map((process) => (
                  <ProcessCard key={process.id} process={process} />
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.activities.title')}</CardTitle>
              <CardDescription>{t('dashboard.activities.description')}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                {activities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>{t('dashboard.quickActions.title')}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button onClick={() => window.location.href = '/form-filling'}>
            <FileText className="mr-2 h-4 w-4" />
            {t('dashboard.quickActions.newForm')}
          </Button>
          <Button onClick={() => window.location.href = '/communication'}>
            <RefreshCw className="mr-2 h-4 w-4" />
            {t('dashboard.quickActions.communicate')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Sub-components
const StatCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
    </CardContent>
  </Card>
)

const ProcessCard: React.FC<{ process: Process }> = ({ process }) => {
  const { t } = useTranslation()
  
  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-lg">{process.name}</CardTitle>
          <Badge variant={
            process.status === 'completed' ? 'default' :
            process.status === 'active' ? 'secondary' : 'destructive'
          }>
            {t(`dashboard.processStatus.${process.status}`)}
          </Badge>
        </div>
        <CardDescription>{t('dashboard.dueDate')}: {process.dueDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={process.progress} className="w-full" />
      </CardContent>
    </Card>
  )
}

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
  <Alert className="mb-4">
    <AlertTitle>{activity.title}</AlertTitle>
    <AlertDescription>
      {activity.description}
      <p className="text-sm text-muted-foreground mt-2">{activity.time}</p>
    </AlertDescription>
  </Alert>
)

export default Dashboard

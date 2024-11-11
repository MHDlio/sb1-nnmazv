import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useN8N } from '../hooks/useN8N'
import { Workflow, Trigger, Action, ExecutionHistory } from '../types/n8n'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, RefreshCw, AlertTriangle } from 'lucide-react'

const N8NDashboard: React.FC = () => {
  const { t } = useTranslation()
  const {
    isLoading,
    error,
    workflows,
    triggers,
    actions,
    executionHistory,
    refreshWorkflows,
    toggleWorkflow,
    retryWorkflow
  } = useN8N()

  useEffect(() => {
    refreshWorkflows()
  }, [refreshWorkflows])

  if (isLoading) {
    return <div className="flex justify-center p-4">{t('n8n.loading')}</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('n8n.workflows.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="flex items-center justify-between p-4 border-b">
                <div>
                  <h3 className="font-medium">{workflow.name}</h3>
                  <p className="text-sm text-gray-500">
                    {t('n8n.lastRun')}: {workflow.lastRun}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={workflow.status === 'active' ? 'success' : 'secondary'}>
                    {workflow.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleWorkflow(workflow.id)}
                  >
                    {workflow.status === 'active' ? (
                      <Pause className="h-4 w-4" />
                    ) : (
                      <Play className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => retryWorkflow(workflow.id)}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Add Triggers and Actions sections */}
    </div>
  )
}

export default N8NDashboard
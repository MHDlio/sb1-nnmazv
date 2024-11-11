import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../hooks/useAuth'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

const authSchema = z.object({
  email: z.string().email(t('auth.validation.email')),
  password: z.string().min(8, t('auth.validation.password')),
  name: z.string().min(2, t('auth.validation.name')).optional(),
  confirmPassword: z.string().optional()
}).refine(data => {
  if (data.confirmPassword) {
    return data.password === data.confirmPassword
  }
  return true
}, {
  message: t('auth.validation.passwordMatch'),
  path: ['confirmPassword']
})

const AuthPage: React.FC = () => {
  const { t } = useTranslation()
  const { login, register, loginWithProvider, error, isLoading } = useAuth()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  const form = useForm({
    resolver: zodResolver(authSchema)
  })

  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    try {
      if (activeTab === 'login') {
        await login({ email: data.email, password: data.password })
      } else {
        await register({
          email: data.email,
          password: data.password,
          name: data.name!,
          confirmPassword: data.confirmPassword!
        })
      }
      toast({
        title: t('auth.success.title'),
        description: t(`auth.success.${activeTab}`)
      })
    } catch (err) {
      console.error('Auth error:', err)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{t('auth.title')}</CardTitle>
          <CardDescription>{t('auth.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'register')}>
            {/* ... Rest of the component implementation ... */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthPage 
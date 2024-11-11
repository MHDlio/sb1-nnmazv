import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTranslation } from 'react-i18next'
import { useProfile } from '../hooks/useProfile'
import { UserProfile, ProfileFormData } from '../types/user'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { AlertCircle } from 'lucide-react'

const profileSchema = z.object({
  name: z.string().min(2, "profile.validation.nameMin"),
  email: z.string().email("profile.validation.email"),
  bio: z.string().optional(),
  currentPassword: z.string().min(8, "profile.validation.passwordMin").optional(),
  newPassword: z.string().min(8, "profile.validation.passwordMin").optional(),
  confirmPassword: z.string().optional(),
  language: z.string(),
  theme: z.enum(['light', 'dark', 'system'])
}).refine(data => !data.newPassword || data.newPassword === data.confirmPassword, {
  message: "profile.validation.passwordMatch",
  path: ["confirmPassword"]
})

const UserProfileComponent: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { isLoading, error, getProfile, updateProfile, uploadAvatar } = useProfile()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [profile, setProfile] = useState<UserProfile | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema)
  })

  useEffect(() => {
    const loadProfile = async () => {
      const data = await getProfile()
      if (data) {
        setProfile(data)
        reset(data)
      }
    }
    loadProfile()
  }, [getProfile, reset])

  const onSubmit = async (data: ProfileFormData) => {
    const updated = await updateProfile(data)
    if (updated) {
      setProfile(updated)
      toast({
        title: t('profile.success.title'),
        description: t('profile.success.description')
      })
    }
  }

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const result = await uploadAvatar(file)
      if (result) {
        setProfile(prev => prev ? { ...prev, avatarUrl: result.avatarUrl } : null)
        toast({
          title: t('profile.avatar.success.title'),
          description: t('profile.avatar.success.description')
        })
      }
    }
  }

  if (!profile) return null

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{t('profile.title')}</CardTitle>
          <CardDescription>{t('profile.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* ... Rest of the component implementation ... */}
        </CardContent>
      </Card>
    </div>
  )
}

export default UserProfileComponent 
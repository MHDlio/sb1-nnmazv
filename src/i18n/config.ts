import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          dashboard: {
            title: 'Dashboard',
            loading: 'Loading...',
            error: 'Error loading dashboard',
            fetchError: 'Failed to fetch dashboard data',
            tabs: {
              overview: 'Overview',
              processes: 'Processes',
              activities: 'Activities'
            },
            // ... more translations
          }
        }
      },
      ar: {
        translation: {
          dashboard: {
            title: 'لوحة التحكم',
            loading: 'جار التحميل...',
            error: 'خطأ في تحميل لوحة التحكم',
            fetchError: 'فشل في جلب بيانات لوحة التحكم',
            tabs: {
              overview: 'نظرة عامة',
              processes: 'العمليات',
              activities: 'الأنشطة'
            },
            // ... more translations
          }
        }
      }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n 
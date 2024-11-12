import React from 'react'
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react'

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Welcome to BureauEase</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Active Processes"
          value="5"
          icon={<Clock className="text-blue-500" size={24} />}
        />
        <DashboardCard
          title="Completed Tasks"
          value="12"
          icon={<CheckCircle className="text-green-500" size={24} />}
        />
        <DashboardCard
          title="Pending Actions"
          value="3"
          icon={<AlertTriangle className="text-yellow-500" size={24} />}
        />
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
        <ul className="space-y-4">
          <ActivityItem
            title="Visa Application Update"
            description="New document required for processing"
            time="2 hours ago"
          />
          <ActivityItem
            title="Business License Renewal"
            description="Approval received, ready for payment"
            time="1 day ago"
          />
          <ActivityItem
            title="Tax Filing Reminder"
            description="Deadline approaching in 7 days"
            time="3 days ago"
          />
        </ul>
      </div>
    </div>
  )
}

/**
 * Renders a dashboard card component with a title, value, and icon.
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the dashboard card.
 * @param {string} props.value - The value to be displayed in the dashboard card.
 * @param {React.ReactNode} props.icon - The icon to be displayed in the dashboard card.
 * @returns {JSX.Element} A React component representing a dashboard card.
 */
const DashboardCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-white shadow rounded-lg p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500">{title}</p>
        <p className="text-3xl font-bold">{value}</p>
      </div>
      {icon}
    </div>
  </div>
)

const ActivityItem: React.FC<{ title: string; description: string; time: string }> = ({ title, description, time }) => (
  <li className="flex items-center">
    <div className="bg-blue-100 rounded-full p-2 mr-4">
      <Clock className="text-blue-500" size={20} />
    </div>
    <div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-xs text-gray-400">{time}</p>
    </div>
  </li>
)

export default Dashboard
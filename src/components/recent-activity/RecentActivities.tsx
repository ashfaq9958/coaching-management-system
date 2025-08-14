import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, User, BookOpen, DollarSign } from "lucide-react"

interface Activity {
  id: string
  type: "enrollment" | "payment" | "class" | "assignment"
  title: string
  description: string
  time: string
  user: string
  status?: "success" | "warning" | "error"
}

const activities: Activity[] = [
  {
    id: "1",
    type: "enrollment",
    title: "New Student Enrollment",
    description: "Sarah Wilson enrolled in Data Science course",
    time: "2 minutes ago",
    user: "SW",
    status: "success",
  },
  {
    id: "2",
    type: "payment",
    title: "Fee Payment Received",
    description: "John Doe paid $2,500 for Web Development course",
    time: "15 minutes ago",
    user: "JD",
    status: "success",
  },
  {
    id: "3",
    type: "class",
    title: "Class Completed",
    description: "Machine Learning - Session 12 completed",
    time: "1 hour ago",
    user: "LC",
  },
  {
    id: "4",
    type: "assignment",
    title: "Assignment Submitted",
    description: "Mike Johnson submitted Python project",
    time: "2 hours ago",
    user: "MJ",
  },
  {
    id: "5",
    type: "payment",
    title: "Payment Overdue",
    description: "Lisa Brown - Payment pending for 5 days",
    time: "3 hours ago",
    user: "LB",
    status: "warning",
  },
]

const getIcon = (type: Activity["type"]) => {
  const commonClass = "h-4 w-4 text-muted-foreground"
  switch (type) {
    case "enrollment":
      return <User className={commonClass} />
    case "payment":
      return <DollarSign className={commonClass} />
    case "class":
    case "assignment":
      return <BookOpen className={commonClass} />
    default:
      return <Clock className={commonClass} />
  }
}

const getStatusClasses = (status?: Activity["status"]) => {
  switch (status) {
    case "success":
      return "bg-green-100 text-green-700 border-green-200"
    case "warning":
      return "bg-yellow-100 text-yellow-700 border-yellow-200"
    case "error":
      return "bg-red-100 text-red-700 border-red-200"
    default:
      return "bg-muted text-muted-foreground border-muted"
  }
}

export function RecentActivities() {
  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs ">
                {activity.user}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {getIcon(activity.type)}
                <p className="text-sm font-medium truncate">{activity.title}</p>
                {activity.status && (
                  <Badge
                    variant="outline"
                    className={`capitalize ${getStatusClasses(activity.status)}`}
                  >
                    {activity.status}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {activity.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

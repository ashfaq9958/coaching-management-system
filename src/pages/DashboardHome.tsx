import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  UserCog,
  BookOpen,
  CalendarClock,
  BarChart3,
  IndianRupee,
  PlusCircle,
  GraduationCap,
  AlertCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useData } from "@/context/DataContext";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { TeachersOnLeave } from "@/components/teacherLeave/TeachersOnLeave";
import { RecentActivities } from "@/components/recent-activity/RecentActivities";
import { StatsCards } from "@/components/statsCards/StatsCards";

const DashboardHome = () => {
  const { state } = useData();
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    document.title = "Dashboard • Coaching Center Admin";
  }, []);

  const chartData = [
    { month: "Jan", students: 25 },
    { month: "Feb", students: 30 },
    { month: "Mar", students: 45 },
    { month: "Apr", students: 50 },
    { month: "May", students: 60 },
    { month: "Jun", students: 72 },
    { month: "Jul", students: 90 },
  ];

  const studentData = [
    { name: "John Doe", batch: "Batch A", course: "React Basics" },
    { name: "Jane Smith", batch: "Batch B", course: "Node.js" },
    { name: "Michael Lee", batch: "Batch A", course: "UI/UX" },
    { name: "Sarah Kim", batch: "Batch C", course: "TypeScript" },
    { name: "David Brown", batch: "Batch B", course: "Python" },
  ];

  const batchData = [
    { name: "Batch A", course: "React Basics", students: 20 },
    { name: "Batch B", course: "Node.js", students: 18 },
    { name: "Batch C", course: "TypeScript", students: 15 },
    { name: "Batch D", course: "Python", students: 12 },
  ];

  const roomData = [
    { name: "Room 101", capacity: 20 },
    { name: "Room 102", capacity: 25 },
    { name: "Room 201", capacity: 15 },
    { name: "Room 202", capacity: 30 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back 👋</h1>
          <p className="text-muted-foreground">
            Here’s your coaching center overview for today
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-1">
            <PlusCircle className="w-4 h-4" /> Add Student
          </Button>
          <Button variant="outline" className="gap-1">
            <GraduationCap className="w-4 h-4" /> Schedule Class
          </Button>
        </div>
      </div>

      {/* Stats */}
      <>
        <StatsCards />
      </>

      {/* Charts & Activities */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentActivities />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" /> Enrollment Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="colorStudents"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  contentStyle={{ background: "white", borderRadius: "8px" }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#4f46e5"
                  fill="url(#colorStudents)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Batch</TableHead>
                  <TableHead>Course</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentData.map((s, i) => (
                  <TableRow key={i} className="hover:bg-muted/30">
                    <TableCell>{s.name}</TableCell>
                    <TableCell>{s.batch}</TableCell>
                    <TableCell>{s.course}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Students</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchData.map((b, i) => (
                  <TableRow key={i} className="hover:bg-muted/30">
                    <TableCell>{b.name}</TableCell>
                    <TableCell>{b.course}</TableCell>
                    <TableCell>{b.students}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room</TableHead>
                  <TableHead>Capacity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roomData.map((r, i) => (
                  <TableRow key={i} className="hover:bg-muted/30">
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.capacity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Teachers on Leave & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TeachersOnLeave />
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" /> Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
              <div>
                <p className="text-sm font-medium text-destructive">
                  Payment Overdue
                </p>
                <p className="text-xs text-muted-foreground">
                  3 students have pending payments
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg border ">
              <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Low Attendance</p>
                <p className="text-xs text-muted-foreground">
                  ML batch attendance below 80%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;

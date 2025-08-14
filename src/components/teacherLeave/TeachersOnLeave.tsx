import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarDays, UserMinus } from "lucide-react";

export function TeachersOnLeave() {
  // Example leave data — replace with API/DB data
  const leaveData = [
    { name: "Priya Sharma", type: "Sick Leave", dates: "Aug 13–14" },
    { name: "Rahul Verma", type: "Personal Leave", dates: "Aug 15" },
    { name: "Neha Kapoor", type: "Training", dates: "Aug 16–18" },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <UserMinus className="h-5 w-5 text-primary" />
          Teachers on Leave
        </CardTitle>
        <CalendarDays className="h-5 w-5 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Leave Type</TableHead>
                <TableHead>Dates</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveData.map((leave, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{leave.name}</TableCell>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>{leave.dates}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

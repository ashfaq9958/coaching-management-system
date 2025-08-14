import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useData } from "@/context/DataContext";

const AttendanceReportPage = () => {
  const { state } = useData();
  const [date, setDate] = useState("");
  const [student, setStudent] = useState("");
  const [batch, setBatch] = useState("");

  useEffect(() => { document.title = "Attendance Report • Admin"; }, []);

  const rows = useMemo(() => state.attendance.filter(a =>
    (!date || a.date === date) && (!student || a.studentId === student)
  ), [state.attendance, date, student]);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Attendance Report</h1>
        <p className="text-sm text-muted-foreground">Filter by student or date</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Filters</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-1">
            <Label>Date</Label>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="grid gap-1">
            <Label>Student ID</Label>
            <Input value={student} onChange={(e) => setStudent(e.target.value)} placeholder="Enter student id" />
          </div>
          <div className="grid gap-1">
            <Label>Batch ID</Label>
            <Input value={batch} onChange={(e) => setBatch(e.target.value)} placeholder="Optional" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Results</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map(r => (
                <TableRow key={r.id}>
                  <TableCell>{r.date}</TableCell>
                  <TableCell>{r.studentId}</TableCell>
                  <TableCell className="capitalize">{r.present ? 'present' : 'absent'}</TableCell>
                </TableRow>
              ))}
              {rows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-muted-foreground">No data</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceReportPage;

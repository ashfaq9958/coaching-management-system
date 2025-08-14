import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useData } from "@/context/DataContext";
import { useRole } from "@/context/RoleContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const FinancePage = () => {
  const { state, dispatch } = useData();
  const { canEdit } = useRole();
  const [studentId, setStudentId] = useState<string | undefined>(state.students[0]?.id);
  const [amount, setAmount] = useState<number>(0);
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<"paid" | "pending" | "overdue">("pending");

  useEffect(() => {
    document.title = "Finance • Admin";
  }, []);

  const add = () => {
    if (!studentId || !amount) return;
    dispatch({ type: "ADD_INVOICE", payload: { studentId, amount, status, dueDate } });
  };

  const invoices = state.invoices;
  const studentById = useMemo(
    () => Object.fromEntries(state.students.map(s => [s.id, s])),
    [state.students]
  );

  const downloadInvoice = (id: string) => {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Coaching Center - Invoice", 14, 18);
    doc.setFontSize(12);
    doc.text(`Invoice ID: ${inv.id}`, 14, 26);
    doc.text(`Student: ${studentById[inv.studentId]?.name || inv.studentId}`, 14, 34);
    autoTable(doc, {
      startY: 42,
      head: [["Description", "Amount", "Status", "Due Date"]],
      body: [["Tuition Fee", inv.amount.toString(), inv.status, inv.dueDate]],
    });
    doc.save(`invoice-${inv.id}.pdf`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Finance</h1>
          <p className="text-sm text-muted-foreground">Manage fee collection and invoices</p>
        </div>
      </div>

      {/* New Invoice Form */}
      {canEdit && (
        <Card className="shadow-sm border border-border">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Create New Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-5">
              <div className="grid gap-2">
                <Label>Student</Label>
                <Select value={studentId} onValueChange={(v) => setStudentId(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select student" />
                  </SelectTrigger>
                  <SelectContent>
                    {state.students.map(s => (
                      <SelectItem value={s.id} key={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="Enter amount"
                />
              </div>

              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={status} onValueChange={(v: any) => setStatus(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Due Date</Label>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="flex items-end">
                <Button onClick={add} className="w-full">Create</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoices Table */}
      <Card className="shadow-sm border border-border">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(i => (
                <TableRow key={i.id}>
                  <TableCell>{studentById[i.studentId]?.name || i.studentId}</TableCell>
                  <TableCell>₹ {i.amount}</TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                        i.status === "paid"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : i.status === "overdue"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}
                    >
                      {i.status}
                    </span>
                  </TableCell>
                  <TableCell>{i.dueDate}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      className="px-3"
                      onClick={() => downloadInvoice(i.id)}
                    >
                      Download PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {invoices.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-6">
                    No invoices found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancePage;

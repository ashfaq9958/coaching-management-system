import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData, Student } from "@/context/DataContext";
import { useRole } from "@/context/RoleContext";
import { toast } from "@/hooks/use-toast";
import {
  Plus,
  Save,
  XCircle,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import TableActions from "@/components/tableAction/TableAction";

const batchOptions = ["B-1", "B-2", "B-3", "B-4"];
const roomOptions = ["R-101", "R-102", "R-103", "R-104"];

const StudentsPage = () => {
  const { state, dispatch } = useData();
  const { canEdit } = useRole();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Student | null>(null);
  const [form, setForm] = useState({
    name: "",
    batch: "",
    room: "",
    email: "",
    phone: "",
  });
  const [search, setSearch] = useState("");
  const [batchFilter, setBatchFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // 1️⃣ Define rows first (filtered students)

  const totalPages = 3;
  const rows = useMemo(() => {
    return state.students
      .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()))
      .filter((s) =>
        batchFilter && batchFilter !== "All" ? s.batchId === batchFilter : true
      );
  }, [state.students, search, batchFilter]);

  // 2️⃣ Then compute paginatedRows
  const paginatedRows = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return rows.slice(startIndex, startIndex + rowsPerPage);
  }, [rows, currentPage]);

  const startAdd = () => {
    setEditing(null);
    setForm({ name: "", batch: "", room: "", email: "", phone: "" });
    setOpen(true);
  };

  const startEdit = (s: Student) => {
    setEditing(s);
    setForm({
      name: s.name,
      batch: s.batchId || "",
      room: s.room || "",
      email: s.email,
      phone: s.phone || "",
    });
    setOpen(true);
  };

  const onSubmit = () => {
    if (!form.name || !form.batch || !form.room || !form.email) {
      toast({
        title: "Missing fields",
        description: "Name, Batch, Room, and Email are required",
      });
      return;
    }
    if (editing) {
      dispatch({ type: "UPDATE_STUDENT", payload: { ...editing, ...form } });
      toast({ title: "Student updated successfully" });
    } else {
      dispatch({
        type: "ADD_STUDENT",
        payload: { id: Date.now().toString(), ...form },
      });
      toast({ title: "Student added successfully" });
    }
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-sm text-muted-foreground">
            Manage student records with ease
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-8 w-48"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={batchFilter} onValueChange={setBatchFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="All Batches" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Batches</SelectItem>
              {batchOptions.map((b) => (
                <SelectItem key={b} value={b}>
                  {b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="flex gap-1">
            <Download size={14} /> Export
          </Button>
          {canEdit && (
            <Button onClick={startAdd} className="flex items-center gap-2">
              <Plus size={16} /> Add Student
            </Button>
          )}
        </div>
      </div>

      {/* Table */}
      {/* Table */}
      <div className="rounded-lg border bg-card shadow-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead>Name</TableHead>
              <TableHead>Batch</TableHead>
              <TableHead>Room</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((s, idx) => (
                <TableRow
                  key={s.id}
                  className="hover:bg-muted/50 transition-colors duration-200"
                  style={{
                    animation: `fadeIn 0.3s ease ${idx * 0.05}s both`,
                  }}
                >
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell>{s.batchId}</TableCell>
                  <TableCell>{s.room}</TableCell>
                  <TableCell>{s.email}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell>{s.joinDate}</TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <TableActions
                        onEdit={() => startEdit(s)}
                        onDelete={() =>
                          dispatch({
                            type: "DELETE_STUDENT",
                            payload: s.id,
                          })
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-muted-foreground"
                >
                  No students found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Student" : "Add Student"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Select
              value={form.batch}
              onValueChange={(v) => setForm({ ...form, batch: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select batch" />
              </SelectTrigger>
              <SelectContent>
                {batchOptions.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={form.room}
              onValueChange={(v) => setForm({ ...form, room: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                {roomOptions.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              <XCircle size={14} /> Cancel
            </Button>
            <Button onClick={onSubmit}>
              <Save size={14} /> {editing ? "Save Changes" : "Add Student"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {rows.length > 0
            ? `${(currentPage - 1) * rowsPerPage + 1} to ${Math.min(
                currentPage * rowsPerPage,
                rows.length
              )} of ${rows.length}`
            : "0"}{" "}
          entries
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StudentsPage;

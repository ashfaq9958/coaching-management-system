import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useData, Teacher } from "@/context/DataContext";
import { useRole } from "@/context/RoleContext";
import { toast } from "@/hooks/use-toast";
import { Pencil, Plus, Save, Trash2, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TeachersPage = () => {
  const { state, dispatch } = useData();
  const { canEdit } = useRole();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    batchId: "",
    room: "",
  });
  const teachers = state.teachers;

  useEffect(() => {
    document.title = "Teachers • Admin";
  }, []);

  const startAdd = () => {
    setEditing(null);
    setForm({ name: "", email: "", subject: "", batchId: "", room: "" });
    setOpen(true);
  };
  const startEdit = (t: Teacher) => {
    setEditing(t);
    setForm({
      name: t.name,
      email: t.email,
      subject: t.subject,
      room: t.room,
      batchId: t.batchId || "",
    });
    setOpen(true);
  };
  const onSubmit = () => {
    if (!form.name || !form.email) {
      toast({
        title: "Missing fields",
        description: "Name and Email are required",
      });
      return;
    }
    if (editing) {
      dispatch({ type: "UPDATE_TEACHER", payload: { ...editing, ...form } });
      toast({ title: "Teacher updated" });
    } else {
      dispatch({ type: "ADD_TEACHER", payload: { ...form } });
      toast({ title: "Teacher added" });
    }
    setOpen(false);
  };

  const remove = (id: string) => {
    dispatch({ type: "DELETE_TEACHER", payload: id });
    toast({ title: "Teacher removed" });
  };

  const rows = useMemo(() => teachers, [teachers]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Teachers</h1>
          <p className="text-sm text-muted-foreground">
            Manage teachers and subjects
          </p>
        </div>
        {canEdit && (
          <Button onClick={startAdd} className="flex items-center gap-2">
            <Plus className="h-4 w-4 mr-2" /> Add Teacher
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">All Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[20%]">Name</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                {canEdit && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((t) => (
                <TableRow
                  key={t.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell className="font-medium">{t.batchId}</TableCell>
                  <TableCell className="font-medium">{t.room}</TableCell>
                  <TableCell>{t.email}</TableCell>
                  <TableCell>{t.subject || "-"}</TableCell>
                  {canEdit && (
                    <TableCell className="text-right space-x-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-primary/10"
                        onClick={() => startEdit(t)}
                      >
                        <Pencil className="h-4 w-4 text-primary" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete teacher?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => remove(t.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center gap-2">
              {editing ? "Edit Teacher" : "Add Teacher"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-5">
            <div className="grid gap-1">
              {/* <Label htmlFor="name">Name</Label> */}
              <Input
                id="name"
                placeholder="Enter teacher name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="grid gap-1">
              <Input
                id="email"
                type="email"
                placeholder="example@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="grid gap-1">
              <Input
                id="subject"
                placeholder="Enter subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>

            {/* Batch Dropdown */}
           <div className="grid gap-1">
  <Select
    value={form.batchId}
    onValueChange={(value) => setForm({ ...form, batchId: value })}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select batch" />
    </SelectTrigger>
    <SelectContent>
      {state.batches.map((batch) => (
        <SelectItem key={batch.id} value={batch.id}>
          {batch.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
</div>

            {/* Room Field */}
            <div className="grid gap-1">
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                placeholder="Enter room name/number"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => setOpen(false)}
            >
              <XCircle size={16} /> Cancel
            </Button>
            <Button className="flex items-center gap-1" onClick={onSubmit}>
              <Save size={16} /> {editing ? "Save Changes" : "Create Teacher"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeachersPage;

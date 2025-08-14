import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useData } from "@/context/DataContext";
import { useRole } from "@/context/RoleContext";
import { toast } from "@/hooks/use-toast";

const BatchesPage = () => {
  const { state, dispatch } = useData();
  const { canEdit } = useRole();

  const [name, setName] = useState("");
  const [courseId, setCourseId] = useState<string | undefined>(undefined);

  useEffect(() => {
    document.title = "Batches • Admin";
  }, []);

  const add = () => {
    if (!name) return;
    dispatch({ type: "ADD_BATCH", payload: { name, courseId } });
    toast({ title: "Batch created" });
    setName("");
    setCourseId(undefined);
  };

  const assignTeacher = (batchId: string, teacherId?: string) => {
    dispatch({
      type: "ASSIGN_BATCH_TEACHER",
      payload: { batchId, teacherId }
    });
    toast({ title: "Teacher assigned" });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Batches</h1>
          <p className="text-sm text-muted-foreground">
            Create and manage batches for different courses
          </p>
        </div>
      </div>

      {/* New Batch Form */}
      {canEdit && (
        <Card className="shadow-sm border border-border/60">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Create New Batch
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Name Field */}
              <div className="grid gap-2">
                <Label htmlFor="batch-name">Batch Name</Label>
                <Input
                  id="batch-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter batch name"
                />
              </div>

              {/* Course Field */}
              <div className="grid gap-2">
                <Label htmlFor="course">Course</Label>
                <Select
                  value={courseId}
                  onValueChange={(v) => setCourseId(v)}
                >
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {state.courses.map((c) => (
                      <SelectItem value={c.id} key={c.id}>
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Create Button */}
              <div className="flex items-end">
                <Button
                  onClick={add}
                  className="w-full md:w-auto"
                  disabled={!name}
                >
                  Create
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Batches Table */}
      <Card className="shadow-sm border border-border/60">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            All Batches
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="font-medium">Batch Name</TableHead>
                <TableHead className="font-medium">Course</TableHead>
                <TableHead className="font-medium">Teacher</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.batches.length > 0 ? (
                state.batches.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-medium">{b.name}</TableCell>
                    <TableCell>
                      {state.courses.find((c) => c.id === b.courseId)?.title ||
                        "-"}
                    </TableCell>
                    <TableCell>
                      {canEdit ? (
                        <Select
                          value={b.teacherId || "none"}
                          onValueChange={(v) =>
                            assignTeacher(
                              b.id,
                              v === "none" ? undefined : v
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Assign teacher" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {state.teachers.map((t) => (
                              <SelectItem value={t.id} key={t.id}>
                                {t.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        state.teachers.find((t) => t.id === b.teacherId)
                          ?.name || "-"
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center text-sm text-muted-foreground">
                    No batches found
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

export default BatchesPage;

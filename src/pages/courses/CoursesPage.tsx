import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useData } from "@/context/DataContext";
import { useRole } from "@/context/RoleContext";
import { toast } from "@/hooks/use-toast";

const CoursesPage = () => {
  const { state, dispatch } = useData();
  const { canEdit } = useRole();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    document.title = "Courses • Admin";
  }, []);

  const add = () => {
    if (!title.trim()) return;
    dispatch({ type: "ADD_COURSE", payload: { title, description: desc } });
    toast({ title: "Course created successfully" });
    setTitle("");
    setDesc("");
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
        <p className="text-muted-foreground">
          Create and manage courses in the system
        </p>
      </div>

      {/* New Course Form */}
      {canEdit && (
        <Card className="border rounded-xl shadow-sm">
          <CardHeader>
            <CardTitle>New Course</CardTitle>
            <CardDescription>
              Fill in the details to create a new course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter course title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Enter course description"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={add} className="px-6">
                  Create
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Courses Table */}
      <Card className="border rounded-xl shadow-sm">
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>
            List of all available courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {state.courses.length > 0 ? (
                state.courses.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {c.description || "—"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-6 text-muted-foreground">
                    No courses found
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

export default CoursesPage;

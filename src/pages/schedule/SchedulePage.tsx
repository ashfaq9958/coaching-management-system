import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useData } from "@/context/DataContext";
import { useRole } from "@/context/RoleContext";

const SchedulePage = () => {
  const { state, dispatch } = useData();
  const { canEdit } = useRole();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [title, setTitle] = useState("");
  const [batchId, setBatchId] = useState<string | undefined>(undefined);
  const [type, setType] = useState<"class" | "exam">("class");

  useEffect(() => {
    document.title = "Schedule • Admin";
  }, []);

  const add = () => {
    if (!title) return;
    dispatch({ type: "ADD_SCHEDULE", payload: { date, title, batchId, type } });
    setTitle("");
    setBatchId(undefined);
    setType("class");
  };

  const events = useMemo(
    () => state.schedule.filter((e) => e.date === date),
    [state.schedule, date]
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-sm text-muted-foreground">
          Create and manage classes, exams, and other academic events.
        </p>
      </div>

      {/* New Event Form */}
      {canEdit && (
        <Card>
          <CardHeader>
            <CardTitle>New Event</CardTitle>
            <CardDescription>
              Fill out the details below to schedule a new event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-5">
              <div className="space-y-1">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <Label>Title</Label>
                <Input
                  placeholder="Enter event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label>Type</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Class</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Batch</Label>
                <Select value={batchId} onValueChange={(v) => setBatchId(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select batch" />
                  </SelectTrigger>
                  <SelectContent>
                    {state.batches.map((b) => (
                      <SelectItem value={b.id} key={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-5 flex justify-end">
                <Button onClick={add} className="w-full md:w-auto">
                  Add Event
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Events on {date}</CardTitle>
          <CardDescription>
            All scheduled activities for the selected date.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {events.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Batch</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="capitalize">{e.type}</TableCell>
                    <TableCell>{e.title}</TableCell>
                    <TableCell>
                      {state.batches.find((b) => b.id === e.batchId)?.name ||
                        "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-sm text-muted-foreground">
              No events scheduled for this date.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulePage;

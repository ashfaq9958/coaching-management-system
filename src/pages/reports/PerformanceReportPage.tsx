import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
  { date: "Jan", marks: 65 },
  { date: "Feb", marks: 72 },
  { date: "Mar", marks: 78 },
  { date: "Apr", marks: 82 },
  { date: "May", marks: 88 },
];

const PerformanceReportPage = () => {
  useEffect(() => { document.title = "Performance Report • Admin"; }, []);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Performance Report</h1>
        <p className="text-sm text-muted-foreground">Marks and progress</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Average Marks</CardTitle></CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="marks" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceReportPage;

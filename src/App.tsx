import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import AppLayout from "./components/layout/AppLayout";
import DashboardHome from "./pages/DashboardHome";
import StudentsPage from "./pages/students/StudentsPage";
import TeachersPage from "./pages/teachers/TeachersPage";
import CoursesPage from "./pages/courses/CoursesPage";
import BatchesPage from "./pages/batches/BatchesPage";
import SchedulePage from "./pages/schedule/SchedulePage";
import FinancePage from "./pages/finance/FinancePage";
import AttendanceReportPage from "./pages/reports/AttendanceReportPage";
import PerformanceReportPage from "./pages/reports/PerformanceReportPage";
import NotFound from "./pages/NotFound";
import { RoleProvider } from "./context/RoleContext";
import { DataProvider } from "./context/DataContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <RoleProvider>
        <DataProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<DashboardHome />} />
                  <Route path="/students" element={<StudentsPage />} />
                  <Route path="/teachers" element={<TeachersPage />} />
                  <Route path="/courses" element={<CoursesPage />} />
                  <Route path="/batches" element={<BatchesPage />} />
                  <Route path="/schedule" element={<SchedulePage />} />
                  <Route path="/finance" element={<FinancePage />} />
                  <Route path="/reports/attendance" element={<AttendanceReportPage />} />
                  <Route path="/reports/performance" element={<PerformanceReportPage />} />
                </Route>
                {/* CATCH-ALL */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </DataProvider>
      </RoleProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

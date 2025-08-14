import {
  Bell,
  Shield,
  UserRound,
  GraduationCap,
  Settings,
  Plus,
  HelpCircle,
  Search,
  LogOut,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ThemeToggle from "../common/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRole } from "@/context/RoleContext";
import { Badge } from "@/components/ui/badge";

const Topbar = () => {
  const { role, setRole } = useRole();

  return (
    <header className="h-16 border-b flex items-center px-4 gap-4 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      {/* Sidebar Trigger */}
      <SidebarTrigger className="mr-2" />

      {/* Branding */}
      {/* <div className="flex items-center gap-2 text-lg font-semibold text-primary">
        <GraduationCap className="h-6 w-6" />
        Coaching Dashboard
      </div> */}

      {/* Search */}
      <div className="hidden md:flex items-center w-72">
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search students, batches..."
            className="pl-9 h-8 text-sm"
          />
        </div>
      </div>

      <div className="flex-1" />

      {/* Role Selector */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">Role</span>
        <Select value={role} onValueChange={(value) => setRole(value as any)}>
          <SelectTrigger className="w-[140px] h-8 border-input bg-background text-sm">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="teacher">Teacher</SelectItem>
            <SelectItem value="staff">Staff</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Quick Add */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full hover:bg-accent"
            aria-label="Quick Add"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>➕ Add Student</DropdownMenuItem>
          <DropdownMenuItem>🗓 Add Batch</DropdownMenuItem>
          <DropdownMenuItem>📄 Add Exam Schedule</DropdownMenuItem>
          <DropdownMenuItem>💰 Record Payment</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Notifications */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Notifications"
            className="hover:bg-accent rounded-full relative"
          >
            <Bell className="h-5 w-5" />
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 p-0 text-[10px] flex items-center justify-center"
            >
              3
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          <DropdownMenuLabel className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" /> Notifications
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>📩 New admission enquiry</DropdownMenuItem>
          <DropdownMenuItem>
            ⚠️ Fee overdue: Batch A - 3 students
          </DropdownMenuItem>
          <DropdownMenuItem>📅 Exam schedule published</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Help */}
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-accent rounded-full"
        aria-label="Help"
      >
        <HelpCircle className="h-5 w-5" />
      </Button>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Profile */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-2 flex items-center gap-2 px-3 hover:bg-accent"
          >
            <UserRound className="h-4 w-4 text-primary" />
            <span className="hidden sm:inline">Ashfaque</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <Settings className="h-4 w-4 mr-2 text-muted-foreground" /> Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut className="h-4 w-4 mr-2 text-muted-foreground" /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Topbar;

import {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { v4 as uuid } from "uuid";

// Basic entity types
export type Student = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  batchId?: string;
  room?: string;
  joinDate?: string;
};
export type Teacher = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  batchId?: string;
  room?: string;
};
export type Course = { id: string; title: string; description?: string };
export type Batch = {
  id: string;
  name: string;
  courseId?: string;
  teacherId?: string;
};
export type ScheduleItem = {
  id: string;
  date: string;
  type: "class" | "exam";
  title: string;
  batchId?: string;
};
export type Invoice = {
  id: string;
  studentId: string;
  amount: number;
  status: "paid" | "pending" | "overdue";
  dueDate: string;
};
export type Attendance = {
  id: string;
  studentId: string;
  date: string;
  present: boolean;
};
export type Performance = {
  id: string;
  studentId: string;
  date: string;
  marks: number;
};

export type State = {
  students: Student[];
  teachers: Teacher[];
  courses: Course[];
  batches: Batch[];
  schedule: ScheduleItem[];
  invoices: Invoice[];
  attendance: Attendance[];
  performance: Performance[];
};

export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalRevenue: number;
  monthlyGrowth: number;
  attendanceRate: number;
}

export const dashboardStats: DashboardStats = {
  totalStudents: 130,
  totalTeachers: 12,
  totalCourses: 8,
  totalRevenue: 325000,
  monthlyGrowth: 12.5,
  attendanceRate: 87.5,
};


type Action =
  | { type: "ADD_STUDENT"; payload: Omit<Student, "id"> }
  | { type: "UPDATE_STUDENT"; payload: Student }
  | { type: "DELETE_STUDENT"; payload: string }
  | { type: "ADD_TEACHER"; payload: Omit<Teacher, "id"> }
  | { type: "UPDATE_TEACHER"; payload: Teacher }
  | { type: "DELETE_TEACHER"; payload: string }
  | { type: "ADD_COURSE"; payload: Omit<Course, "id"> }
  | { type: "ADD_BATCH"; payload: Omit<Batch, "id"> }
  | {
      type: "ASSIGN_BATCH_TEACHER";
      payload: { batchId: string; teacherId?: string };
    }
  | { type: "ADD_SCHEDULE"; payload: Omit<ScheduleItem, "id"> }
  | { type: "DELETE_SCHEDULE"; payload: string }
  | { type: "ADD_INVOICE"; payload: Omit<Invoice, "id"> }
  | {
      type: "UPDATE_INVOICE_STATUS";
      payload: { id: string; status: Invoice["status"] };
    };

const initialState: State = {
  students: [
    {
      id: "1",
      name: "John Doe",
      batchId: "B-1",
      room: "R-101",
      email: "john@example.com",
      phone: "9876543210",
      joinDate: "13-08-2025"
    },
    {
      id: "2",
      name: "Jane Smith",
      batchId: "B-2",
      room: "R-102",
      email: "jane@example.com",
      phone: "9876543211",
      joinDate: "05-08-2025"
    },
    {
      id: "3",
      name: "Michael Johnson",
      batchId: "B-1",
      room: "R-103",
      email: "michael@example.com",
      phone: "9876543212",
      joinDate: "24-07-2025"
    },
     {
      id: "3",
      name: "Michael Johnson",
      batchId: "B-1",
      room: "R-103",
      email: "michael@example.com",
      phone: "9876543212",
      joinDate: "24-07-2025"
    },
     {
      id: "3",
      name: "Michael Johnson",
      batchId: "B-3",
      room: "R-103",
      email: "michael@example.com",
      phone: "9876543212",
      joinDate: "24-07-2025"
    },
  ],
  teachers: [
    {
      id: "t1",
      name: "Rahul Verma",
      email: "rahul@center.com",
      subject: "Mathematics",
      batchId: "Batch A",
      room: "102",
    },
    {
      id: "t2",
      name: "Neha Kapoor",
      email: "neha@center.com",
      subject: "Physics",
      batchId: "Batch B",
      room: "103",
    },
  ],
  courses: [
    { id: "c1", title: "JEE Foundation" },
    { id: "c2", title: "NEET Crash Course" },
  ],
  batches: [
    { id: "b1", name: "Batch A", courseId: "c1", teacherId: "t1" },
    { id: "b2", name: "Batch B", courseId: "c2", teacherId: "t2" },
  ],
  schedule: [
    {
      id: uuid(),
      date: new Date().toISOString().slice(0, 10),
      type: "class",
      title: "Maths - Algebra",
      batchId: "b1",
    },
    {
      id: uuid(),
      date: new Date().toISOString().slice(0, 10),
      type: "exam",
      title: "Physics Quiz",
      batchId: "b2",
    },
  ],
  invoices: [
    {
      id: uuid(),
      studentId: "b1-student",
      amount: 5000,
      status: "pending",
      dueDate: new Date().toISOString().slice(0, 10),
    },
  ],
  attendance: [],
  performance: [],
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_STUDENT":
      return {
        ...state,
        students: [{ id: uuid(), ...action.payload }, ...state.students],
      };
    case "UPDATE_STUDENT":
      return {
        ...state,
        students: state.students.map((s) =>
          s.id === action.payload.id ? action.payload : s
        ),
      };
    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter((s) => s.id !== action.payload),
      };
    case "ADD_TEACHER":
      return {
        ...state,
        teachers: [{ id: uuid(), ...action.payload }, ...state.teachers],
      };
    case "UPDATE_TEACHER":
      return {
        ...state,
        teachers: state.teachers.map((t) =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case "DELETE_TEACHER":
      return {
        ...state,
        teachers: state.teachers.filter((t) => t.id !== action.payload),
      };
    case "ADD_COURSE":
      return {
        ...state,
        courses: [{ id: uuid(), ...action.payload }, ...state.courses],
      };
    case "ADD_BATCH":
      return {
        ...state,
        batches: [{ id: uuid(), ...action.payload }, ...state.batches],
      };
    case "ASSIGN_BATCH_TEACHER":
      return {
        ...state,
        batches: state.batches.map((b) =>
          b.id === action.payload.batchId
            ? { ...b, teacherId: action.payload.teacherId }
            : b
        ),
      };
    case "ADD_SCHEDULE":
      return {
        ...state,
        schedule: [{ id: uuid(), ...action.payload }, ...state.schedule],
      };
    case "DELETE_SCHEDULE":
      return {
        ...state,
        schedule: state.schedule.filter((e) => e.id !== action.payload),
      };
    case "ADD_INVOICE":
      return {
        ...state,
        invoices: [{ id: uuid(), ...action.payload }, ...state.invoices],
      };
    case "UPDATE_INVOICE_STATUS":
      return {
        ...state,
        invoices: state.invoices.map((i) =>
          i.id === action.payload.id
            ? { ...i, status: action.payload.status }
            : i
        ),
      };
    default:
      return state;
  }
}

const DataContext = createContext<
  { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
};

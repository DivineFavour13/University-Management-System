export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "REGISTRAR"
  | "DEPARTMENT_HEAD"
  | "FACULTY"
  | "ADVISOR"
  | "BURSAR"
  | "STUDENT";

export type UserStatus = "ACTIVE" | "INACTIVE" | "PROVISIONAL" | "ALUMNI";

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";

export type AssignmentStatus = "PENDING" | "SUBMITTED" | "GRADED" | "OVERDUE";

export type InvoiceStatus = "PAID" | "PENDING" | "FAILED" | "REFUNDED";

export type HoldStatus = "ACTIVE" | "LIFTED";

export type Semester = "FALL" | "SPRING" | "SUMMER";

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  avatar?: string;
  departmentId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  description?: string;
  headId?: string;
  head?: User;
  facultyCount: number;
  studentCount: number;
  courseCount: number;
  createdAt: string;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description?: string;
  credits: number;
  departmentId: string;
  department?: Department;
  facultyId?: string;
  faculty?: User;
  semester: Semester;
  year: number;
  schedule?: string;
  capacity: number;
  enrolled: number;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  studentId: string;
  student?: User;
  courseId: string;
  course?: Course;
  status: "ENROLLED" | "DROPPED" | "WAITLISTED";
  grade?: number;
  letterGrade?: string;
  enrolledAt: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  course?: Course;
  title: string;
  description?: string;
  totalMarks: number;
  dueDate: string;
  attachments?: string[];
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  assignment?: Assignment;
  studentId: string;
  student?: User;
  content?: string;
  attachments?: string[];
  marks?: number;
  feedback?: string;
  submittedAt: string;
  status: AssignmentStatus;
}

export interface AttendanceRecord {
  id: string;
  courseId: string;
  course?: Course;
  studentId: string;
  student?: User;
  date: string;
  status: AttendanceStatus;
  markedBy?: string;
  markedAt: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  targetRoles: UserRole[];
  departmentId?: string;
  createdBy: string;
  createdByUser?: User;
  expiresAt?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  studentId: string;
  student?: User;
  semester: Semester;
  year: number;
  amount: number;
  paidAmount: number;
  status: InvoiceStatus;
  dueDate: string;
  items: InvoiceItem[];
  createdAt: string;
}

export interface InvoiceItem {
  description: string;
  amount: number;
}

export interface Payment {
  id: string;
  invoiceId: string;
  invoice?: Invoice;
  studentId: string;
  student?: User;
  amount: number;
  stripePaymentId: string;
  status: "SUCCESS" | "FAILED" | "REFUNDED";
  paidAt: string;
}

export interface FinancialHold {
  id: string;
  studentId: string;
  student?: User;
  reason: string;
  status: HoldStatus;
  placedBy: string;
  placedAt: string;
  liftedAt?: string;
}

export interface AuditLog {
  id: string;
  userId: string;
  user?: User;
  action: string;
  entity: string;
  entityId: string;
  details?: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

export interface DashboardStats {
  totalStudents: number;
  totalFaculty: number;
  totalCourses: number;
  totalDepartments: number;
  recentEnrollments: number;
  pendingPayments: number;
}

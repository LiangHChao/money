// 用户类型
export interface Kid {
  id: string
  name: string
  password: string
  dailyWage: number
  latePenalty: number
  lateMinutes: number
}

export interface Admin {
  password: string
}

export interface Users {
  kids: Kid[]
  admin: Admin
}

// 记录类型
export interface IncomeRecord {
  id: string
  type: 'work' | 'task'
  amount: number
  date: string
  note: string
}

export interface DebtRecord {
  id: string
  amount: number
  date: string
  note: string
}

export interface TaskRecord {
  id: string
  title: string
  price: number
  status: 'pending' | 'in_progress' | 'completed'
  createdAt?: string
  completedAt?: string
  kidId?: string
}

export interface AttendanceRecord {
  id: string
  date: string
  checkIn?: string
  checkOut?: string
  status: 'normal' | 'late'
  lateMinutes?: number
  penalty?: number
}

// 数据记录类型
export interface IncomeData {
  records: IncomeRecord[]
}

export interface DebtData {
  records: DebtRecord[]
}

export interface TasksData {
  records: TaskRecord[]
}

export interface AttendanceData {
  records: AttendanceRecord[]
}

// 用户上下文类型
export interface User {
  id: string
  name: string
  isAdmin: boolean
  dailyWage?: number
  latePenalty?: number
  lateMinutes?: number
}

export interface AppContextType {
  user: User | null
  users: Users
  income: IncomeData
  debt: DebtData
  tasks: TasksData
  attendance: AttendanceData
  loading: boolean
  login: (username: string, password: string, isAdmin?: boolean) => boolean
  logout: () => void
  loadUsers: () => Promise<void>
  loadKidData: (kidId: string) => Promise<void>
  totalIncome: number
  totalDebt: number
  balance: number
}

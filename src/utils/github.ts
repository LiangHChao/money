import { GITHUB_CONFIG, FILE_PATHS } from './config'
import type { Users, IncomeData, DebtData, TasksData, AttendanceData } from '../types'

const BASE_URL = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents`

// 获取文件内容
export const fetchFile = async (path: string): Promise<unknown> => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`)
    }

    const data = await response.json()
    // 解码 Base64 内容
    const content = atob(data.content)
    return JSON.parse(content)
  } catch (error) {
    console.error('Error fetching file:', error)
    return null
  }
}

// 模拟数据（当 GitHub API 不可用时使用）
export const getMockData = () => {
  return {
    users: {
      kids: [
        {
          id: 'kid1',
          name: '小明',
          password: '123456',
          dailyWage: 50,
          latePenalty: 5,
          lateMinutes: 5
        }
      ],
      admin: {
        password: 'admin123'
      }
    },
    income: {
      records: [
        { id: 'inc1', type: 'work', amount: 50, date: '2024-01-15', note: '全天上班' },
        { id: 'inc2', type: 'task', amount: 10, date: '2024-01-14', note: '洗碗' }
      ]
    },
    debt: {
      records: [
        { id: 'debt1', amount: 100, date: '2024-01-10', note: '买书' },
        { id: 'debt2', amount: 50, date: '2024-01-05', note: '买零食' }
      ]
    },
    tasks: {
      records: [
        { id: 'task1', title: '洗碗', price: 10, status: 'pending', createdAt: '2024-01-15' },
        { id: 'task2', title: '扫地', price: 15, status: 'completed', completedAt: '2024-01-14', kidId: 'kid1' }
      ]
    },
    attendance: {
      records: [
        { id: 'att1', date: '2024-01-15', checkIn: '08:00', checkOut: '23:00', status: 'normal' },
        { id: 'att2', date: '2024-01-14', checkIn: '08:05', checkOut: '23:00', status: 'late', lateMinutes: 5, penalty: 5 }
      ]
    }
  }
}

// 获取用户列表
export const fetchUsers = async (): Promise<Users> => {
  const data = await fetchFile(FILE_PATHS.users)
  return (data as Users) || getMockData().users
}

// 获取收入记录
export const fetchIncome = async (kidId: string): Promise<IncomeData> => {
  const data = await fetchFile(FILE_PATHS.kids(kidId))
  return (data as IncomeData) || getMockData().income
}

// 获取欠款记录
export const fetchDebt = async (kidId: string): Promise<DebtData> => {
  const data = await fetchFile(FILE_PATHS.debt(kidId))
  return (data as DebtData) || getMockData().debt
}

// 获取任务列表
export const fetchTasks = async (kidId: string): Promise<TasksData> => {
  const data = await fetchFile(FILE_PATHS.tasks(kidId))
  return (data as TasksData) || getMockData().tasks
}

// 获取出勤记录
export const fetchAttendance = async (kidId: string): Promise<AttendanceData> => {
  const data = await fetchFile(FILE_PATHS.attendance(kidId))
  return (data as AttendanceData) || getMockData().attendance
}

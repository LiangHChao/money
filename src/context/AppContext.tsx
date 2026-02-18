import { useState, useEffect, type ReactNode } from 'react'
import { fetchUsers, fetchIncome, fetchDebt, fetchTasks, fetchAttendance } from '../utils/github'
import type { User, Users, IncomeData, DebtData, TasksData, AttendanceData } from '../types'
import { AppContext } from './AppContextType'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [users, setUsers] = useState<Users>({ kids: [], admin: { password: '' } })
  const [income, setIncome] = useState<IncomeData>({ records: [] })
  const [debt, setDebt] = useState<DebtData>({ records: [] })
  const [tasks, setTasks] = useState<TasksData>({ records: [] })
  const [attendance, setAttendance] = useState<AttendanceData>({ records: [] })
  const [loading, setLoading] = useState(false)

  // 登录
  const login = (username: string, password: string, isAdmin = false): boolean => {
    if (isAdmin) {
      if (password === 'admin123') {
        setUser({ username, id: 'admin', isAdmin: true })
        return true
      }
      return false
    }

    const kid = users.kids?.find(k => k.name === username && k.password === password)
    if (kid) {
      setUser({ ...kid, isAdmin: false })
      return true
    }
    return false
  }

  // 登出
  const logout = () => {
    setUser(null)
    setIncome({ records: [] })
    setDebt({ records: [] })
    setTasks({ records: [] })
    setAttendance({ records: [] })
  }

  // 加载用户数据
  const loadUsers = async () => {
    setLoading(true)
    const data = await fetchUsers()
    setUsers(data)
    setLoading(false)
  }

  // 加载孩子数据
  const loadKidData = async (kidId: string) => {
    setLoading(true)
    const [incomeData, debtData, tasksData, attendanceData] = await Promise.all([
      fetchIncome(kidId),
      fetchDebt(kidId),
      fetchTasks(kidId),
      fetchAttendance(kidId)
    ])
    setIncome(incomeData)
    setDebt(debtData)
    setTasks(tasksData)
    setAttendance(attendanceData)
    setLoading(false)
  }

  // 计算总收入
  const totalIncome = income.records?.reduce((sum, r) => sum + r.amount, 0) || 0

  // 计算总欠款
  const totalDebt = debt.records?.reduce((sum, r) => sum + r.amount, 0) || 0

  // 计算余额（收入 - 欠款）
  const balance = totalIncome - totalDebt

  useEffect(() => {
    loadUsers()
  }, [])

  useEffect(() => {
    if (user && !user.isAdmin) {
      loadKidData(user.id)
    }
  }, [user])

  return (
    <AppContext.Provider value={{
      user,
      users,
      income,
      debt,
      tasks,
      attendance,
      loading,
      login,
      logout,
      loadUsers,
      loadKidData,
      totalIncome,
      totalDebt,
      balance
    }}>
      {children}
    </AppContext.Provider>
  )
}

import { NavLink, useNavigate } from 'react-router-dom'
import { useApp } from '../context/useApp'
import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useApp()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 顶部导航 */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold text-indigo-600">零花钱系统</span>
            </div>

            <div className="flex items-center space-x-4">
              {!user?.isAdmin && (
                <span className="text-sm text-gray-600">{user?.name}</span>
              )}
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                退出
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 底部导航（小孩模式） */}
      {!user?.isAdmin && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-around h-14">
              {[
                { path: '/dashboard', label: '首页', icon: '🏠' },
                { path: '/work', label: '上班', icon: '💼' },
                { path: '/tasks', label: '任务', icon: '📋' },
              ].map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center flex-1 py-2 ${
                      isActive ? 'text-indigo-600' : 'text-gray-500'
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* 主内容区 */}
      <main className={!user?.isAdmin ? 'pb-16' : ''}>
        {children}
      </main>
    </div>
  )
}

export default Layout

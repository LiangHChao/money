import { useApp } from '../../context/useApp'
import { getGitHubEditUrl } from '../../utils/config'
import { FILE_PATHS } from '../../utils/config'

const Dashboard = () => {
  const { user, income, debt, totalIncome, totalDebt, balance, loading } = useApp()

  if (loading) {
    return <div className="p-8 text-center">加载中...</div>
  }

  const incomeRecords = income.records || []
  const debtRecords = debt.records || []

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* 欢迎信息 */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <h1 className="text-xl font-bold text-gray-800">欢迎回来，{user?.name}！</h1>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-xl p-4 text-white shadow-lg">
          <div className="text-sm opacity-80">总收入</div>
          <div className="text-2xl font-bold">¥{totalIncome}</div>
        </div>
        <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-xl p-4 text-white shadow-lg">
          <div className="text-sm opacity-80">总欠款</div>
          <div className="text-2xl font-bold">¥{totalDebt}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 text-white shadow-lg">
          <div className="text-sm opacity-80">当前余额</div>
          <div className="text-2xl font-bold">¥{balance}</div>
        </div>
      </div>

      {/* 收入明细 */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">收入明细</h2>
          <a
            href={getGitHubEditUrl(FILE_PATHS.kids(user?.id || ''))}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            在 GitHub 中编辑
          </a>
        </div>
        {incomeRecords.length === 0 ? (
          <p className="text-gray-500 text-center py-4">暂无收入记录</p>
        ) : (
          <div className="space-y-2">
            {incomeRecords.map(record => (
              <div key={record.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">
                    {record.type === 'work' ? '上班' : '任务'} - {record.note}
                  </div>
                  <div className="text-sm text-gray-500">{record.date}</div>
                </div>
                <div className="text-green-600 font-bold">+¥{record.amount}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 欠款明细 */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">欠款明细</h2>
          <a
            href={getGitHubEditUrl(FILE_PATHS.debt(user?.id || ''))}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            在 GitHub 中编辑
          </a>
        </div>
        {debtRecords.length === 0 ? (
          <p className="text-gray-500 text-center py-4">暂无欠款记录</p>
        ) : (
          <div className="space-y-2">
            {debtRecords.map(record => (
              <div key={record.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{record.note}</div>
                  <div className="text-sm text-gray-500">{record.date}</div>
                </div>
                <div className="text-red-600 font-bold">-¥{record.amount}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard

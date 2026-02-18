import { useApp } from '../../context/useApp'
import { getGitHubEditUrl } from '../../utils/config'
import { FILE_PATHS } from '../../utils/config'

const Work = () => {
  const { user, attendance, loading } = useApp()

  if (loading) {
    return <div className="p-8 text-center">加载中...</div>
  }

  const attendanceRecords = attendance.records || []
  const dailyWage = user?.dailyWage || 50
  const latePenalty = user?.latePenalty || 5
  const lateMinutes = user?.lateMinutes || 5

  // 获取今天的出勤记录
  const today = new Date().toISOString().split('T')[0]
  const todayRecord = attendanceRecords.find(r => r.date === today)

  const handleCheckIn = () => {
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    // 检查是否迟到
    const workStartTime = 8 * 60 // 8:00 in minutes
    const [hours, minutes] = currentTime.split(':').map(Number)
    const currentMinutes = hours * 60 + minutes

    let status: 'normal' | 'late' = 'normal'
    let penalty = 0
    let lateMins = 0

    if (currentMinutes > workStartTime) {
      lateMins = currentMinutes - workStartTime
      if (lateMins >= lateMinutes) {
        status = 'late'
        penalty = latePenalty
      }
    }

    alert(`上班打卡成功！\n上班时间: ${currentTime}\n${status === 'late' ? `迟到 ${lateMins} 分钟，扣除 ¥${penalty}` : '请准时上班！'}`)

    // 注意：实际项目中这里需要更新 GitHub 数据
  }

  const handleCheckOut = () => {
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    alert(`下班打卡成功！\n下班时间: ${currentTime}\n今日工资: ¥${dailyWage}`)

    // 注意：实际项目中这里需要更新 GitHub 数据
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* 扣款规则 - 醒目展示 */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-4 mb-6">
        <h3 className="font-bold text-amber-800 mb-2 flex items-center">
          <span className="text-xl mr-2">⚠️</span>
          扣款规则
        </h3>
        <div className="space-y-1 text-sm text-amber-700">
          <p>• 上班时间：早 8:00 - 晚 11:00</p>
          <p>• 日薪标准：¥{dailyWage}/天</p>
          <p>• 迟到扣款：拖延 {lateMinutes} 分钟未到岗，扣除 ¥{latePenalty}/次</p>
          <p>• 请准时到岗，迟到将扣钱！</p>
        </div>
      </div>

      {/* 打卡区域 */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">今日上班</h2>

        {todayRecord ? (
          <div className="text-center">
            <div className="text-green-600 text-lg mb-2">✓ 已打卡</div>
            <p className="text-gray-600">上班时间: {todayRecord.checkIn}</p>
            <p className="text-gray-600">下班时间: {todayRecord.checkOut || '未打卡'}</p>
            <p className="text-gray-600">状态: {todayRecord.status === 'late' ? `迟到 ${todayRecord.lateMinutes} 分钟` : '正常'}</p>
          </div>
        ) : (
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleCheckIn}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg font-medium transition-colors"
            >
              上班打卡
            </button>
            <button
              onClick={handleCheckOut}
              className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg font-medium transition-colors"
            >
              下班打卡
            </button>
          </div>
        )}
      </div>

      {/* 出勤记录 */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">出勤记录</h2>
          <a
            href={getGitHubEditUrl(FILE_PATHS.attendance(user?.id || ''))}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            在 GitHub 中编辑
          </a>
        </div>
        {attendanceRecords.length === 0 ? (
          <p className="text-gray-500 text-center py-4">暂无出勤记录</p>
        ) : (
          <div className="space-y-2">
            {attendanceRecords.slice(0, 10).map(record => (
              <div key={record.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{record.date}</div>
                  <div className="text-sm text-gray-500">
                    {record.checkIn} - {record.checkOut || '未下班'}
                  </div>
                </div>
                <div className={`font-bold ${record.status === 'late' ? 'text-red-500' : 'text-green-500'}`}>
                  {record.status === 'late' ? `-¥${record.penalty || latePenalty}` : `¥${dailyWage}`}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Work

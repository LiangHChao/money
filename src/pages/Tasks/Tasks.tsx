import { useApp } from '../../context/useApp'
import { getGitHubEditUrl } from '../../utils/config'
import { FILE_PATHS } from '../../utils/config'

const Tasks = () => {
  const { user, tasks, loading } = useApp()

  if (loading) {
    return <div className="p-8 text-center">加载中...</div>
  }

  const allTasks = tasks.records || []

  // 按状态分类
  const pendingTasks = allTasks.filter(t => t.status === 'pending')
  const inProgressTasks = allTasks.filter(t => t.status === 'in_progress')
  const completedTasks = allTasks.filter(t => t.status === 'completed')

  const handleAcceptTask = (_taskId: string) => {
    alert(`已接取任务！完成任务后点击完成按钮。`)
    // 实际项目中需要更新 GitHub 数据
  }

  const handleCompleteTask = (_taskId: string) => {
    alert(`任务完成！奖励已发放到你的账户。`)
    // 实际项目中需要更新 GitHub 数据
  }

  const renderTaskCard = (task: typeof allTasks[0], showActions = false) => (
    <div key={task.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg mb-2">
      <div>
        <div className="font-medium text-gray-800">{task.title}</div>
        <div className="text-sm text-gray-500">
          {task.createdAt && `发布时间: ${task.createdAt}`}
          {task.completedAt && `完成时间: ${task.completedAt}`}
        </div>
      </div>
      <div className="text-right">
        <div className="text-green-600 font-bold text-lg">¥{task.price}</div>
        {showActions && task.status === 'pending' && (
          <button
            onClick={() => handleAcceptTask(task.id)}
            className="mt-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-1 px-3 rounded"
          >
            接取
          </button>
        )}
        {showActions && task.status === 'in_progress' && (
          <button
            onClick={() => handleCompleteTask(task.id)}
            className="mt-2 bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-3 rounded"
          >
            完成
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* 任务大厅入口 */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-6 text-white mb-6">
        <h2 className="text-xl font-bold mb-2">任务大厅</h2>
        <p className="opacity-90">完成的任务越多，赚的钱越多！</p>
      </div>

      {/* 待接取任务 */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            可接任务 <span className="text-sm font-normal text-gray-500">({pendingTasks.length})</span>
          </h2>
          <a
            href={getGitHubEditUrl(FILE_PATHS.tasks(user?.id || ''))}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            在 GitHub 中编辑
          </a>
        </div>
        {pendingTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">暂无可接取的任务</p>
        ) : (
          pendingTasks.map(task => renderTaskCard(task, true))
        )}
      </div>

      {/* 进行中任务 */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          进行中 <span className="text-sm font-normal text-gray-500">({inProgressTasks.length})</span>
        </h2>
        {inProgressTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">暂无进行中的任务</p>
        ) : (
          inProgressTasks.map(task => renderTaskCard(task, true))
        )}
      </div>

      {/* 已完成任务 */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          已完成 <span className="text-sm font-normal text-gray-500">({completedTasks.length})</span>
        </h2>
        {completedTasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">暂无已完成的任务</p>
        ) : (
          completedTasks.map(task => renderTaskCard(task, false))
        )}
      </div>
    </div>
  )
}

export default Tasks

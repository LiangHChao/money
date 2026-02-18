import { useState } from 'react'
import { useApp } from '../../context/useApp'
import { getGitHubEditUrl } from '../../utils/config'
import { FILE_PATHS } from '../../utils/config'
import type { Kid } from '../../types'

const Admin = () => {
  const { users, loadKidData } = useApp()
  const [selectedKid, setSelectedKid] = useState<Kid | null>(null)

  const kids = users.kids || []

  const handleSelectKid = async (kid: Kid) => {
    setSelectedKid(kid)
    await loadKidData(kid.id)
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">家长管理后台</h1>

      {/* 孩子列表 */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">孩子列表</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {kids.map(kid => (
            <button
              key={kid.id}
              onClick={() => handleSelectKid(kid)}
              className={`p-4 rounded-lg text-left transition-colors ${
                selectedKid?.id === kid.id
                  ? 'bg-indigo-100 border-2 border-indigo-500'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
            >
              <div className="font-medium text-gray-800">{kid.name}</div>
              <div className="text-sm text-gray-500">日薪: ¥{kid.dailyWage}</div>
            </button>
          ))}
        </div>
      </div>

      {/* 数据编辑入口 */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-2">用户配置</h3>
          <p className="text-sm text-gray-500 mb-3">添加/编辑孩子账号、设置日薪和扣款规则</p>
          <a
            href={getGitHubEditUrl(FILE_PATHS.users)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 px-4 rounded-lg"
          >
            编辑用户数据
          </a>
        </div>

        {selectedKid && (
          <>
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-2">收入记录</h3>
              <p className="text-sm text-gray-500 mb-3">查看和编辑 {selectedKid.name} 的收入记录</p>
              <a
                href={getGitHubEditUrl(FILE_PATHS.kids(selectedKid.id))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-500 hover:bg-green-600 text-white text-sm py-2 px-4 rounded-lg"
              >
                编辑收入数据
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-2">欠款记录</h3>
              <p className="text-sm text-gray-500 mb-3">为 {selectedKid.name} 记录欠款</p>
              <a
                href={getGitHubEditUrl(FILE_PATHS.debt(selectedKid.id))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-red-500 hover:bg-red-600 text-white text-sm py-2 px-4 rounded-lg"
              >
                编辑欠款数据
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4">
              <h3 className="font-semibold text-gray-800 mb-2">任务管理</h3>
              <p className="text-sm text-gray-500 mb-3">为 {selectedKid.name} 发布新任务</p>
              <a
                href={getGitHubEditUrl(FILE_PATHS.tasks(selectedKid.id))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-500 hover:bg-purple-600 text-white text-sm py-2 px-4 rounded-lg"
              >
                编辑任务数据
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 col-span-2">
              <h3 className="font-semibold text-gray-800 mb-2">出勤记录</h3>
              <p className="text-sm text-gray-500 mb-3">查看和编辑 {selectedKid.name} 的上班出勤记录</p>
              <a
                href={getGitHubEditUrl(FILE_PATHS.attendance(selectedKid.id))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-lg"
              >
                编辑出勤数据
              </a>
            </div>
          </>
        )}
      </div>

      {/* 使用说明 */}
      <div className="mt-6 bg-gray-100 rounded-xl p-4">
        <h3 className="font-semibold text-gray-800 mb-2">使用说明</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>1. 点击上方按钮跳转到 GitHub 编辑页面</li>
          <li>2. 在 GitHub 页面点击编辑按钮修改 JSON 数据</li>
          <li>3. 提交修改后，应用会自动更新数据</li>
          <li>4. 建议使用电脑端 GitHub 进行数据编辑</li>
        </ul>
      </div>
    </div>
  )
}

export default Admin

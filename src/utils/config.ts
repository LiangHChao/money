// GitHub API 配置
// 替换为你的 GitHub 用户名和仓库名
export const GITHUB_CONFIG = {
  owner: 'LiangHChao',
  repo: 'money',
}

// GitHub 文件路径映射
export const FILE_PATHS = {
  users: 'data/users.json',
  kids: (kidId: string) => `data/kids/${kidId}/income.json`,
  debt: (kidId: string) => `data/kids/${kidId}/debt.json`,
  tasks: (kidId: string) => `data/kids/${kidId}/tasks.json`,
  attendance: (kidId: string) => `data/kids/${kidId}/attendance.json`,
}

// GitHub 编辑链接
export const getGitHubEditUrl = (filePath: string) => {
  return `https://github.com/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/edit/main/${filePath}`
}

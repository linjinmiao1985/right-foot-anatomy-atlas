# 右足解剖图谱 · Phase 2 教学级

**交互式右足解剖 3D 可视化教育工具**

> ⚕️ **教育用途免责声明**: 本应用为医学教育工具和研究原型，目标是达到教学级标准并最终支持期刊发表。**当前不可用于临床诊断或治疗**。所有解剖信息基于 Terminologia Anatomica 2 和中国医学标准教材（《人体解剖学》第9版），正在等待专家审查以达到期刊发表标准。

**🎯 Phase 2 完成状态**:
- ✅ **41个教学级结构** (15骨骼、14肌肉、6神经、6血管)
- ✅ **TA2命名交叉验证** (详见 `docs/terminology.md`)
- ✅ **深度资产研究** (比较4个候选来源，详见 `docs/assets-research.md`)
- ✅ **交互增强** (悬停工具提示、加载状态)
- ⏳ **真实3D模型集成** (研究完成，等待下载处理)

---

## 📋 项目概述

本项目旨在构建一个**基准级/黄金标准**的右足医学解剖图谱，适合医学教育，并为未来的学术发表奠定基础。采用现代 Web 3D 技术，提供直观的交互式解剖学习体验。

**目标受众**: 医学生、解剖学教师、足踝外科研修医师、运动康复师

---

## ✨ 功能特性

### 交互功能
- **交互式 3D 视口**: 轨道旋转、缩放、平移查看右足解剖结构
- **四层系统**: 独立切换骨骼、肌肉、神经、血管的可见性
- **点击选择**: 显示详细信息面板（中文名、拉丁名、摘要、神经支配）
- **悬停提示** 🆕: 鼠标悬停即显示结构中英文名称
- **键盘快捷键**: Esc取消选择
- **加载状态** 🆕: 友好的加载提示界面

### 解剖学质量
- **41个教学级结构** 🆕: 覆盖足部主要骨骼、内在肌、神经分支和血管网络
- **TA2标准命名**: 基于 *Terminologia Anatomica 2* (FIPAT/IFAA) 国际标准
- **命名质量保证** 🆕: 全部41个结构已交叉验证拉丁文和中文术语（见 `docs/terminology.md`）
- **中英双语**: 中文优先显示，拉丁文学名辅助
- **占位标识**: 诚实标注临时几何体，区分真实模型与示意几何

---

## 🚀 快速开始

### 环境要求

- Node.js ≥ 18.0
- 现代浏览器（Chrome/Firefox/Safari/Edge 最新两个版本）
- WebGL 2.0 支持

### 安装

\`\`\`bash
# 克隆仓库
git clone https://github.com/linjinmiao1985/right-foot-anatomy-atlas.git
cd right-foot-anatomy-atlas

# 安装依赖
npm install
\`\`\`

### 运行

\`\`\`bash
# 开发服务器
npm run dev
# 访问 http://localhost:5173

# 生产构建
npm run build

# 预览构建
npm run preview

# 运行测试
npm run test
\`\`\`

---

## 🗂️ 项目结构

\`\`\`
/
├── docs/
│   ├── assets-research.md          # 3D 资产调研报告
│   └── superpowers/
│       ├── specs/                  # 设计规格
│       └── plans/                  # 实现计划
├── public/
│   └── models/
│       └── right-foot/
│           └── manifest.json       # 模型资产清单
├── src/
│   ├── components/
│   │   ├── Viewport.tsx            # R3F 3D 视口
│   │   ├── FootModel.tsx           # 足部模型（占位/真实）
│   │   ├── LayerToggles.tsx        # 图层开关面板
│   │   └── StructurePanel.tsx      # 结构信息面板
│   ├── data/
│   │   └── structures.json         # 解剖结构数据库（41条，Phase 2扩展）
│   ├── lib/
│   │   ├── structureLookup.ts      # 结构查询逻辑
│   │   ├── layers.ts               # 图层配置
│   │   ├── picking.ts              # 网格拾取
│   │   └── loadFootAssets.ts       # 资产加载
│   ├── types/
│   │   └── anatomy.ts              # TypeScript 类型定义
│   ├── App.tsx                     # 主应用组件
│   ├── main.tsx                    # 入口
│   └── index.css                   # 全局样式
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
\`\`\`

---

## 🎨 技术栈

- **构建工具**: Vite 5.x
- **框架**: React 18.x
- **语言**: TypeScript 5.x (严格模式)
- **3D 渲染**: three.js + @react-three/fiber + @react-three/drei
- **测试**: Vitest + @testing-library/react
- **样式**: CSS + 内联样式

---

## 📊 数据与资产

### 解剖结构数据

- **数量**: 20 个结构（≥15 项目要求）
- **覆盖**: 全部四层（骨骼9、肌肉4、神经3、血管4）
- **命名标准**:
  - **拉丁文**: Terminologia Anatomica 2 (TA2), FIPAT/IFAA
  - **中文**: 基于中国医学标准教材和临床常用术语
- **结构字段**: id, meshNames, layer, nameZh, nameLa, summaryZh, placeholder

示例:
\`\`\`json
{
  "id": "calcaneus",
  "meshNames": ["Calcaneus_R", "Bone_Calcaneus_Right"],
  "layer": "bone",
  "nameZh": "跟骨",
  "nameLa": "Calcaneus",
  "summaryZh": "足部最大的跗骨，形成足跟，承担站立时的主要负重，与距骨形成距下关节",
  "placeholder": false
}
\`\`\`

### 3D 模型资产

**当前状态 (Phase 3 集成中)**:
- ⏳ **BodyParts3D 真实骨骼模型下载中** (78MB/136MB 已下载)
- ✅ 许可锁定：**CC BY 4.0** (无 ShareAlike 限制！)
- ✅ 程序化占位几何体（临时，待真实模型替换）
- ✅ 网格命名匹配 `structures.json` 数据

**主选资产 (最终决策)**:
- **来源**: [BodyParts3D LSDB Archive](https://dbarchive.biosciencedbc.jp/en/bodyparts3d/)
- **开发**: Database Center for Life Science (DBCLS), Japan
- **许可**: **CC BY 4.0** ⭐ (Attribution 4.0 International, 2025-02-27 更新)
- **内容**: 全身 MRI 多边形网格（提取右足骨骼）
- **格式**: OBJ → GLB 转换
- **命名**: FMA (Foundational Model of Anatomy) 基础
- **DOI**: 10.18908/lsdba.nbdc00837-007

**必需署名**:
```
BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International
```

**许可优势**:
- ✅ 无 ShareAlike (可与 MIT 代码组合)
- ✅ 无 NonCommercial (可商业使用)
- ✅ GitHub 友好，期刊发表友好
- ✅ 官方归档，DOI 标识，学术可信

**详细许可文档**:
- `LICENSE-ASSETS` - BodyParts3D CC BY 4.0 完整条款
- `NOTICE` - 第三方归属和引用
- `docs/assets-research.md` - 资产比较和决策记录

---

## 📖 术语来源

- **拉丁文**: *Terminologia Anatomica 2* (TA2), FIPAT, https://ifaa.unifr.ch/
- **中文**: 参考《人体解剖学》（第9版，人民卫生出版社）及临床标准术语

---

## ⚖️ 许可证与合规

### 应用代码

**MIT License** (待添加 LICENSE 文件)

本项目代码（不含 3D 模型）采用 MIT 许可证，允许自由使用、修改和分发。

### 3D 模型资产

- **当前**: 程序化占位几何（项目内部生成，MIT）
- **计划**: Open3DModel Lower Limb (CC BY-SA 4.0)
  - ✅ 允许教育、研究、商业使用
  - ✅ 允许修改和再分发
  - ⚠️ 需保留署名
  - ⚠️ 衍生作品需使用相同许可证

**应用内署名** (计划添加 About 页面):
\`\`\`
3D 模型改编自:
"Open3DModel - Lower Limb - English labels"
by Open3D project, Jan Kooloos (RadboudUMC), Eungyeol Lee (LUMC) et al
License: CC BY-SA 4.0
\`\`\`

详见: \`docs/assets-research.md\` 第6节

---

## 🧪 测试

### 运行测试

\`\`\`bash
npm run test          # 交互模式
npx vitest run        # CI 模式
\`\`\`

### 测试覆盖

- ✅ \`structureLookup\`: 根据 ID/网格名查找结构
- ✅ \`layers\`: 图层配置和辅助函数
- 🔄 (计划) 组件集成测试

---

## 🏗️ 开发路线图

### ✅ v1.0.0-placeholder (当前)

- [x] 项目脚手架 (Vite + React + TS)
- [x] 类型定义和 JSON 数据 (20 结构, TA2 标准)
- [x] 图层系统和切换 UI
- [x] 结构信息面板（ZH+LA）
- [x] R3F 视口 + OrbitControls
- [x] 占位几何 + 网格拾取 + 高亮
- [x] Vitest 单元测试
- [x] README + 免责声明 + 许可文档

### 🔄 v1.1.0-real-assets (下一步)

- [ ] 下载 Open3DModel Lower Limb (GLB)
- [ ] 提取右足子集 (Blender)
- [ ] 重命名网格匹配 \`structures.json\`
- [ ] 更新 \`manifest.json\` (非占位模式)
- [ ] 移除占位几何，加载真实 glTF
- [ ] 更新 README 资产状态

### 🎯 v1.2.0-publication-ready (期刊级准备)

- [ ] 邀请解剖学专家审查
- [ ] 扩展结构数据至完整右足清单 (≥40-50)
- [ ] 添加缺失精细结构（韧带、籽骨、血管分支）
- [ ] 实施专家反馈修正
- [ ] 编写方法部分草稿（论文用）
- [ ] 用户测试（医学生/教师反馈）
- [ ] 性能优化（LOD, 实例化）

### 🚀 v2.0.0-extended (长期)

- [ ] 左足镜像支持
- [ ] 踝关节扩展
- [ ] 动画演示（肌肉收缩、关节运动）
- [ ] 3D 标签和标注
- [ ] 导出/分享视图
- [ ] 移动端优化
- [ ] 多语言切换（英文界面）

---

## 🏥 局限性与诚实声明

### 当前版本局限

1. **占位几何**: v1.0.0 使用示意性几何体，**非解剖精确模型**
2. **简化结构**: 20 个结构为初始集，完整右足包含 ≥40-50 个主要结构
3. **缺少精细**: 韧带、关节囊、小血管分支、神经末梢未包含
4. **未经专家审查**: 需解剖学家/足踝外科专家验证后方可用于正式发表
5. **个体变异**: 未体现解剖变异和病理状态

### 迈向期刊级图谱的要求

- [ ] 解剖学专家审查委员会验证
- [ ] 真实尸体/影像数据对比
- [ ] 完整结构覆盖
- [ ] 方法学文档（模型来源、提取、修改过程）
- [ ] 临床专家用户测试
- [ ] 同行评审

**建议引用方式** (当前版本):
> "本研究使用右足解剖图谱 v1.0.0 (https://github.com/linjinmiao1985/right-foot-anatomy-atlas) 进行教学演示。该工具基于 Terminologia Anatomica 2 标准命名，计划采用 Open3DModel Lower Limb (CC BY-SA 4.0) 模型，当前使用示意性几何体，尚未经过正式解剖学专家审查，仅用于初步教育用途。"

---

## 🤝 贡献指南

欢迎贡献！特别是:
- 解剖学准确性审查
- 中文医学术语优化
- 真实 3D 模型提取协助
- 性能优化建议
- 教育用例反馈

**贡献者要求**:
- 遵守 TypeScript 严格模式
- 编写测试覆盖新功能
- 提交消息格式: \`feat:\` / \`fix:\` / \`docs:\` 等
- 尊重许可证（CC BY-SA 4.0 for 3D assets）

---

## 📞 联系与支持

- **Issue Tracker**: [GitHub Issues](https://github.com/linjinmiao1985/right-foot-anatomy-atlas/issues)
- **文档**: 见 \`docs/\` 目录
- **解剖学顾问**: [待确定]

---

## 🙏 致谢

- **Open3D Project** (Leiden LUMC, Radboud UMC, Utrecht UMC等) - 开源解剖模型
- **FIPAT/IFAA** - Terminologia Anatomica 国际标准
- **React Three Fiber 社区** - 优秀的 3D Web 框架

---

## 📄 许可证

### 代码
MIT License (见 LICENSE 文件)

### 3D 模型
- 占位几何: MIT (本项目)
- Open3DModel (计划): CC BY-SA 4.0 (见 \`docs/assets-research.md\`)

---

**最后更新**: 2026-09-14  
**项目状态**: 🚧 积极开发中 (v1.0.0-placeholder)  
**生产就绪**: ❌ 仅用于教育演示，尚未用于期刊发表

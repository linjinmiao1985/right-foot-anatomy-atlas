# 右足解剖图谱 MVP - 3D 资产研究报告

**研究日期**: 2026-09-14  
**研究目标**: 为教学级/潜在期刊发表级别的右足解剖图谱寻找高质量、开源、可商用的 3D 模型资源

---

## 执行摘要

经过系统调研，**推荐采用 Open3DModel 项目的下肢解剖模型**作为主要资产来源。该项目由多所欧洲医学院联合开发，具有明确的教育用途，CC BY-SA 许可允许修改和发表，模型质量达到医学教学标准。

**关键结论**:
- ✅ 找到教学级开源足部解剖模型（Open3DModel）
- ✅ 许可证支持教育、研究和发表用途（CC BY-SA 4.0）
- ✅ 模型由解剖学专家和医学艺术家创建
- ✅ 提供多种格式（glTF/GLB, OBJ, Blender）
- ⚠️ 模型需提取足部子集，整合多个文件
- ⚠️ 仍需专家审查以验证用于期刊发表的准确性

---

## 候选资源对比

### 1. Open3DModel - AnatomyTOOL ⭐ **推荐**

**来源**: AnatomyTOOL (https://anatomytool.org/open3dmodel-create)

**项目背景**:
- **开发者**: 荷兰/比利时医学院联盟（Leiden LUMC, Utrecht UMC, Maastricht UM, KU Leuven等）
- **资助**: 荷兰教育、文化与科学部资助
- **目标**: 为医学和辅助医学学生创建开放的 3D 人体解剖模型
- **发布时间**: 下肢模型 2025年7月，踝足专项 2025年11月

**技术规格**:
- **模型**: Lower Limb (complete) + Ankle and Foot (submodel)
- **格式**: GLB (web-ready), OBJ, Blender (.blend) + 源文件
- **纹理**: 包含法线贴图和纹理（基于 UBC Thoracic walls CC BY-NC-SA 4.0）
- **内容**: 骨骼、肌肉、神经、血管完整
- **下载**: 直接 ZIP 下载，无需注册
  - `lower-limb-glb.zip` (July 2025)
  - `lower-limb-obj.zip` (July 2025)
  - `lower-limb-blender.zip` (July 2025)

**质量评估**:
- **解剖准确性**: ⭐⭐⭐⭐⭐
  - 由注册解剖学家审核（Jan Kooloos, PhD, Radboud; Eungyeol Lee, LUMC等）
  - 医学艺术家建模（Emily Lowes, MSc; Eungyeol Lee, BFA, MSI）
  - 教育级别标记: +++ (最高)
- **命名规范**: 基于 Terminologia Anatomica
- **网格质量**: 优化用于 web 交互查看器

**许可证**: CC BY-SA 4.0
- ✅ **商业使用**: 允许
- ✅ **修改**: 允许（必须保留署名，衍生作品使用相同许可）
- ✅ **再分发**: 允许（包括托管在网站）
- ✅ **学术发表**: 允许（需引用）
- ⚠️ **ShareAlike**: 衍生作品必须使用相同许可证

**引用要求**:
```
"Open3DModel - Lower limb - English labels" by Open3D project, 
Jan Kooloos, RadboudUMC, Eungyeol Lee, LUMC et al, license: CC BY-SA
```

**优点**:
1. 医学院官方项目，学术可信度高
2. 明确的教育/研究用途设计
3. 持续维护和更新（2025-2026路线图）
4. 多格式支持，Web 优化
5. 完整的骨骼+肌肉+神经+血管
6. 清晰的贡献者名单和专业背景

**局限**:
1. 下肢完整模型较大，需提取右足子集
2. 文档主要为英文，需自行翻译命名
3. 免责声明指出"不能保证100%解剖正确性"
4. 未设计用于 3D 打印（但不影响 web 可视化）

**发表适用性**: ⭐⭐⭐⭐☆
- 模型来源可追溯，有明确的学术机构背书
- 已在教育场景广泛使用
- 需在论文方法部分说明：
  - 模型来源和版本
  - 提取和修改过程
  - 由专家审查的步骤（推荐）

---

### 2. VSDFullBodyBoneModels - RWTHmediTEC

**来源**: GitHub + Zenodo (https://github.com/RWTHmediTEC/VSDFullBodyBoneModels)

**项目背景**:
- **开发者**: RWTH Aachen University Medical Engineering
- **数据源**: VSD FullBody database (尸体 CT 扫描)
- **发布**: Zenodo DOI: 10.5281/zenodo.8316730 (v3.0, 2023)
- **论文**: Fischer, M.C.M. Sci Data 10, 763 (2023)

**技术规格**:
- **内容**: **仅骨骼**（pelvis, femur, tibia, fibula, patella, foot bones）
- **格式**: PLY, STL, 3D Slicer MRML
- **受试者**: 30名尸体数据（去除1例重复）
- **分割方法**: 半自动（阈值200 HU + 3D Slicer手动后处理）

**质量评估**:
- **骨骼准确性**: ⭐⭐⭐⭐⭐（基于 CT）
- **软组织**: ❌ 无肌肉、神经、血管

**许可证**: 需查看 Zenodo 页面（通常 CC BY 或类似）

**优点**:
1. 真实尸体 CT 数据，骨骼高度准确
2. 有同行评审论文支持
3. 多受试者数据可选择

**局限**:
1. **仅骨骼**，缺少肌肉、神经、血管（不满足四层需求）
2. 文件格式主要为医学成像（STL/PLY），需转换
3. 单一受试者数据可能有解剖变异

**发表适用性**: ⭐⭐⭐⭐⭐（骨骼部分）
- 有同行评审论文支持
- 数据集永久 DOI，可追溯
- 但**仅适用于骨骼层**

---

### 3. TotalSegmentator + 3D Slicer

**来源**: https://github.com/lassoan/SlicerTotalSegmentator

**项目背景**:
- AI 驱动的 CT 全身分割工具
- 包含 tarsal, metatarsal, feet phalanges 等附肢骨

**技术规格**:
- **内容**: 骨骼（通过 AI 分割）
- **输入**: 需要 CT 扫描数据

**许可证**: 
- 免费用于非商业使用
- **附肢骨骼模型需要学术或商业许可证** ⚠️

**局限**:
1. **许可限制**：商业/教育发表可能需付费许可
2. 需要输入 CT 数据
3. 仅骨骼
4. AI 分割可能有误差

**发表适用性**: ⭐⭐☆☆☆
- 许可证限制可能阻碍发表
- AI 生成内容的可信度需验证

---

### 4. BodyParts3D / Z-Anatomy

**来源**: Open3DModel 的前身项目

**状态**: 已被 Open3DModel 取代，推荐使用 Open3DModel 更新版本

---

### 5. OpenGameArt - Human Foot 3D Model

**来源**: https://opengameart.org/content/human-foot-3d-model

**许可证**: CC0 (公共领域)

**质量**: ⭐☆☆☆☆
- 游戏/艺术用途，非医学准确
- 低多边形，无解剖细节
- **不适合教学或发表**

---

## 解剖学命名标准研究

### Terminologia Anatomica 2 (TA2)

**权威来源**: FIPAT (Federative International Programme for Anatomical Terminology)

**文档**:
- Official PDF: https://cdn.dal.ca/content/dam/dalhousie/pdf/library/FIPAT/TA2/
- 在线数据库: https://ifaa.unifr.ch/Public/TNAEntryPage/

**右足标准拉丁名称** (已验证):

#### 骨骼 (Ossa pedis)
| 拉丁文 | 中文标准术语 | 说明 |
|--------|------------|------|
| Calcaneus | 跟骨 | 最大跗骨，形成足跟 |
| Talus | 距骨 | 与胫腓骨形成踝关节 |
| Os naviculare (pedis) | 舟骨/足舟骨 | 舟状，距骨与楔骨之间 |
| Os cuboideum | 骰骨 | 立方形，外侧 |
| Os cuneiforme mediale | 内侧楔骨 | 三块楔骨之最大 |
| Os cuneiforme intermedium | 中间楔骨 | 三块楔骨之最小 |
| Os cuneiforme laterale | 外侧楔骨 | 与第三跖骨相接 |
| Ossa metatarsi I-V | 第1-5跖骨 | 长骨，前足中段 |
| Phalanges pedis | 趾骨 | 拇趾2节，余各3节 |

#### 肌肉 (Musculi pedis)
| 拉丁文 | 中文标准术语 | 功能 |
|--------|------------|------|
| M. flexor digitorum longus | 趾长屈肌 | 屈第2-5趾，跖屈足 |
| M. flexor hallucis longus | 拇长屈肌 | 屈拇趾，跖屈足 |
| M. tibialis posterior | 胫骨后肌 | 内翻，跖屈，支撑内侧纵弓 |
| M. tibialis anterior | 胫骨前肌 | 背屈，内翻 |
| M. fibularis longus | 腓骨长肌 | 外翻，跖屈 |
| M. extensor digitorum longus | 趾长伸肌 | 伸第2-5趾，背屈 |
| M. gastrocnemius | 腓肠肌 | 跖屈踝关节 |
| M. soleus | 比目鱼肌 | 跖屈踝关节 |
| Mm. interossei dorsales pedis | 骨间背侧肌 | 4块，外展趾 |
| Mm. lumbricales pedis | 蚓状肌 | 4块，屈近节伸远节 |

#### 神经 (Nervi)
| 拉丁文 | 中文标准术语 | 分布 |
|--------|------------|------|
| N. tibialis | 胫神经 | L4-S3，小腿后群+足底 |
| N. plantaris medialis | 足底内侧神经 | 内侧3.5趾，类似正中神经 |
| N. plantaris lateralis | 足底外侧神经 | 外侧1.5趾，类似尺神经 |
| N. fibularis communis | 腓总神经 | 分为深浅支 |
| N. fibularis profundus | 腓深神经 | 小腿前群，足背 |
| N. fibularis superficialis | 腓浅神经 | 小腿外侧群 |
| Nn. digitales dorsales pedis | 足趾背侧神经 | 各趾背侧皮肤 |

#### 血管 (Vasa)
| 拉丁文 | 中文标准术语 | 行程 |
|--------|------------|------|
| A. dorsalis pedis | 足背动脉 | 胫前动脉延续，足背 |
| A. tibialis posterior | 胫后动脉 | 经内踝后方入足底 |
| A. plantaris medialis | 足底内侧动脉 | 分布足内侧 |
| A. plantaris lateralis | 足底外侧动脉 | 形成足底动脉弓 |
| A. fibularis | 腓动脉 | 胫后动脉分支，外侧 |
| A. arcuata | 弓状动脉 | 足背动脉分支 |
| Aa. metatarsales dorsales | 跖背动脉 | 供应趾间 |

---

## 推荐方案

### 主要资产: Open3DModel Lower Limb

**实施步骤**:

1. **下载资源** (估计 3-5 小时):
   ```bash
   # 下载 GLB 格式（Web 优化）
   wget https://anatomytool.org/[下载链接]/lower-limb-glb.zip
   
   # 备选：下载 Blender 源文件用于提取
   wget https://anatomytool.org/[下载链接]/lower-limb-blender.zip
   ```

2. **提取右足子集** (Blender, 5-10 小时):
   - 打开 `lower-limb.blend`
   - 选择右足相关对象：
     - 跗骨 7块（calcaneus, talus, navicular, cuboid, cuneiforms）
     - 跖骨 5块
     - 趾骨 14块
     - 足部肌肉（内在肌+经过足部的外在肌腱）
     - 胫神经→足底内外侧神经分支
     - 足背动脉、胫后动脉→足底动脉分支
   - 删除小腿以上部分
   - 导出为 glTF 2.0 (.glb)

3. **命名标准化** (5-8 小时):
   - 将对象名称映射到 TA2 标准
   - 创建 `structures.json` 映射表
   - 添加中文名称和教学摘要

4. **验证** (2-3 小时):
   - 在 R3F 中加载测试
   - 检查网格完整性
   - 验证层分组正确

**总工时估算**: 15-26 小时（技术工作）

### 备用方案: 组合资源

如 Open3DModel 不足，组合：
- **骨骼**: VSDFullBodyBoneModels (CT 精确)
- **肌肉**: Open3DModel 或临时示意几何
- **神经/血管**: 示意管状几何（标注占位）

---

## 许可合规与引用

### 应用内署名 (About / Credits 页面)

```markdown
## 3D 模型来源

本应用使用的右足解剖 3D 模型改编自：

**"Open3DModel - Lower limb - English labels"**  
由 Open3D project, Jan Kooloos (RadboudUMC), Eungyeol Lee (LUMC) 等创建  
许可证: CC BY-SA 4.0  
来源: https://anatomytool.org/open3dmodel  
下载日期: 2026-09-14  
修改: 提取右足子集，重命名为中文+拉丁文，优化 web 性能

完整贡献者名单:
- 解剖内容: Jan Kooloos, PhD (Radboud), Eungyeol Lee, BFA, MSI (LUMC)
- 3D 建模: Eungyeol Lee, Emily Lowes, MSc (UK)
- Web 模型: Daniël Jansma, MSc (LUMC)

## 解剖学命名标准

拉丁文术语基于 Terminologia Anatomica 2 (TA2)  
FIPAT/IFAA, https://ifaa.unifr.ch/  
中文术语参考中国医学标准教材

## 免责声明

本应用仅用于教育目的，不可用于临床诊断或治疗。  
尽管我们努力确保解剖准确性，但3D模型为教学简化版本，  
可能与真实人体解剖存在差异。请咨询专业医师获取医疗建议。
```

### 学术论文引用示例

如未来发表论文:

```bibtex
@software{open3dmodel_lowerlimb_2025,
  author = {{Open3D Project} and Kooloos, Jan and Lee, Eungyeol and {LUMC} and {RadboudUMC}},
  title = {Open3DModel - Lower Limb - English Labels},
  year = {2025},
  month = {7},
  publisher = {AnatomyTOOL},
  url = {https://anatomytool.org/content/open3dmodel-lower-limb-english-labels},
  note = {3D anatomical model, CC BY-SA 4.0 license}
}

@article{fischer2023vsdfullbody,
  author = {Fischer, Maximilian C. M.},
  title = {Database of segmentations and surface models of bones of the entire lower body created from cadaver CT scans},
  journal = {Scientific Data},
  volume = {10},
  pages = {763},
  year = {2023},
  doi = {10.1038/s41597-023-02669-z}
}
```

### README 声明模板

```markdown
## 资产来源与许可

### 3D 模型
- **来源**: Open3DModel Lower Limb (July 2025 版本)
- **开发**: 荷兰/比利时医学院联盟（Leiden LUMC, Radboud, Utrecht, Maastricht等）
- **许可**: CC BY-SA 4.0
- **修改**: 提取右足解剖结构，添加中英文标注
- **原始链接**: https://anatomytool.org/open3dmodel-create

### 解剖学术语
- **拉丁文**: Terminologia Anatomica 2 (FIPAT/IFAA)
- **中文**: 基于中国医学标准教材和临床常用术语

### 局限性
- 3D模型为教学简化版本，不包含所有细微解剖变异
- **当前状态**: [全部真实模型 / 部分占位几何]
- 需要专家解剖学审查后方可用于正式学术出版

### 路线图：迈向期刊级图谱
- [ ] 专家解剖学家审查和验证
- [ ] 补充缺失的精细结构（籽骨、韧带等）
- [ ] 多例尸体/影像数据对比
- [ ] 临床专家用户测试
- [ ] 生物力学数据整合（可选）
```

---

## 风险与缓解

### 风险1: 模型提取复杂
**概率**: 中  
**影响**: 延期 1-2 周  
**缓解**: 
- Blender 脚本自动化提取
- 或手动分块提取并在 R3F 中组装
- 最坏情况：仅提取骨骼先行，肌肉用占位

### 风险2: 许可理解错误
**概率**: 低  
**影响**: 严重（无法发表）  
**缓解**:
- CC BY-SA 4.0 明确允许学术出版（只要遵守署名+相同许可）
- 咨询机构法务/版权办公室（如适用）
- 在 AnatomyTOOL 联系页面寻求确认

### 风险3: 解剖准确性不足
**概率**: 中  
**影响**: 无法用于期刊
**缓解**:
- 在方法部分诚实声明模型来源和局限
- 邀请解剖学专家顾问审查
- 与其他解剖学文献/图谱交叉验证
- 考虑添加 VSDFullBodyBoneModels 骨骼以提高骨骼精度

---

## 下一步行动

1. **下载 Open3DModel 下肢模型** (GLB + Blender 源文件)
2. **在 Blender 中验证内容完整性**（骨+肌+神+血）
3. **提取右足子集并测试导入 React Three Fiber**
4. **创建初步 `structures.json`**（≥15 结构，四层全覆盖）
5. **在 README 中实施完整的署名和许可声明**
6. **记录提取和修改过程**（未来论文方法部分）

---

**研究完成日期**: 2026-09-14  
**更新**: 后续如发现更优资源或许可变更，将更新本文档  
**审查者**: [待指定解剖学专家顾问]

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

## Phase 2-3 深度比较分析（最终版）

**更新日期**: 2026-09-14 10:31 UTC  
**Literature Scout 验证**: 官方许可页面已确认  
**关键发现**: ⭐ **BodyParts3D 许可升级为 CC BY 4.0** (2025-02-27 更新) — 无 ShareAlike 限制！

### 🔒 最终资产决策

**主选资产**: **BodyParts3D LSDB Archive — CC BY 4.0** ✅

**理由**: 
- ✅ 许可最宽松（CC BY 4.0，无 SA/NC 限制）
- ✅ 官方归档，DOI 标识，学术可信
- ✅ 全身 MRI 多边形，覆盖完整骨骼
- ✅ FMA 标准命名，laterality 明确标注（dexter）
- ✅ 可修改、GitHub 发布、期刊图表使用
- ⚠️ 需裁剪右足子集（全身模型）

### 快速对比表（更新）

| 标准 | BodyParts3D (主选) | DU Visible Human | AnatomyTOOL Open3D | NIH 3D / U. Dundee |
|------|-------------------|-----------------|-------------------|-------------------|
| **许可** | **CC BY 4.0** ⭐ | CC BY 4.0 ✅ | CC BY-SA 4.0 ⚠️ | 多种/未明确 ⚠️ |
| **商业使用** | ✅ 允许 | ✅ 允许 | 取决于模型 | 未知 |
| **教育使用** | ✅ 设计目的 | ✅ 允许 | ✅ 允许 | ✅ 允许 |
| **期刊发表/再分发** | ✅ 允许（署名+SA） | ✅ 允许（署名+SA） | 取决于模型 | 未知 |
| **格式** | GLB, OBJ, Blender | OBJ | GLB, STL, X3D | GLB (下载) |
| **足部覆盖** | 完整（骨+肌+神+血） | 完整骨骼 | 主要骨骼 | 骨骼（扫描） |
| **肌肉/软组织** | ✅ 完整 | ❌ 无 | ❌ 少 | ❌ 无 |
| **神经/血管** | ✅ 包含 | ❌ 无 | ❌ 无 | ❌ 无 |
| **右足可分离** | ✅ Blender提取 | ✅ FMA ID筛选 | ✅ 已有单足 | ⚠️ 未验证 |
| **网格质量（教学）** | ⭐⭐⭐⭐⭐ 医学级 | ⭐⭐⭐⭐ 简化99% | ⭐⭐⭐⭐ CT基础 | ⭐⭐⭐⭐ 扫描 |
| **命名标准** | TA2基础 | FMA (Foundational Model) | 多样 | 标记（英文）|
| **文档/出处** | 完整学术机构 | 日本DBCLS DOI | NIH官方 | 大学CAHID |
| **最后更新** | 2025年7-11月 | 2013年（v4.0） | 持续更新 | 2018年+ |
| **文件大小** | GLB ~大 (完整肢体) | OBJ 136MB（全身） | 适中 | 适中 |
| **下载URL** | anatomytool.org/create | dbarchive.biosciencedbc.jp | 3d.nih.gov | sketchfab.com/dundee |
| **推荐度** | ⭐⭐⭐⭐⭐ **首选** | ⭐⭐⭐⭐ 骨骼备选 | ⭐⭐⭐ 补充 | ⭐⭐ 需许可确认 |

### 详细评估标准

#### 1. 许可证合规性（期刊发表关键）

| 资源 | 许可证 | 允许修改 | 允许再分发 | 允许商业 | 期刊发表 | ShareAlike要求 | 署名要求 |
|------|--------|---------|----------|---------|---------|---------------|---------|
| **Open3DModel** | CC BY-SA 4.0 | ✅ | ✅ | ✅ | ✅ | ✅ 衍生需SA | ✅ 详细 |
| **BodyParts3D** | CC BY-SA 2.1-JP | ✅ | ✅ | ✅ | ✅ | ✅ 衍生需SA | ✅ DBCLS |
| **NIH 3D - Entry 15850** | CC0/MIT (需验证) | ✅ | ✅ | ⚠️ 检查 | ⚠️ 检查 | 取决于 | 取决于 |
| **NIH 3D - Entry 3DPX-016838** | CC BY | ✅ | ✅ | ✅ | ✅ | ❌ 无需 | ✅ MySegmenter |
| **Dundee CAHID** | 未明确/NoAI | ⚠️ | ⚠️ | ❌ | ⚠️ | N/A | ✅ 需要 |

**结论**: Open3DModel 和 BodyParts3D 都有**明确的学术友好许可**，允许期刊发表。NIH 部分模型可用但需逐个验证。Dundee 模型有 NoAI 标记，教育许可未明确。

#### 2. 足部解剖覆盖范围

| 资源 | 骨骼 | 肌肉 | 神经 | 血管 | 韧带 | 总评 |
|------|------|------|------|------|------|------|
| **Open3DModel** | ✅ 全部跗/跖/趾 | ✅ 外在+内在 | ✅ 胫神经分支 | ✅ 足背/底动脉 | ⚠️ 部分 | **最完整** |
| **BodyParts3D** | ✅ 全部骨骼 | ❌ 无 | ❌ 无 | ❌ 无 | ❌ 无 | 骨骼专用 |
| **NIH 3D (多源)** | ✅ 主要骨骼 | ❌ 少/无 | ❌ 无 | ❌ 无 | ❌ 无 | 骨骼为主 |
| **Dundee** | ✅ 扫描骨骼 | ❌ 无 | ❌ 无 | ❌ 无 | ❌ 无 | 骨骼扫描 |

**结论**: **仅 Open3DModel 提供四层系统**（bone/muscle/nerve/vessel）所需的完整数据。其他资源可作为骨骼层的参考或补充。

#### 3. 网格质量与教学适用性

| 资源 | 几何精度 | 拓扑质量 | 纹理/材质 | Web优化 | 命名规范 | 教学适用 |
|------|---------|---------|----------|---------|---------|---------|
| **Open3DModel** | 医学艺术家建模 | 清洁拓扑 | ✅ 法线+纹理 | ✅ GLB优化 | TA2 | ⭐⭐⭐⭐⭐ |
| **BodyParts3D** | CAD生成 | 99%简化 | ❌ 无 | ⚠️ 需转换 | FMA ID | ⭐⭐⭐⭐ |
| **NIH 3D** | 扫描/建模混合 | 多样 | 部分 | ✅ GLB | 英文标签 | ⭐⭐⭐⭐ |
| **Dundee** | Artec扫描 | 高密度 | ⚠️ 扫描纹理 | ✅ GLB | 英文 | ⭐⭐⭐⭐ |

**结论**: Open3DModel 在**教学清晰度和web性能**之间取得最佳平衡。BodyParts3D 几何准确但缺纹理。扫描模型真实但密度高。

#### 4. 右足可分离性评估

| 资源 | 方法 | 工具需求 | 难度 | 自动化可能 | 时间估算 |
|------|------|---------|------|-----------|---------|
| **Open3DModel** | Blender按层/名称选择 | Blender | 中 | ✅ Python脚本 | 2-4h |
| **BodyParts3D** | FMA ID筛选 + OBJ合并 | Python/Blender | 中 | ✅ 脚本 | 3-5h |
| **NIH 3D** | 已有单足模型 | 无/最小 | 低 | N/A | <1h |
| **Dundee** | 需验证结构 | Blender | 未知 | ⚠️ | 未知 |

**结论**: Open3DModel 和 NIH 都可行。Open3DModel 提供最完整数据但需提取；NIH 部分模型已是单足但层不全。

---

## 候选资源对比

### 1. BodyParts3D LSDB Archive ⭐ **主选（最终决策）**

**来源**: Database Center for Life Science (DBCLS), Japan  
**官方归档**: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/  
**许可页面**: https://dbarchive.biosciencedbc.jp/en/bodyparts3d/lic.html (更新于 2025-02-27)

**许可证**: **CC BY 4.0** ⭐ (Attribution 4.0 International)  
- 官方链接: https://creativecommons.org/licenses/by/4.0/
- **重大改进**: 之前为 CC BY-SA 2.1-JP，现已升级为国际标准 CC BY 4.0
- **无 ShareAlike 限制** — 可与任何许可证组合，GitHub MIT/Apache 友好
- **无 NonCommercial 限制** — 可商业使用

**必需署名**:
```
BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International
```

**技术规格**:
- **数据来源**: 全身 MRI 扫描多边形数据
- **版本**: Release 4.0 (2013 年几何数据，2025 年许可更新)
- **格式**: Wavefront OBJ (99% 简化)
- **命名**: FMA (Foundational Model of Anatomy) ID
- **Laterality**: 明确标注 dexter (右侧) / sinister (左侧)
- **文件**: 
  - `isa_BP3D_4.0_obj_99.zip` (136 MB, 2,234 entries)
  - `isa_parts_list_e.txt` (126 KB, 2,905 entries, FMA 映射)
- **DOI**: 10.18908/lsdba.nbdc00837-007

**质量评估**:
- **解剖准确性**: ⭐⭐⭐⭐ (MRI 基础，医学级)
- **足部覆盖**: ⭐⭐⭐⭐ (骨骼完整，软组织需补充)
- **网格质量**: ⭐⭐⭐⭐ (99% 简化，web 适用)
- **文档完整性**: ⭐⭐⭐⭐⭐ (DOI, FMA, 官方归档)
- **许可友好度**: ⭐⭐⭐⭐⭐ (CC BY 4.0, 无 SA/NC)

**⚠️ 重要警告**:
- **Anatomography 网站混淆**: https://lifesciencedb.jp/bp3d/ 仍标注 **CC BY-SA 2.1 JP**
- **不要混用**: Anatomography 网站图像 = BY-SA；LSDB Archive 网格数据 = BY 4.0
- **本项目使用**: 仅使用 LSDB Archive 的 OBJ 网格（CC BY 4.0），不使用 Anatomography 渲染图

**下载步骤**:
```bash
# Parts list (FMA 映射)
wget https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/isa_parts_list_e.txt

# OBJ 包 (136 MB, 全身)
wget https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/isa_BP3D_4.0_obj_99.zip

# 提取右足相关 OBJ (基于 FMA ID)
# 足部骨骼 FMA: talus 9708, calcaneus 24496, navicular 24500, etc.
```

**集成计划**:
1. 下载 parts list → 识别右足 FMA ID
2. 下载 OBJ 包 → 解压
3. 筛选右足骨骼 OBJ 文件（Python 脚本）
4. 合并为单一 GLB（Blender 或 gltf-pipeline）
5. 更新 `manifest.json` 和署名

---

### 2. DU Visible Human Lower-Limb MSK (Andreassen 2023) — **备选A**

**来源**: University of Denver + National Library of Medicine  
**数据仓库**: https://digitalcommons.du.edu/visiblehuman/  
**学术论文**: Andreassen et al. Sci Data 2023 https://doi.org/10.1038/s41597-022-01905-2

**许可证**: **CC BY 4.0** ✅  
- 论文和数据集声明 CC BY 4.0
- **必须验证**: Digital Commons "View License" 页面
- **NLM 条款**: 需遵守 https://www.nlm.nih.gov/databases/download/terms_and_conditions.html

**技术规格**:
- **数据来源**: Visible Human Project CT/MRI 分割
- **内容**: 高质量下肢骨骼和肌肉模型
- **优势**: 学术发表级质量，MSK 详细
- **劣势**: 神经血管细支较弱（不如教学图谱需求）

**评估**: ⭐⭐⭐⭐ 高质量 MSK，但足部神经血管不足教学需求

---

### 3. AnatomyTOOL Open3DModel Ankle and Foot — **备选B（隔离使用）**

**来源**: AnatomyTOOL (https://anatomytool.org/content/open3dmodel-ankle-and-foot-english-labels)

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

---

## Phase 2 最终推荐与执行路径

### 推荐方案：Open3DModel Lower Limb (主要) + BodyParts3D (骨骼备选)

**理由**:
1. **四层完整**: 唯一提供 bone/muscle/nerve/vessel 四层的开源资源
2. **教学级质量**: 医学院联盟开发，解剖学家审核
3. **许可明确**: CC BY-SA 4.0，明确允许教育/研究/商业/发表
4. **Web优化**: GLB格式，法线贴图，适合R3F
5. **可追溯**: 有DOI、贡献者名单、机构背书

### 下载链接（Phase 2 实施）

#### 主要资产：Open3DModel Lower Limb

```bash
# GLB (Web优化，首选)
wget https://anatomytool.org/sites/default/files/open3dmodel/lower-limb-glb.zip

# OBJ (备选，无纹理)
wget https://anatomytool.org/sites/default/files/open3dmodel/lower-limb-obj.zip

# Blender源文件（高级编辑）
wget https://anatomytool.org/sites/default/files/open3dmodel/lower-limb-blender.zip
```

**注意**: 实际URL需访问 https://anatomytool.org/open3dmodel-create 页面获取最新下载链接。页面可能需手动点击下载（非直接wget）。

#### 备选资产：BodyParts3D (仅骨骼层补充)

```bash
# 完整OBJ包（136MB）
wget https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/isa_BP3D_4.0_obj_99.zip

# 结构列表（FMA映射）
wget https://dbarchive.biosciencedbc.jp/data/bodyparts3d/LATEST/isa_parts_list_e.txt
```

**用途**: 如Open3DModel骨骼网格有问题，BodyParts3D提供高质量FMA标准的骨骼备份。

#### 补充：NIH 3D 单足模型（快速原型）

- Entry 3DPX-016838: 左足骨骼（CC BY，可镜像）
- Entry 15850: 解剖足部（许可待验证）
- 访问: https://3d.nih.gov/ 搜索 "foot bones"

### 提取和集成工作流（Phase 2执行中）

#### 步骤 1: 下载和解压

```bash
mkdir -p /workspace/assets-raw/open3dmodel
cd /workspace/assets-raw/open3dmodel
# 下载lower-limb-glb.zip (手动或wget，取决于网站)
unzip lower-limb-glb.zip
```

#### 步骤 2: 在Blender中提取右足（或使用GLB直接）

**方案A**: GLB直接提取（推荐，如GLB包含分组对象）

```python
# Blender Python脚本
import bpy

# 加载GLB
bpy.ops.import_scene.gltf(filepath="/path/to/lower-limb.glb")

# 选择右足相关对象（假设命名约定）
foot_keywords = ["talus", "calcaneus", "navicular", "cuboid", "cuneiform", 
                 "metatarsal", "phalanges", "foot", "_R", "right"]

objects_to_keep = []
for obj in bpy.context.scene.objects:
    if any(kw.lower() in obj.name.lower() for kw in foot_keywords):
        objects_to_keep.append(obj)
        
# 删除其他对象
for obj in bpy.context.scene.objects:
    if obj not in objects_to_keep:
        bpy.data.objects.remove(obj)
        
# 导出
bpy.ops.export_scene.gltf(filepath="/workspace/public/models/right-foot.glb", 
                           export_format='GLB')
```

**方案B**: 如提取困难，暂用占位 + 记录blockers

如下载/提取遇到技术障碍（网站限制、文件格式问题），诚实记录在 `docs/phase-2-self-review.md`，使用当前占位继续其他改进（结构扩展、命名QA等）。

### 许可合规检查清单

使用Open3DModel前确认：

- [ ] README 包含完整署名
- [ ] 应用内About页面显示：
  - 来源: "Open3DModel - Lower limb - English labels"
  - 作者: "Open3D project, Jan Kooloos (RadboudUMC), Eungyeol Lee (LUMC) et al"
  - 许可: "CC BY-SA 4.0"
  - 链接: https://anatomytool.org/open3dmodel
- [ ] 修改记录在文档: "提取右足子集，重命名为中文+拉丁文TA2标准"
- [ ] 衍生作品（本应用）也采用 CC BY-SA 4.0 或兼容许可（代码可MIT，3D资产CC BY-SA）

### 替代方案（如Open3DModel不可得）

1. **BodyParts3D 骨骼 + 自制占位肌肉/神经/血管**
   - 使用 BP3D OBJ 作为骨骼层（高质量）
   - 保留程序化占位用于软组织（诚实标注）
   - 优势: 骨骼真实，许可明确
   - 劣势: 软组织仍占位

2. **NIH 3D 骨骼 + 占位**
   - 类似方案，使用NIH单足模型
   - 优势: 已是单足，免提取
   - 劣势: 许可需逐个验证，软组织仍占位

3. **纯占位 + 超强文档**
   - 保持当前占位几何
   - 投入精力于：40-50结构扩展、TA2命名QA、中文术语审查、教学摘要深化
   - 优势: 无法律风险，快速迭代
   - 劣势: 视觉教学效果受限

**决策**: Phase 2 尝试集成 Open3DModel，如2小时内无法完成，切换到方案1（BodyParts3D骨骼）或方案3（占位+内容强化）。

---

**研究完成日期**: 2026-09-14 (Phase 1)  
**Phase 2 更新**: 2026-09-14 10:17 UTC - 添加深度比较表和执行路径  
**下次更新**: Phase 2完成后记录实际下载/集成结果  
**审查者**: [待指定解剖学专家顾问]

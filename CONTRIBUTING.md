# Contributing to Right Foot Anatomy Atlas

感谢您考虑为本项目贡献！本文档提供贡献指南，特别是关于**许可证兼容性**和**禁止的Non-Commercial (NC)内容**。

---

## 许可证边界

### 主要可再分发层（MIT代码 + CC BY/CC0资产）

**代码**: MIT License  
**资产**: 
- BodyParts3D: CC BY 4.0
- Universiti Malaya: CC0 1.0

**允许**:
- ✅ 自由使用、修改、再分发
- ✅ 商业使用
- ✅ 与任何许可证混合
- ✅ 学术发表、期刊图表

**归属要求**:
```
BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International

Universiti Malaya Asian Male Lower Extremity Musculoskeletal Model (CC0 1.0, Public Domain)
```

### 可选BY-SA模块（ShareAlike）

**未来可能**: `third_party/open3dmodel/` (CC BY-SA 4.0, 如可获取)

**警告**:
- ⚠️ BY-SA衍生作品必须也是BY-SA（"传染性"）
- ⚠️ 主要图谱不使用BY-SA → 保持MIT + CC BY/CC0纯粹性
- ✅ **隔离策略**: 如集成BY-SA内容，必须在`third_party/`下 + 单独NOTICE

---

## ❌ 禁止的Non-Commercial (NC)内容

### NC陷阱列表（已识别）

以下数据源包含**BY-NC**或**BY-NC-SA**许可，**禁止**集成到本项目：

| 来源 | 许可证 | 为何排除 |
|------|--------|----------|
| **UBC Claudia Krebs肌肉纹理** | BY-NC-SA 4.0 | NC禁止商业使用 |
| Zenodo DOI:10.5281/zenodo.20231308 | BY-NC-SA 4.0 | NC + SA双重陷阱 |
| NIH 3D Print Exchange #15850 | BY-NC-SA | NC（部分模型） |
| Antwerp ASTARC | BY-NC-SA | NC |
| UBC Krebs "Thoracic walls"纹理 | BY-NC-SA 4.0 | NC（Open3DModel纹理基础） |

### 为何排除NC？

1. **MIT代码 + NC资产 = 许可证冲突**
   - MIT允许商业使用
   - BY-NC禁止商业使用
   - 不兼容

2. **开源项目标准**
   - Debian/Fedora/OSI拒绝NC许可证
   - 不符合"Free Cultural Works"定义
   - 限制衍生作品用途

3. **用户混淆风险**
   - 代码MIT（商业OK），资产NC（商业禁止）→ 法律模糊
   - 教育vs商业边界不清（教学医院？商业教材？）

---

## 贡献新资产前的许可证检查清单

如果您想贡献新的3D模型或解剖数据：

### ✅ 接受的许可证
- **MIT** / **CC0 1.0** (公共领域，首选)
- **CC BY 4.0** (署名，次选)
- **CC BY-SA 4.0** (ShareAlike，仅限隔离在`third_party/`，需讨论)

### ⚠️ 需要特殊审查
- **CC BY-SA 3.0或更早** (检查升级至4.0的可能性)
- **自定义许可证** (需逐案评估OSD兼容性)

### ❌ 拒绝
- **CC BY-NC** 或 **CC BY-NC-SA** (任何版本)
- **All Rights Reserved** / 无明确许可证
- **"仅教育用途"** / "非商业"条款
- **需注册/协议的数据集**（除非明确CC BY/CC0）

---

## 如何验证许可证

### 1. 查找官方许可页面
- DOI页面（Zenodo, Figshare, DataCite）
- 数据集README / LICENSE文件
- 机构数据仓库元数据

### 2. 红旗警告
- ⚠️ "Non-Commercial" / "NC" / "Educational use only"
- ⚠️ "ShareAlike" / "SA"（可接受但需隔离）
- ⚠️ 无许可证声明（假设All Rights Reserved）

### 3. 记录证据
在PR中包含：
- 官方许可页面截图或URL
- LICENSE文件内容
- 元数据JSON（Dataverse/Zenodo API响应）

---

## Open3DModel特殊情况

**来源**: https://anatomytool.org/open3dmodel  
**许可**: CC BY-SA 4.0 (OBJ文件)  
**NC陷阱**: UBC Krebs纹理是BY-NC-SA 4.0

### 安全使用策略
✅ **使用**: `lower-limb-obj.zip`（无颜色/纹理/法线贴图）  
❌ **避免**: `lower-limb-blender.zip`或`.glb`（含UBC BY-NC-SA纹理）

### 隔离要求
如果集成Open3DModel OBJ：
1. 放置在`third_party/open3dmodel/`（不在`public/models/`）
2. 创建单独的`third_party/open3dmodel/NOTICE`
3. README明确标记BY-SA边界
4. 代码中条件加载（用户选择启用BY-SA内容）

---

## 排除NC的示例PR审查

### ❌ 拒绝示例
```
Title: Add intrinsic foot muscles from Zenodo 20231308

Changes:
- Downloaded muscle STLs from DOI 10.5281/zenodo.21354714
- Integrated into muscle layer

Review: REJECTED
Reason: Zenodo 21354714 is CC BY-NC-SA 4.0 (see https://zenodo.org/records/21354714)
        NC clause violates project license policy (MIT code requires BY/CC0 assets)
```

### ✅ 接受示例
```
Title: Add quadratus plantae from UM CC0 dataset

Changes:
- Downloaded from DOI 10.22452/RD/5T6TZ7
- License: CC0 1.0 (verified in Dataverse API JSON: license.name="CC0 1.0")
- Integrated into muscle layer

Review: APPROVED
Reason: CC0 1.0 = public domain, 100% compatible with MIT codebase
```

---

## 贡献流程

1. **Fork** 本仓库
2. **创建特性分支**: `git checkout -b feature/add-<structure-name>`
3. **许可证检查**: 验证新资产符合上述政策
4. **添加资产**:
   - GLB文件 → `public/models/right-foot/` (BY/CC0) 或 `third_party/` (BY-SA)
   - 更新`manifest.json`（source, license, attribution）
5. **测试**: `npm run build` + `npx vitest run`
6. **文档**: 更新README如果添加新结构
7. **提交PR**: 包含许可证验证证据

---

## 问题？

如果您不确定某个资产的许可证兼容性：
1. 打开GitHub Issue，标题："License review: [数据集名称]"
2. 提供：DOI/URL、许可证页面截图、预期用途
3. 维护者将评估并回复

---

## 参考

- MIT License: https://opensource.org/licenses/MIT
- CC BY 4.0: https://creativecommons.org/licenses/by/4.0/
- CC0 1.0: https://creativecommons.org/publicdomain/zero/1.0/
- CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/
- Open Source Definition: https://opensource.org/osd
- Definition of Free Cultural Works: https://freedomdefined.org/

---

**TL;DR**: ✅ CC0/CC BY, ⚠️ CC BY-SA (隔离), ❌ CC BY-NC (任何NC)

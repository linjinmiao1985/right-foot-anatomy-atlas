# Journal Figure Captions (Teaching Atlas)

**Purpose**: Concise bilingual captions for teaching figures reviewers may reference.  
**Honesty stance**: Teaching-grade atlas **in progress** — **not** clinical; **not** TA2-complete; **not** a finished product.  
**Date**: 2026-09-22 · Day 4db (Week 2 Phase 8)

---

## Figure 1: Bones Overview (Osteology Complete)

**中文**: 右足骨骼全视图（26 骨；CC BY 4.0 BodyParts3D / CC0 UM）。跗骨 7（跟骨、距骨、舟骨、骰骨、3 楔骨）+ 跖骨 5 + 趾骨 13 + 籽骨（第 1 跖趾关节）。教学可视化级；非手术配准 / 非患者特异性模型。

**English**: Right foot skeletal overview (26 bones; CC BY 4.0 BodyParts3D / CC0 UM). 7 tarsals (calcaneus, talus, navicular, cuboid, 3 cuneiforms) + 5 metatarsals + 13 phalanges + sesamoids (1st MTP). Teaching visualization grade; not surgical registration / patient-specific modeling.

**Screenshot**: `screenshots/02-bone-only.png` (Bone layer only — default oblique)

---

## Figure 2: Layer Toggles / Ghost Opacity (Teaching UX)

**中文**: 层切换面板附 **ghost / 透视** 功能（`G` 热键；每层不透明度 0.0–1.0）。覆盖软组织可透明化，使深层骨骼可见（教学模式）。教学用偏好持久化（localStorage）；非临床 X 光 / 透视。清单：≈53/124 唯一主树（CC BY/CC0）vs ≈71/124 唯一 BY-SA 隔离。

**English**: Layer toggle panel with **ghost / 透视** feature (`G` hotkey; per-layer opacity 0.0–1.0). Superficial soft tissue can fade so underlying osteology remains visible (teaching mode). Teaching prefs persist (localStorage); not clinical X-ray / fluoroscopy. Census: ≈53/124 unique main-tree (CC BY/CC0) vs ≈71/124 unique BY-SA isolate.

**Screenshot**: `screenshots/10-ghost-opacity.png` (Ghost opacity preset — muscle layers semi-transparent over bones; teaching mode Day 4bm)

---

## Figure 3: Explode / 抽出 (Spatial Separation)

**中文**: **explode / 抽出** 功能（`E` 热键；每层 +Y 空间分离 0–50 mm）。覆盖层剥离，使夹层可读（教学 3D 解剖演示）；非手术解剖。教学用偏好持久化；非固定标本拍摄。

**English**: **Explode / 抽出** feature (`E` hotkey; per-layer +Y spatial separation 0–50 mm). Superficial layers peel apart so layer sandwich is readable (teaching 3D anatomy demo); not surgical dissection. Teaching prefs persist; not fixed-specimen photography.

**Screenshot**: `screenshots/11-explode-separation.png` (Explode spatial separation — layers separated +Y for teaching sandwich visibility; Day 4bn)

---

## Figure 4: BY-SA Isolate vs Main Tree (License Boundaries)

**中文**: **BY-SA 隔离 · ShareAlike** vs **主树 · Main** 许可证徽章（StructurePanel）。BY-SA 结构（神经 17/17；韧带 27/29；血管 22/29；肌肉 5/23 唯一）置于 `public/models/right-foot/by-sa/` 隔离目录；衍生作品需 ShareAlike。主树（骨骼 26/26；肌肉 18/23 唯一；血管 7/29）= MIT 代码 + CC BY 4.0 / CC0 网格。NC（非商业）源已拒绝（Zenodo Scan-the-World; Visible Korean; BoneHub）；详见 `docs/week2-soft-ceiling-memo.md` 拒绝理由。

**English**: **BY-SA 隔离 · ShareAlike** vs **主树 · Main** license badges (StructurePanel). BY-SA structures (nerves 17/17; ligaments 27/29; vessels 22/29; muscles 5/23 unique) isolated in `public/models/right-foot/by-sa/` directory; derivatives require ShareAlike. Main tree (bones 26/26; muscles 18/23 unique; vessels 7/29) = MIT code + CC BY 4.0 / CC0 meshes. NC (Non-Commercial) sources rejected (Zenodo Scan-the-World; Visible Korean; BoneHub); see `docs/week2-soft-ceiling-memo.md` for reject rationale.

**Screenshot**: `screenshots/04-nerve-bysa.png` (Nerve layer only — BY-SA isolate visible in panel/legend with license badge)

---

## Figure 5: Soft-Ceiling / Teaching-Compromise Grouped DI-MTA (Honest Gaps)

**中文**: **软组织 census 软天花板**：详尽搜索 #1–#170（Day 4cl–4ct Week 2）未发现 CC0/BY 逐趾背侧骨间肌（DI）、蚓状肌、逐射线跖骨动脉（MTA）网格源。**分组结构为教学妥协（teaching compromises）**，非逐趾/逐射线元素图谱：(1) DI 1st–4th 组合（Open3D BY-SA 隔离）；(2) 跖背 MTA 所有射线（Open3D BY-SA 隔离）；(3) 跖底 MTA 所有射线（BP3D FJ2096 CC BY）。StructurePanel 显示 meshNote（"census 软天花板：无 CC0/BY 逐趾 DI 网格源"）+ 双语 "教学妥协（teaching compromise），非逐趾肌肉图谱" 诚实度文案。详见 `docs/week2-soft-ceiling-memo.md` NC/SA/不明拒绝 + `docs/methods.md` 限制表格。

**English**: **Soft-tissue census soft ceiling**: Exhaustive search #1–#170 (Day 4cl–4ct Week 2) found **no CC0/BY per-toe dorsal interossei (DI), lumbricals, per-ray metatarsal arteries (MTA)** mesh sources. **Grouped structures are teaching compromises**, not per-toe/per-ray elemental atlases: (1) DI 1st–4th combined (Open3D BY-SA isolate); (2) dorsal MTA all rays (Open3D BY-SA isolate); (3) plantar MTA all rays (BP3D FJ2096 CC BY). StructurePanel shows meshNote ("census soft ceiling: no CC0/BY per-toe DI source meshes") + bilingual "teaching compromise, not per-toe muscle atlas" honesty text. See `docs/week2-soft-ceiling-memo.md` for NC/SA/unclear rejects + `docs/methods.md` limitations table.

**Screenshot**: `screenshots/01-default-all-layers.png` (Default view with all teaching layers — grouped DI and MTA structures visible; StructurePanel shows meshNote/gap notes for teaching compromises)

---

## Figure 6: Ontology Honest Empties (126/129 Citable)

**中文**: 本体论 IDs 部分：**126/129** 结构有 ≥1 可引用 TA2 / FMA / BP；**3 诚实空**（StructurePanel 显示双语原因）：(1) `cervical_talocalcaneal_ligament` 颈距跟韧带（无独立 TA98 A 码；常作外侧距跟韧带临床同义词）；(2) `medial_plantar_veins` 足底内侧静脉（仅 TNA TAH U15825；无 TA98 A 码 / 明确 FMA）；(3) `lateral_plantar_vein` 足底外侧静脉（仅 TNA TAH U15824；无 TA98 A 码 / 明确 FMA）。StructurePanel 显示 "本体论 · Ontology (honest empty)" 标签 + 具体原因；非 TA2 完整软组织。详见 `src/lib/ontologyIds.ts` lines 392-404 + `docs/expert-review-checklist.md` v3.0 §E。

**English**: Ontology IDs partial: **126/129** structures have ≥1 citable TA2 / FMA / BP; **3 honest empties** (StructurePanel shows bilingual reasons): (1) `cervical_talocalcaneal_ligament` cervical talocalcaneal ligament (no distinct TA98 A-code; often lateral TC clinical synonym); (2) `medial_plantar_veins` medial plantar veins (TNA-only TAH U15825; no TA98 A-code / clear FMA); (3) `lateral_plantar_vein` lateral plantar vein (TNA-only TAH U15824; no TA98 A-code / clear FMA). StructurePanel shows "本体论 · Ontology (honest empty)" label + specific reasons; not TA2-complete soft tissue. See `src/lib/ontologyIds.ts` lines 392-404 + `docs/expert-review-checklist.md` v3.0 §E.

**Screenshot**: *(No dedicated screenshot; ontology IDs and honest-empty labels are UI-specific text in StructurePanel. Reviewers can inspect the 3 honest empties by selecting `cervical_talocalcaneal_ligament`, `medial_plantar_veins`, or `lateral_plantar_vein` in the running app to see the "Ontology (honest empty)" label with bilingual reasons. See `src/lib/ontologyIds.ts` HONEST_ONTOLOGY_EMPTIES for implementation.)*

---

## Figure 7: Kabsch Co-Registration Residuals (Teaching Visualization Grade)

**中文**: Kabsch 刚性对齐残差（Open3D→BP3D 均值 ≈**2.61 mm** 最大 ≈**4.41 mm** MT1；UM→BP3D 均值 ≈**2.22 mm** 最大 ≈**4.38 mm** 距骨；ZA→BP3D 均值 ≈**1.81 mm** 最大 ≈**3.52 mm** 跟骨）。教学可视化级；**非**手术配准 / 植入物定尺 / 导航误差界限。逐地标残差详见 **`docs/methods.md` Table 1: Kabsch Co-Registration Residuals** + `third_party/*/kabsch_*.json` + `docs/methods.md` 限制表格。

**English**: Kabsch rigid alignment residuals (Open3D→BP3D mean ≈**2.61 mm** max ≈**4.41 mm** MT1; UM→BP3D mean ≈**2.22 mm** max ≈**4.38 mm** talus; ZA→BP3D mean ≈**1.81 mm** max ≈**3.52 mm** calcaneus). Teaching visualization grade; **not** surgical registration / implant sizing / navigation error bounds. Per-landmark residuals see **`docs/methods.md` Table 1: Kabsch Co-Registration Residuals** + `third_party/open3dmodel/open3d_to_bp3d_transform.json` (12 landmarks with per-landmark breakdown), `third_party/um/um_to_bp3d_transform.json` (7 landmarks), `third_party/z-anatomy/za_to_bp3d_transform.json` (9 landmarks) + `docs/methods.md` limitations table.

**Screenshot**: `screenshots/02-bone-only.png` *(Bone layer only — note: Kabsch residuals are **numeric data** in `kabsch_*.json` transform files, not visible as overlays or color-coded heatmaps in the 3D view; this bone screenshot illustrates the co-registered result, not the residuals themselves)*

---

## General Figure Notes (All Teaching Figures)

**中文**: 所有图表均为**教学用**（非临床诊断 / 治疗计划 / 手术导航 / 患者特异性建模）。教学图谱**进行中**；**非** TA2 完整软组织；**非**成品。清单 129/124 条目/唯一（126/129 本体可引；3 诚实空）；53 主树 / 71 BY-SA；134 GLB 磁盘（≈13 MB）。

**English**: All figures are for **teaching use** (not clinical diagnosis / treatment planning / surgical navigation / patient-specific modeling). Teaching atlas **in progress**; **not** TA2-complete soft tissue; **not** a finished product. Census 129/124 entries/unique (126/129 ontology citable; 3 honest empties); 53 main-tree / 71 BY-SA; 134 GLBs on-disk (≈13 MB).

---

**Version**: 1.0 (2026-09-22 Day 4db)  
**Companion docs**: `docs/methods.md` (limitations table + license matrix), `docs/week2-soft-ceiling-memo.md` (NC/SA rejects + teaching compromises), `docs/expert-review-checklist.md` v3.0 (QA), `README.md` (Limitations)

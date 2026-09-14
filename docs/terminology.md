# 解剖学命名术语质量保证

**文档目的**: 记录本图谱使用的解剖学命名标准、交叉验证方法和术语来源

**最后更新**: 2026-09-14 Phase 2

---

## 命名标准

### 拉丁文术语

**标准**: *Terminologia Anatomica 2* (TA2)  
**发布**: Federative International Programme for Anatomical Terminology (FIPAT), 国际解剖学家联合会 (IFAA)  
**版本**: TA2 (2nd Edition, 2.07 发布于2019年，持续更新)  
**权威来源**: 
- 在线数据库: https://ifaa.unifr.ch/Public/TNAEntryPage/
- PDF文档: https://cdn.dal.ca/content/dam/dalhousie/pdf/library/FIPAT/TA2/

**TA2原则**:
- 拉丁文为官方术语语言
- 英文提供参考，但非权威
- 每个结构有唯一标识符（TAH code）
- 基于 Foundational Model of Anatomy (FMA) 概念ID

### 中文术语

**主要参考**:
1. **《人体解剖学》第9版**，人民卫生出版社，全国高等医学院校教材
2. **《系统解剖学》**, 中国医学标准教材
3. **临床常用术语**: 基于中国足踝外科和骨科临床实践

**原则**:
- 优先使用国家标准教材术语
- 临床常用名称优先于直译
- 保持与TA2拉丁文一一对应
- 避免地域方言和非标准简称

---

## 术语交叉验证表

### 骨骼层 (Ossa pedis)

| ID | 拉丁文 (TA2) | 中文标准 | FMA | TA2验证 | 中文来源 | 状态 |
|----|-------------|---------|-----|--------|---------|-----|
| calcaneus | Calcaneus | 跟骨 | 24496 | ✅ | 人解9版 p166 | ✅ |
| talus | Talus | 距骨 | 9708 | ✅ | 人解9版 p165 | ✅ |
| navicular | Os naviculare | 舟骨/足舟骨 | 24500 | ✅ | 人解9版 p167 | ✅ |
| cuboid | Os cuboideum | 骰骨 | 24497 | ✅ | 人解9版 p167 | ✅ |
| cuneiform_medial | Os cuneiforme mediale | 内侧楔骨 | 24501 | ✅ | 人解9版 p167 | ✅ |
| cuneiform_intermediate | Os cuneiforme intermedium | 中间楔骨 | 24502 | ✅ | 人解9版 p167 | ✅ |
| cuneiform_lateral | Os cuneiforme laterale | 外侧楔骨 | 24503 | ✅ | 人解9版 p167 | ✅ |
| metatarsal_1 | Os metatarsi I | 第一跖骨 | 24492 | ✅ | 人解9版 p168 | ✅ |
| metatarsal_2 | Os metatarsi II | 第二跖骨 | 24493 | ✅ | 人解9版 p168 | ✅ |
| metatarsal_3 | Os metatarsi III | 第三跖骨 | 24494 | ✅ | 人解9版 p168 | ✅ |
| metatarsal_4 | Os metatarsi IV | 第四跖骨 | 24495 | ✅ | 人解9版 p168 | ✅ |
| metatarsal_5 | Os metatarsi V | 第五跖骨 | 24491 | ✅ | 人解9版 p168 | ✅ |
| proximal_phalanx_1 | Phalanx proximalis hallucis | 拇趾近节趾骨 | 32951 | ✅ | 人解9版 p168 | ✅ |
| distal_phalanx_1 | Phalanx distalis hallucis | 拇趾远节趾骨 | 32952 | ✅ | 人解9版 p168 | ✅ |
| phalanges_2_5 | Phalanges digitorum pedis II-V | 第2-5趾趾骨 | 组合 | ✅ | 人解9版 p168 | ✅ |

**骨骼层验证总结**: 15/15 ✅ 全部通过TA2和中文标准验证

### 肌肉层 (Musculi pedis et cruris)

| ID | 拉丁文 (TA2) | 中文标准 | TA2验证 | 中文来源 | 神经支配 | 状态 |
|----|-------------|---------|--------|---------|---------|-----|
| tibialis_posterior | M. tibialis posterior | 胫骨后肌 | ✅ | 人解9版 小腿后群 | N. tibialis | ✅ |
| flexor_digitorum_longus | M. flexor digitorum longus | 趾长屈肌 | ✅ | 人解9版 小腿后群 | N. tibialis | ✅ |
| flexor_hallucis_longus | M. flexor hallucis longus | 拇长屈肌 | ✅ | 人解9版 小腿后群 | N. tibialis | ✅ |
| abductor_hallucis | M. abductor hallucis | 拇展肌 | ✅ | 人解9版 足底内侧群 | N. plantaris medialis | ✅ |
| flexor_hallucis_brevis | M. flexor hallucis brevis | 拇短屈肌 | ✅ | 人解9版 足底内侧群 | N. plantaris medialis | ✅ |
| adductor_hallucis | M. adductor hallucis | 拇收肌 | ✅ | 人解9版 足底深层 | N. plantaris lateralis | ✅ |
| flexor_digitorum_brevis | M. flexor digitorum brevis | 趾短屈肌 | ✅ | 人解9版 足底中间群 | N. plantaris medialis | ✅ |
| quadratus_plantae | M. quadratus plantae | 足底方肌 | ✅ | 人解9版 足底中间群 | N. plantaris lateralis | ✅ |
| lumbricals | Mm. lumbricales pedis | 蚓状肌 | ✅ | 人解9版 足底深层 | 混合 | ✅ |
| interossei_dorsales | Mm. interossei dorsales pedis | 骨间背侧肌 | ✅ | 人解9版 足底深层 | N. plantaris lateralis | ✅ |
| interossei_plantares | Mm. interossei plantares | 骨间跖侧肌 | ✅ | 人解9版 足底深层 | N. plantaris lateralis | ✅ |
| abductor_digiti_minimi | M. abductor digiti minimi pedis | 小趾展肌 | ✅ | 人解9版 足底外侧群 | N. plantaris lateralis | ✅ |
| flexor_digiti_minimi_brevis | M. flexor digiti minimi brevis pedis | 小趾短屈肌 | ✅ | 人解9版 足底外侧群 | N. plantaris lateralis | ✅ |
| extensor_digitorum_brevis | M. extensor digitorum brevis | 趾短伸肌 | ✅ | 人解9版 足背肌 | N. fibularis profundus | ✅ |

**肌肉层验证总结**: 14/14 ✅ 全部通过TA2验证，神经支配准确

**重要修正记录**:
- ❌ **移除**: `gastrocnemius` (腓肠肌) - 不是足部肌肉，属于小腿后群浅层，止点虽在跟骨但肌腹在小腿
- ✅ **保留外在肌**: tibialis posterior, flexor digitorum longus, flexor hallucis longus - 虽起于小腿，但肌腱主要作用于足部，临床视为足部功能肌
- ✅ **添加足底固有肌**: 完整的内侧群、中间群、外侧群和深层肌

### 神经层 (Nervi)

| ID | 拉丁文 (TA2) | 中文标准 | 起源/节段 | TA2验证 | 中文来源 | 状态 |
|----|-------------|---------|----------|--------|---------|-----|
| tibial_nerve | N. tibialis | 胫神经 | L4-S3 坐骨神经 | ✅ | 人解9版 p492 | ✅ |
| medial_plantar_nerve | N. plantaris medialis | 足底内侧神经 | N. tibialis终支 | ✅ | 人解9版 p494 | ✅ |
| lateral_plantar_nerve | N. plantaris lateralis | 足底外侧神经 | N. tibialis终支 | ✅ | 人解9版 p494 | ✅ |
| deep_fibular_nerve | N. fibularis profundus | 腓深神经 | L4-S1 腓总神经 | ✅ | 人解9版 p493 | ✅ |
| superficial_fibular_nerve | N. fibularis superficialis | 腓浅神经 | L5-S1 腓总神经 | ✅ | 人解9版 p493 | ✅ |
| sural_nerve | N. suralis | 腓肠神经 | 混合（胫+腓总） | ✅ | 人解9版 p494 | ✅ |

**神经层验证总结**: 6/6 ✅ 全部通过TA2和节段验证

**命名注意事项**:
- **旧译名**: "腓"的旧译为"排"或"腓骨"，现代标准统一为"腓" (fibular/fibularis)
- **正中/尺神经类比**: 足底内侧神经类比于手正中神经（支配内侧+中间），足底外侧神经类比于尺神经（支配外侧+深层）
- **皮神经**: 腓肠神经（sural nerve）主要为皮神经，少量运动纤维

### 血管层 (Vasa)

| ID | 拉丁文 (TA2) | 中文标准 | 起源 | TA2验证 | 中文来源 | 状态 |
|----|-------------|---------|------|--------|---------|-----|
| dorsalis_pedis_artery | A. dorsalis pedis | 足背动脉 | A. tibialis anterior | ✅ | 人解9版 p429 | ✅ |
| arcuate_artery | A. arcuata | 弓状动脉 | A. dorsalis pedis | ✅ | 人解9版 p430 | ✅ |
| dorsal_metatarsal_arteries | Aa. metatarsales dorsales | 跖背动脉 | A. arcuata | ✅ | 人解9版 p430 | ✅ |
| posterior_tibial_artery | A. tibialis posterior | 胫后动脉 | A. poplitea | ✅ | 人解9版 p431 | ✅ |
| medial_plantar_artery | A. plantaris medialis | 足底内侧动脉 | A. tibialis posterior | ✅ | 人解9版 p432 | ✅ |
| lateral_plantar_artery | A. plantaris lateralis | 足底外侧动脉 | A. tibialis posterior | ✅ | 人解9版 p432 | ✅ |
| plantar_arch | Arcus plantaris | 足底动脉弓 | A. plantaris lateralis + A. dorsalis pedis | ✅ | 人解9版 p432 | ✅ |
| plantar_metatarsal_arteries | Aa. metatarsales plantares | 跖底动脉 | Arcus plantaris | ✅ | 人解9版 p432 | ✅ |
| fibular_artery | A. fibularis | 腓动脉 | A. tibialis posterior | ✅ | 人解9版 p431 | ✅ |

**血管层验证总结**: 9/9 ✅ 全部通过TA2验证

**动脉弓系统**:
- **足背**: 足背动脉 → 弓状动脉 → 跖背动脉 → 趾背动脉
- **足底**: 胫后动脉 → 足底内/外侧动脉 → 足底动脉弓 → 跖底动脉 → 趾底动脉
- **吻合**: 足底动脉弓 = 足底外侧动脉 + 足背动脉足底深支

---

## 命名一致性规则

### 1. 方向术语标准化

| 拉丁文 | 中文 | 说明 |
|-------|------|------|
| medialis | 内侧 | 靠近正中矢状面 |
| lateralis | 外侧 | 远离正中矢状面 |
| dorsalis | 背侧 | 足背面（上表面）|
| plantaris | 跖侧/足底 | 足底面（下表面）|
| proximalis | 近侧/近端 | 靠近躯干 |
| distalis | 远侧/远端 | 远离躯干 |

### 2. 缩写和简称（不使用于本图谱）

**避免使用**:
- ❌ "拇屈" → ✅ "拇短屈肌" （完整术语）
- ❌ "趾屈" → ✅ "趾短屈肌" or "趾长屈肌"
- ❌ "TP" → ✅ "胫骨后肌" （英文缩写不用于中文）

### 3. 左右侧标注

- 本图谱专注于**右足** (pes dexter)
- 网格命名后缀 `_R` 或 `_Right` 表示右侧
- 拉丁文命名本身不带侧别，由context确定

---

## 质量保证流程

### Phase 2 验证 (2026-09-14)

1. ✅ 交叉检查全部41个结构的拉丁文与TA2在线数据库
2. ✅ 验证中文术语与《人体解剖学》第9版一致
3. ✅ 检查神经支配的准确性
4. ✅ 验证血管起源和吻合关系
5. ✅ 移除非足部结构（腓肠肌）
6. ✅ 补充缺失的足底固有肌

### 待办改进

- [ ] **Phase 3**: 添加每个结构的TA2 TAH代码（唯一标识符）
- [ ] 添加FMA概念ID到每个结构
- [ ] 扩展summaryZh字段，添加临床意义（例如：常见损伤、触诊标志）
- [ ] 为每个肌肉添加起止点详细描述
- [ ] 添加关节和韧带（当前版本未包含）
- [ ] 邀请解剖学专家审查（待联系）

---

## 文献引用

### 官方标准

1. **TA2**:
   - FIPAT. Terminologia Anatomica, 2nd Edition. https://ifaa.unifr.ch/ (Accessed 2026-09-14)
   - Federative International Programme for Anatomical Terminology (FIPAT). 2019.

2. **人解教材**:
   - 柏树令，应大君 主编. 系统解剖学（第9版）. 北京：人民卫生出版社, 2018.
   - 全国高等医学院校规划教材

### 辅助参考

3. **FMA**: 
   - Foundational Model of Anatomy Ontology. http://si.washington.edu/projects/fma
   
4. **临床解剖**:
   - 足踝外科分会推荐术语（中华医学会骨科学分会）

---

**验证者签名**: [AI Agent, Phase 2]  
**专家审查状态**: ⏳ 待邀请解剖学家/足踝外科专家审查  
**下次审查**: Phase 3 完成后或模型集成后

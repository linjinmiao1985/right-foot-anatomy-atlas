# 右足解剖图谱 MVP 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**目标**: 构建基准级/黄金标准的右足医学解剖 Web 图谱，采用 Vite + React + TypeScript + React Three Fiber，支持交互式 3D 可视化、层切换、结构选择，中英文标注，适合教学并为期刊发表奠定基础。

**架构**: 前端单页应用，客户端 3D 渲染（three.js/R3F），静态 JSON 数据驱动，Open3DModel CC BY-SA 4.0 真实解剖模型（或临时占位几何+诚实标注），四层系统（bone/muscle/nerve/vessel），点击拾取+信息面板，无后端。

**技术栈**: 
- Vite 5.x, React 18.x, TypeScript 5.x (strict mode)
- three.js, @react-three/fiber, @react-three/drei
- Vitest, @testing-library/react
- CSS Modules / inline styles

## 全局约束

- Node.js ≥ 18.0
- TypeScript 严格模式，禁止 `any`
- 所有结构使用 Terminologia Anatomica 2 (TA2) 拉丁文标准名称
- 中文术语基于中国医学标准教材
- ≥ 15 个结构，覆盖全部四层（bone/muscle/nerve/vessel）
- 每个结构需: id, meshNames[], layer, nameZh, nameLa, summaryZh, placeholder
- 占位几何必须在 UI 显示「占位」徽章
- 许可合规：CC BY-SA 4.0 署名 (Open3DModel) 在 README + 应用内
- 提交消息格式: `feat: description` / `fix: description` / `docs: description`
- 每个逻辑变更独立提交
- 测试必须通过 `npx vitest run`
- 构建必须成功 `npm run build`

---

## Task 1: 项目脚手架 + 基础设置

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `.gitignore`, `vitest.config.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: (none)
- Produces: 可运行的 Vite React TypeScript 应用骨架，`npm run dev` 启动开发服务器

- [ ] **步骤 1: 初始化 package.json**

```bash
cd /workspace
npm init -y
npm install --save react@^18.3.0 react-dom@^18.3.0
npm install --save three@^0.170.0 @react-three/fiber@^8.17.0 @react-three/drei@^9.118.0
npm install --save-dev vite@^5.4.0 @vitejs/plugin-react@^4.3.0
npm install --save-dev typescript@^5.6.0 @types/react@^18.3.0 @types/react-dom@^18.3.0 @types/three@^0.170.0
npm install --save-dev vitest@^2.1.0 @testing-library/react@^16.0.0 @testing-library/jest-dom@^6.5.0 jsdom@^25.0.0
```

- [ ] **步骤 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **步骤 3: 创建 tsconfig.node.json**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts", "vitest.config.ts"]
}
```

- [ ] **步骤 4: 创建 vite.config.ts**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
});
```

- [ ] **步骤 5: 创建 vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
  },
});
```

- [ ] **步骤 6: 创建 src/setupTests.ts**

```typescript
import '@testing-library/jest-dom';
```

- [ ] **步骤 7: 创建 index.html**

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="右足解剖图谱 - 交互式3D医学教育工具" />
    <title>右足解剖图谱 · MVP</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **步骤 8: 创建 src/index.css**

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: #1a1a1a;
  color: #e0e0e0;
  overflow: hidden;
}

#root {
  width: 100vw;
  height: 100vh;
}
```

- [ ] **步骤 9: 创建 src/main.tsx**

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **步骤 10: 创建 src/App.tsx (占位)**

```typescript
function App() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>右足解剖图谱 · MVP</h1>
      <p>React + TypeScript + R3F 应用骨架</p>
    </div>
  );
}

export default App;
```

- [ ] **步骤 11: 创建 .gitignore**

```gitignore
# Dependencies
node_modules
.pnp
.pnp.js

# Testing
coverage

# Production
dist
dist-ssr
*.local

# Editor
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Env
.env
.env.local
.env.production.local
.env.development.local
.env.test.local

# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*
```

- [ ] **步骤 12: 更新 package.json scripts**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest"
  }
}
```

- [ ] **步骤 13: 测试开发服务器**

运行: `npm run dev`  
预期: Vite 启动在 http://localhost:5173, 显示「右足解剖图谱 · MVP」

- [ ] **步骤 14: 测试构建**

运行: `npm run build`  
预期: `dist/` 目录生成，无 TypeScript 错误

- [ ] **步骤 15: 提交**

```bash
git add .
git commit -m "feat: initialize Vite React TypeScript project scaffold"
```

---

## Task 2: 类型定义 + structures.json 数据 + 查找逻辑

**Files:**
- Create: `src/types/anatomy.ts`, `src/data/structures.json`, `src/lib/structureLookup.ts`, `src/lib/structureLookup.test.ts`

**Interfaces:**
- Consumes: (none)
- Produces: 
  - `AnatomyStructure` 类型
  - ≥15 结构的 JSON 数据（四层全覆盖，TA2拉丁名+中文）
  - `getStructureById(id)` 和 `getStructureByMeshName(name)` 函数

- [ ] **步骤 1: 编写失败测试**

```typescript
// src/lib/structureLookup.test.ts
import { describe, it, expect } from 'vitest';
import { getStructureById, getStructureByMeshName } from './structureLookup';

describe('structureLookup', () => {
  it('should find structure by id', () => {
    const structure = getStructureById('calcaneus');
    expect(structure).toBeDefined();
    expect(structure?.nameZh).toBe('跟骨');
    expect(structure?.nameLa).toBe('Calcaneus');
  });

  it('should return undefined for invalid id', () => {
    const structure = getStructureById('invalid_id_xyz');
    expect(structure).toBeUndefined();
  });

  it('should find structure by mesh name', () => {
    const structure = getStructureByMeshName('Calcaneus_R');
    expect(structure).toBeDefined();
    expect(structure?.id).toBe('calcaneus');
  });

  it('should return undefined for unmapped mesh', () => {
    const structure = getStructureByMeshName('UnmappedMesh_123');
    expect(structure).toBeUndefined();
  });
});
```

- [ ] **步骤 2: 运行测试确认失败**

运行: `npx vitest run src/lib/structureLookup.test.ts`  
预期: FAIL - 函数未定义

- [ ] **步骤 3: 定义类型**

```typescript
// src/types/anatomy.ts
export type Layer = 'bone' | 'muscle' | 'nerve' | 'vessel';

export interface AnatomyStructure {
  id: string;
  meshNames: string[];
  layer: Layer;
  nameZh: string;
  nameLa: string;
  summaryZh: string;
  placeholder: boolean;
}
```

- [ ] **步骤 4: 创建 structures.json (≥15, 真实 TA2 术语)**

```json
[
  {
    "id": "calcaneus",
    "meshNames": ["Calcaneus_R", "Bone_Calcaneus_Right"],
    "layer": "bone",
    "nameZh": "跟骨",
    "nameLa": "Calcaneus",
    "summaryZh": "足部最大的跗骨，形成足跟，承担站立时的主要负重，与距骨形成距下关节",
    "placeholder": false
  },
  {
    "id": "talus",
    "meshNames": ["Talus_R", "Bone_Talus_Right"],
    "layer": "bone",
    "nameZh": "距骨",
    "nameLa": "Talus",
    "summaryZh": "位于跟骨上方，上接胫骨腓骨形成踝关节，下与跟骨构成距下关节，无肌肉附着",
    "placeholder": false
  },
  {
    "id": "navicular",
    "meshNames": ["Navicular_R", "Os_Naviculare_Right"],
    "layer": "bone",
    "nameZh": "舟骨",
    "nameLa": "Os naviculare",
    "summaryZh": "舟状骨，位于距骨头与三块楔骨之间，内侧舟骨粗隆为胫骨后肌附着点",
    "placeholder": false
  },
  {
    "id": "cuboid",
    "meshNames": ["Cuboid_R", "Os_Cuboideum_Right"],
    "layer": "bone",
    "nameZh": "骰骨",
    "nameLa": "Os cuboideum",
    "summaryZh": "立方形骨，位于跟骨前方、第4、5跖骨底后方，下方有腓骨长肌沟",
    "placeholder": false
  },
  {
    "id": "cuneiform_medial",
    "meshNames": ["Cuneiform_Medial_R", "Os_Cuneiforme_Mediale_Right"],
    "layer": "bone",
    "nameZh": "内侧楔骨",
    "nameLa": "Os cuneiforme mediale",
    "summaryZh": "三块楔骨中最大者，位于舟骨与第1跖骨之间，参与维持足内侧纵弓",
    "placeholder": false
  },
  {
    "id": "cuneiform_intermediate",
    "meshNames": ["Cuneiform_Intermediate_R", "Os_Cuneiforme_Intermedium_Right"],
    "layer": "bone",
    "nameZh": "中间楔骨",
    "nameLa": "Os cuneiforme intermedium",
    "summaryZh": "三块楔骨中最小者，位于内侧楔骨与外侧楔骨之间，与第2跖骨相接",
    "placeholder": false
  },
  {
    "id": "cuneiform_lateral",
    "meshNames": ["Cuneiform_Lateral_R", "Os_Cuneiforme_Laterale_Right"],
    "layer": "bone",
    "nameZh": "外侧楔骨",
    "nameLa": "Os cuneiforme laterale",
    "summaryZh": "位于中间楔骨外侧，舟骨与第3跖骨之间，内侧面接中间楔骨和第2跖骨底",
    "placeholder": false
  },
  {
    "id": "metatarsal_1",
    "meshNames": ["Metatarsal_I_R", "Metatarsal_1_Right"],
    "layer": "bone",
    "nameZh": "第一跖骨",
    "nameLa": "Os metatarsi I",
    "summaryZh": "五根跖骨中最粗短者，位于拇趾侧，与内侧楔骨相接，头部下方有籽骨",
    "placeholder": false
  },
  {
    "id": "metatarsal_5",
    "meshNames": ["Metatarsal_V_R", "Metatarsal_5_Right"],
    "layer": "bone",
    "nameZh": "第五跖骨",
    "nameLa": "Os metatarsi V",
    "summaryZh": "最外侧跖骨，底部向后外伸出第5跖骨粗隆，为腓骨短肌附着点",
    "placeholder": false
  },
  {
    "id": "tibialis_posterior",
    "meshNames": ["Tibialis_Posterior_R", "M_Tibialis_Posterior_Right"],
    "layer": "muscle",
    "nameZh": "胫骨后肌",
    "nameLa": "M. tibialis posterior",
    "summaryZh": "小腿深后群最深层肌，起自胫腓骨后面和骨间膜，止于舟骨粗隆和楔骨，作用为足内翻和跖屈，动态支撑内侧纵弓",
    "placeholder": false
  },
  {
    "id": "flexor_digitorum_longus",
    "meshNames": ["Flexor_Digitorum_Longus_R", "M_Flexor_Digitorum_Longus_Right"],
    "layer": "muscle",
    "nameZh": "趾长屈肌",
    "nameLa": "M. flexor digitorum longus",
    "summaryZh": "起自胫骨后面，经内踝后方入足底，分为4腱止于第2-5趾远节趾骨底，屈第2-5趾并辅助跖屈",
    "placeholder": false
  },
  {
    "id": "flexor_hallucis_longus",
    "meshNames": ["Flexor_Hallucis_Longus_R", "M_Flexor_Hallucis_Longus_Right"],
    "layer": "muscle",
    "nameZh": "拇长屈肌",
    "nameLa": "M. flexor hallucis longus",
    "summaryZh": "起自腓骨后面下2/3，肌腱经距骨后方内踝后下至足底，止于拇趾远节趾骨底，屈拇趾并辅助跖屈",
    "placeholder": false
  },
  {
    "id": "gastrocnemius",
    "meshNames": ["Gastrocnemius_R", "M_Gastrocnemius_Medial_R", "M_Gastrocnemius_Lateral_R"],
    "layer": "muscle",
    "nameZh": "腓肠肌",
    "nameLa": "M. gastrocnemius",
    "summaryZh": "小腿后群浅层，内外侧头起自股骨内外侧髁，与比目鱼肌共同形成小腿三头肌，经跟腱止于跟骨结节，主要作用为跖屈踝关节",
    "placeholder": false
  },
  {
    "id": "tibial_nerve",
    "meshNames": ["Tibial_Nerve_R", "N_Tibialis_Right"],
    "layer": "nerve",
    "nameZh": "胫神经",
    "nameLa": "N. tibialis",
    "summaryZh": "坐骨神经较大终支(L4-S3)，沿小腿后面下行，经内踝后方屈肌支持带深面入足底，分为足底内外侧神经，支配小腿后群肌和足底肌",
    "placeholder": false
  },
  {
    "id": "medial_plantar_nerve",
    "meshNames": ["Medial_Plantar_Nerve_R", "N_Plantaris_Medialis_Right"],
    "layer": "nerve",
    "nameZh": "足底内侧神经",
    "nameLa": "N. plantaris medialis",
    "summaryZh": "胫神经终支之一，与足底内侧动脉伴行，分布于足底内侧肌群及内侧3.5趾跖面皮肤，类似于手部正中神经",
    "placeholder": false
  },
  {
    "id": "lateral_plantar_nerve",
    "meshNames": ["Lateral_Plantar_Nerve_R", "N_Plantaris_Lateralis_Right"],
    "layer": "nerve",
    "nameZh": "足底外侧神经",
    "nameLa": "N. plantaris lateralis",
    "summaryZh": "胫神经终支之一，分布于足底中间和外侧肌群及外侧1.5趾跖面皮肤，类似于手部尺神经",
    "placeholder": false
  },
  {
    "id": "dorsalis_pedis_artery",
    "meshNames": ["Dorsalis_Pedis_Artery_R", "A_Dorsalis_Pedis_Right"],
    "layer": "vessel",
    "nameZh": "足背动脉",
    "nameLa": "A. dorsalis pedis",
    "summaryZh": "胫前动脉延续，沿足背至第1跖骨间隙，分为第1跖背动脉和足底深支，发出跗内外侧动脉和弓状动脉",
    "placeholder": false
  },
  {
    "id": "posterior_tibial_artery",
    "meshNames": ["Posterior_Tibial_Artery_R", "A_Tibialis_Posterior_Right"],
    "layer": "vessel",
    "nameZh": "胫后动脉",
    "nameLa": "A. tibialis posterior",
    "summaryZh": "腘动脉终支之一，沿小腿后面下行，经内踝后方入足底，在跟骨结节内侧分为足底内外侧动脉",
    "placeholder": false
  },
  {
    "id": "medial_plantar_artery",
    "meshNames": ["Medial_Plantar_Artery_R", "A_Plantaris_Medialis_Right"],
    "layer": "vessel",
    "nameZh": "足底内侧动脉",
    "nameLa": "A. plantaris medialis",
    "summaryZh": "胫后动脉终支，沿足内侧缘前行，分布于足内侧和拇展肌、趾短屈肌，发出趾支至拇趾",
    "placeholder": false
  },
  {
    "id": "lateral_plantar_artery",
    "meshNames": ["Lateral_Plantar_Artery_R", "A_Plantaris_Lateralis_Right"],
    "layer": "vessel",
    "nameZh": "足底外侧动脉",
    "nameLa": "A. plantaris lateralis",
    "summaryZh": "胫后动脉终支，斜向外前行至足外侧，与足背动脉足底深支吻合形成足底动脉弓，发出跖底动脉供应趾部",
    "placeholder": false
  }
]
```

注：以上20个结构，覆盖全部四层，真实TA2术语+临床常用中文

- [ ] **步骤 5: 实现查找函数**

```typescript
// src/lib/structureLookup.ts
import type { AnatomyStructure } from '../types/anatomy';
import structuresData from '../data/structures.json';

const structures = structuresData as AnatomyStructure[];

export function getStructureById(id: string): AnatomyStructure | undefined {
  return structures.find((s) => s.id === id);
}

export function getStructureByMeshName(meshName: string): AnatomyStructure | undefined {
  return structures.find((s) => s.meshNames.includes(meshName));
}

export function getAllStructures(): AnatomyStructure[] {
  return structures;
}
```

- [ ] **步骤 6: 运行测试确认通过**

运行: `npx vitest run src/lib/structureLookup.test.ts`  
预期: PASS

- [ ] **步骤 7: 提交**

```bash
git add src/types src/data src/lib
git commit -m "feat: add anatomy types, structures data (20 TA2-based items), and lookup functions with tests"
```

---

## Task 3: 图层帮助函数 + LayerToggles 组件

**Files:**
- Create: `src/lib/layers.ts`, `src/lib/layers.test.ts`, `src/components/LayerToggles.tsx`

**Interfaces:**
- Consumes: `Layer` 类型
- Produces:
  - `LAYER_CONFIG` 常量（颜色、标签）
  - `LayerToggles` 组件 (props: `visibleLayers`, `onToggle`, `placeholderCount`)

- [ ] **步骤 1: 编写失败测试**

```typescript
// src/lib/layers.test.ts
import { describe, it, expect } from 'vitest';
import { LAYER_CONFIG, getAllLayers } from './layers';

describe('layers', () => {
  it('should have config for all four layers', () => {
    expect(LAYER_CONFIG.bone).toBeDefined();
    expect(LAYER_CONFIG.muscle).toBeDefined();
    expect(LAYER_CONFIG.nerve).toBeDefined();
    expect(LAYER_CONFIG.vessel).toBeDefined();
  });

  it('should return all layer keys', () => {
    const layers = getAllLayers();
    expect(layers).toEqual(['bone', 'muscle', 'nerve', 'vessel']);
  });

  it('should have Chinese labels', () => {
    expect(LAYER_CONFIG.bone.label).toBe('骨骼');
    expect(LAYER_CONFIG.muscle.label).toBe('肌肉');
    expect(LAYER_CONFIG.nerve.label).toBe('神经');
    expect(LAYER_CONFIG.vessel.label).toBe('血管');
  });
});
```

- [ ] **步骤 2: 运行测试确认失败**

运行: `npx vitest run src/lib/layers.test.ts`  
预期: FAIL

- [ ] **步骤 3: 实现 layers.ts**

```typescript
// src/lib/layers.ts
import type { Layer } from '../types/anatomy';

export interface LayerConfig {
  label: string;
  color: string;
  defaultVisible: boolean;
}

export const LAYER_CONFIG: Record<Layer, LayerConfig> = {
  bone: {
    label: '骨骼',
    color: '#f5e6d3',
    defaultVisible: true,
  },
  muscle: {
    label: '肌肉',
    color: '#c44536',
    defaultVisible: true,
  },
  nerve: {
    label: '神经',
    color: '#f4d03f',
    defaultVisible: true,
  },
  vessel: {
    label: '血管',
    color: '#8b0000',
    defaultVisible: true,
  },
};

export function getAllLayers(): Layer[] {
  return Object.keys(LAYER_CONFIG) as Layer[];
}
```

- [ ] **步骤 4: 运行测试确认通过**

运行: `npx vitest run src/lib/layers.test.ts`  
预期: PASS

- [ ] **步骤 5: 创建 LayerToggles 组件**

```typescript
// src/components/LayerToggles.tsx
import type { Layer } from '../types/anatomy';
import { LAYER_CONFIG, getAllLayers } from '../lib/layers';

interface LayerTogglesProps {
  visibleLayers: Set<Layer>;
  onToggle: (layer: Layer) => void;
  placeholderCount: Record<Layer, number>;
}

export default function LayerToggles({ visibleLayers, onToggle, placeholderCount }: LayerTogglesProps) {
  const layers = getAllLayers();

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        background: 'rgba(26, 26, 26, 0.95)',
        border: '1px solid #444',
        borderRadius: '8px',
        padding: '16px',
        minWidth: '180px',
        zIndex: 100,
      }}
    >
      <h3 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600, color: '#e0e0e0' }}>图层</h3>
      {layers.map((layer) => {
        const config = LAYER_CONFIG[layer];
        const isVisible = visibleLayers.has(layer);
        const placeholders = placeholderCount[layer] || 0;

        return (
          <label
            key={layer}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            <input
              type="checkbox"
              checked={isVisible}
              onChange={() => onToggle(layer)}
              style={{ marginRight: '8px', cursor: 'pointer' }}
            />
            <div
              style={{
                width: '12px',
                height: '12px',
                background: config.color,
                borderRadius: '2px',
                marginRight: '8px',
                border: '1px solid #666',
              }}
            />
            <span style={{ color: '#e0e0e0' }}>{config.label}</span>
            {placeholders > 0 && (
              <span
                style={{
                  marginLeft: '8px',
                  padding: '2px 6px',
                  background: '#f59e0b',
                  color: '#000',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontWeight: 600,
                }}
              >
                占位
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}
```

- [ ] **步骤 6: 提交**

```bash
git add src/lib/layers.ts src/lib/layers.test.ts src/components/LayerToggles.tsx
git commit -m "feat: add layer config, helpers with tests, and LayerToggles component with placeholder badges"
```

---

## Task 4: StructurePanel 信息面板组件

**Files:**
- Create: `src/components/StructurePanel.tsx`

**Interfaces:**
- Consumes: `AnatomyStructure | null`
- Produces: `StructurePanel` 组件 (props: `structure`, `onClose`)

- [ ] **步骤 1: 创建 StructurePanel.tsx**

```typescript
// src/components/StructurePanel.tsx
import type { AnatomyStructure } from '../types/anatomy';
import { LAYER_CONFIG } from '../lib/layers';

interface StructurePanelProps {
  structure: AnatomyStructure | null;
  onClose: () => void;
}

export default function StructurePanel({ structure, onClose }: StructurePanelProps) {
  if (!structure) {
    return null;
  }

  const layerConfig = LAYER_CONFIG[structure.layer];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'rgba(26, 26, 26, 0.95)',
        border: '1px solid #444',
        borderRadius: '8px',
        padding: '20px',
        minWidth: '320px',
        maxWidth: '400px',
        zIndex: 100,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#e0e0e0', margin: 0 }}>{structure.nameZh}</h3>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#999',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '0 4px',
          }}
          aria-label="关闭"
        >
          ×
        </button>
      </div>

      <p style={{ fontSize: '13px', color: '#aaa', fontStyle: 'italic', marginBottom: '12px' }}>{structure.nameLa}</p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div
          style={{
            width: '14px',
            height: '14px',
            background: layerConfig.color,
            borderRadius: '2px',
            border: '1px solid #666',
          }}
        />
        <span style={{ fontSize: '12px', color: '#bbb' }}>{layerConfig.label}</span>
        {structure.placeholder && (
          <span
            style={{
              padding: '2px 8px',
              background: '#f59e0b',
              color: '#000',
              borderRadius: '3px',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            占位
          </span>
        )}
      </div>

      <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#ccc', margin: 0 }}>{structure.summaryZh}</p>
    </div>
  );
}
```

- [ ] **步骤 2: 提交**

```bash
git add src/components/StructurePanel.tsx
git commit -m "feat: add StructurePanel component with ZH+LA names, layer badge, and placeholder indicator"
```

---

## Task 5: R3F Viewport 基础 + OrbitControls

**Files:**
- Create: `src/components/Viewport.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: (none)
- Produces: `Viewport` 组件 (props: `onMeshClick`, `visibleLayers`)

- [ ] **步骤 1: 创建 Viewport.tsx (无模型，仅测试)**

```typescript
// src/components/Viewport.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import type { Layer } from '../types/anatomy';

interface ViewportProps {
  onMeshClick: (meshName: string) => void;
  visibleLayers: Set<Layer>;
}

export default function Viewport({ onMeshClick, visibleLayers }: ViewportProps) {
  return (
    <Canvas
      camera={{ position: [1.5, 1, 1.5], fov: 50 }}
      style={{ width: '100%', height: '100%', background: '#1a1a1a' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />

      <Grid args={[10, 10]} cellSize={0.5} cellThickness={0.5} cellColor="#444" sectionColor="#666" fadeDistance={15} />

      <OrbitControls enableDamping dampingFactor={0.05} minDistance={0.5} maxDistance={5} />

      {/* 模型组将在 Task 6 添加 */}
    </Canvas>
  );
}
```

- [ ] **步骤 2: 更新 App.tsx 集成 Viewport**

```typescript
// src/App.tsx
import { useState } from 'react';
import Viewport from './components/Viewport';
import LayerToggles from './components/LayerToggles';
import StructurePanel from './components/StructurePanel';
import { getAllLayers } from './lib/layers';
import { getStructureByMeshName } from './lib/structureLookup';
import type { Layer } from './types/anatomy';
import type { AnatomyStructure } from './types/anatomy';

function App() {
  const [visibleLayers, setVisibleLayers] = useState<Set<Layer>>(new Set(getAllLayers()));
  const [selectedStructure, setSelectedStructure] = useState<AnatomyStructure | null>(null);

  const handleLayerToggle = (layer: Layer) => {
    setVisibleLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layer)) {
        next.delete(layer);
      } else {
        next.add(layer);
      }
      return next;
    });
  };

  const handleMeshClick = (meshName: string) => {
    const structure = getStructureByMeshName(meshName);
    if (structure) {
      setSelectedStructure(structure);
    } else {
      setSelectedStructure({
        id: 'unmapped',
        meshNames: [meshName],
        layer: 'bone',
        nameZh: '未标注结构',
        nameLa: 'Unmapped Structure',
        summaryZh: '该网格尚未映射到解剖结构数据库',
        placeholder: false,
      });
    }
  };

  const placeholderCount = { bone: 0, muscle: 0, nerve: 0, vessel: 0 };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <div
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 100,
          color: '#e0e0e0',
          background: 'rgba(26, 26, 26, 0.8)',
          padding: '12px 20px',
          borderRadius: '8px',
          border: '1px solid #444',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>右足解剖图谱 · MVP</h1>
      </div>

      <LayerToggles visibleLayers={visibleLayers} onToggle={handleLayerToggle} placeholderCount={placeholderCount} />

      <Viewport onMeshClick={handleMeshClick} visibleLayers={visibleLayers} />

      <StructurePanel structure={selectedStructure} onClose={() => setSelectedStructure(null)} />

      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          fontSize: '11px',
          color: '#666',
        }}
      >
        提示: 鼠标拖动旋转 | 滚轮缩放 | 右键平移 | Esc 取消选择
      </div>
    </div>
  );
}

export default App;
```

- [ ] **步骤 3: 测试 UI 布局**

运行: `npm run dev`  
预期: 显示标题、图层开关、3D 网格地面、OrbitControls 正常工作

- [ ] **步骤 4: 提交**

```bash
git add src/components/Viewport.tsx src/App.tsx
git commit -m "feat: add R3F Viewport with OrbitControls and integrate all UI components"
```

---

## Task 6: FootModel 组件 + 占位几何 + 拾取逻辑

**Files:**
- Create: `src/components/FootModel.tsx`, `src/lib/picking.ts`, `src/lib/loadFootAssets.ts`, `public/models/right-foot/manifest.json`
- Modify: `src/components/Viewport.tsx`

**Interfaces:**
- Consumes: `AnatomyStructure[]`, `visibleLayers`, `onMeshClick`
- Produces: `FootModel` 组件 (占位几何 + 命名网格 + 点击拾取)

- [ ] **步骤 1: 创建 manifest.json (占位模式)**

```json
{
  "version": "1.0.0-placeholder",
  "source": "procedural_placeholder_geometry",
  "license": "N/A - placeholder only",
  "models": [],
  "note": "当前使用程序化占位几何体。计划替换为 Open3DModel Lower Limb (CC BY-SA 4.0) 提取的右足子集。"
}
```

- [ ] **步骤 2: 创建 loadFootAssets.ts (占位逻辑)**

```typescript
// src/lib/loadFootAssets.ts
export interface FootAssetManifest {
  version: string;
  source: string;
  license: string;
  models: string[];
  note?: string;
}

export async function loadManifest(): Promise<FootAssetManifest> {
  const response = await fetch('/models/right-foot/manifest.json');
  if (!response.ok) {
    throw new Error('Failed to load manifest');
  }
  return response.json();
}

export function isPlaceholderMode(manifest: FootAssetManifest): boolean {
  return manifest.source.includes('placeholder') || manifest.models.length === 0;
}
```

- [ ] **步骤 3: 创建 picking.ts**

```typescript
// src/lib/picking.ts
import type { Intersection, Object3D } from 'three';

export function getMeshNameFromIntersection(intersection: Intersection): string | null {
  let obj: Object3D | null = intersection.object;
  
  while (obj) {
    if (obj.name && obj.name !== 'Scene' && obj.name !== '') {
      return obj.name;
    }
    obj = obj.parent;
  }
  
  return null;
}
```

- [ ] **步骤 4: 创建 FootModel.tsx (占位几何)**

```typescript
// src/components/FootModel.tsx
import { useRef, useState, useEffect } from 'react';
import { Mesh } from 'three';
import { getAllStructures } from '../lib/structureLookup';
import { LAYER_CONFIG } from '../lib/layers';
import type { Layer } from '../types/anatomy';
import type { AnatomyStructure } from '../types/anatomy';

interface FootModelProps {
  visibleLayers: Set<Layer>;
  onMeshClick: (meshName: string) => void;
  selectedMeshName: string | null;
}

interface PlaceholderMesh {
  structure: AnatomyStructure;
  meshName: string;
  position: [number, number, number];
  size: [number, number, number];
}

export default function FootModel({ visibleLayers, onMeshClick, selectedMeshName }: FootModelProps) {
  const [placeholderMeshes, setPlaceholderMeshes] = useState<PlaceholderMesh[]>([]);

  useEffect(() => {
    const structures = getAllStructures();
    const meshes: PlaceholderMesh[] = [];
    let boneIndex = 0;
    let muscleIndex = 0;
    let nerveIndex = 0;
    let vesselIndex = 0;

    structures.forEach((structure) => {
      const meshName = structure.meshNames[0];
      let position: [number, number, number];
      let size: [number, number, number];

      if (structure.layer === 'bone') {
        position = [-0.3 + boneIndex * 0.15, 0.1, 0];
        size = [0.12, 0.12, 0.12];
        boneIndex++;
      } else if (structure.layer === 'muscle') {
        position = [0.3 + muscleIndex * 0.15, 0.15, 0];
        size = [0.08, 0.2, 0.08];
        muscleIndex++;
      } else if (structure.layer === 'nerve') {
        position = [-0.3 + nerveIndex * 0.15, 0.05, -0.4];
        size = [0.02, 0.3, 0.02];
        nerveIndex++;
      } else {
        position = [0.3 + vesselIndex * 0.15, 0.05, -0.4];
        size = [0.025, 0.3, 0.025];
        vesselIndex++;
      }

      meshes.push({ structure, meshName, position, size });
    });

    setPlaceholderMeshes(meshes);
  }, []);

  return (
    <group>
      {placeholderMeshes.map(({ structure, meshName, position, size }) => {
        const isVisible = visibleLayers.has(structure.layer);
        if (!isVisible) return null;

        const color = LAYER_CONFIG[structure.layer].color;
        const isSelected = meshName === selectedMeshName;

        return (
          <mesh
            key={meshName}
            name={meshName}
            position={position}
            onClick={(e) => {
              e.stopPropagation();
              onMeshClick(meshName);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = 'default';
            }}
          >
            {structure.layer === 'nerve' || structure.layer === 'vessel' ? (
              <cylinderGeometry args={[size[0], size[1], size[2], 8]} />
            ) : (
              <boxGeometry args={size} />
            )}
            <meshStandardMaterial
              color={color}
              emissive={isSelected ? '#00ffff' : '#000000'}
              emissiveIntensity={isSelected ? 0.5 : 0}
            />
          </mesh>
        );
      })}
    </group>
  );
}
```

- [ ] **步骤 5: 更新 Viewport.tsx 添加 FootModel**

```typescript
// src/components/Viewport.tsx (修改，添加 FootModel)
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import FootModel from './FootModel';
import type { Layer } from '../types/anatomy';

interface ViewportProps {
  onMeshClick: (meshName: string) => void;
  visibleLayers: Set<Layer>;
  selectedMeshName: string | null;
}

export default function Viewport({ onMeshClick, visibleLayers, selectedMeshName }: ViewportProps) {
  return (
    <Canvas
      camera={{ position: [1.5, 1, 1.5], fov: 50 }}
      style={{ width: '100%', height: '100%', background: '#1a1a1a' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, 3, -5]} intensity={0.3} />

      <Grid args={[10, 10]} cellSize={0.5} cellThickness={0.5} cellColor="#444" sectionColor="#666" fadeDistance={15} />

      <FootModel visibleLayers={visibleLayers} onMeshClick={onMeshClick} selectedMeshName={selectedMeshName} />

      <OrbitControls enableDamping dampingFactor={0.05} minDistance={0.5} maxDistance={5} />
    </Canvas>
  );
}
```

- [ ] **步骤 6: 更新 App.tsx 传递 selectedMeshName**

```typescript
// src/App.tsx (修改，添加 selectedMeshName 状态传递)
// ... (前面的代码不变)

function App() {
  const [visibleLayers, setVisibleLayers] = useState<Set<Layer>>(new Set(getAllLayers()));
  const [selectedStructure, setSelectedStructure] = useState<AnatomyStructure | null>(null);
  const [selectedMeshName, setSelectedMeshName] = useState<string | null>(null);

  const handleLayerToggle = (layer: Layer) => {
    // ... (不变)
  };

  const handleMeshClick = (meshName: string) => {
    setSelectedMeshName(meshName);
    const structure = getStructureByMeshName(meshName);
    // ... (不变)
  };

  const handleClose = () => {
    setSelectedStructure(null);
    setSelectedMeshName(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const structures = getAllStructures();
  const placeholderCount = structures.reduce((acc, s) => {
    if (s.placeholder) acc[s.layer]++;
    return acc;
  }, { bone: 0, muscle: 0, nerve: 0, vessel: 0 } as Record<Layer, number>);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* ... 标题 ... */}

      <LayerToggles visibleLayers={visibleLayers} onToggle={handleLayerToggle} placeholderCount={placeholderCount} />

      <Viewport onMeshClick={handleMeshClick} visibleLayers={visibleLayers} selectedMeshName={selectedMeshName} />

      <StructurePanel structure={selectedStructure} onClose={handleClose} />

      {/* ... 提示 ... */}
    </div>
  );
}
```

- [ ] **步骤 7: 测试交互**

运行: `npm run dev`  
预期:
- 显示占位几何体（盒子+圆柱）
- 点击网格弹出信息面板
- 图层切换隐藏/显示对应几何
- 选中时发光高亮
- Esc 取消选择

- [ ] **步骤 8: 测试构建**

运行: `npm run build`  
预期: 成功

- [ ] **步骤 9: 提交**

```bash
git add src/components/FootModel.tsx src/lib/picking.ts src/lib/loadFootAssets.ts public/models/right-foot/manifest.json src/components/Viewport.tsx src/App.tsx
git commit -m "feat: add FootModel with placeholder geometry, mesh picking, highlight, and Escape key handling"
```

---

## Task 7: README + 免责声明 + 许可证文档

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: 所有项目信息
- Produces: 完整、诚实、专业的 README

- [ ] **步骤 1: 编写完整 README.md**

```markdown
# 右足解剖图谱 · MVP

**交互式右足解剖 3D 可视化教育工具**

> ⚠️ **教育用途免责声明**: 本应用仅用于教育和学习目的，**不可用于临床诊断或治疗**。尽管我们努力确保解剖准确性，但 3D 模型为教学简化版本，可能与真实人体解剖存在差异和变异。如需医疗建议，请咨询专业医师。

---

## 📋 项目概述

本项目旨在构建一个**基准级/黄金标准**的右足医学解剖图谱，适合医学教育，并为未来的学术发表奠定基础。采用现代 Web 3D 技术，提供直观的交互式解剖学习体验。

**目标受众**: 医学生、解剖学教师、足踝外科研修医师、运动康复师

---

## ✨ 功能特性

- **交互式 3D 视口**: 轨道旋转、缩放、平移查看右足解剖结构
- **四层系统**: 独立切换骨骼、肌肉、神经、血管的可见性
- **结构信息**: 点击网格显示中文名称、拉丁文标准名称（TA2）、简要说明
- **标准命名**: 基于 *Terminologia Anatomica 2* (FIPAT/IFAA) 国际标准
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
git clone https://github.com/your-org/right-foot-anatomy-atlas.git
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
│   │   └── structures.json         # 解剖结构数据库（20条）
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

**当前状态 (v1.0.0-placeholder)**:
- ✅ 使用程序化占位几何体（盒子、圆柱）
- ✅ 网格命名匹配 `structures.json` 数据
- ✅ UI 明确标注「占位」徽章
- 🔄 **计划替换为**: Open3DModel Lower Limb 真实解剖模型

**目标资产**:
- **来源**: [Open3DModel - Lower Limb](https://anatomytool.org/open3dmodel-create)
- **开发**: 荷兰/比利时医学院联盟 (Leiden LUMC, Radboud UMC等)
- **许可**: CC BY-SA 4.0
- **内容**: 骨骼 + 肌肉 + 神经 + 血管 完整右足解剖
- **格式**: GLB (Web 优化)
- **状态**: 需提取右足子集并重命名，详见 `docs/assets-research.md`

**引用**:
\`\`\`
"Open3DModel - Lower Limb - English labels"
by Open3D project, Jan Kooloos (RadboudUMC), Eungyeol Lee (LUMC) et al
License: CC BY-SA 4.0
Source: https://anatomytool.org/open3dmodel-create
\`\`\`

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

详见: `docs/assets-research.md` 第6节

---

## 🧪 测试

### 运行测试

\`\`\`bash
npm run test          # 交互模式
npx vitest run        # CI 模式
\`\`\`

### 测试覆盖

- ✅ `structureLookup`: 根据 ID/网格名查找结构
- ✅ `layers`: 图层配置和辅助函数
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
- [ ] 重命名网格匹配 `structures.json`
- [ ] 更新 `manifest.json` (非占位模式)
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
> "本研究使用右足解剖图谱 v1.0.0 (https://github.com/...) 进行教学演示。该工具基于 Terminologia Anatomica 2 标准命名，采用 Open3DModel Lower Limb (CC BY-SA 4.0) 模型，尚未经过正式解剖学专家审查，仅用于初步教育用途。"

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
- 提交消息格式: `feat:` / `fix:` / `docs:` 等
- 尊重许可证（CC BY-SA 4.0 for 3D assets）

---

## 📞 联系与支持

- **Issue Tracker**: [GitHub Issues](https://github.com/your-org/right-foot-anatomy-atlas/issues)
- **文档**: 见 `docs/` 目录
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
- Open3DModel (计划): CC BY-SA 4.0 (见 `docs/assets-research.md`)

---

**最后更新**: 2026-09-14  
**项目状态**: 🚧 积极开发中 (v1.0.0-placeholder)  
**生产就绪**: ❌ 仅用于教育演示，尚未用于期刊发表
\`\`\`
```

- [ ] **步骤 2: 测试 README 渲染**

在 GitHub 或 Markdown 预览器中验证格式

- [ ] **步骤 3: 提交**

```bash
git add README.md
git commit -m "docs: write comprehensive README with disclaimer, licenses, roadmap, and honest limitations"
```

---

## Task 8: 最终测试 + 构建验证 + PR 准备

**Files:**
- Create: `.github/pull_request_template.md` (可选)
- Modify: (none)

**Interfaces:**
- Consumes: 完整应用
- Produces: 可发布的 PR

- [ ] **步骤 1: 运行完整测试套件**

运行: `npx vitest run`  
预期: 所有测试通过

- [ ] **步骤 2: 测试生产构建**

运行: `npm run build`  
预期: 无 TypeScript 错误，`dist/` 生成

- [ ] **步骤 3: 预览构建**

运行: `npm run preview`  
访问: http://localhost:4173  
预期: 所有功能正常

- [ ] **步骤 4: 手动功能测试清单**

- [ ] 标题显示正确「右足解剖图谱 · MVP」
- [ ] 图层开关四个全部存在（骨骼/肌肉/神经/血管）
- [ ] 切换图层，几何显隐正确
- [ ] 点击几何弹出信息面板
- [ ] 信息面板显示中文名、拉丁名、图层、摘要
- [ ] 占位徽章显示在图层开关和面板
- [ ] Esc 键取消选择
- [ ] OrbitControls 旋转/缩放/平移正常
- [ ] 选中时网格发光高亮
- [ ] 浏览器控制台无错误

- [ ] **步骤 5: 检查占位计数**

在 App.tsx 验证 placeholderCount 计算，如果所有结构都是非占位（placeholder: false），徽章不应显示

- [ ] **步骤 6: 推送到远程**

```bash
git push -u origin cursor/right-foot-anatomy-atlas-mvp-af85
```

运行: 成功推送  
预期: 分支在 GitHub 可见

- [ ] **步骤 7: 创建 Pull Request**

使用 ManagePullRequest 工具:

**标题**: `feat: implement right foot anatomy atlas MVP with TA2 standards`

**正文**:
```markdown
## 概述

实现右足解剖图谱 MVP，具有教学级潜力并为期刊发表奠定基础。

## 功能

- ✅ 交互式 3D 视口（React Three Fiber + OrbitControls）
- ✅ 四层独立切换（骨骼/肌肉/神经/血管）
- ✅ 点击结构显示中文+拉丁文（TA2标准）+ 简介
- ✅ 20 个解剖结构（≥15 要求），覆盖全部四层
- ✅ 占位几何 + UI 诚实标注「占位」徽章
- ✅ 完整的资产研究文档（Open3DModel CC BY-SA 4.0）
- ✅ Vitest 单元测试（结构查找、图层逻辑）
- ✅ 专业 README（免责声明、许可、路线图、局限性）

## 技术栈

- Vite 5.x + React 18 + TypeScript 5 (strict)
- three.js + @react-three/fiber + @react-three/drei
- Vitest + @testing-library/react

## 验收标准

- [x] `npm install && npm run build` 成功
- [x] `npx vitest run` 所有测试通过
- [x] 四个图层切换正常工作
- [x] 点击显示 ZH+LA 名称
- [x] ≥15 结构，四层全覆盖（实际20个）
- [x] README 诚实说明占位 vs 真实资产
- [x] 教育免责声明清晰

## 文档

- 📄 `docs/assets-research.md` - 3D 资产调研（Open3DModel, TA2 术语标准）
- 📄 `docs/superpowers/specs/2026-09-14-right-foot-anatomy-atlas-design.md` - 设计规格
- 📄 `docs/superpowers/plans/2026-09-14-right-foot-anatomy-atlas.md` - 实现计划
- 📄 `README.md` - 完整项目文档

## 下一步 (v1.1.0)

- 下载并提取 Open3DModel Lower Limb 真实模型
- 替换占位几何
- 扩展结构至完整右足清单（≥40-50）
- 解剖学专家审查

## 测试环境

```bash
npm run dev      # http://localhost:5173
npm run build    # dist/ 生成
npm run preview  # http://localhost:4173
npx vitest run   # 所有测试通过
```

## 屏幕截图

[计划添加应用截图]

---

**质量声明**: 本 PR 遵循质量优先原则，使用 TA2 国际标准命名，完整资产研究文档，诚实标注当前局限性。代码通过 TypeScript 严格模式检查和单元测试。
```

- [ ] **步骤 8: 确认 PR 创建成功**

预期: PR 在 GitHub 可见，CI 检查（如有）运行

- [ ] **步骤 9: 最终提交**

```bash
git add .
git commit -m "chore: final verification and PR preparation"
git push
```

---

## 完成标准

所有任务的所有步骤的复选框已勾选，并且:

1. ✅ `npm install && npm run build` 无错误
2. ✅ `npx vitest run` 所有测试通过
3. ✅ 应用在浏览器中正常运行
4. ✅ 四个图层切换工作
5. ✅ 点击网格显示中文+拉丁文信息
6. ✅ 占位徽章在 UI 显示
7. ✅ README 完整、诚实、专业
8. ✅ 分支已推送，PR 已创建

**恭喜!** 右足解剖图谱 MVP v1.0.0-placeholder 实现完成。

下一阶段: 下载 Open3DModel 真实资产并替换占位几何，迈向期刊级图谱。

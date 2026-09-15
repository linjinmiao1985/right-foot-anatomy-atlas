#!/usr/bin/env python3
"""
Data Integrity Audit Script for Right Foot Anatomy Atlas

Verifies:
1. Every `placeholder: false` in structures.json has a matching REAL_*_MODELS entry in FootModel.tsx
2. Every GLB referenced in FootModel.tsx exists in public/models/right-foot/
3. Every GLB file has a corresponding structures.json entry with placeholder: false
4. No orphaned GLB files (exist but not referenced)
5. No orphaned REAL_*_MODELS entries (referenced but GLB missing)

Exit codes:
- 0: All checks passed
- 1: Integrity violations found
"""

import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Set, Tuple

# Paths
WORKSPACE = Path(__file__).parent.parent
STRUCTURES_JSON = WORKSPACE / "src/data/structures.json"
FOOTMODEL_TSX = WORKSPACE / "src/components/FootModel.tsx"
MODELS_DIR = WORKSPACE / "public/models/right-foot"

# ANSI color codes
RED = '\033[91m'
GREEN = '\033[92m'
YELLOW = '\033[93m'
BLUE = '\033[94m'
RESET = '\033[0m'

def load_structures() -> List[Dict]:
    """Load structures.json"""
    with open(STRUCTURES_JSON, 'r', encoding='utf-8') as f:
        data = json.load(f)
    # structures.json is an array, not an object with 'structures' key
    return data if isinstance(data, list) else data.get('structures', [])

def extract_real_models(footmodel_content: str) -> Dict[str, Set[str]]:
    """Extract REAL_*_MODELS mappings from FootModel.tsx"""
    models = {
        'bone': set(),
        'muscle': set(),
        'vessel': set(),
        'nerve': set()
    }
    
    # Match patterns like:
    # const REAL_BONE_MODELS: Record<string, string> = {
    #   'calcaneus': '/models/right-foot/calcaneus_BP9040.glb',
    #   ...
    # };
    
    for layer in ['bone', 'muscle', 'vessel', 'nerve']:
        pattern = rf"const REAL_{layer.upper()}_MODELS.*?\{{(.*?)\}};"
        match = re.search(pattern, footmodel_content, re.DOTALL | re.IGNORECASE)
        if match:
            entries = match.group(1)
            # Extract structure_id: '/path/to/file.glb' pairs
            for line in entries.split('\n'):
                line = line.strip()
                if ':' in line and '.glb' in line:
                    # Remove inline comments (// ...)
                    if '//' in line:
                        line = line.split('//')[0].strip()
                    # Extract structure_id and GLB path
                    parts = line.split(':', 1)
                    structure_id = parts[0].strip().strip("'\"")
                    glb_path = parts[1].strip().rstrip(',').strip().strip("'\"")
                    models[layer].add((structure_id, glb_path))
    
    return models

def get_glb_files() -> Set[str]:
    """Get all GLB files in public/models/right-foot/ (including by-sa/)"""
    glb_files = set()
    for glb in MODELS_DIR.rglob("*.glb"):
        # Convert to relative path from public/
        rel_path = '/models/right-foot/' + str(glb.relative_to(MODELS_DIR))
        glb_files.add(rel_path)
    return glb_files

def main():
    print(f"{BLUE}=== Right Foot Anatomy Atlas: Data Integrity Audit ==={RESET}\n")
    
    # Load data
    structures = load_structures()
    with open(FOOTMODEL_TSX, 'r', encoding='utf-8') as f:
        footmodel_content = f.read()
    real_models = extract_real_models(footmodel_content)
    glb_files = get_glb_files()
    # ADDITIONAL_MUSCLE_PARTS (multi-part muscles) are referenced but not in REAL_* maps
    additional_paths = set(re.findall(
        r"ADDITIONAL_MUSCLE_PARTS.*?\{(.*?)\};",
        footmodel_content,
        re.DOTALL,
    ))
    additional_glbs = set()
    for block in additional_paths:
        for m in re.findall(r"['\"](/models/right-foot/[^'\"]+\.glb)['\"]", block):
            additional_glbs.add(m)
    
    # Statistics
    total_structures = len(structures)
    total_real = sum(1 for s in structures if not s.get('placeholder', True))
    total_placeholder = total_structures - total_real
    
    print(f"Total structures: {total_structures}")
    print(f"  Real (placeholder: false): {total_real}")
    print(f"  Placeholder (placeholder: true): {total_placeholder}")
    print(f"Total GLB files: {len(glb_files)}\n")
    
    violations = []
    
    # Check 1: Every placeholder: false must have a REAL_*_MODELS entry
    print(f"{BLUE}Check 1: placeholder:false → REAL_*_MODELS mapping{RESET}")
    real_model_ids = {structure_id for layer in real_models.values() for structure_id, _ in layer}
    
    for structure in structures:
        if not structure.get('placeholder', True):  # placeholder: false
            structure_id = structure['id']
            layer = structure['layer']
            
            # Check if structure_id exists in REAL_*_MODELS
            layer_model_ids = {sid for sid, _ in real_models.get(layer, set())}
            if structure_id not in layer_model_ids:
                violations.append(f"  {RED}✗{RESET} {structure_id} (layer: {layer}): placeholder:false but NO REAL_{layer.upper()}_MODELS entry")
            else:
                print(f"  {GREEN}✓{RESET} {structure_id} (layer: {layer})")
    
    if not violations:
        print(f"{GREEN}  All placeholder:false structures have REAL_*_MODELS entries ✓{RESET}\n")
    else:
        print(f"{RED}  Found {len(violations)} violations:{RESET}")
        for v in violations:
            print(v)
        print()
    
    # Check 2: Every REAL_*_MODELS GLB path must exist
    print(f"{BLUE}Check 2: REAL_*_MODELS → GLB file existence{RESET}")
    missing_glbs = []
    
    for layer, entries in real_models.items():
        for structure_id, glb_path in entries:
            if glb_path not in glb_files:
                missing_glbs.append(f"  {RED}✗{RESET} {structure_id} → {glb_path} (layer: {layer}): GLB NOT FOUND")
            else:
                print(f"  {GREEN}✓{RESET} {structure_id} → {glb_path}")
    
    if not missing_glbs:
        print(f"{GREEN}  All REAL_*_MODELS GLB paths exist ✓{RESET}\n")
    else:
        print(f"{RED}  Found {len(missing_glbs)} missing GLBs:{RESET}")
        for m in missing_glbs:
            print(m)
        print()
        violations.extend(missing_glbs)
    
    # Check 3: Every GLB must have a structures.json entry with placeholder: false
    print(f"{BLUE}Check 3: GLB files → structures.json placeholder:false{RESET}")
    referenced_glbs = {glb_path for layer in real_models.values() for _, glb_path in layer} | additional_glbs
    orphaned_glbs = glb_files - referenced_glbs
    
    if orphaned_glbs:
        print(f"{YELLOW}  Warning: {len(orphaned_glbs)} orphaned GLB files (not referenced in FootModel):{RESET}")
        for glb in sorted(orphaned_glbs):
            print(f"    {YELLOW}⚠{RESET} {glb}")
        print()
    else:
        print(f"{GREEN}  All GLB files are referenced in FootModel ✓{RESET}\n")
    
    # Check 4: Verify structures.json → FootModel consistency
    print(f"{BLUE}Check 4: structures.json real structures → FootModel loader{RESET}")
    for structure in structures:
        if not structure.get('placeholder', True):
            structure_id = structure['id']
            layer = structure['layer']
            
            # Check if this structure's id is in REAL_*_MODELS
            layer_entries = real_models.get(layer, set())
            found = any(sid == structure_id for sid, _ in layer_entries)
            
            if not found:
                print(f"  {RED}✗{RESET} {structure_id} (layer: {layer}): placeholder:false but NOT in REAL_{layer.upper()}_MODELS")
            else:
                # Get the GLB path
                glb_path = next((path for sid, path in layer_entries if sid == structure_id), None)
                print(f"  {GREEN}✓{RESET} {structure_id} → {glb_path}")
    
    print()
    
    # Summary
    print(f"{BLUE}=== Audit Summary ==={RESET}")
    print(f"Total structures: {total_structures}")
    print(f"  Real: {total_real}")
    print(f"  Placeholder: {total_placeholder}")
    print(f"Total GLB files: {len(glb_files)}")
    print(f"  Referenced: {len(referenced_glbs)}")
    print(f"  Orphaned: {len(orphaned_glbs)}")
    print(f"Violations: {len(violations)}")
    
    if violations:
        print(f"\n{RED}AUDIT FAILED: {len(violations)} integrity violations found{RESET}")
        return 1
    elif orphaned_glbs:
        print(f"\n{YELLOW}AUDIT WARNING: {len(orphaned_glbs)} orphaned GLB files{RESET}")
        print(f"{GREEN}No critical violations, but cleanup recommended{RESET}")
        return 0
    else:
        print(f"\n{GREEN}AUDIT PASSED: No integrity violations ✓{RESET}")
        return 0

if __name__ == '__main__':
    sys.exit(main())

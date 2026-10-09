#!/usr/bin/env python3
"""
Update structures.json to mark UM-sourced muscles as real (placeholder: false).
"""

import json

# UM CC0 muscles
UM_MUSCLES = {
    'quadratus_plantae',
    'extensor_digitorum_brevis',
}

def main():
    with open('src/data/structures.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    updated = 0
    for structure in data:
        struct_id = structure.get('id')
        if struct_id in UM_MUSCLES:
            if structure.get('placeholder', True):
                print(f"  ✅ {struct_id:40s} → placeholder: false (UM CC0)")
                structure['placeholder'] = False
                updated += 1
            else:
                print(f"  ⏭️  {struct_id:40s} (already real)")
    
    if updated > 0:
        with open('src/data/structures.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"\n✅ Updated {updated} structures")
    else:
        print("\n⏭️  No updates needed")

if __name__ == '__main__':
    main()

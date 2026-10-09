#!/usr/bin/env python3
"""
Update structures.json to mark BP3D-sourced muscles/vessels as real (placeholder: false).
"""

import json

# Mapping: structures.json id → has real BP3D GLB
BP3D_MUSCLES = {
    'abductor_hallucis',
    'flexor_digitorum_brevis',
    'abductor_digiti_minimi',
    'extensor_hallucis_brevis',
    'flexor_digiti_minimi_brevis',
    'adductor_hallucis',  # oblique + transverse heads
    'flexor_hallucis_brevis',  # medial head
    'lumbrical_1',
    'lumbrical_2',
    'lumbrical_3',
    'lumbrical_4',
    'plantar_interosseous_1',
    'plantar_interosseous_2',
    'plantar_interosseous_3',
}

BP3D_VESSELS = {
    'dorsalis_pedis_artery',
    'plantar_artery_medial',
    'plantar_artery_lateral',
}

BP3D_REAL = BP3D_MUSCLES | BP3D_VESSELS

def main():
    with open('src/data/structures.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    updated = 0
    for structure in data:
        struct_id = structure.get('id')
        if struct_id in BP3D_REAL:
            if structure.get('placeholder', True):
                print(f"  ✅ {struct_id:40s} → placeholder: false")
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

#!/usr/bin/env python3
"""Expand structures.json to include individual entries for grouped structures"""

import json

# Individual lumbricals
lumbricals_individual = [
    {
        "id": "lumbrical_1",
        "meshNames": ["Lumbrical_1_R"],
        "layer": "muscle",
        "nameZh": "第一蚓状肌",
        "nameLa": "M. lumbricalis primus pedis",
        "summaryZh": "第一蚓状肌起自第一趾长屈肌腱内侧缘，向外前行，止于第二趾近节趾骨底内侧及趾背腱膜。功能：屈第二趾跖趾关节，同时伸近节与中节趾间关节；协助内收第二趾。神经支配：足底内侧神经分支（L5-S1）。血供：足底内侧动脉及第一跖底动脉。临床意义：屈趾无力时第二趾可呈爪形趾畸形；Morton神经瘤压迫可致蚓状肌萎缩；足底筋膜炎时深层蚓状肌可代偿性紧张。",
        "placeholder": False
    },
    {
        "id": "lumbrical_2",
        "meshNames": ["Lumbrical_2_R"],
        "layer": "muscle",
        "nameZh": "第二蚓状肌",
        "nameLa": "M. lumbricalis secundus pedis",
        "summaryZh": "第二蚓状肌起自第二、三趾长屈肌腱相邻缘，向外前行，止于第三趾近节趾骨底内侧及趾背腱膜。功能：屈第三趾跖趾关节，同时伸近节与中节趾间关节；协助内收第三趾。神经支配：足底外侧神经分支（S1-S2）。血供：第二、第三跖底动脉。临床意义：与第一蚓状肌共同维持足趾平衡步态；蚓状肌群萎缩致趾间关节过伸（锤状趾）。",
        "placeholder": False
    },
    {
        "id": "lumbrical_3",
        "meshNames": ["Lumbrical_3_R"],
        "layer": "muscle",
        "nameZh": "第三蚓状肌",
        "nameLa": "M. lumbricalis tertius pedis",
        "summaryZh": "第三蚓状肌起自第三、四趾长屈肌腱相邻缘，向外前行，止于第四趾近节趾骨底内侧及趾背腱膜。功能：屈第四趾跖趾关节，同时伸近节与中节趾间关节；协助内收第四趾。神经支配：足底外侧神经分支（S1-S2）。血供：第三、第四跖底动脉。临床意义：糖尿病足部神经病变时常累及外侧蚓状肌；小趾侧足趾变形时第三、四蚓状肌代偿性肥大。",
        "placeholder": False
    },
    {
        "id": "lumbrical_4",
        "meshNames": ["Lumbrical_4_R"],
        "layer": "muscle",
        "nameZh": "第四蚓状肌",
        "nameLa": "M. lumbricalis quartus pedis",
        "summaryZh": "第四蚓状肌起自第四、五趾长屈肌腱相邻缘，向外前行，止于第五趾（小趾）近节趾骨底内侧及趾背腱膜。功能：屈第五趾（小趾）跖趾关节，同时伸近节趾间关节；协助内收小趾。神经支配：足底外侧神经分支（S1-S2）。血供：第四跖底动脉及足底外侧动脉小趾支。临床意义：第四蚓状肌最细小，易受足底外侧神经卡压损伤；小趾爪形趾畸形的主要责任肌之一。",
        "placeholder": False
    }
]

# Individual plantar interossei
interossei_individual = [
    {
        "id": "plantar_interosseous_1",
        "meshNames": ["Interosseous_Plantar_1_R"],
        "layer": "muscle",
        "nameZh": "第一骨间跖侧肌",
        "nameLa": "M. interosseus plantaris primus",
        "summaryZh": "第一骨间跖侧肌起自第三跖骨内侧面，向前内行，止于第三趾近节趾骨底内侧及趾背腱膜。功能：内收第三趾向第二趾（足轴线）；协助屈第三趾跖趾关节。神经支配：足底外侧神经深支（S1-S2）。血供：足底动脉弓分支。临床意义：与骨间背侧肌共同稳定趾基底关节；跖趾关节脱位时可撕裂；神经损伤时第三趾外展无力致趾间隙增宽。TA2代码：A04.7.02.067。",
        "placeholder": False
    },
    {
        "id": "plantar_interosseous_2",
        "meshNames": ["Interosseous_Plantar_2_R"],
        "layer": "muscle",
        "nameZh": "第二骨间跖侧肌",
        "nameLa": "M. interosseus plantaris secundus",
        "summaryZh": "第二骨间跖侧肌起自第四跖骨内侧面，向前内行，止于第四趾近节趾骨底内侧及趾背腱膜。功能：内收第四趾向第二趾（足轴线）；协助屈第四趾跖趾关节。神经支配：足底外侧神经深支（S1-S2）。血供：足底动脉弓分支及第四跖底动脉。临床意义：跖骨骨折时可累及跖侧骨间肌致趾内收受限；趾屈肌腱鞘炎时该肌紧张致疼痛加剧。TA2代码：A04.7.02.069。",
        "placeholder": False
    },
    {
        "id": "plantar_interosseous_3",
        "meshNames": ["Interosseous_Plantar_3_R"],
        "layer": "muscle",
        "nameZh": "第三骨间跖侧肌",
        "nameLa": "M. interosseus plantaris tertius",
        "summaryZh": "第三骨间跖侧肌起自第五跖骨内侧面，向前内行，止于第五趾（小趾）近节趾骨底内侧及趾背腱膜。功能：内收小趾向第二趾（足轴线）；协助屈小趾跖趾关节。神经支配：足底外侧神经深支（S1-S2）。血供：足底外侧动脉及第五跖底动脉。临床意义：小趾内翻畸形时该肌代偿性紧张；第五跖骨基底骨折（Jones骨折）可损伤该肌起点；足底筋膜炎时外侧柱受力异常致该肌劳损。TA2代码：A04.7.02.071。",
        "placeholder": False
    }
]

# Individual plantar arteries
plantar_arteries = [
    {
        "id": "plantar_artery_medial",
        "meshNames": ["Medial_Plantar_Artery_R"],
        "layer": "vessel",
        "nameZh": "足底内侧动脉",
        "nameLa": "A. plantaris medialis",
        "summaryZh": "足底内侧动脉是胫后动脉的内侧终支，在屈肌支持带深面分出。走行：起自胫后动脉分叉处（踝管内），沿展踇肌内侧缘向前，至第一跖骨基底转向内侧，行于屈踇短肌与展踇肌之间。分支：①肌支供应展踇肌、屈踇短肌；②浅支沿踇趾内侧至趾端（趾固有动脉）；③深支参与足底动脉弓形成（较细）。吻合：与足底外侧动脉在第一跖骨间隙吻合形成足底动脉弓（但内侧动脉较细，主要由外侧动脉完成弓）。临床意义：糖尿病足时该动脉硬化致内侧足趾缺血；踇外翻术中需保护该动脉浅支；踝管综合征时可伴发动脉受压致足内侧麻木。TA2代码：A12.2.16.065。",
        "placeholder": False
    },
    {
        "id": "plantar_artery_lateral",
        "meshNames": ["Lateral_Plantar_Artery_R"],
        "layer": "vessel",
        "nameZh": "足底外侧动脉",
        "nameLa": "A. plantaris lateralis",
        "summaryZh": "足底外侧动脉是胫后动脉的外侧终支，是足底主要血供来源。走行：起自胫后动脉分叉处（踝管内），斜向外前，先行于跖方肌与趾短屈肌之间，后转至跖方肌与小趾展肌之间，至第五跖骨基底转向内侧，行于骨间肌与跖长韧带之间，至第一、二跖骨间隙与足背动脉深支吻合形成足底动脉弓。分支：①肌支供应足底各肌；②小趾支沿小趾外侧至趾端；③足底动脉弓发出4条跖底动脉，每条再分为2条趾固有动脉。吻合：与足背动脉深支形成足底动脉弓。临床意义：足底主要血供（>75%），闭塞致严重缺血；糖尿病足溃疡预后依赖该动脉通畅性；足底切开引流时需避开该动脉走行路径。TA2代码：A12.2.16.069。",
        "placeholder": False
    }
]

def main():
    with open('src/data/structures.json', 'r', encoding='utf-8') as f:
        structures = json.load(f)
    
    # Remove grouped entries
    new_structures = []
    for s in structures:
        if s['id'] not in ['lumbricals', 'interossei_plantares', 'medial_plantar_artery', 'lateral_plantar_artery']:
            new_structures.append(s)
    
    # Find insertion indices
    last_muscle_idx = max(i for i, s in enumerate(new_structures) if s['layer'] == 'muscle')
    last_vessel_idx = max(i for i, s in enumerate(new_structures) if s['layer'] == 'vessel')
    
    # Insert individual structures
    new_structures = (
        new_structures[:last_muscle_idx+1] + 
        lumbricals_individual + 
        interossei_individual + 
        new_structures[last_muscle_idx+1:last_vessel_idx+1] +
        plantar_arteries +
        new_structures[last_vessel_idx+1:]
    )
    
    # Save
    with open('src/data/structures.json', 'w', encoding='utf-8') as f:
        json.dump(new_structures, f, ensure_ascii=False, indent=2)
    
    print(f"✓ Expanded structures.json:")
    print(f"  Added 4 lumbricals (lumbrical_1/2/3/4)")
    print(f"  Added 3 plantar interossei (plantar_interosseous_1/2/3)")
    print(f"  Added 2 plantar arteries (plantar_artery_medial/lateral)")
    print(f"  Total structures: {len(structures)} → {len(new_structures)}")

if __name__ == '__main__':
    main()

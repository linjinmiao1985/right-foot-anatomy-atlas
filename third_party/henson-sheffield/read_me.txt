Read me - Augmented images associated segmentations


Contents: 
69 x 3D greyscale images containing segmentations of 37 muscles.


info:

The muscles are segmented with individual class ID's, ordered alphabetically: 

0 -      background
1 - 	 adductor brevis
2 - 	 adductor longus
3 - 	 adductor magnus
4 - 	 biceps femoris caput breve
5 - 	 biceps femoris caput longum
6 - 	 extensor digitorum longus
7 - 	 extensor hallucis longus
8 - 	 flexor digitorum longus
9 - 	 flexor hallucis longus
10 - 	 gastrocnemius lateralis
11 - 	 gastrocnemius medialis
12 - 	 gemellus superior
13 - 	 gluteus maximus
14 - 	 gluteus medius
15 - 	 gluteus minimus
16 - 	 gracilis
17 - 	 iliacus
18 - 	 obturator externus
19 - 	 obturator internus
20 - 	 pectineus
21 - 	 peroneus brevis
22 - 	 peroneus longus
23 - 	 piriformis
24 - 	 popliteus
25 - 	 psoas
26 - 	 quadratus femoris
27 - 	 rectus femoris
28 - 	 sartorius
29 - 	 semimembranosus
30 - 	 semitendinosus
31 - 	 soleus
32 - 	 tensor fasciae latae
33 - 	 tibialis anterior
34 - 	 tibialis posterior
35 - 	 vastus intermedius
36 - 	 vastus lateralis
37 - 	 vastus medialis



How to handle:

Download the files and read them into your workspace using the following functions for matlab and python scripts:

MATLAB - image_path = 'path_to_images/sample.dcm'
	 im = dicomread('path_to_file');

python - image_path = 'path_to_images/sample.dcm'
	 ds = dicom.dcmread(image_path)

See documentation 'how to read in dicom files' for others.





Read me - Registration inputs.


Contents: 
20 x 3D uint8 RGB dicom images. 
	- Red channel = fixed imaging data
	- Green channel = moving imaging data
	- Blue channel = fixed subject ascociated segmentations

info:

Blue channel segmentations are numbered alphabetically (1:34). Low uint8 numbers mean these cannot be seen.
To view, rescale third colour channel. The muscles are labelled as follows:

1 - 	     adductor brevis 
2 - 	     adductor longus 
3 - 	     adductor magnus 
4 - 	     biceps femoris caput brevis 
5 - 	     biceps femoris caput longum 
6 - 	     extensor digitorum longus 
7 - 	     extensor hallucis longus 
8 - 	     flexor digitorum longus 
9 - 	     flexor hallucis longus 
10 - 	     gastrocnemius lateralis 
11 - 	     gastrocnemius medialis 
12 - 	     gemellus superior 
13 - 	     gluteus maximus 
14 - 	     gluteus minimus 
15 - 	     gracilis 
16 - 	     iliacus 
17 - 	     obturator externus 
18 - 	     obturator internus 
19 - 	     peroneus brevis 
20 - 	     peroneus longus 
21 - 	     piriformis 
22 - 	     popliteus 
23 - 	     quadratus femoris 
24 - 	     rectus femoris 
25 - 	     sartorius 
26 - 	     semimembranosus 
27 - 	     semitendinosus 
28 - 	     soleus 
29 - 	     tensor fasciae latae 
30 - 	     tibialis anterior 
31 - 	     tibialis posterior 
32 - 	     vastus intermedius 
33 - 	     vastus lateralis 
34 - 	     vastus medialis 



How to handle:

Download the files and read them into your workspace using the following functions for matlab and python scripts:

MATLAB - image_path = 'path_to_images/sample.dcm'
	 im = dicomread('path_to_file');

python - image_path = 'path_to_images/sample.dcm'
	 ds = dicom.dcmread(image_path)

See documentation 'how to read in dicom files' for others.





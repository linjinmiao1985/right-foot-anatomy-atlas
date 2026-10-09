Read me - Multi-atlas segmentation.

Contents:

1 x Matlab script
4 x Example dual (registered) images
4 x Example segmented images

How to use:
Download images and script and place dual and segmented images in separate folders.

To view the ouputted segmentation run: sliceViewer(segmentation_out)
To save, dicomwrite(segmentation_out,*filename*,*meta*, 'CreateMode', 'Copy', 'MultiframeSingleFile', 'true');
and define the filename and meta data as you choose. The meta data can be copied from the segmented images, using:
meta = dicominfo(*filepath and filename of segmented image*)









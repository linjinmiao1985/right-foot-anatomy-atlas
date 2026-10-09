%% function written to combine segmentation results into one multi-atlas 
% segmentation
%
% Author: William Henson
% Doi for ascociated paper: https://doi.org/10.1101/2022.08.09.503405
%
% The code assumes that the segmented images are organised with classes
% from 1:the number of muscles in the same manner across x images, and
% that the images are of the same size. Additionally the user is required
% to generate target and registered images to enable mutual information to
% be calculated, which should also be of the same size as the segmented 
% images. The easiest way to do this is to save 2 or 3D dicom files as rgb
% images with the following line:
%
%   dicomwrite(IM,filename, meta, 'CreateMode', 'Copy', 'MultiframeSingleFile', 'true');
%
%   whilst changing the meta object meta.ColorType = 'RGB' & 
%   meta.PhotometricInterpretation = 'RGB Palette';
% 
% This code operates with 2D and 3D images (matrices) of size m*n and m*n*p.
%
% The segmented images should be stored in one directory for ease of
% reading. 
%
% INPUTS:
% directory_seg - the directory contining x amount of segmented greyscale images 
% (of size m*n or m*n*p).
%
% directory_registered_ims - the directory contining x amount of rgb images 
% (of size m*n or m*n*p), with red and green channels being fixed and
% registered images respectively.
%
% number_of_classes - the number of classess in the segmented images.


function segmentation_out = multi_atlas_segmentation(directory_seg, directory_registered_ims, number_of_classes)
%% reading in and concatenating the single atlas images to form multi-atlas:

    j = 0;
    for i = 1:size(filenames_seg_ims,1)
        if contains(filenames_seg_ims(i).name, '.dcm') == 1
            im = squeeze(dicomread(strcat(directory_seg,filenames_seg_ims(i).name)));
            if numel(size(im)) == 2 
                j = j+1;
                if j<2 
                    multi_atlas_im = im;
                elseif j>1
                    multi_atlas_im = cat(3,multi_atlas_im,im);
                end
            end
            if numel(size(im)) == 3
                j = j+1;
                if j<2 
                    multi_atlas_im = im;
                elseif j>1
                    multi_atlas_im = cat(4,multi_atlas_im,im);
                end
            end
        end
    end

%% Finding disputed and undisputed pixels/voxels within the multi-atlas images
    
    if numel(size(multi_atlas_im)) == 3
        undisputed_voxels = zeros(size(multi_atlas_im,1),size(multi_atlas_im,2));
        prob_map = zeros(size(multi_atlas_im,1),size(multi_atlas_im,2),number_of_classes);
        for j = 0:number_of_classes
            prob_map(:,:,j+1) = sum(multi_atlas_im(:,:,i,:)==j,3)/number_of_classes;
            undisputed_voxels(:,:) = undisputed_voxels(:,:) + (double((prob_map(:,:,j+1)==1)))* (j+1+number_of_classes);
        end
    end
    if numel(size(multi_atlas_im)) == 4
        undisputed_voxels = zeros(size(multi_atlas_im,1),size(multi_atlas_im,2),size(multi_atlas_im,3));
        for i = 1:size(multi_atlas_im,3)
            prob_map = zeros(size(multi_atlas_im,1),size(multi_atlas_im,2),number_of_classes);
            for j = 0:number_of_classes
                prob_map(:,:,j+1) = sum(multi_atlas_im(:,:,i,:)==j,4)/number_of_classes;
                undisputed_voxels(:,:,i) = undisputed_voxels(:,:,i) + (double((prob_map(:,:,j+1)==1)))* (j+1+number_of_classes);
            end
            
        end
    end
    disputed_voxels = undisputed_voxels ==0;
    segmentation_out = undisputed_voxels - number_of_classes - 1;


%% preparing the mutual information and converting
    
    clear im
    j=0;
    for i = 1:size(filenames_registered_ims,1)
        if contains(filenames_registered_ims(i).name, '.dcm') == 1
            im = dicomread(strcat(directory_registered_ims,filenames_registered_ims(i).name));
            if numel(size(im)) == 3
                j = j+1;
                if j<2 
                    mutual_info = squeeze(convn((im(:,:,1) - im(:,:,2)).^2,...
                                       convolution_block, 'same'));
                elseif j>1
                    mutual_info = cat(3,mutual_info,...
                                       squeeze(convn((im(:,:,1) - im(:,:,2)).^2),...
                                       convolution_block, 'same'));
                end
            end
            if numel(size(im)) == 4
                if j<2 
                    mutual_info = squeeze(convn((im(:,:,1,:) - im(:,:,2,:)).^2,...
                                       convolution_block, 'same'));
                elseif j>1
                    mutual_info = cat(4,mutual_info,...
                                       squeeze(convn((im(:,:,1,:) - im(:,:,2,:)).^2),...
                                       convolution_block, 'same'));
                end
            end
        end
    end

%% atlas selection for disputed voxels

    if numel(size(im)) == 3
        [~,min_mutual_info] = min(mutual_info,[],4);
        for i = 1:size(min_mutual_info,4)
            atlas_selection = min_mutual_info == i;
            segmentation_out(atlas_selection) = multi_atlas_im(:,:,i);
        end
    end
    if numel(size(im)) == 4
        [~,min_mutual_info] = min(mutual_info,[],5);
        for i = 1:size(min_mutual_info,5)
            atlas_selection = min_mutual_info == i;
            segmentation_out(atlas_selection) = multi_atlas_im(:,:,:,i);
        end
    end
% end
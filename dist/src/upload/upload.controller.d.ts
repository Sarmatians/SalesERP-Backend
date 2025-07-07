export declare class UploadController {
    uploadItemImages(files: {
        images?: Express.Multer.File[];
    }): Promise<{
        images: string[];
    }>;
    uploadItemVariationImages(files: {
        images?: Express.Multer.File[];
    }): Promise<{
        images: string[];
    }>;
}

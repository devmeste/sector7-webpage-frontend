export interface IBanner {
    id?: string;
    title: string;
    category: string;
    date: Date;
    routeUrl: string;
    presignedUrlPc: string;
    presignedUrlTablet: string;
    presignedUrlCellphone: string;
}

export interface IBannerRequest{
    id?: string;
    title: string;
    category: string;
    routeUrl: string;
    photoPc: number[];
    photoTablet: number[];
    photoCellphone: number[];
}
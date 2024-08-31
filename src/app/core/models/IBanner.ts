export interface IBanner {
    id:           string;
    title:        string;
    category:     string;
    date:         Date;
    url:          string;
    presignedUrl: string;
    presignedUrl_mob?: string;
    presignedUrl_tab?: string;
}
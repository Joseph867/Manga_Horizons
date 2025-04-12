export interface Manga {
    id: number;
    title: string;
    cover?: {
        filepath: string;
    }
    isFavorite?: boolean;
}
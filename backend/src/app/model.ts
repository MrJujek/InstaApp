interface ModificationHistory {
    date: Date;
    status: string;
}

export interface Photo {
    id: number;
    name: string;
    type: string;
    path: string;
    album: string;
    history: ModificationHistory[]
}

export let photos: Photo[] = [];
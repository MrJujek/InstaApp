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
    history: ModificationHistory[];
    tags: TagsObject[];
}

export interface TagsObject {
    id: number;
    name: string;
    popularity: number;
}

export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    confirmed: boolean;
}

export let photos: Photo[] = [];

export let tagsRaw: string[] = [
    "#love",
    "#instagood",
    "#fashion",
    "#photooftheday",
    "#art",
    "#photography",
    "#instagram",
    "#beautiful",
    "#picoftheday",
    "#nature",
    "#happy",
    "#cute",
    "#travel",
    "#style",
    "#followme",
    "#tbt",
    "#instadaily",
    "#repost",
    "#like4like",
    "#summer",
    "#beauty",
    "#fitness",
    "#food",
    "#selfie",
    "#me",
    "#instalike",
    "#girl",
    "#friends",
    "#fun",
    "#photo"
]

export let tagsObjects: TagsObject[] = [];

export let users: User[] = [];
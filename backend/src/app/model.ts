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

export let users: User[] = [
    {
        "id": 1,
        "name": "a",
        "lastName": "a",
        "email": "a@a.a",
        "password": "$2a$10$Q7dAK262sD7bYm3/XJW2.eNOb1SSwwzw.79xGrulF.ur9/3rr3QCq",
        "confirmed": true
    }
];
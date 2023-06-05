import * as fs from 'fs';

interface ModificationHistory {
    date: Date;
    status: string;
}

export interface Photo {
    id: number;
    name: string;
    type: string;
    path: string;
    user: string;
    profile: boolean;
    history: ModificationHistory[];
    tags: TagsObject[];
    description: string[];
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
    nickName: string;
    password: string;
    confirmed: boolean;
}

export let photos: Photo[] = [];

export let tagsRaw: string[] = [
    "love",
    "instagood",
    "fashion",
    "photooftheday",
    "art",
    "photography",
    "instagram",
    "beautiful",
    "picoftheday",
    "nature",
    "happy",
    "cute",
    "travel",
    "style",
    "followme",
    "tbt",
    "instadaily",
    "repost",
    "like4like",
    "summer",
    "beauty",
    "fitness",
    "food",
    "selfie",
    "me",
    "instalike",
    "girl",
    "friends",
    "fun",
    "photo"
]

export let tagsObjects: TagsObject[] = [];

export let users: User[] = [
    {
        "id": 1,
        "name": "a",
        "lastName": "a",
        "email": "a@a.a",
        "nickName": "a",
        "password": "$2a$10$Q7dAK262sD7bYm3/XJW2.eNOb1SSwwzw.79xGrulF.ur9/3rr3QCq",
        "confirmed": true
    }
];

async function loadData() {
    console.log("loadData");
    photos = await JSON.parse(fs.readFileSync('./src/app/model/photos.json', 'utf8'));
    tagsObjects = await JSON.parse(fs.readFileSync('./src/app/model/tags.json', 'utf8'));
    users = await JSON.parse(fs.readFileSync('./src/app/model/users.json', 'utf8'));
}

loadData();

export async function updateJSON() {
    console.log("updateJSON");

    fs.writeFileSync('./src/app/model/photos.json', JSON.stringify(photos));
    fs.writeFileSync('./src/app/model/tags.json', JSON.stringify(tagsObjects));
    fs.writeFileSync('./src/app/model/users.json', JSON.stringify(users));

    return
}

export async function restart() {
    fs.readdirSync('./files').forEach(file => {
        const stat = fs.statSync('./files/' + file);

        if (stat.isDirectory()) {
            fs.rmSync('./files/' + file, { recursive: true, force: true, })
        } else {
            fs.unlinkSync('./files/' + file);
        }
    });

    photos = [];
    tagsObjects = [];
    users = [];

    await updateJSON();
    await loadData();
}

export const url = "http://localhost:5000";
// localhost - http://localhost:5000
// code - https://code.juliandworzycki.pl/api
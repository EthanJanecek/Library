export interface Option {
    name: string,
    optionCategories: string[]
}

export interface Category {
    name: string,
    options: Option[]
}

export const categories = ["Books", "Video Games", "Movies/TV", "Music"];

export const bookOptions = {
    type: ["Paperback", "Hardcover", "Digital"]
};

export const moviesTvOptions = {
    category: ["Movie", "TV Show"],
    type: ["DVD", "Blue-Ray", "Digital"]
};

export const musicOptions = {
    type: ["Disk", "Vinyl", "Digital", "Cassette"]
};

export const videoGameOptions = {
    type: ["Digital", "Physical"],
    console: [
        {
            brand: "PC",
            consoles: []
        },
        {
            brand: "Xbox",
            consoles: ["Xbox", "Xbox 360", "Xbox One", "Xbox Series X|S"]
        },
        {
            brand: "PlayStation",
            consoles: ["PlayStation", "PlayStation 2", "PlayStation 3", "PlayStation 4", "PlayStation 5", "PSP", "PlayStation Vita"]
        },
        {
            brand: "Nintendo",
            consoles: ["3DS", "DS", "GameBoy", "GameBoy Advance", "GameCube", "N64", "NES", "SNES", "Switch", "Wii", "Wii U"]
        },
        {
            brand: "Sega",
            consoles: ["Sega 32x", "Sega CD", "Sega Dreamcast", "Sega Game Gear", "Sega Genesis", "Sega Master System", "Sega Saturn"]
        },
        {
            brand: "Atari",
            consoles: ["Atari 2600", "Atari 5200", "Atari 7800", "Atari Jaguar", "Atari Lynx"]
        },
        {
            brand: "Other",
            consoles: ["Oculus Rift", "Oculus Quest", "Steam Deck", "Other"]
        }
    ]
};

export interface User {
    name: string;
    id: number;
    email: string;
}

export interface Book {
    title: string;
    author: string;
    type: string;
    signed: boolean;
}
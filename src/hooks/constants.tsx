export const categories = ["Books", "Video Games", "Movies/TV", "Music"];

export const bookOptions = {
    type: ["Paperback", "Hardcover", "Digital"]
};

export const moviesTvOptions = {
    category: ["Movie", "TV Show"],
    type: ["DVD", "Blue-Ray", "Digital"]
};

export const musicOptions = {
    type: ["CD", "Vinyl", "Digital", "Cassette"]
};

export const videoGameOptions = {
    type: ["Physical", "Digital"],
    consoleTypes: [
        {
            brand: "PC",
            consoles: ["PC"]
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
    NAME: string;
    USER_ID: number;
    EMAIL: string;
}

export interface Book {
    BOOK_ID: number;
    AUTHOR: string;
    TYPE: string;
    BARCODE: number;
    YEAR: number;
    SIGNED: boolean;
    TITLE: string;
    USER_ID: number;
    READ: boolean;
    SERIES: string;
    SERIES_NUMBER: number;
}

export interface Game {
    VIDEO_GAME_ID: number;
    NAME: string;
    TYPE: string;
    CONSOLE_BRAND: string;
    CONSOLE: string;
    BARCODE: number;
    USER_ID: number;
    PLAYED: boolean;
}

export interface Music {
    MUSIC_ID: number;
    NAME: string;
    TYPE: string;
    ARTIST: string;
    BARCODE: number;
    USER_ID: number;
}

export interface Movie {
    MOVIE_TV_ID: number;
    NAME: string;
    TYPE: string;
    CATEGORY: string;
    BARCODE: number;
    SEASON: number;
    USER_ID: number;
}
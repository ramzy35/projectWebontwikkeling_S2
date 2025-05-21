import { ObjectId } from "mongodb";

export interface Faction {
    id: string;
    name: string;
    alignment: string;
    symbolUrl: string;
    isSecretSociety: boolean;
    foundedYear: number;
} 

export interface Card {
    id: string;
    name: string;
    description: string;
    powerLevel: number;
    isLegendary: boolean;
    releaseDate: string;
    imageUrl: string;
    cardType: string;
    rarity: string;
    manaCost: number;
    cardGame: string;
    cardSet: string;
    abilities: string[];
    factionId: string;
    faction?: Faction | null;
}

export interface User {
    _id?: ObjectId;
    username: string;
    password?: string;
    role: "ADMIN" | "USER";
}
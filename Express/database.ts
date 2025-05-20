import { Collection, MongoClient, ObjectId } from "mongodb";
import { Card, Faction, User } from './interfaces';
import { error } from "console";
import dotenv from "dotenv";
import bcrypt from "bcrypt"

dotenv.config();
export const link = process.env.MONGO_URI || "";
export const client = new MongoClient(link);



const saltRounds : number = 10;

const heroCollection : Collection<Card> = client.db("CardGame").collection("Heros");
const factionCollection : Collection<Faction> = client.db("CardGame").collection("factions");
const userCollection : Collection<User> = client.db("CardGame").collection("users");


//Get all user from database
export async function getAllUser():Promise<User[]> {
    try {
        const allUser:User[] = (await userCollection.find({}).toArray());
        return allUser;
    }catch (error) {
        console.error(error)
    }
    return [];
}


//Create a new user with username, email, password
export async function createUser(username:string, email:string, password:string) {
    const existingUser = await userCollection.findOne({$or: [{username},{email}] });
    if (existingUser) {
        throw new Error("Username or email already exist");
        
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await userCollection.insertOne({
        username,
        email,
        password: hashedPassword,
        role: "USER"
    })

    console.log(`new user created: ${username}`);
}

// validate user login by checking username and hashed password
export async function login(username: string, password: string) {
    if (username=== "" || password === "") {
        throw new Error("email and password required");
    }
    let user : User | null = await userCollection.findOne<User>({username:username});
    if (user) {
        if (await bcrypt.compare(password, user.password!)) {
            console.log(`loged in as : \x1b[32m${user.username}\x1b[0m`);
            return user;
        } else {
            throw new Error("password incorrect");
        }
    } else {
        throw new Error("User not found");
    }
}




async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}


export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database");
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}



export async function seedCollections() {
    const heroRes = await fetch("https://raw.githubusercontent.com/ramzy35/DataAp/main/cards.json");
    const heroData = await heroRes.json();
    let cards: Card[] = heroData.cards;

    const factionRes = await fetch("https://raw.githubusercontent.com/ramzy35/DataAp/main/factions.json");
    const factionData = await factionRes.json();
    const factions: Faction[] = factionData.factions;


    cards = cards.map(c => ({
        ...c,
        faction: factions.find((f: any) => f.id === c.factionId)
    }));
    if (await heroCollection.countDocuments() === 0) {
        await heroCollection.insertMany(cards);
        console.log("seeded hero data");
    } else {
        console.log("hero collection already seeded");
    }
    if (await factionCollection.countDocuments() === 0) {
        await factionCollection.insertMany(factions);
        console.log("seeded faction data");
    } else {
        console.log("facion collection already seeded");
    }
}

export async function getHeroList() {
    return await heroCollection.find().toArray();
}

export async function getFactionList() {
    const heroList: Card[] = await heroCollection.find().toArray();
    const factionMap = new Map<string, Faction>();

    for (const h of heroList) {
        if (h.faction && !factionMap.has(h.faction.id)) {
            factionMap.set(h.faction.id, h.faction);
        }
    }

    return Array.from(factionMap.values());
}
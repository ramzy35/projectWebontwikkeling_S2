import express from 'express';
import dotenv from "dotenv";

import path from 'path';
import fetch from 'node-fetch';
import { Card, Faction , User } from './interfaces';

import personRoute from './routes/heroCard';
import factionRoute from './routes/factionCard';
import factionsRoute from './routes/factions';
import session from "./session";


dotenv.config();
const app = express();


app.set('view engine', 'ejs');
app.set("port", 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/hero", personRoute);
app.use("/faction",factionRoute);
app.use("/factions",factionsRoute )


const cardDataUrl = 'https://raw.githubusercontent.com/ramzy35/DataAp/main/cards.json'
const factionDataUrl = 'https://raw.githubusercontent.com/ramzy35/DataAp/main/factions.json'

export const fetchJsonData = async (): Promise<Card[]> => {
  try {
    const responseCards = await fetch(cardDataUrl);
    const responseFactions = await fetch(factionDataUrl);

    if (!responseCards.ok || !responseFactions.ok) {
      throw new Error("fout bij het laden van de gegevens");
    }

    const cards: Card[] = await responseCards.json() as Card[];
    const factions: Faction[] = await responseFactions.json() as Faction[];

    const cardsWithFactions = cards.map((card: Card) => {
      const faction = factions.find((factionElement: Faction) => factionElement.id === card.factionId);

      if (faction) {
        return {...card, faction}
      } else {
        return { ...card, faction: { id: 'default', name: 'Unknown', alignment: 'Unknown', symbolUrl: '', isSecretSociety: false, foundedYear: 0 } };
      }
    });

    return cardsWithFactions;
  } catch (error) {
    console.error("er is een fout opgetreden bij het ophalen van de json: ", error);
    return [];
  }
};


app.get('/', async (req, res) => {
  try {
    const cardsWithFactions = await fetchJsonData();
    res.render('index', { cards: cardsWithFactions });
  } catch (error) {
    res.status(500).send("Er is een fout opgetreden bij het ophalen van de gegevens.");
  }
});



app.listen(app.get("port"), ()=>console.log( "[server] http://localhost:" + app.get("port")));



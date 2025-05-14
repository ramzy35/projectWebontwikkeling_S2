import express from 'express';
import path from 'path';
import fetch from 'node-fetch';
import { Card, Faction } from './interfaces';

const app = express();
// const port = 3000;

app.set('view engine', 'ejs');
app.set("port", 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


const cardDataUrl = 'https://raw.githubusercontent.com/ramzy35/DataAp/main/cards.json'
const factionDataUrl = 'https://raw.githubusercontent.com/ramzy35/DataAp/main/factions.json'

const fetchJsonData = async (): Promise<Card[]> => {
  try {
    const responseCards = await fetch(cardDataUrl);
    const responseFactions = await fetch(factionDataUrl);

    if (!responseCards.ok || !responseFactions.ok) {
      throw new Error("fout bij het laden van de gegevens");
    }

    const cards: Card[] = await responseCards.json() as Card[];
    const factions: Faction[] = await responseFactions.json() as Faction[];

    const cardsWithFactions = cards.map((card: Card) => {
      const faction = factions.find((factionElement: Faction) => factionElement.id === card.faction.id);

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


// interface Person {
//   name: string;
//   age: number;
// }

// const persons: Person[] = [
//   { name: "Sven", age: 25 },
//   { name: "Andie", age: 24 },
//   { name: "George", age: 30 },
//   { name: "Zeoff", age: 28 }
// ]

// app.get("/", (req, res) => {
//   let q : string = typeof req.query.q === "string" ? req.query.q : "";
//   let filteredPersons: Person[] = persons.filter((person) => {
//     return person.name.toLowerCase().startsWith(q.toLowerCase());
//   });
//   res.render("index", {
//     persons: filteredPersons,
//     q: q
//   });
// });


// app.get('/', async (req, res) => {
//     try {
//         const cardurl = 'https:raw.githubusercontent.com/ramzy35/DataAp/main/cards.json'
//         const factionurl = 'https:raw.githubusercontent.com/ramzy35/DataAp/main/factions.json'

//         const [cardRes, factionsRes] = await Promise.all([
//             fetch(cardurl),
//             fetch(factionurl),
//         ]);

//         const cards = await cardRes.json();
//         const factions = await factionsRes.json();

//         res.render('index', {cards, factions});

//     }catch (error) {
//         console.error("Fout bij het ophalen van de json bestanden:",error);
//         res.status(500).send('fout bij ophalen van data');
//     }
// });



// app.listen(port, () => {
//   console.log(`Server draait op http://localhost:${port}`);
// });

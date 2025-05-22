import express from 'express';
import dotenv from "dotenv";
import path from 'path';

import { getAllCards } from './database';
import personRoute from './routes/heroCard';
import factionRoute from './routes/factionCard';
import factionsRoute from './routes/factions';
import signInRoute from './routes/signIn';
import signUpRoute from './routes/signUp';

import session from './session';
import { connect } from './database';


dotenv.config();
const app = express();


app.set('view engine', 'ejs');
app.set("port", 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/hero", personRoute);
app.use("/faction", factionRoute);
app.use("/factions", factionsRoute);
app.use("/signin", signInRoute);
app.use("/signup", signUpRoute);
app.use(session);






app.get('/', async (req, res) => {
  try {
    const cards = await getAllCards();
    res.render('index', { cards });
  } catch (error) {
    res.status(500).send("Er is een fout opgetreden bij het ophalen van de gegevens.");
  }
});



app.listen(app.get("port"), async ()=> {
  try {
      await connect();
      console.log( "server started on http://localhost:" + app.get("port"));
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
});



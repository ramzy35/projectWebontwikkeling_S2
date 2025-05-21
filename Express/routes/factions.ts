import  express  from "express";

import { Faction } from "../interfaces";
import { getFactionList } from "../database";

const factionsRoute = express.Router();


factionsRoute.get("/", async (req, res) => {
    const factions = await getFactionList();
    res.render("factions",{factions});
})


export default factionsRoute;
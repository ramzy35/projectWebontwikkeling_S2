import  express  from "express";
import { fetchJsonData } from "..";
import { Faction } from "../interfaces";

const factionsRoute = express.Router();


factionsRoute.get("/", async (req, res) => {
    const response= await fetch("https://raw.githubusercontent.com/ramzy35/DataAp/refs/heads/main/factions.json");
    const factions:Faction[]  = await response.json();
    res.render("factions",{factions});
})


export default factionsRoute;
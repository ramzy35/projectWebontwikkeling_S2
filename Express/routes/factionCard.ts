import  express  from "express";
import { getFactionFiltered, getFactionList, getHeroList } from "../database";

const factionRoute = express.Router();


factionRoute.get("/", async (req, res) => {
    const factionId = req.query.id as string;

    if (typeof factionId === 'string') {
        const faction = await getFactionFiltered(factionId);

        if (faction) {
            res.render("factionCard", { faction });  // ✅ send actual data
        } else {
            res.status(404).send("Faction not found");
        }
    } else {
        res.status(400).json({ error: "Invalid ID" });
    }
});






export default factionRoute;
import  express  from "express";
import { fetchJsonData } from "..";

const factionRoute = express.Router();


factionRoute.get("/", async (req, res) => {
    const list = await fetchJsonData();
    const filterlist = list.filter(e => e.faction?.id === req.query.id)
    res.render("factionCard",{faction:filterlist[0]});
})

export default factionRoute;
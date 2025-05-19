import  express  from "express";
import { fetchJsonData } from "..";

const personRoute = express.Router();


personRoute.get("/", async (req, res) => {
    const list= await fetchJsonData();
    const filterlist= list.filter(e => e.id === req.query.id)
    res.render("heroCard",{hero:filterlist[0]});
})



export default personRoute;
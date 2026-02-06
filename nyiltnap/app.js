import express from "express";
import db from './data/db.js'

const PORT = 3321;
const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Az app a ${PORT} porton fut.`)
})
app.get("/telepules", (req, res) => {
    const city = req.query.nev;
    const students = db.prepare("SELECT nev FROM diakok WHERE telepules = ?").all(city);
    res.status(200).json(students);
})
app.get("/tanora", (req,res) => {
    const orak = db.prepare("SELECT datum, terem, orasorszam FROM orak WHERE targy = 'angol' ORDER BY datum ASC").all();
    res.status(200).json(orak);
})
app.get("/9-matematika-fizika", (req, res) => {
    const orak = db.prepare("SELECT csoport, targy, datum FROM orak WHERE (targy = 'fizika' OR targy = 'matematika') AND (csoport LIKE '%9%') ORDER BY targy ").all();
    res.status(200).json(orak);
})
app.get("/telepulesfo", (req,res) => {
    const fok = db.prepare("SELECT COUNT(telepules) AS szam FROM diakok GROUP BY telepules ORDER BY szam DESC").all();
    res.status(200).json(fok);
})
app.get("/tantargyak", (req, res) => {
    const targyak = db.prepare("SELECT DISTINCT(targy) FROM orak ").all();
    res.status(200).json(targyak);
})
app.get("/telepulesrol/", (req, res) => {
    const nev = req.query.nev;
    
})
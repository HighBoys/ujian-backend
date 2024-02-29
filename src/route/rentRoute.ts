import express, { Express } from "express";
import { createRent, deleteRent, readRent, updateRent } from "../controler/rentControler";
import { create } from "domain";

const app = express()

app.use(express.json())
app.get(`/rent`, readRent)
app.post(`/rent`, createRent)
app.put(`/rent/:rentID`, updateRent)
app.delete(`/rent/:rentID`, deleteRent)

export default app
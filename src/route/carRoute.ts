import express, { Express } from "express";
import { createCar, readCar, updateCar, deleteCar} from "../controler/carControler";

const app = express()

app.use(express.json())

app.post(`/car`,createCar)
app.get(`/car`,readCar)
app.put(`/car/:carID`,updateCar)
app.delete(`/car/:carID`,deleteCar)

export default app
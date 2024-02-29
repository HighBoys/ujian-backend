import express from "express";
import routeAdmin from "./route/adminRoute";
import routeCar from "./route/carRoute";
import routerent from "./route/rentRoute";
import { Console } from "console";

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(routeAdmin);
app.use(routeCar);
app.use(routerent);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

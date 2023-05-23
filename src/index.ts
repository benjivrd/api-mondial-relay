import express from "express";
import { config } from 'dotenv'
import { searchPointRelay, createTicketRelay } from "./controller/PointRelay";
import morgan from "morgan";


const app = express();
const port = 3300;

config();

app.use(express.json());
app.use(morgan("combined"));

app.post("/recherche-point-relay",searchPointRelay);
app.post("/create-ticket-relay",createTicketRelay);


app.listen(port, () => {
  console.log("Serveur en écoute sur le port " + port);
});

import express from "express";
import { config } from 'dotenv'
import { searchPointRelay, createTicketRelay } from "./controller/PointRelay";
import morgan from "morgan";
import cors from "cors";

const app = express();
const port = 3300;

config();

app.use(express.json());
app.use(morgan("combined"));
app.use(cors({origin: 'http://localhost:5173'}))

app.get('/' , (_req: express.Request, res: express.Response) => {
res.send('Hello API')
})
app.post("/recherche-point-relay",searchPointRelay);
app.post("/create-ticket-relay",createTicketRelay);


app.listen(port, () => {
  console.log("Serveur en écoute sur le port " + port);
});

export default app

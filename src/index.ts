import express from "express";
import axios from "axios";
import crypto from "crypto";
import { config } from 'dotenv'
import xml2js from "xml2js";
import { RelaySearchType } from "./type/RelaySearchType";
import { ObjectToString, getTemplateDataXml, isValideData } from "./utils/helper";

const app = express();
const port = 3300;

config();

app.use(express.json());

app.post(
  "/recherche-point-relay",
  async (req: express.Request, res: express.Response) => {

    const {pays, codePostal, limitResult, ville} = req.body;
    const {ENSEIGN, KEY_PRIVATE} = process.env;

    const isValid = isValideData({pays, codePostal, limitResult, ville});
    
    if(!isValid.status){
      res.status(400).send({msg: isValid.msg});
      return
    }

    const relay: RelaySearchType = {
      enseign: ENSEIGN, 
      pays, 
      codePostal, 
      ville: ville ? ville : null, 
      limitResult, 
      kPrivate: KEY_PRIVATE
    };
    
    const concatenateValues: string = ObjectToString(relay);

    const hash: string = crypto.createHash("md5").update(concatenateValues).digest("hex").toUpperCase();
  
    try {
      const url: string = "https://api.mondialrelay.com/Web_Services.asmx";
      const action: string = "http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche";
      const data: string = getTemplateDataXml(relay, hash);

      const config: object = {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: action,
        },
      };

      const response = await axios.post(url, data, config);

      const xmlResponse = response.data;
      const parser = new xml2js.Parser({ explicitArray: false });
      const parsedResponse = await parser.parseStringPromise(xmlResponse);

      const pointsRelay: JSON =
        parsedResponse["soap:Envelope"]["soap:Body"][
          "WSI4_PointRelais_RechercheResponse"
        ]["WSI4_PointRelais_RechercheResult"]["PointsRelais"];

      res.json(pointsRelay);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Erreur lors de la recherche de points relay");
    }
  }
);

app.listen(port, () => {
  console.log("Serveur en écoute sur le port " + port);
});

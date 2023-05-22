import express from "express";
import axios from "axios";
import crypto from "crypto";
import xml2js from "xml2js";

const app = express();
const port = 3300;

app.use(express.json());

app.post(
  "/recherche-point-relay",
  async (req: express.Request, res: express.Response) => {

    const key = `BDTEST13${req.body.pays}${req.body.codePostal}10PrivateK`;

    const hash = crypto.createHash("md5");
    hash.update(key);
    const finalHash = hash.digest("hex").toUpperCase();

    try {
      const url = "https://api.mondialrelay.com/Web_Services.asmx";
      const action =
        "http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche";
      const data = `<?xml version="1.0" encoding="utf-8"?>
      <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
        <soap:Body>
          <WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
            <Enseigne>BDTEST13</Enseigne>
            <Pays>${req.body.pays}</Pays>
            <CP>${req.body.codePostal}</CP>
            <NombreResultats>10</NombreResultats>
            <Security>${finalHash}</Security>
          </WSI4_PointRelais_Recherche>
        </soap:Body>
      </soap:Envelope>`;

      const config = {
        headers: {
          "Content-Type": "text/xml; charset=utf-8",
          SOAPAction: action,
        },
      };

      const response = await axios.post(url, data, config);

      const xmlResponse = response.data;
      const parser = new xml2js.Parser({ explicitArray: false });
      const parsedResponse = await parser.parseStringPromise(xmlResponse);

      const pointsRelay =
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

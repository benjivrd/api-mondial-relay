import { RelaySearchType } from "../type/RelaySearchType";
import { RelayCreateTicketType } from "../type/RelayCreateTicketType";
import { createMd5HashByObj, xmlToJson } from "../utils/helper";
import {
  isValideSearchRelayData,
  isValideCreateTicket,
} from "../utils/validation";
import express from "express";
import {
  formatePointRelay,
  formateTicket,
  getTemplateDataXmlForSearchRelay,
  getTemplateDataXmlForCreateTicket,
} from "../utils/pointRelayFormat";
import { MondialRelayService } from "../services/MondialRelay.service";

export async function searchPointRelay(
  req: express.Request,
  res: express.Response
) {
  const { pays, codePostal, limitResult } = req.body;
  const ENSEIGN = "BDTEST13";
  const KEY_PRIVATE = "PrivateK";

  const relay: RelaySearchType = {
    enseign: ENSEIGN,
    pays,
    codePostal,
    limitResult,
    kPrivate: KEY_PRIVATE,
  };

  const isValid = isValideSearchRelayData(relay);

  if (!isValid.status) {
    res.status(400).send({ messages: isValid.messages });
    return;
  }

  const hash: string = createMd5HashByObj(relay);

  try {
    const data: string = getTemplateDataXmlForSearchRelay(relay, hash);

    const response = await MondialRelayService.getPointRelay(data);

    if (!response.status) {
      res
        .status(500)
        .send({ messages: "Erreur lors de l'apel api de mondial relais" });
    }

    const parsedResponse = await xmlToJson(response.data);

    if (!parsedResponse.status) {
      res
        .status(500)
        .send({ messages: "Erreur lors de la conversion xml en json" });
    }

    const pointsRelay: Object =
      parsedResponse.json["soap:Envelope"]["soap:Body"][
        "WSI4_PointRelais_RechercheResponse"
      ]["WSI4_PointRelais_RechercheResult"]["PointsRelais"][
        "PointRelais_Details"
      ];

    const formatedPointRelay = formatePointRelay(pointsRelay);

    res.send(formatedPointRelay);
  } catch (error) {
    res.status(500).send("Erreur lors de la recherche de points relay");
  }
}

export async function createTicketRelay(
  req: express.Request,
  res: express.Response
) {
  const {
    modeCol,
    modeLiv,
    expeLangage,
    expeAd1,
    expeAd3,
    expeVille,
    expeCP,
    expePays,
    destLangage,
    destAd1,
    destAd3,
    destVille,
    destCP,
    destPays,
    poids,
    nbColis,
  } = req.body;
  
  const ENSEIGN = "BDTEST13";
  const KEY_PRIVATE = "PrivateK";


  const ticket: RelayCreateTicketType = {
    enseign: ENSEIGN,
    modeCol,
    modeLiv,
    expeLangage,
    expeAd1,
    expeAd3,
    expeVille,
    expeCP,
    expePays,
    destLangage,
    destAd1,
    destAd3,
    destVille,
    destCP,
    destPays,
    poids,
    nbColis,
    crtValeur: 0,
    kPrivate: KEY_PRIVATE,
  };

  const isValid = isValideCreateTicket(ticket);

  if (!isValid.status) {
    res.status(400).send({ messages: isValid.messages });
    return;
  }

  const hash: string = createMd5HashByObj(ticket);

  try {
    const data: string = getTemplateDataXmlForCreateTicket(ticket, hash);

    const response = await MondialRelayService.createTicketRelay(data);

    if (!response.status) {
      return res
        .status(500)
        .send({ messages: "Erreur lors de l'apel api de mondial relais" });
    }

    const parsedResponse = await xmlToJson(response.data);

    if (!parsedResponse.status) {
      return res
        .status(500)
        .send({ messages: "Erreur lors de la conversion xml en json" });
    }

    const urlTicket: Object =
      parsedResponse.json["soap:Envelope"]["soap:Body"]["WSI2_CreationEtiquetteResponse"][
        "WSI2_CreationEtiquetteResult"  
      ];

      const formatedCreateTicket = formateTicket(urlTicket);

    return res.send(formatedCreateTicket);
  } catch (error) {
    return res.status(500).send("Erreur lors de la recherche de points relay");
  }
}

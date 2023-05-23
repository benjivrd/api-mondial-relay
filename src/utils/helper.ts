import { RelaySearchType } from "../type/RelaySearchType";

export const getDataXml = (relay: RelaySearchType, hash: string): string => {
    const xml = 
  ` <Enseigne>${relay.enseign}</Enseigne>
    <Pays>${relay.pays}</Pays>
    <CP>${relay.codePostal}</CP>
    ${relay.ville && `<Ville>${relay.ville}</Ville>`}
    <NombreResultats>${relay.limitResult}</NombreResultats>
    <Security>${hash}</Security> `

    return xml;
  }

  export const getTemplateDataXml = (relay: RelaySearchType, hash: string): string => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
         ${getDataXml(relay, hash)}
        </WSI4_PointRelais_Recherche>
      </soap:Body>
    </soap:Envelope>`;

    return xml;
  }

export const ObjectToString = (obj: Object) => {
   return Object.values(obj).reduce((prev, next) => {
        if(next !== null) {
          return prev.toString() + next.toString();
        }
        return prev.toString();
      });
}


export const isValideData = ({pays, codePostal, limitResult, ville}): {status: boolean, msg?: string} => {
    const regexPaysIso: RegExp = /^[A-Za-z]{2}$/;
    const regexVille: RegExp = /^[A-Za-z_'-]{2,25}$/;

    if(pays === undefined || codePostal === undefined || limitResult === undefined) {
      return { status: false, msg: "Les champs pays, code postal et la limite de resultats sont obligatoires"};
    }
    if(!regexPaysIso.test(pays)) {
      return { status: false, msg: "Le pays envoyé n'est pas conforme"};
    }
    if(!regexVille.test(ville)) {
        return { status: false, msg: "La ville envoyé n'est pas conforme"};
    }
    if(isNaN(limitResult) || limitResult > 30) {
      return { status: false, msg: "Le nombre doit être inférieur à 30"};

    }
    if(isNaN(codePostal) || codePostal.length != 5) {
        return { status: false, msg: "Le nombre doit être égal à 5"};
    }
    return { status: true }
}
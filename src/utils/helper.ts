import { RelaySearchType } from "../type/RelaySearchType";

export const getDataXml = (relay: RelaySearchType, finalHash: string): string => {
    const xml = 
  ` <Enseigne>${relay.enseign}</Enseigne>
    <Pays>${relay.pays}</Pays>
    <CP>${relay.codePostal}</CP>
    ${relay.ville && `<Ville>${relay.ville}</Ville>`}
    <NombreResultats>${relay.limitResult}</NombreResultats>
    <Security>${finalHash}</Security> `

    return xml;
  }

  export const getTemplateDataXml = (relay: RelaySearchType, finalHash: string): string => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
         ${getDataXml(relay, finalHash)}
        </WSI4_PointRelais_Recherche>
      </soap:Body>
    </soap:Envelope>`;

    return xml;
  }
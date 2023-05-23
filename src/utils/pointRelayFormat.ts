import { RelayCreateTicketType } from "../type/RelayCreateTicketType";
import { RelaySearchType } from "../type/RelaySearchType";
import { dateFormat } from "./helper";

export const getDataXmlForSearchRelay = (relay: RelaySearchType, hash: string): string => {
    const xml = 
  ` <Enseigne>${relay.enseign}</Enseigne>
    <Pays>${relay.pays}</Pays>
    <CP>${relay.codePostal}</CP>
    <NombreResultats>${relay.limitResult}</NombreResultats>
    <Security>${hash}</Security> `

    return xml;
  }

  export const getTemplateDataXmlForSearchRelay = (relay: RelaySearchType, hash: string): string => {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
         ${getDataXmlForSearchRelay(relay, hash)}
        </WSI4_PointRelais_Recherche>
      </soap:Body>
    </soap:Envelope>`;

    return xml;
  }

  
export const formatePointRelay = (pointsRelay: Object): Object => {

    Object.entries(pointsRelay).forEach(([i, value]) => {
  
      const valueLundiMatin = value['Horaires_Lundi']['string'][0] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Lundi']['string'][0])}-${dateFormat(value['Horaires_Lundi']['string'][1])}`;
      const valueLundiApresMidi = value['Horaires_Lundi']['string'][2] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Lundi']['string'][2])}-${dateFormat(value['Horaires_Lundi']['string'][3])}`;
      
      const valueMardiMatin = value['Horaires_Mardi']['string'][0] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Mardi']['string'][0])}-${dateFormat(value['Horaires_Mardi']['string'][1])}`;
      const valueMardiApresMidi = value['Horaires_Mardi']['string'][2] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Mardi']['string'][2])}-${dateFormat(value['Horaires_Mardi']['string'][3])}`;
      
      const valueMercrediMatin = value['Horaires_Mercredi']['string'][0] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Mercredi']['string'][0])}-${dateFormat(value['Horaires_Mercredi']['string'][1])}`;
      const valueMercrediApresMidi = value['Horaires_Mercredi']['string'][2] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Mercredi']['string'][2])}-${dateFormat(value['Horaires_Mercredi']['string'][3])}`;
      
      const valueJeudiMatin = value['Horaires_Jeudi']['string'][0] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Jeudi']['string'][0])}-${dateFormat(value['Horaires_Jeudi']['string'][1])}`;
      const valueJeudiApresMidi = value['Horaires_Jeudi']['string'][2] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Jeudi']['string'][2])}-${dateFormat(value['Horaires_Jeudi']['string'][3])}`;
      
      const valueVendrediMatin = value['Horaires_Vendredi']['string'][0] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Vendredi']['string'][0])}-${dateFormat(value['Horaires_Vendredi']['string'][1])}`;
      const valueVendrediApresMidi = value['Horaires_Vendredi']['string'][2] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Vendredi']['string'][2])}-${dateFormat(value['Horaires_Vendredi']['string'][3])}`;
      
      const valueSamediMatin = value['Horaires_Samedi']['string'][0] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Samedi']['string'][0])}-${dateFormat(value['Horaires_Samedi']['string'][1])}`;
      const valueSamediApresMidi = value['Horaires_Samedi']['string'][2] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Samedi']['string'][2])}-${dateFormat(value['Horaires_Samedi']['string'][3])}`;
      
      const valueDimancheMatin = value['Horaires_Dimanche']['string'][0] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Dimanche']['string'][0])}-${dateFormat(value['Horaires_Dimanche']['string'][1])}`;
      const valueDimancheApresMidi = value['Horaires_Dimanche']['string'][2] === '0000' ? 'Fermé' : `${dateFormat(value['Horaires_Dimanche']['string'][2])}-${dateFormat(value['Horaires_Dimanche']['string'][3])}`;
      
        delete value['Horaires_Lundi']
        delete value['Horaires_Mardi']
        delete value['Horaires_Mercredi']
        delete value['Horaires_Jeudi']
        delete value['Horaires_Vendredi']
        delete value['Horaires_Samedi']
        delete value['Horaires_Dimanche']
  
    
      const horaires = {
        Lundi: {
          Matin: valueLundiMatin,
          ApresMidi: valueLundiApresMidi,
        },
        Mardi: {
          Matin: valueMardiMatin,
          ApresMidi: valueMardiApresMidi,
        },
        Mercredi: {
          Matin: valueMercrediMatin,
          ApresMidi: valueMercrediApresMidi,
        },
        Jeudi: {
          Matin: valueJeudiMatin,
          ApresMidi: valueJeudiApresMidi,
        },
        Vendredi: {
          Matin: valueVendrediMatin,
          ApresMidi: valueVendrediApresMidi,
        },
        Samedi: {
          Matin: valueSamediMatin,
          ApresMidi: valueSamediApresMidi,
        },
        Dimanche: {
          Matin: valueDimancheMatin,
          ApresMidi: valueDimancheApresMidi,
        },
      }
      value['Horaires'] = horaires
    })
    return pointsRelay;
  }

export const getDataXmlForCreateTicketRelay = (ticket: RelayCreateTicketType, hash: string): string => {
  const xml = `
  <Enseigne>${ticket.enseign}</Enseigne>
  <ModeCol>${ticket.modeCol}</ModeCol>
  <ModeLiv>${ticket.modeLiv}</ModeLiv>
  <Expe_Langage>${ticket.expeLangage}</Expe_Langage>
  <Expe_Ad1>${ticket.expeAd1}</Expe_Ad1>
  <Expe_Ad3>${ticket.expeAd3}</Expe_Ad3>
  <Expe_Ville>${ticket.expeVille}</Expe_Ville>
  <Expe_CP>${ticket.expeCP}</Expe_CP>
  <Expe_Pays>${ticket.expePays}</Expe_Pays>
  <Dest_Langage>${ticket.destLangage}</Dest_Langage>
  <Dest_Ad1>${ticket.destAd1}</Dest_Ad1>
  <Dest_Ad3>${ticket.destAd3}</Dest_Ad3>
  <Dest_Ville>${ticket.destVille}</Dest_Ville>
  <Dest_CP>${ticket.destCp}</Dest_CP>
  <Dest_Pays>${ticket.destPays}</Dest_Pays>
  <Poids>${ticket.poids}</Poids>
  <NbColis>${ticket.nbColis}</NbColis>
  <Security>${hash}</Security>`;
  return xml;
}

export const getTemplateDataXmlForCreateTicket = (ticket: RelayCreateTicketType, hash: string): string => {
  const xml = `
  <?xml version="1.0" encoding="utf-8"?>
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
      <WSI2_CreationEtiquette xmlns="http://www.mondialrelay.fr/webservice/">
        ${getDataXmlForCreateTicketRelay}
      </WSI2_CreationEtiquette>
    </soap:Body>
  </soap:Envelope`

  return xml;
}
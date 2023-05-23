import { RelaySearchType } from "../type/RelaySearchType";
import Joi from "joi";

export const getDataXml = (relay: RelaySearchType, hash: string): string => {
    const xml = 
  ` <Enseigne>${relay.enseign}</Enseigne>
    <Pays>${relay.pays}</Pays>
    <CP>${relay.codePostal}</CP>
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


export const isValideData = ({pays, codePostal, limitResult}): {status: boolean, messages?: Array<string>} => {
    const schema = Joi.object({
      pays: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required()
        .messages({
          'string.base': `pays: '${pays}' should be a type of 'text'`,
          'string.empty': `pays: '${pays}' cannot be an empty field`,
          'string.min': `pays: '${pays}' should have a minimum length of {#limit}`,
          'string.max': `pays: '${pays}' should have a maximum length of {#limit}`,
          'any.required': `pays: '${pays}' is a required field`
        }),
      codePostal: Joi.string() 
        .min(5)
        .max(5)
        .required()
        .messages({
          'string.base': `codePostal: '${codePostal}' should be a type of 'text'`,
          'string.empty': `codePostal: '${codePostal}' cannot be an empty field`,
          'string.min': `codePostal: '${codePostal}' should have a minimum length of {#limit}`,
          'string.max': `codePostal: '${codePostal}' should have a maximum length of {#limit}`,
          'any.required': `codePostal: '${codePostal}' is a required field`
        }),
      limitResult: Joi.number()
        .min(1)
        .max(30)
        .required()
        .messages({
          'number.base': `limitResult: '${limitResult}' should be a type of 'number'`,
          'number.empty': `limitResult: '${limitResult}' cannot be an empty field`,
          'number.min': `limitResult: '${limitResult}' should have a minimum length of {#limit}`,
          'number.max': `limitResult: '${limitResult}' should have a maximum length of {#limit}`,
          'any.required': `limitResult: '${limitResult}' is a required field`
        })
    }).options({abortEarly: false});

    const {error, value} = schema.validate({ pays, codePostal, limitResult });

    if(error) {
      const arrayError = error.details.map((value) => {
        return value.message;
      });
      return {status: false, messages: arrayError}
    }

    return {status: true}
}

export const dateFormat = (hourString: string) : string => {
  return hourString.slice(0, 2).padStart(2, '0') + "h" + hourString.slice(2, 4);
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
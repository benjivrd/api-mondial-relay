import Joi from "joi";
import { RelaySearchType } from "../type/RelaySearchType";
import { RelayCreateTicketType } from "../type/RelayCreateTicketType";

export const isValideSearchRelayData = ({
  pays,
  codePostal,
  limitResult,
}: RelaySearchType): { status: boolean; messages?: Array<string> } => {
  const schema = Joi.object({
    pays: Joi.string()
      .alphanum()
      .min(2)
      .max(30)
      .required()
      .messages({
        "string.base": `pays: '${pays}' should be a type of 'text'`,
        "string.empty": `pays: '${pays}' cannot be an empty field`,
        "string.min": `pays: '${pays}' should have a minimum length of {#limit}`,
        "string.max": `pays: '${pays}' should have a maximum length of {#limit}`,
        "any.required": `pays: '${pays}' is a required field`,
      }),
    codePostal: Joi.string()
      .min(5)
      .max(5)
      .required()
      .messages({
        "string.base": `codePostal: '${codePostal}' should be a type of 'text'`,
        "string.empty": `codePostal: '${codePostal}' cannot be an empty field`,
        "string.min": `codePostal: '${codePostal}' should have a minimum length of {#limit}`,
        "string.max": `codePostal: '${codePostal}' should have a maximum length of {#limit}`,
        "any.required": `codePostal: '${codePostal}' is a required field`,
      }),
    limitResult: Joi.number()
      .min(1)
      .max(30)
      .required()
      .messages({
        "number.base": `limitResult: '${limitResult}' should be a type of 'number'`,
        "number.empty": `limitResult: '${limitResult}' cannot be an empty field`,
        "number.min": `limitResult: '${limitResult}' should have a minimum length of {#limit}`,
        "number.max": `limitResult: '${limitResult}' should have a maximum length of {#limit}`,
        "any.required": `limitResult: '${limitResult}' is a required field`,
      }),
  }).options({ abortEarly: false });

  const { error } = schema.validate({ pays, codePostal, limitResult });

  if (error) {
    const arrayError = error.details.map((value) => {
      return value.message;
    });
    return { status: false, messages: arrayError };
  }

  return { status: true };
};

export const isValideCreateTicket = ({
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
}: RelayCreateTicketType): { status: boolean; messages?: Array<string> } => {
  const patternISOCountry: RegExp = /^[A-Z]{2}$/;
  const patternAdress: RegExp = /^[0-9A-Z_'., -]{2,32}$/;
  const patternVille: RegExp = /^[A-Z_' -]{2,26}$/;
  const patternCp: RegExp = /^[0-9@]{1}[0-9]{4}$/;

  const schema = Joi.object({
    modeCol: Joi.string()
      .pattern(/^(CCC|CDR|CDS|REL)$/)
      .required()
      .messages({
        "string.base": `modeCol: '${modeCol}' should be a type of 'text'`,
        "string.empty": `modeCol: '${modeCol}' cannot be an empty field`,
        "any.required": `modeCol: '${modeCol}' is a required field`,
      }),
    modeLiv: Joi.string()
      .pattern(/^(LCC|24R|24L|HOM|LD1|LDS)$/)
      .required()
      .messages({
        "string.base": `modeLiv: '${modeLiv}' should be a type of 'text'`,
        "string.empty": `modeLiv: '${modeLiv}' cannot be an empty field`,
        "any.required": `modeLiv: '${modeLiv}' is a required field`,
      }),
    expeLangage: Joi.string()
      .pattern(patternISOCountry)
      .required()
      .messages({
        "string.base": `expeLangage: '${expeLangage}' should be a type of 'text'`,
        "string.empty": `expeLangage: '${expeLangage}' cannot be an empty field`,
        "any.required": `expeLangage: '${expeLangage}' is a required field`,
      }),
    expeAd1: Joi.string()
      .pattern(patternAdress)
      .required()
      .messages({
        "string.base": `expeAd1: '${expeAd1}' should be a type of 'text'`,
        "string.empty": `expeAd1: '${expeAd1}' cannot be an empty field`,
        "any.required": `expeAd1: '${expeAd1}' is a required field`,
      }),
    expeAd3: Joi.string()
      .pattern(patternAdress)
      .required()
      .messages({
        "string.base": `expeAd3: '${expeAd3}' should be a type of 'text'`,
        "string.empty": `expeAd3: '${expeAd3}' cannot be an empty field`,
        "any.required": `expeAd3: '${expeAd3}' is a required field`,
      }),
    expeVille: Joi.string()
      .pattern(patternVille)
      .required()
      .messages({
        "string.base": `expeVille: '${expeVille}' should be a type of 'text'`,
        "string.empty": `expeVille: '${expeVille}' cannot be an empty field`,
        "any.required": `expeVille: '${expeVille}' is a required field`,
      }),
    expeCP: Joi.string()
      .pattern(patternCp)
      .required()
      .messages({
        "string.base": ` expeCP: '${expeCP}' should be a type of 'text'`,
        "string.empty": ` expeCP: '${expeCP}' cannot be an empty field`,
        "any.required": ` expeCP: '${expeCP}' is a required field`,
      }),
    expePays: Joi.string()
      .pattern(patternISOCountry)
      .required()
      .messages({
        "string.base": ` expePays: '${expePays}' should be a type of 'text'`,
        "string.empty": ` expePays: '${expePays}' cannot be an empty field`,
        "any.required": ` expePays: '${expePays}' is a required field`,
      }),
    destLangage: Joi.string()
      .pattern(patternISOCountry)
      .required()
      .messages({
        "string.base": `  destLangage: '${destLangage}' should be a type of 'text'`,
        "string.empty": `  destLangage: '${destLangage}' cannot be an empty field`,
        "any.required": `  destLangage: '${destLangage}' is a required field`,
      }),
    destAd1: Joi.string()
      .pattern(patternAdress)
      .required()
      .messages({
        "string.base": `  destAd1: '${destAd1}' should be a type of 'text'`,
        "string.empty": `  destAd1: '${destAd1}' cannot be an empty field`,
        "any.required": `  destAd1: '${destAd1}' is a required field`,
      }),
    destAd3: Joi.string()
      .pattern(patternAdress)
      .required()
      .messages({
        "string.base": `  destAd3: '${destAd3}' should be a type of 'text'`,
        "string.empty": `  destAd3: '${destAd3}' cannot be an empty field`,
        "any.required": `  destAd3: '${destAd3}' is a required field`,
      }),
    destVille: Joi.string()
      .pattern(patternVille)
      .required()
      .messages({
        "string.base": `  destVille: '${destVille}' should be a type of 'text'`,
        "string.empty": `  destVille: '${destVille}' cannot be an empty field`,
        "any.required": `  destVille: '${destVille}' is a required field`,
      }),
    destCP: Joi.string()
      .pattern(patternCp)
      .required()
      .messages({
        "string.base": `  destCP: '${destCP}' should be a type of 'text'`,
        "string.empty": `  destCP: '${destCP}' cannot be an empty field`,
        "any.required": `  destCP: '${destCP}' is a required field`,
      }),
    destPays: Joi.string()
      .pattern(patternISOCountry)
      .required()
      .messages({
        "string.base": ` destPays: '${destPays}' should be a type of 'text'`,
        "string.empty": ` destPays: '${destPays}' cannot be an empty field`,
        "any.required": ` destPays: '${destPays}' is a required field`,
      }),
    poids: Joi.string()
      .pattern(/^[0-9]{2,7}\.?[0-9]{0,2}$/)
      .required()
      .messages({
        "string.base": `  poids: '${poids}' should be a type of 'text'`,
        "string.empty": `  poids: '${poids}' cannot be an empty field`,
        "any.required": `  poids: '${poids}' is a required field`,
      }),
    nbColis: Joi.string()
      .pattern(/^[0-9]{1,2}$/)
      .required()
      .messages({
        "string.base": `  nbColis: '${nbColis}' should be a type of 'text'`,
        "string.empty": `  nbColis: '${nbColis}' cannot be an empty field`,
        "any.required": `  nbColis: '${nbColis}' is a required field`,
      }),
  }).options({ abortEarly: false });

  const { error } = schema.validate({
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
  });

  if (error) {
    const arrayError = error.details.map((value) => {
      return value.message;
    });
    return { status: false, messages: arrayError };
  }
  return { status: true };
};

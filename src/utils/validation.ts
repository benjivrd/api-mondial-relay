import Joi from "joi";

export const isValideSearchRelayData = ({pays, codePostal, limitResult}): {status: boolean, messages?: Array<string>} => {
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

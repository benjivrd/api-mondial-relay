import crypto from "crypto";
import xml2js from "xml2js";

export const ObjectToString = (obj: Object) => {
   return Object.values(obj).reduce((prev, next) => {
        if(next !== null) {
          return prev.toString() + next.toString();
        }
        return prev.toString();
      });
}
export const dateFormat = (hourString: string) : string => {
  return hourString.slice(0, 2).padStart(2, '0') + "h" + hourString.slice(2, 4);
}

export const createMd5HashByObj = (obj:  object) :string => {

  const concatenateValues: string = ObjectToString(obj);
  return crypto
    .createHash("md5")
    .update(concatenateValues)
    .digest("hex")
    .toUpperCase();
}

export const xmlToJson = async (xml: string): Promise<{status: boolean, json?: any}> => {
  try {

    const parser = new xml2js.Parser({ explicitArray: false });
    const parsedResponse = await parser.parseStringPromise(xml);
    return { status: true, json: parsedResponse}

  } catch (error) {
    return { status: false }
  }
}
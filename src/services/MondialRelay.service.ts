import axios from "axios";

export class MondialRelayService {
    static async getPointRelay(data: string): Promise<{status: boolean, data?: any}>{
      try {
        const url: string = "https://api.mondialrelay.com/Web_Services.asmx";
        const action: string =
          "http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche";
    
        const config: object = {
          headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: action,
          },
        };
    
        const response = await axios.post(url, data, config);
        return { status: true, data: response.data}
      } catch (error) {
        console.log(error);
        return { status: false }
      }
    }

    static async createTicketRelay(data: string): Promise<{status: boolean, data?: any}>{
        try {
          const url: string = "https://api.mondialrelay.com/Web_Services.asmx";
          const action: string = "http://www.mondialrelay.fr/webservice/WSI2_CreationEtiquette";
      
          const config: object = {
            headers: {
              "Content-Type": "text/xml; charset=utf-8",
              SOAPAction: action,
            },
          };
      
          const response = await axios.post(url, data, config);
          return { status: true, data: response.data}
        } catch (error) {
          console.log(error);
          return { status: false }
        }
      }
}
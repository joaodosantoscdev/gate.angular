import { ContactResponse } from "../contact/contact-response.model";
import { PlaceResponse } from "../place/place-reponse.model";

export interface ResidentResponse {
  id: number;
  name: string;
  lastName: string;
  photoBase64: string,
  type: string;
  token: string;
  birthDate: string;
  documentNumber: string;
  contacts: ContactResponse[];
  places: PlaceResponse[];
}


import { AccessType } from "src/app/shared/enums/access-type.enum";
import { ContactResponse } from "../contact/contact-response.model";

export interface FastAccessRequest {
  name: string;
  lastName: string;
  birthDate: string;
  documentNumber: string;
  type: string;
  accessType: AccessType;
  placeId: number;
  unitId: number;
  photoBase64: string;
  contacts: ContactResponse[];
}

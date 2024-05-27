import { AccessType } from "src/app/shared/enums/access-type.enum";
import { ResidentResponse } from "../resident/resident-reponse.model";
import { PlaceResponse } from "../place/place-reponse.model";

export interface AccessResponse {
  id: number;
  date: string;
  accessType: AccessType;
  complexDescription: string;
  unitDescription: string;
  resident: ResidentResponse;
  place: PlaceResponse;
}

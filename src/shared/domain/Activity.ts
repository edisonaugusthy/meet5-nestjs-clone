import { Participant } from "./Participant";
import { Location } from "./Location";
export interface Activity {
  id: string;
  title: string;
  location: Location;
  dateTime: string;
  maxParticipants: number;
  currentParticipants: number;
  participants: Participant[];
  description?: string;
  organizer: Participant;
  imageUrl?: string;
}

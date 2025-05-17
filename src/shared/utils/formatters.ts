import { format, formatDistance } from "date-fns";
import { de } from "date-fns/locale";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "EEE, dd. MMM yyyy, HH:mm", { locale: de });
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return format(date, "dd.MM.", { locale: de });
}

export function formatTimeFromNow(dateString: string): string {
  const date = new Date(dateString);
  return formatDistance(date, new Date(), { addSuffix: true, locale: de });
}

export function formatLocation(location: {
  name: string;
  city: string;
}): string {
  return `${location.name}, ${location.city}`;
}

export function formatParticipantCount(current: number, max: number): string {
  return `${current} of ${max} joined`;
}

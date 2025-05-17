import { Activity } from "@/shared/domain/Activity";
import { TabType } from "@/shared/models/TabType";

const TOTAL_ACTIVITIES_COUNT = 30;

const ACTIVITY_TYPES = [
  "Walking Tour",
  "Coffee Meetup",
  "Book Club",
  "Board Game Night",
  "Wine Tasting",
  "Museum Visit",
  "Hiking Trip",
  "Dinner Gathering",
  "Photography Workshop",
  "Language Exchange",
  "Cooking Class",
  "Yoga Session",
  "Cycling Tour",
  "Movie Night",
  "Art Exhibition",
];

const LOCATIONS = [
  "Friedrichshafen",
  "Konstanz",
  "Meersburg",
  "Lindau",
  "Ravensburg",
  "Überlingen",
  "Kressbronn",
  "Tettnang",
  "Bregenz",
  "Immenstaad",
];

const TIME_DESCRIPTORS = [
  "Morning",
  "Afternoon",
  "Evening",
  "Weekend",
  "Sunset",
  "Midday",
  "Late Night",
];

const BASE_MOCK_ACTIVITIES: Activity[] = [
  {
    id: "1",
    title: "Lange Kultur und Museums Nacht in Wolfegg",
    location: {
      name: "Rathaus Wolfegg",
      address: "Am Hofgarten 1",
      city: "Wolfegg",
      postalCode: "88364",
      country: "Deutschland",
      coordinates: {
        lat: 47.8289,
        lng: 9.7978,
      },
    },
    dateTime: "2025-05-16T18:00:00.000Z",
    maxParticipants: 10,
    currentParticipants: 5,
    participants: [
      {
        id: "101",
        name: "Markus H.",
        avatarUrl: "/images/avatar-placeholders/avatar1.jpg",
        joined: true,
      },
      {
        id: "102",
        name: "Anna K.",
        avatarUrl: "/images/avatar-placeholders/avatar2.jpg",
        joined: true,
      },
      {
        id: "103",
        name: "Thomas S.",
        avatarUrl: "/images/avatar-placeholders/avatar3.jpg",
        joined: true,
      },
      {
        id: "104",
        name: "Sophie L.",
        avatarUrl: "/images/avatar-placeholders/avatar1.jpg",
        joined: true,
      },
      {
        id: "105",
        name: "Jan B.",
        avatarUrl: "/images/avatar-placeholders/avatar2.jpg",
        joined: true,
      },
    ],
    organizer: {
      id: "101",
      name: "Markus H.",
      avatarUrl: "/images/avatar-placeholders/avatar1.jpg",
      joined: true,
    },
    description:
      "Wir treffen uns vor dem Rathaus in Wolfegg, wo um 18:00 die lange Kultur und Museums Nacht beginnt.",
  },
];

function generateRandomTitle(): string {
  const activityType =
    ACTIVITY_TYPES[Math.floor(Math.random() * ACTIVITY_TYPES.length)];
  const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
  const timeDescriptor =
    TIME_DESCRIPTORS[Math.floor(Math.random() * TIME_DESCRIPTORS.length)];

  const titlePattern = Math.floor(Math.random() * 5);

  switch (titlePattern) {
    case 0:
      return `${activityType} in ${location}`;
    case 1:
      return `${timeDescriptor} ${activityType}`;
    case 2:
      return `${location} ${activityType} - ${timeDescriptor}`;
    case 3:
      return `${timeDescriptor} ${activityType} at ${location}`;
    case 4:
    default:
      return `${activityType}: Exploring ${location}`;
  }
}
const generateMoreActivities = (
  baseActivities: Activity[],
  totalCount: number
): Activity[] => {
  const result: Activity[] = [...baseActivities];
  let lastId = Math.max(...baseActivities.map((a) => parseInt(a.id)));

  while (result.length < totalCount) {
    for (const baseActivity of baseActivities) {
      if (result.length >= totalCount) break;
      lastId++;
      const newId = lastId.toString();
      const newActivity: Activity = structuredClone(baseActivity);
      newActivity.id = newId;
      newActivity.title = generateRandomTitle();

      const originalDate = new Date(baseActivity.dateTime);
      const newDate = new Date(originalDate);
      newDate.setDate(originalDate.getDate() + (lastId % 30));
      newActivity.dateTime = newDate.toISOString();
      const randomParticipantCount = Math.max(
        1,
        Math.floor(Math.random() * newActivity.maxParticipants)
      );
      newActivity.currentParticipants = randomParticipantCount;
      newActivity.participants = newActivity.participants.slice(
        0,
        randomParticipantCount
      );
      const cityFromTitle = LOCATIONS.find((loc) =>
        newActivity.title.includes(loc)
      );

      if (cityFromTitle) {
        newActivity.location.city = cityFromTitle;
      }

      result.push(newActivity);
    }
  }

  return result;
};

const MOCK_ACTIVITIES = generateMoreActivities(
  BASE_MOCK_ACTIVITIES,
  TOTAL_ACTIVITIES_COUNT
);

export async function getActivities(tab: TabType): Promise<Activity[]> {
  switch (tab) {
    case TabType.Invitations:
      return MOCK_ACTIVITIES.filter((_, index) => index % 3 === 0);
    case TabType.MyActivities:
      return MOCK_ACTIVITIES;
    case TabType.Favorites:
      return MOCK_ACTIVITIES.filter((_, index) => index % 2 === 0);
    default:
      return MOCK_ACTIVITIES;
  }
}

export async function getActivityById(id: string): Promise<Activity | null> {
  return MOCK_ACTIVITIES.find((activity) => activity.id === id) || null;
}

export function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr);
  return date.toLocaleString("de-DE", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

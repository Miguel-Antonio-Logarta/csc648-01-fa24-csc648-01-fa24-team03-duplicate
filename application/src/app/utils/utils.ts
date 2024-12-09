import { LocationType } from "@prisma/client";

export const convertTo12HourFormat = (time: string) => {
  if (time.length === 0) return 'CLOSED';
  const [hour, minute] = time.split(':');
  let hourNum = parseInt(hour);
  const ampm = hourNum >= 12 ? 'PM' : 'AM';
  hourNum = hourNum % 12 || 12; // Convert 0 to 12 for midnight
  return `${hourNum}:${minute} ${ampm}`;
};

export function formatCategory(category: LocationType): string {
  // Just in case we want to show a different name than the enum. 
  switch (category) {
    case "CAFE":
      return "Cafe";
    case "LIBRARY":
      return "Library";
    case "PARK":
      return "Park";
    default:
      return "Third Place"
  }
}

// this function is stupid, but it works ig
/**
 * MONDAY = 1 --> 0
 * TUESDAY = 2 --> 1
 * WEDNESDAY = 3 --> 2
 * THURSDAY = 4 --> 3
 * FRIDAY = 5 --> 6
 * SATURDAY = 6 --> 5
 * SUNDAY = 0 --> 6
 */
export function convertDay(input: number) {
  if (input >= 1 && input <= 4) {
    return input - 1;
  } else if (input === 5) {
    return 6;
  } else if (input === 6) {
    return 5;
  } else if (input === 0) {
    return 6;
  }
}

export function getCategoryColors(category: LocationType) {
  switch (category) {
    case "LIBRARY":
      return ({
        background: "bg-lavender-blush", // #FFE7EC 
        border: "border-cherry-blossom-pink", // #F4A4B1
        categoryBackground: "bg-cherry-blossom-pink", // #F4A4B1
        hover: "hover:bg-pink-hover" // #FAC6CF
      });
    case "CAFE":
      return ({
        background: "bg-tea-green", // #D1DAAF
        border: "border-olivine", // #BBC887
        categoryBackground: "bg-olivine", // #BBC887
        hover: "hover:bg-tea-green-hover" // #C6D19B
      });
    case "PARK":
      return ({
        background: "bg-columbia-blue", // #C6E2FF
        border: "border-jordy-blue", // "#85c0ff"
        categoryBackground: "bg-jordy-blue", // "#85c0ff"
        hover: "hover:bg-sky-blue" // #A6D1FF
      });
    default:
      console.log(`${category} is not a valid category`)
      return ({
        background: "bg-white",
        border: "border-black",
        categoryBackground: "bg-black text-white",
        hover: ""
      });
  }
}

export const getBusynessStatus = (busyness: number): string => {
  // Values go from 0 to 5
  if (busyness >= 0 && busyness < 1) {
    return "Not busy"
  } else if (busyness < 2) {
    return "A little busy"
  } else if (busyness < 3) {
    return "Somewhat busy"
  } else if (busyness < 4) {
    return "Busy"
  } else if (busyness < 5) {
    return "As busy as it gets"
  } else {
    return "Busyness: N/A"
  }
}
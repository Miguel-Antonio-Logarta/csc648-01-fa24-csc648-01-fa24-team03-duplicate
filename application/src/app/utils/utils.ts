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
        background: "bg-lavender-blush",
        border: "border-cherry-blossom-pink",
        categoryBackground: "bg-cherry-blossom-pink",
        hover: ""
      });
    case "CAFE":
      return ({
        background: "bg-tea-green",
        border: "border-olivine",
        categoryBackground: "bg-olivine",
        hover: ""
      });
    case "PARK":
      return ({
        background: "bg-columbia-blue",
        border: "border-jordy-blue",
        categoryBackground: "bg-jordy-blue",
        hover: ""
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
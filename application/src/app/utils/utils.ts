import { LocationType } from "@prisma/client";

export const convertTo12HourFormat = (time: string) => {
    if(time.length === 0) return 'CLOSED';
    const [hour, minute] = time.split(':');
    let hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    hourNum = hourNum % 12 || 12; // Convert 0 to 12 for midnight
    return `${hourNum}:${minute} ${ampm}`;
};

export function formatCategory(category: LocationType): string {
    // Just in case we want to show a different name than the enum. 
    switch(category) {
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
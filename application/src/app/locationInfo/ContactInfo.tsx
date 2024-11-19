import React from 'react';
import { DayOfWeek } from "@prisma/client";
import { convertDay, convertTo12HourFormat } from '../utils/utils';

interface Location {
  address: string;
  phoneNumber: string;
  operatingHours: OperatingHour[];
}

interface OperatingHour {
  day: DayOfWeek;
  openTime: string;
  closeTime: string;
}

interface LocationPageProps {
  location: Location;
}

function ContactInfo({ location: { address, phoneNumber, operatingHours } }: LocationPageProps) {
  
  // stupid code
  let range;
  const currentDayIndex = convertDay(new Date().getDay());
  if (currentDayIndex !== undefined && currentDayIndex < operatingHours.length) {
    range = operatingHours[currentDayIndex];
  }
  
  return (
    <address className="grow shrink self-stretch text-base tracking-widest leading-5 text-stone-600 w-[269px] not-italic">
      <span className="text-stone-600">{address}</span>
      <br />
      <a href="https://www.google.com/search?sca_esv=d0f66aa95515e8fe&sxsrf=ADLYWILB9KLq5xT5IIGvzSItV04hR-ktDA:1729105734314&q=j.+paul+leonard+library+hours&ludocid=9418746274217317569&sa=X&ved=2ahUKEwilosrozJOJAxVfJjQIHaZtC30Q6BN6BAgkEAI" className="underline text-stone-600" target="_blank" rel="noopener noreferrer">
        Hours
      </a>
      <span className="text-stone-600">: {range ? `${convertTo12HourFormat(range.openTime)} - ${convertTo12HourFormat(range.closeTime)}` : 'Closed'}</span>
      <br />
      <span className="text-stone-600">Phone: </span>
      <a href="tel:+14153381854" className="underline text-stone-600">
        {phoneNumber}
      </a>
    </address>
  );
}

export default ContactInfo;
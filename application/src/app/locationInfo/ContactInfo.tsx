import React from 'react';

function ContactInfo() {
  return (
    <address className="grow shrink self-stretch text-base tracking-widest leading-5 text-stone-600 w-[269px] not-italic">
      <span className="text-stone-600">1630 Holloway Ave, San Francisco, CA 94132</span>
      <br />
      <a href="https://www.google.com/search?sca_esv=d0f66aa95515e8fe&sxsrf=ADLYWILB9KLq5xT5IIGvzSItV04hR-ktDA:1729105734314&q=j.+paul+leonard+library+hours&ludocid=9418746274217317569&sa=X&ved=2ahUKEwilosrozJOJAxVfJjQIHaZtC30Q6BN6BAgkEAI" className="underline text-stone-600" target="_blank" rel="noopener noreferrer">
        Hours
      </a>
      <span className="text-stone-600">: Opens 12 PM ⋅ Closes 11 PM</span>
      <br />
      <span className="text-stone-600">Phone: </span>
      <a href="tel:+14153381854" className="underline text-stone-600">
        (415) 338-1854
      </a>
    </address>
  );
}

export default ContactInfo;
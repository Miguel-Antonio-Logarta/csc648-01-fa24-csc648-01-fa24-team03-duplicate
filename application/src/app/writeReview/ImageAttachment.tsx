import React from 'react';
import Image from 'next/image';
import PaperClip from './paperclip.svg';

function ImageAttachment() {
  return (
    <div className="font-josefin flex gap-3.5 p-smed mt-large">
      <Image src={PaperClip} alt='paperclip' ></Image>
      {/* <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/38033a50bcb46ccd478e8776f563ea334b1310d5e9faa18ab183445583b48f62?apiKey=dae5425d3b3c4cdc84ccb32ea9568225&" alt="" className="object-contain shrink-0 w-8 aspect-square" /> */}
      <label htmlFor="imageUpload" className="my-auto basis-auto cursor-pointer">
        Attach Images
      </label>
      <input
        type="file"
        id="imageUpload"
        accept="image/*"
        multiple
        className="sr-only"
        aria-label="Attach Images"
      />
    </div>
  );
}

export default ImageAttachment;
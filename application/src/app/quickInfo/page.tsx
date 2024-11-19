import React from "react";
import Image from "next/image";
import Star from "./star.svg";
import Icons from "./temp_icon_group.svg";

function LibraryPage() {
    const features = [
        "stable wifi",
        "high noise level",
        "highly busy",
        "outlets available"
      ];

    return (
      <main className="mx-auto border-rose-300 border-solid bg-[rgb(255,250,228)] border-[3px] w-[650px] rounded-[50px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-600 max-md:px-5">
        <div className="flex overflow-hidden flex-col gap-[10px] items-start mx-auto m-[30px] text-xl font-bold">
          <h1 className="font-shantell z-10 mx-auto max-w-full text-4xl font-extrabold text-center text-rose-500 bg-rose-300 rounded-[20px] border-rose-400 border-dashed border-[3px] tracking-[3.38px] w-[370px] max-md:px-5">
          J. Paul Lenard Library
          </h1>
          <section className="flex gap-[2px] mx-auto mt-8">
            <Image src={Star} alt="empty star icon"/>
            <Image src={Star} alt="empty star icon"/>
            <Image src={Star} alt="empty star icon"/>
            <Image src={Star} alt="empty star icon"/>
            <Image src={Star} alt="empty star icon"/>
            <div className="flex gap-[100px] mt-2 text-stone-600">
              <div className="self-end text-2xl pl-[10px] tracking-[2.4px]">2</div>
              <div className="font-josefin text-base self-center tracking-widest text-right">
                University Library
              </div>
            </div>
          </section>
          <section className="self-stretch mt-[15px]">
              <div className="flex flex-row gap-3 justify-center">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex flex-row">
                    <div className="flex gap-3 shrink-0 mx-auto rounded-[10px] bg-neutral-400 h-[135px] w-[146px]" />
                  </div>
                ))}
              </div>
          </section>
          <section className="w-full ml-[90px]">
              <h2 className="font-josefin mt-[10px] mb-[10px] text-base font-bold tracking-widest text-stone-600">
                Highlighted Features
              </h2>
              <div className="flex gap-5 max-md:flex-col">
                <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                  <div className="flex gap-2.5 text-base tracking-widest text-stone-600 max-md:mt-10">
                    <Image src={Icons} alt='placeholder icons'/>
                    <ul className="font-josefin flex flex-col pl-[10px] my-auto">
                      {features.map((feature, index) => (
                        <li key={index} className={index > 0 ? "mt-2" : ""}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
          </section>
              <button className="font-shantell self-end mr-[25px] w-[170px] h-[60px] text-xl font-bold text-center text-white bg-blue-200 shadow-sm rounded-[100px] tracking-[2px]">
                  learn more!
              </button>
        </div>
      </main>
    );
  }
  
  export default LibraryPage;
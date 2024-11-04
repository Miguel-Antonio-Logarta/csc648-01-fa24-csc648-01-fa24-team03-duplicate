import React from "react";
import Image from "next/image";
import ReviewSection from "./ReviewSection";
import Star from './white_star.svg';
import Icons from "./temp_icon_group.svg";
import ContactInfo from "./ContactInfo";
import Paper from "./paper_bg.svg";
import Logo from './logo.png';
import Back from './back_arrow.png';
import Graph from './sample_graph.png';
import Navbar from "../components/Navbar";

function InformationPage() {

    const features = [
        "stable wifi",
        "high noise level",
        "highly busy",
        "outlets available"
      ];

    return (
        <main>
          <Navbar/>
            <div className="grid grid-cols-2">
                {/*left column */}
                <div className="flex relative flex-col px-10 pt-3 w-[610px] rounded-3xl min-h-[853px] max-md:px-5 max-md:max-w-full">
                    <a href="/search" >
                        <Image src={Back} alt="back arrow" className="size-[32px]"/>
                    </a>
                    <div 
                          className="relative flex flex-col px-20 pt-14 mt-5 w-[660px] rounded-3xl min-h-[853px] max-md:px-5 max-md:max-w-full"
                          style={{
                            backgroundImage: `url(${Paper.src})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                          }}
                        >
                        <div className="max-md:mr-1 max-md:max-w-full">
                          <div className="flex gap-5 flex-col">
                            <section className="grid grid-flow-col">
                              <div className="grid grid-cols-2 gap-4 text-xl font-bold whitespace-nowrap text-stone-600 tracking-[2px] max-md:mt-9">
                                {/* column 1 */}
                                <div>
                                    <h2 className="text-xl self-start pt-4">Images</h2>
                                    <div className="mt-6 rounded-[10px] bg-neutral-400 h-[200px]" role="img" aria-label="Cafe image 1"></div>
                                    <div className="mt-7 rounded-[10px] bg-neutral-400 h-[200px]" role="img" aria-label="Cafe image 2"></div>
                                </div>
                                {/* column 2 */}
                                <div className="self-center">
                                    <div className="rounded-[10px] bg-neutral-400 h-[200px]" role="img" aria-label="Cafe image 3"></div>
                                </div>
                              </div>
                            </section>
                            {/* <ReviewSection /> */}
                          </div>
                        </div>
                    </div>
                </div>
                {/*right column */}
                <div className="flex flex-col mt-32 w-full max-md:mt-10 max-md:max-w-full">
                    <header className="flex flex-wrap gap-10 mr-7 text-stone-600 max-md:mr-2.5 max-md:max-w-full">
                        <h1 className="grow shrink text-4xl font-extrabold border border-white border-solid tracking-[3.6px] w-[470px] max-md:max-w-full">
                          J. Paul Lenard Library
                        </h1>
                        <div className="grow shrink self-end mt-7 text-base tracking-widest text-right w-[123px]">
                          University Library
                        </div>
                    </header>
                    <section className="flex gap-7 items-start mt-16 mr-7 max-md:mt-10 max-md:mr-2.5">
                        {/* <ContactInfo /> */}
                        <button className="flex gap-3.5 px-4 py-4 text-lg tracking-widest text-center bg-sage rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-50">Save</button>
                        <button className="flex gap-3.5 px-4 py-4 text-lg tracking-widest text-center bg-blue-200 rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-50">
                            <Image src={Star} alt="clear star"/>
                            <a href='/writeReview' className="my-auto basis-auto">Write a Review!</a>
                        </button>
                    </section>
                    <section className="mt-20 mr-7 max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
                      <div className="flex gap-5 max-md:flex-col">
                        <section className="w-full max-md:max-w-full">
                            <h2 className="mt-[10px] mb-[10px] text-base font-bold tracking-widest text-stone-600 max-md:ml-1.5">
                              Highlighted Features
                            </h2>
                            <div className="flex gap-5 max-md:flex-col">
                              <div className="flex flex-col w-6/12 max-md:ml-0">
                                <div className="flex gap-2.5 text-base tracking-widest text-stone-600 max-md:mt-10">
                                  <Image src={Icons} alt='placeholder icons'/>
                                  <ul className="flex flex-col pl-[10px]">
                                    {features.map((feature, index) => (
                                      <li key={index} className={index > 0 ? "mt-2" : ""}>{feature}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                        </section>
                        <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                            <div className="flex flex-col mx-auto m-4 justify-center rounded-[10px] bg-sage text-stone-600 h-[157px] w-[362px] shadow-[0px_2px_4px_rgba(0,0,0,0.25)]">
                                <Image src={Graph} alt="sample ocupancy graph" className="h-[117px] w-[361px]"/>
                            </div>
                        </div>
                      </div>
                    </section>
                    <Image src={Logo} alt='logo' className="h-[133px] w-[266px] self-end" />
                </div>
            </div>
        </main>
    );
} 

export default InformationPage;
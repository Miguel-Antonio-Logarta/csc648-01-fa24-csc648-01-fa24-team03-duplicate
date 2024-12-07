import React from "react";
import Image from "next/image";
import ReviewSection from "../ReviewSection";
import Star from '../white_star.svg';
import ContactInfo from "../ContactInfo";
import Paper from "../paper_bg.svg";
import Logo from '../logo.png';
import Back from '../back_arrow.png';
import Navbar from "../../components/Navbar";
import Link from "next/link";
import BookmarkButton from "@/app/components/BookmarkButton";
import BusyRating from "@/app/components/BusyRating";
import BusynessIndicator from "@/app/components/BusynessIndictator";

const Page = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const locationResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations/${id}`, {
        cache: "no-store"
    }
    );

    const reviewsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews/locationReviews/${id}`,
        { cache: "no-store" }
    );

    const location = await locationResponse.json();
    const reviews = await reviewsResponse.json();

    // console.log("[INFO]: Location Details: ", location);
    // console.log("[INFO]: Reviews: ", reviews);

    return (
        <main>
            <Navbar />
            <div className="grid grid-cols-2">
                {/*left column */}
                <div className="flex relative flex-col px-10 pt-3 w-[610px] rounded-3xl min-h-[853px] max-md:px-5 max-md:max-w-full">
                    <a href="/search" >
                        <Image src={Back} alt="back arrow" className="size-[32px]" />
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
                                    <Image
                                        src={location.imageWebLink}
                                        width={512}
                                        height={512}
                                        alt="Location Image"
                                        className="border-8 border-cherry-blossom-pink rounded-lg"
                                    />
                                </section>
                                <ReviewSection reviews={reviews} />
                            </div>
                        </div>
                    </div>
                </div>
                {/*right column */}
                <div className="flex flex-col mt-32 w-full max-md:mt-10 max-md:max-w-full">
                    <header className="flex flex-wrap gap-10 mr-7 text-stone-600 max-md:mr-2.5 max-md:max-w-full">
                        <h1 className="grow shrink text-4xl font-extrabold border border-white border-solid tracking-[3.6px] w-[470px] max-md:max-w-full">
                            {location.name}
                        </h1>
                        <div className="grow shrink self-end mt-7 text-base tracking-widest text-right w-[123px]">
                            {location.category}
                        </div>
                    </header>
                    <section className="flex gap-7 items-start mt-16 mr-7 max-md:mt-10 max-md:mr-2.5">
                        <ContactInfo location={location} />
                        {/* <button className="flex gap-3.5 px-4 py-4 text-lg tracking-widest text-center bg-sage rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-50">Save</button> */}
                        <BookmarkButton locationId={id} />
                        <Link href={`/writeReview/${id}`}>
                            <button className="flex gap-3.5 px-4 py-4 text-lg tracking-widest text-center bg-blue-200 rounded-[100px] shadow-[0px_4px_4px_rgba(0,0,0,0.25)] text-stone-50">
                                <Image src={Star} alt="clear star" />
                                Write a Review!
                            </button>
                        </Link>
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
                                            {/* <Image src={Icons} alt='placeholder icons' /> */}

                                            {/* Should be a scalable component, but ¯\_(ツ)_/¯ */}
                                            <ul className="flex flex-col pl-[10px]">
                                                <li>
                                                    {location.hasWifi && (
                                                        <div className="flex items-center gap-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    d="M6.01129 12.1871C9.31912 8.97669 14.6822 8.97669 17.99 12.1871M9.00596 15.0935C10.6599 13.4883 13.3414 13.4883 14.9953 15.0935M12.0006 18L12.0182 17.983M3 9.61811C7.97056 4.79396 16.0294 4.79396 21 9.61811"
                                                                    stroke="#715E50"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                            <span className="text-sm font-medium text-gray-700">
                                                                Free Wi-Fi available
                                                            </span>
                                                        </div>
                                                    )}
                                                </li>

                                                <li>
                                                    {location.animalFriendliness && (
                                                        <div className="flex items-center gap-2">
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                className="w-6 h-6"
                                                            >
                                                                <path
                                                                    d="M12 12C13.5 12 15.3 13.5 15.3 15.5C15.3 17.5 13.5 19 12 19C10.5 19 8.7 17.5 8.7 15.5C8.7 13.5 10.5 12 12 12ZM4.5 6C5.3 6 6.5 7.5 6.5 9C6.5 10.5 5.3 12 4.5 12C3.7 12 2.5 10.5 2.5 9C2.5 7.5 3.7 6 4.5 6ZM19.5 6C20.3 6 21.5 7.5 21.5 9C21.5 10.5 20.3 12 19.5 12C18.7 12 17.5 10.5 17.5 9C17.5 7.5 18.7 6 19.5 6ZM6 18C7 18 8.5 19.5 8.5 21C8.5 22.5 7 24 6 24C5 24 3.5 22.5 3.5 21C3.5 19.5 5 18 6 18ZM18 18C19 18 20.5 19.5 20.5 21C20.5 22.5 19 24 18 24C17 24 15.5 22.5 15.5 21C15.5 19.5 17 18 18 18Z"
                                                                    stroke="#715E50"
                                                                    strokeWidth="2"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>

                                                            <span className="text-sm font-medium text-gray-700">
                                                                Animal-friendly environment
                                                            </span>
                                                        </div>
                                                    )}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="flex flex-col ml-5 w-[67%] max-md:ml-0 max-md:w-full">
                                <div className="flex flex-col mx-auto m-4 justify-center items-center rounded-[10px] bg-sage text-stone-600 h-[157px] w-[362px] shadow-[0px_2px_4px_rgba(0,0,0,0.25)] p-4 space-y-4">
                                    {/* Title */}
                                    <div className="text-lg font-semibold text-center text-stone-700">Average Busyness</div>
                                    {/* Busy Rating */}
                                    <div className="flex justify-center items-center">
                                        <BusyRating busynessStatus={location.busynessStatus} size={32} style="full" />
                                    </div>

                                    <div>
                                        <BusynessIndicator busynessStatus={location.busynessStatus} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <Image src={Logo} alt='logo' className="h-[133px] w-[266px] self-end" />
                </div>
            </div>
        </main>
    );
};

export default Page;
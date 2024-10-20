import { convertTo12HourFormat } from "../utils/utils";
import { DayOfWeek, LocationType } from "@prisma/client";

/**
 * NOTE: THIS FILE AND FOLDER IS FOR THE VERTICAL PROTOTYPE ONLY, AND WILL BE REMOVED IN THE FINAL PRODUCT.
 * USE THIS AS A REFERENCE FOR HOW TO FETCH DATA FROM THE API AND DISPLAY IT ON A PAGE.
 */


// defining data we expect from the backend.
// should probably exist in its own file, but this will do for now.
interface Location {
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
    hasWifi: boolean;
    seatingCapacity: number;
    category: LocationType;
    rating: number;
    busynessStatus: number;
    imageWebLink: string;
    locationWebsiteLink: string;
    animalFriendliness: boolean;
    operatingHours: OperatingHour[];
}

interface OperatingHour {
    day: DayOfWeek;
    openTime: string;
    closeTime: string;
}

interface User {
    id: string;
    username: string;
    email: string;
    creationDate: string;
}

interface Review {
    id: string;
    rating: number;
    content: string;
    creationDate: string;
}

interface Bookmark {
    id: string;
    user: User;
    creationDate: string;
}


const Page = async () => {

    // example of how to fetch data from the API
    // in production YOU MUST DEFINE NEXT_PUBLIC_API_URL in your .env configuration for VERCEL
    const locationsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`);
    const usersResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
    const reviewsResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`);
    const bookmarksResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookmarks`);

    // we should handle errors here
    // what we could do is make an error page component and show it if we cannot fetch data.
    if (!locationsResponse.ok) {
        console.error('Error fetching locations:', locationsResponse.statusText);
    }
    if (!usersResponse.ok) {
        console.error('Error fetching users:', usersResponse.statusText);
    }
    if (!reviewsResponse.ok) {
        console.error('Error fetching reviews:', reviewsResponse.statusText);
    }
    if (!bookmarksResponse.ok) {
        console.error('Error fetching bookmarks:', bookmarksResponse.statusText);
    }

    // YOU MUST CONVERT THE RESPONSE TO JSON
    const locations = await locationsResponse.json();
    const users = await usersResponse.json();
    const reviews = await reviewsResponse.json();
    const bookmarks = await bookmarksResponse.json();

    return (
        <div>
            <h1 className="justify-self-center">Prototype Database Check</h1>

            <div className="grid grid-cols-4 gap-4">
                {/* Locations Column */}
                <div>
                    <h2 className="font-semibold">Locations</h2>
                    <ul className="space-y-4">
                        {locations.map((location: Location) => (
                            <li key={location.id} className="p-4 border border-gray-600 rounded-lg shadow-md bg-black text-white">
                                <p className="font-bold text-lg mb-2">Name: {location.name}</p>
                                <div className="text-gray-300">
                                    <p className="mb-1"><span className="font-semibold">Address:</span> {location.address}</p>
                                    <p className="mb-1"><span className="font-semibold">Phone Number:</span> {location.phoneNumber}</p>
                                    <p className="mb-1"><span className="font-semibold">Has Wifi:</span> {location.hasWifi ? 'Yes' : 'No'}</p>
                                    <p className="mb-1"><span className="font-semibold">Seating Capacity:</span> {location.seatingCapacity}</p>
                                    <p className="mb-1"><span className="font-semibold">Category:</span> {location.category}</p>
                                    <p className="mb-1"><span className="font-semibold">Rating:</span> {location.rating}</p>
                                    <p className="mb-1"><span className="font-semibold">Busyness Status:</span> {location.busynessStatus}</p>
                                    <p className="mb-1">
                                        <span className="font-semibold">Image Web Link:</span>
                                        {location.imageWebLink ? <a href={location.imageWebLink} className="text-blue-400 underline">{location.imageWebLink}</a> : 'N/A'}
                                    </p>
                                    <p className="mb-1">
                                        <span className="font-semibold">Location Website Link:</span>
                                        <a href={location.locationWebsiteLink} className="text-blue-400 underline">{location.locationWebsiteLink}</a>
                                    </p>
                                    <p className="mb-1"><span className="font-semibold">Animal Friendliness:</span> {location.animalFriendliness ? 'Yes' : 'No'}</p>

                                    {/* Operating Hours Section */}
                                    <div className="mt-4">
                                        <p className="font-semibold">Operating Hours:</p>
                                        <ul className="list-inside list-disc ml-4 text-sm text-gray-400">
                                            {location.operatingHours.map((operatingHour: OperatingHour) => (
                                                <li key={operatingHour.day} className="mt-2">
                                                    <p className="mb-1">Day: {DayOfWeek[operatingHour.day]}</p>
                                                    {/* convert 24 hour time to 12 hour time */}
                                                    <p className="mb-1">Open: {convertTo12HourFormat(operatingHour.openTime)}</p>
                                                    <p className="mb-1">Close: {convertTo12HourFormat(operatingHour.closeTime)}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>

                {/* Users Column */}
                <div>
                    <h2 className="font-semibold">Users</h2>
                    <ul className="space-y-4">
                        {users.map((user: User) => (
                            <li key={user.id} className="p-4 border border-gray-600 rounded-lg shadow-md bg-black text-white">
                                <p className="font-bold text-lg mb-2">Username: {user.username}</p>
                                <div className="text-gray-300">
                                    <p className="mb-1"><span className="font-semibold">Email:</span> {user.email}</p>
                                    <p className="mb-1">
                                        <span className="font-semibold">Creation Date:</span> {new Date(user.creationDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>

                </div>

                {/* Reviews Column */}
                <div>
                    <h2 className="font-semibold">Reviews</h2>
                    <ul className="space-y-4">
                        {reviews.map((review: Review) => (
                            <li key={review.id} className="p-4 border border-gray-600 rounded-lg shadow-md bg-black text-white">
                                <p className="mb-1">Rating: {review.rating}</p>
                                <p className="mb-1">Content: {review.content}</p>
                                <p className="mb-1">Creation Date: {new Date(review.creationDate).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bookmarks Column */}
                <div>
                    <h2 className="font-semibold">Bookmarks</h2>
                    <ul className="space-y-4">
                        {bookmarks.map((bookmark: Bookmark) => (
                            <li key={bookmark.id} className="p-4 border border-gray-600 rounded-lg shadow-md bg-black text-white">
                                <p className="mb-1">User: {bookmark.user.username}</p>
                                <p className="mb-1">Creation Date: {new Date(bookmark.creationDate).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Page;
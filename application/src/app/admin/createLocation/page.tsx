'use client';
import { useState, useRef } from 'react';
import { DayOfWeek } from '@prisma/client';
import { useSession } from 'next-auth/react';
import useCreateLocation from '../../hooks/useCreateLocation';
import Unauthorized from '../../components/Unauthorized';
import type { PutBlobResult } from '@vercel/blob';
import Image from 'next/image';
import toast from 'react-hot-toast';

const Page = () => {
    const { data: session, status } = useSession();
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [locationImage, setLocationImage] = useState<string | null>(null);
    const [blob, setBlob] = useState<PutBlobResult | null>(null);
    const { createLocation, loading } = useCreateLocation();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        hasWifi: false,
        seatingCapacity: 0,
        category: '',
        animalFriendliness: false,
        locationWebsiteLink: '',
        imageWebLink: '',
        latitude: 0,
        longitude: 0,
        operatingHours: [
            { day: DayOfWeek.MONDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.TUESDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.WEDNESDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.THURSDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.FRIDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.SATURDAY, openTime: '', closeTime: '' },
            { day: DayOfWeek.SUNDAY, openTime: '', closeTime: '' }
        ]
    });

    const handleImageUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!inputFileRef.current?.files) throw new Error('No files selected');
            const file = inputFileRef.current.files[0];
            const response = await fetch(
                `/api/upload?filename=${file.name}`,
                {
                    method: 'POST',
                    body: file,
                },
            );
            const newBlob = (await response.json()) as PutBlobResult;
            setBlob(newBlob);
            setLocationImage(newBlob.url);
            toast.success('Image uploaded successfully');
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        formData.seatingCapacity = Number(formData.seatingCapacity);
        if (!locationImage || locationImage.length === 0) {
            toast.error('Please upload an image');
            return;
        }
        formData.imageWebLink = locationImage;
        await createLocation(formData, session);
    }

    // show nothing if loading for now
    if (status === 'loading') return;

    // show Unauthorized if not authenticated or not an admin
    if (status === 'unauthenticated' || session?.user.role !== 'ADMIN') {
        return <Unauthorized />;
    }

    return (
        <div className="p-8 flex items-center justify-center min-h-screen" style={{ background: 'linear-gradient(to right, #FCE0D3, #E89CA8)' }}>
            <form
                onSubmit={handleSubmit}
                className="space-y-6 p-8 bg-white shadow-lg rounded-lg max-w-lg w-full"
                autoComplete='off'
            >
                <h2 className="text-3xl font-bold text-center text-gray-800">Create Location Form</h2>

                <div className="space-y-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div className="space-y-4">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address:</label>
                    <input
                        type="text"
                        id="address"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>

                <div className="space-y-4">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                </div>

                <div className="space-y-4 flex items-center">
                    <label htmlFor="hasWifi" className="block text-sm font-medium text-gray-700">Has Wifi:</label>
                    <input
                        type="checkbox"
                        id="hasWifi"
                        className="ml-2 form-checkbox h-5 w-5 text-blue-600 transition duration-200"
                        checked={formData.hasWifi}
                        onChange={(e) => setFormData({ ...formData, hasWifi: e.target.checked })}
                    />
                </div>

                <div className="space-y-4">
                    <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-700">Seating Capacity:</label>
                    <input
                        type="text"
                        id="seatingCapacity"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={formData.seatingCapacity}
                        onChange={(e) => setFormData({ ...formData, seatingCapacity: Number(e.target.value) })}
                    />
                </div>

                <div className="space-y-4">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
                    <select
                        id="category"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value="">Select a category</option>
                        <option value="LIBRARY">Library</option>
                        <option value="CAFE">Cafe</option>
                        <option value="PARK">Park</option>
                    </select>
                </div>

                <div className="space-y-4 flex items-center">
                    <label htmlFor="animalFriendliness" className="block text-sm font-medium text-gray-700">Animal Friendliness:</label>
                    <input
                        type="checkbox"
                        id="animalFriendliness"
                        className="ml-2 form-checkbox h-5 w-5 text-blue-600 transition duration-200"
                        checked={formData.animalFriendliness}
                        onChange={(e) => setFormData({ ...formData, animalFriendliness: e.target.checked })}
                    />
                </div>

                <div className="space-y-4">
                    <label htmlFor="locationWebsiteLink" className="block text-sm font-medium text-gray-700">Location Website Link:</label>
                    <input
                        type="text"
                        id="locationWebsiteLink"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={formData.locationWebsiteLink}
                        onChange={(e) => setFormData({ ...formData, locationWebsiteLink: e.target.value })}
                    />
                </div>


                <div className="space-y-4">
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude:</label>
                    <input
                        type="number"
                        id="latitude"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={formData.latitude}
                        onChange={(e) => setFormData({ ...formData, latitude: Number(e.target.value) })}
                    />
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude:</label>
                    <input
                        type="number"
                        id="longitude"
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                        value={formData.longitude}
                        onChange={(e) => setFormData({ ...formData, longitude: Number(e.target.value) })}
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-800">Upload Image:</h2>
                    <input name="file" ref={inputFileRef} type="file" className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200" />
                    <button
                        onClick={handleImageUpload}
                        className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600">Upload Image</button>
                    {blob && <Image src={blob.url} alt="Location Image" width={256} height={256} />}
                </div>

                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-800">Operating Hours:</h2>
                    <p className="text-sm text-gray-600">Leave time fields blank to indicate that the location is closed.</p>
                </div>

                {formData.operatingHours.map((operatingHour, index) => (
                    <div key={operatingHour.day} className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-800">{operatingHour.day}</h3>
                        <div className="space-y-4">
                            <label htmlFor={`openTime-${index}`} className="block text-sm font-medium text-gray-700">Open Time:</label>
                            <input
                                type="time"
                                id={`openTime-${index}`}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                value={operatingHour.openTime}
                                onChange={(e) => {
                                    const newOperatingHours = [...formData.operatingHours];
                                    newOperatingHours[index].openTime = e.target.value;
                                    setFormData({ ...formData, operatingHours: newOperatingHours });
                                }}
                            />

                            <label htmlFor={`closeTime-${index}`} className="block text-sm font-medium text-gray-700">Close Time:</label>
                            <input
                                type="time"
                                id={`closeTime-${index}`}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
                                value={operatingHour.closeTime}
                                onChange={(e) => {
                                    const newOperatingHours = [...formData.operatingHours];
                                    newOperatingHours[index].closeTime = e.target.value;
                                    setFormData({ ...formData, operatingHours: newOperatingHours });
                                }}
                            />
                        </div>
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
                >
                    {loading ? 'Creating Location...' : 'Create Location'}
                </button>
            </form>
        </div>


    );
};

export default Page;
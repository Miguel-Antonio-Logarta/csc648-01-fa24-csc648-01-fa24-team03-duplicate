import { LocationData } from "../api/locations/route";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Modal from "./Modal";
import useDeleteLocation from "../hooks/useDeleteLocation";

type ListingControlProps = {
  data: LocationData;
};

/*
 * TODO: 
 * - Add Edit Button functionality - Completed by Timmy?
 * - Add Delete Button functionality - Completed by Timmy?
 * 
 * - Needs a cursor fix on the modals but that can be done by someone else - Timmy
 */
function ListingControls({ data }: ListingControlProps) {
  const { data: session } = useSession();
  const [deleteModal, setDeleteModal] = useState(false);
  const { deleteLocation } = useDeleteLocation();

  const openDeleteModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDeleteModal(true);
  }

  const closeDeleteModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDeleteModal(false);
  }

  // Handle delete action
  const handleDeleteConfirm = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(`Deleting location with id: ${data.id}`);
    await deleteLocation(data.id.toString(), session);
    setDeleteModal(false);
  };

  // Handle cancel action
  const handleDeleteCancel = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDeleteModal(false);
  };

  if (
    session?.user.role == "ADMIN" ||
    session?.user.role == "MODERATOR" ||
    session?.user.role == "BUSINESS_OWNER"
  ) {
    return (
      <div className="flex flex-row gap-4 items-center border-t-2 border-neutral-200 p-6">
        <span className="mr-auto text-sm">Location id: {data.id}</span>
        <Link
          href={`/admin/editLocation/${data.id}`}
          className="text-black bg-zinc-300 hover:bg-zinc-400 focus:ring-4 focus:ring-zinc-300 rounded-lg text-sm px-5 py-2.5 "
        >
          Edit Listing
        </Link>
        {session?.user.role == "ADMIN" && (
          
          // this could be button?
          // not sure why we are using Link here
          <Link
            href={`/`}
            onClick={(e) => {e.preventDefault(); openDeleteModal(e)}}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 "
          >
            Remove Listing
          </Link>
        )}


        {/* This can be restyled by someone else, just don't mess with the functionality */}
        <Modal visible={deleteModal} close={closeDeleteModal} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel}>
          <h2 className="text-xl mb-4">Are you sure you want to delete?</h2>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleDeleteCancel}
              className="rounded-md border-2 py-1 px-4 hover:bg-black hover:text-white hover:border-black"
            >
              No
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="rounded-md py-1 px-4 bg-red-600 hover:bg-red-700"
            >
              Yes
            </button>
          </div>
        </Modal>

        {/* <button onClick={openDeleteModal}>Here is a button</button> */}
        {/* <Modal visible={deleteModal} close={closeDeleteModal}>
            <h1>Are you sure you want to delete!</h1>
        </Modal> */}

        {/* <button onClick={openDeleteModal}></button>
        <Modal visible={deleteModal} close={closeDeleteModal}>

        </Modal> */}
      </div>
    );
  } else {
    return null;
  }
}

export default ListingControls;

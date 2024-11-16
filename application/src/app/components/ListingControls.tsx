import { LocationData } from "../api/locations/route";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Modal from "./Modal";

type ListingControlProps = {
  data: LocationData;
};

/*
 * TODO: 
 * - Add Edit Button functionality
 * - Add Delete Button functionality
 */
function ListingControls({ data }: ListingControlProps) {
  const { data: session } = useSession();
  const [deleteModal, setDeleteModal] = useState(false);

  const openDeleteModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDeleteModal(true);
  }

  const closeDeleteModal = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setDeleteModal(false);  
  }

  if (
    session?.user.role == "ADMIN" ||
    session?.user.role == "MODERATOR" ||
    session?.user.role == "BUSINESS_OWNER"
  ) {
    return (
      <div className="flex flex-row gap-4 items-center border-t-2 border-neutral-200 p-6">
        <span className="mr-auto text-sm">Location id: {data.id}</span>
        <Link
          href={`/`}
          onClick={(e) => e.preventDefault()}
          className="text-black bg-zinc-300 hover:bg-zinc-400 focus:ring-4 focus:ring-zinc-300 rounded-lg text-sm px-5 py-2.5 "
        >
          Edit Listing
        </Link>
        {session?.user.role == "ADMIN" && (
          <Link
            href={`/`}
            onClick={(e) => e.preventDefault()}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 "
          >
            Remove Listing
          </Link>
        )}

        
        {/* <button onClick={openDeleteModal}>Here is a button</button>
        <Modal visible={deleteModal} close={closeDeleteModal}>
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

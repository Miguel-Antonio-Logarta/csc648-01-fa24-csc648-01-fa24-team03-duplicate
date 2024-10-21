type ListingProps = {
    img: string,
    title: string,
    category: string,
    rating: number,
    wifiEnabled: boolean,
    busyness: number
}

function Listing(props: ListingProps) {
  return (
    <div className="bg-white shadow-md rounded-md p-4">
        <img className="rounded-lg bg-slate" alt="unknown" src={props.img}/>
        <div className="font-shantell">{props.title}</div>
        <div className="font-josefin">{props.category}</div>
    </div>
  )
}

export default Listing
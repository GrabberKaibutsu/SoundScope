import React, { useEffect, useState } from "react";
import Albums from "../components/Album"

const host = import.meta.env.VITE_BACKENDURL
const ViewAlbums = () => {

    const [albums, setAlbums] = useState([]);

    // grabs the top 20 new-released albums from the backend
    useEffect(() => {
        fetch(`${host}/albums`)
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
        })
        .then((jsonRes) => setAlbums(jsonRes));
    }, []);


  return (
    <div>
        <h1 className="text-slate-50 text-4xl">New Albums</h1>
        <br></br>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
            {/* Albums component that will show the list of the top 20 new-released albums */}
            <Albums albums={albums} />
        </div>
    </div>
  )
}

export default ViewAlbums
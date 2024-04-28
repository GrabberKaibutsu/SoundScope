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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-slate-50 text-4xl text-center mb-6">New Albums</h1>
  
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 justify-items-center">
              {/* Albums component that will show the list of the top 20 new-released albums */}
              <Albums albums={albums} />
          </div>
      </div>
    )
  }
  
  export default ViewAlbums
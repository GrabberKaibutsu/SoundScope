import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Albums from "../components/Album";

const host = import.meta.env.VITE_BACKENDURL;

const ViewAlbums = () => {
    const [albums, setAlbums] = useState([]);

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

            <div className="grid grid-cols-1 gap-4 justify-items-center">
                {/* Wrap each album in a Link component */}
                {albums.map((album) => (
                    <Link key={album.id} to={`/albums/${album.id}`}>
                        <Albums albums={[album]} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ViewAlbums;
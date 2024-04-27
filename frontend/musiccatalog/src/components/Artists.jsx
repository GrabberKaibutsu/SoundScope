import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const host = import.meta.env.VITE_BACKENDURL

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${host}/artists`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setArtists(data);
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
        setError("Failed to fetch artists");
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
      {error ? (
        <p className="text-red-600 text-center font-medium mt-5">
          Error: {error}
        </p>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center text-white my-6">
            Trending Artists
          </h1>
          <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <li
                key={artist.id}
                className="bg-slate-800 shadow-lg rounded-lg p-2 sm:p-4 flex flex-col items-center text-center space-y-3"
              >
                <Link
                  to={`/artist/${artist.id}`}
                  className="flex flex-col items-center space-y-3"
                >
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover mx-auto"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {artist.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {artist.followers.total.toLocaleString()} followers
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Artists;
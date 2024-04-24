import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Artists = () => {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/artists")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setArtists(data); // Assuming data is the array of artists
      })
      .catch((error) => {
        console.error("Error fetching artists:", error);
        setError("Failed to fetch artists");
      });
  }, []);

  return (

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-blue-800 py-6">
      {error ? (
        <p className="text-red-600 text-center font-medium mt-5">
          Error: {error}
        </p>
      ) : (
        <div>
          <h1 className="text-3xl font-bold text-center text-white my-6">
            Top 20 Artists
          </h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artists.map((artist) => (
              <li
                key={artist.id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center space-y-3"
              >
                <Link
                  to={`/artist/${artist.id}`}
                  className="flex flex-col items-center space-y-3"
                >
                  <img
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="w-32 h-32 rounded-full object-cover mx-auto"
                  />
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
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

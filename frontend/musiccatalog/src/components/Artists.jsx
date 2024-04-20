import React, { useState, useEffect } from "react";

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
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div>
          <h1>Artists</h1>
          <ul>
            {artists.map((artist) => (
              <li key={artist.id}>
                <img src={artist.images[0].url} alt={artist.name} />
                {artist.name} - {artist.followers.total} followers
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Artists;

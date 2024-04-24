import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleArtist = () => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:3001/artists/${id}`);
        if (!response.ok) throw new Error("Artist fetch failed");
        const data = await response.json();
        setArtist(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);

    try {
      const response = await fetch("http://localhost:3001/artists/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          artistId: id, // Assuming 'id' is the artist's ID from `useParams`
        }),
        credentials: "include", // Include cookies for session authentication
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to toggle favorite");
      }
      // Optionally, sync the state with the actual result from the server
      setIsFavorited(result.isFavorited);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
      // Revert UI change if there was a problem with the request
      setIsFavorited(!isFavorited);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {artist ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{artist.name}</h1>
          <img
            src={artist.images[0]?.url}
            alt={artist.name}
            className="w-full h-auto rounded-md mb-4"
          />
          <p className="text-lg">
            {artist.followers.total.toLocaleString()} followers
          </p>
          <p className="text-md text-gray-700">{artist.biography}</p>
          <button
            onClick={toggleFavorite}
            className={`px-4 py-2 mt-4 rounded ${
              isFavorited ? "bg-red-500 text-white" : "bg-gray-200 text-black"
            }`}
          >
            {isFavorited ? "Unfavorite" : "Favorite"}
          </button>
        </div>
      ) : (
        <p>Artist not found.</p>
      )}
    </div>
  );
};

export default SingleArtist;

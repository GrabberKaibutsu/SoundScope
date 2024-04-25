import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleArtist = () => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const fetchArtistAndFavoriteStatus = async () => {
      setLoading(true);
      try {
        const artistResponse = await fetch(
          `http://localhost:3001/artists/${id}`
        );
        if (!artistResponse.ok) throw new Error("Artist fetch failed");
        const artistData = await artistResponse.json();

        const token = localStorage.getItem("token");
        const favoriteResponse = await fetch(
          `http://localhost:3001/artists/${id}/is-favorited`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (favoriteResponse.ok) {
          const favoriteData = await favoriteResponse.json();
          setIsFavorited(favoriteData.isFavorited);
        } else {
          console.log("Failed to fetch favorite status");
        }

        setArtist(artistData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistAndFavoriteStatus();
  }, [id]);

  const toggleFavorite = async () => {
    setIsFavorited(!isFavorited);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3001/artists/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          artistId: id,
        }),
      });
      console.log("Made it past the fetch");
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to toggle favorite");
      }
      // Optionally, sync the state with the actual result from the server
      setIsFavorited(result.isFavorited);
      console.log("Favorite toggled successfully");
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

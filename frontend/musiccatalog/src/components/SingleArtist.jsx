import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleArtist = () => {
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get the artist ID from the URL

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
          {/* Add more artist details as needed */}
        </div>
      ) : (
        <p>Artist not found.</p>
      )}
    </div>
  );
};

export default SingleArtist;

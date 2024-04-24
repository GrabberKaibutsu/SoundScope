import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SingleSong() {
  const { id } = useParams(); // Get the song ID from the URL
  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/songs/${id}`)
      .then(response => response.json())
      .then(data => {
        setSong(data); 
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to fetch song details');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!song) return <div>Song not found.</div>;

  return (
    <div>
      <h1>{song.name}</h1>
      <p>Artist: {song.artists.map(artist => artist.name).join(', ')}</p>
      {/* Display additional song details here */}
    </div>
  );
}

export default SingleSong;



import React, { useState, useEffect } from 'react';

function TrendingSongs() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingSongs = async () => {
            setLoading(true);
      
            try {
                const response = await fetch('http://localhost:3001/songs/trending', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch trending songs');
                }

                const data = await response.json();
                setSongs(data.albums.items); 
            } catch (error) {
                setError(`Failed to fetch trending songs: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingSongs();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Trending Songs</h1>
            <ul>
                {songs.map(song => (
                    <li key={song.id}>
                        {song.name} by {song.artists.map(artist => artist.name).join(', ')}
                        <img src={song.images[0]?.url} alt={song.name} style={{ width: 100 }} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TrendingSongs;

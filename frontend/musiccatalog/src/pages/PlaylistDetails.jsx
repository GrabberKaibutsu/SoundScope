// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const PlaylistDetails = ({ playlistId }) => {
//     const [playlist, setPlaylist] = useState(null);
//     const { id } = useParams(); //Gets our Playlist ID from url param
//     useEffect(() => {
//         fetch(`http://localhost:3001/playlists/${id}`)   //was playlistId
//             .then(response => response.json())
//             .then(data => setPlaylist(data))
//             .catch(error => console.error('Error fetching playlist details:', error));
//     }, [id]); //was playlistId

//     if (!playlist) return <div>Loading...</div>;

//     return (
//         <div style={{ color: 'white' }}> 
//             <h1>{playlist.name}</h1>
//             <ul>
//                 {playlist.tracks.items.map(track => (
//                     <li key={track.id}>
//                         {track.name} - <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">Play on Spotify</a>
                      
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PlaylistDetails;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlaylistDetails = () => {
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams(); // This retrieves the `id` from the URL

    useEffect(() => {
        fetch(`http://localhost:3001/playlists/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch playlist details');
                }
                return response.json();
            })
            .then(data => {
                setPlaylist(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching playlist details:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div style={{ color: 'white' }}>Loading...</div>;
    }

    if (error) {
        return <div style={{ color: 'white' }}>Error: {error}</div>;
    }

    return (
        <div style={{ color: 'white' }}>
            <h1>{playlist?.name}</h1>
            {/* Display more details here */}
        </div>
    );
};

export default PlaylistDetails;

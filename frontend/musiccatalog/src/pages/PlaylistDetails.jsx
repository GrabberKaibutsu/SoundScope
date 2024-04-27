// import React, { useEffect, useState } from 'react';

// import { useParams } from 'react-router-dom';


// const PlaylistDetails = () => {
//     //const [playlist, setPlaylist] = useState({ tracks: []});//added due to error retrieving details
//     const [tracks, setTracks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const { id } = useParams(); // This retrieves the `id` from the URL

//     useEffect(() => {
//         console.log(`Fetching data for playlist ID: ${id}`);
//         fetch(`http://localhost:3001/api/playlists/${id}/tracks`)// added api and altered backend routes
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch playlist details');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Data received:', data);
//                 setTracks(data.items); // Assuming 'data.items' is the array of tracks
//                 setPlaylist(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching playlist details:', error);
//                 setError(error.message);
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) {
//         return <div style={{ color: 'white' }}>Loading...</div>;
//     }

//     if (error) {
//         return <div style={{ color: 'white' }}>Error: {error}</div>;
//     }
//     if (!playlist) {
//         return <div style={{ color: 'white' }}>No playlist data available</div>;
//     }
//     if (tracks.length === 0) {
//         return <div style={{ color: 'white' }}>No tracks available.</div>;
//     }

//     return (
//         <div style={{ color: 'white' }}>
//              <h1>Playlist Tracks</h1>
//             <ul>
          
//              {Array.isArray(tracks) && tracks.map(track => (        
//                     <li key={track.id}>
//                         {track.name} by {track.artists.map(artist => artist.name).join(", ")}
//                         <a href={`https://open.spotify.com/track/${track.id}`} target="_blank" rel="noopener noreferrer">
//                             Listen on Spotify
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PlaylistDetails;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const PlaylistDetails = () => {
//     const [playlist, setPlaylist] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const { id } = useParams();

//     useEffect(() => {
//         console.log(`Fetching data for playlist ID: ${id}`);
//         fetch(`http://localhost:3001/api/playlists/${id}/tracks`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch playlist details');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Data received:', data);
//                 setPlaylist(data);
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching playlist details:', error);
//                 setError(error.message);
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) {
//         return <div style={{ color: 'white' }}>Loading...</div>;
//     }

//     if (error) {
//         return <div style={{ color: 'white' }}>Error: {error}</div>;
//     }

//     if (!playlist) {
//         return <div style={{ color: 'white' }}>No playlist data available.</div>;
//     }

//     return (
//         <div style={{ color: 'white' }}>
//             <h1>{playlist.name}</h1>
//             <ul>
//                 {playlist.tracks?.map(track => (
//                     <li key={track.id}>
//                         {track.name} by {track.artists.map(artist => artist.name).join(", ")}
//                         <a href={`https://open.spotify.com/track/${track.id}`} target="_blank" rel="noopener noreferrer">
//                             Listen on Spotify
//                         </a>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default PlaylistDetails;










// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const PlaylistDetails = () => {
//     const [playlist, setPlaylist] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const { id } = useParams();

//     useEffect(() => {
//         console.log(`Fetching data for playlist ID: ${id}`);
//         fetch(`http://localhost:3001/api/playlists/${id}/tracks`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch playlist details');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 console.log('Data received:', data);
//                 if (data.tracks && data.tracks.items) {
//                     setPlaylist({ ...data, tracks: data.tracks.items }); // Adjust based on actual structure
//                 } else {
//                     setPlaylist(data); // Adjust based on actual data structure
//                 }
//                 setLoading(false);
//             })
//             .catch(error => {
//                 console.error('Error fetching playlist details:', error);
//                 setError(error.message);
//                 setLoading(false);
//             });
//     }, [id]);

//     if (loading) {
//         return <div style={{ color: 'white' }}>Loading...</div>;
//     }

//     if (error) {
//         return <div style={{ color: 'white' }}>Error: {error}</div>;
//     }

//     if (!playlist || !playlist.tracks) {
//         return <div style={{ color: 'white' }}>No playlist data available.</div>;
//     }

//     return (
//         <div style={{ color: 'white' }}>
//             <h1>{playlist.name}</h1>
//             <ul>
//                 {playlist.tracks.map(track => (
//                     <li key={track.id}>
//                         {track.name} by {track.artists.map(artist => artist.name).join(", ")}
//                         <a href={`https://open.spotify.com/track/${track.id}`} target="_blank" rel="noopener noreferrer">
//                             Listen on Spotify
//                         </a>
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
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();

    useEffect(() => {
        console.log(`Fetching data for playlist ID: ${id}`);
        fetch(`http://localhost:3001/api/playlists/${id}/tracks`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch playlist details');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                setTracks(data); // Assuming 'data.items' is the array of tracks
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching playlist details:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tracks || tracks.length === 0) {
        return <div>No tracks available.</div>;
    }

    return (
        
        <div>
            <h1>Playlist Tracks</h1>
            <ul>
                {tracks.map(track => (
                    <li key={track?.track?.id}>
                        {track?.track?.name} by {(track?.track?.artists[0]?.name)}
                        <a href={`https://open.spotify.com/track/${track?.track?.id}`} target="_blank" rel="noopener noreferrer">
                            &nbsp;Listen on Spotify
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaylistDetails;





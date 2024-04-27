// import React, { useEffect, useState } from 'react';

// function SongsList() {
//   const [songs, setSongs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('/api/songs/trending')
//       .then(response => response.json())
//       .then(data => {
//         setSongs(data.albums.items); 
//         setLoading(false);
//       })
//       .catch(err => {
//         setError('Failed to fetch songs');
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Trending Songs</h1>
//       <ul>
//         {songs.map(song => (
//           <li key={song.id}>
//             {song.name} by {song.artists.map(artist => artist.name).join(', ')}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default SongsList;


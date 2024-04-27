// import React, { useEffect, useState } from "react";
// import Artists from "../components/Artists";
// import Albums from "../components/HomeAlbums";
// import Songs from "../components/HomeSongs";
// import { Link } from "react-router-dom";

// const Homepage = () => {
//   const [homeData, setHomeData] = useState([]);

//   // gets the list of top 5 artists, albums and tracks to display on the home page
//   useEffect(() => {
//     fetch("http://localhost:3001/home")
//       .then((res) => {
//         if (res.ok) {
//           return res.json();
//         }
//       })
//       .then((jsonRes) => setHomeData(jsonRes));
//   }, []);
  
//   let newAlbums = homeData[1];
//   let topTracks = homeData[2];

//   return (
//     <div>
//       <div>
//         <Artists />
//       </div>

//       <br></br>

//       <div>
//         <div className="flex gap-96">
//           <h1 className="text-slate-50 text-4xl">New Albums</h1>
//           <Link to={`/albums`} className="text-slate-50 hover:text-indigo-600">
//             View More Albums
//           </Link>
//         </div>
//         <br></br>
//         <div>
//           <Albums albums={newAlbums} />
//         </div>
//       </div>

//       <br></br>

//       <div>
//         <div className="flex gap-96">
//           <h1 className="text-slate-50 text-4xl">Top Songs</h1>
//           <input
//             type="button"
//             value="View More Songs"
//             className="text-white hover:text-indigo-600"
//           />
//         </div>
//         <br></br>
//         <Songs songs={topTracks} />
//       </div>
//       {/* <ul>
//         {newAlbums &&
//           newAlbums.map((item, index) => {
//             return (
//               <li>
//                 {item.name}
//                 <br></br>
//                 <img src={item.images[1].url} />
//               </li>
//             );
//           })}
//       </ul>

//       <h1>Top Songs</h1>

//       <ul>
//         {topTracks &&
//           topTracks.map((item, index) => {
//             return <li>{item.track.name}</li>;
//           })}
          
//     </div>
//   );
// };

// export default Homepage;
import React, { useEffect, useState } from "react";
import Artists from "../components/Artists";
import Albums from "../components/HomeAlbums";
import Songs from "../components/HomeSongs";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [homeData, setHomeData] = useState([]);
  const [error, setError] = useState(null);

  // gets the list of top 5 artists, albums and tracks to display on the home page
  useEffect(() => {
    fetch("http://localhost:3001/home")
      .then((res) => res.json())
      .then((jsonRes) => setHomeData(jsonRes))
      .catch((error) => {
        setError('Failed to fetch home data');
        console.error('Fetch error:', error);
      });
  }, []);
  
  let newAlbums = homeData[1];
  let topTracks = homeData[2];

  if (error) {
    return <div>Error loading data: {error}</div>;
  }

  return (
    <div>
      <div>
        <Artists />
      </div>
      <br />
      <div>
        <div className="flex gap-10 md:gap-96">
          <h1 className="text-slate-50 text-4xl">New Albums</h1>
          <Link to={`/albums`} className="text-slate-50 hover:text-indigo-600">
            View More Albums
          </Link>
        </div>
        <br />
        <Albums albums={newAlbums} />
      </div>
      <br />
      <div>
        <div className="flex gap-10 md:gap-96">
          <h1 className="text-slate-50 text-4xl">Top Songs</h1>
          <button
            type="button"
            onClick={() => {} /* Add functionality to navigate to more songs */}
            className="text-white hover:text-indigo-600"
          >
            View More Songs
          </button>
        </div>
        <br />
        <Songs songs={topTracks} />
      </div>
    </div>
  );
};

export default Homepage;

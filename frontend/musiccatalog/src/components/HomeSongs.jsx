// import React from "react";
// import { Link } from "react-router-dom";


// const Songs = ({ songs }) => {

//   return (
//     <div className="text-slate-50">
//         <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
//             {songs && songs.map((item, index) => {
//                 return (
//                     <li className="flex">
//                         <p className="whitespace-nowrap text-left"> {item.track.name} &nbsp;-   <Link to={`/artist/${item.track.artists[0]?.id}`}> <span className="text-zinc-500 hover:text-indigo-600 p-4">{item.track.artists[0]?.name}</span> </Link> </p>
//                     </li>
//                 );
//             })}
//         </ul>
//     </div>
//   );
// };

// export default Songs;
import React from "react";
import { Link } from "react-router-dom";

const Songs = ({ songs }) => {

  return (
    <div className="text-slate-50">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {songs &&
          songs.map((item, index) => {
            return (
              <li className="flex flex-col md:flex-row" key={index}>
                <p className=" text-left mb-1 md:mb-0 md:mr-2">
                  {item.track.name} &nbsp;-{" "}
                
                <Link to={`/artist/${item.track.artists[0]?.id}`}>
                  <span className="text-zinc-500 hover:text-indigo-600 p-4">
                    {item.track.artists[0]?.name}
                  </span>
                 
                </Link>{" "}
               </p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Songs;
import React from "react";
import { Link } from "react-router-dom";

const SearchArtists = ({ artists }) => {
  return (
    <div className="text-slate-50">
      <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Goes over each artist in the list */}
        {artists &&
          artists.map((item, index) => {
            return (
              <li key={index} className="flex flex-col">
                {/* link to the artist page */}
                <Link
                  to={`/artist/${item.id}`}
                  className="hover:text-indigo-600 flex flex-col items-center"
                >
                  {/* Artist image */}
                  <img
                    src={item.images[0]?.url}
                    alt={item.name}
                    className="w-full h-auto rounded-lg"
                  />
                  {/* Artist name */}
                  <p className="text-center mt-2">{item.name}</p>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchArtists;
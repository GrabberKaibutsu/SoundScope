import React from "react";
import { Link } from "react-router-dom";

const SearchArtists = ({ artists }) => {
  return (
    <div className="text-slate-50">
      <ul className="flex gap-3">
        {artists &&
          artists.map((item, index) => {
            return (
              <li className="flex">
                {/* link to the show artist page that will show more details about the album */}
                <Link
                  to={`/artist/${item.id}`}
                  className="hover:text-indigo-600"
                >
                  <img src={item.images[0]?.url} />
                  {item.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default SearchArtists;

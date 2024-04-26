import React from 'react'
import { Link } from "react-router-dom";

const HomeArtists = ({artists}) => {
  return (
    <div>
        <ul className="flex gap-3">
            {/* Goes over each album in the list to display the top 20 albums */}
            {artists && artists.map((item, index) => {
                return (
                    <li className="flex">
                        {/* link to the show album page that will show more details about the album */}
                        <Link to={`/artist/${item.id}`} className="text-slate-50 hover:text-indigo-600">
                            <img src={item.images[0]?.url} />
                            {item?.name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default HomeArtists
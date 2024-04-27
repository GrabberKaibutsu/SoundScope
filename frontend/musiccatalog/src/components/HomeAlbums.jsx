import React from 'react'
import { Link } from "react-router-dom";

const HomeAlbum = ({albums}) => {
  return (
    <div className="text-slate-50">
        <ul className="grid grid-cols-1 md:flex gap-3 justify-items-center">
            {/* Goes over each album in the list to display the top 20 albums */}
            {albums && albums.map((item, index) => {
                return (
                    <li className="flex">
                        {/* link to the show album page that will show more details about the album */}
                        <Link to={`/album/${item.id}`} className="hover:text-indigo-600">
                            <img src={item.images[0]?.url} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4" />
                            <p>{item?.name}</p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default HomeAlbum
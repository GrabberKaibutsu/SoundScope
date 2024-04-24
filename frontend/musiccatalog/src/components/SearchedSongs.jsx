import React from 'react'
import { Link } from "react-router-dom";

const SearchedSongs = ({songs}) => {
  return (
    <div className="text-slate-50">
        <ul className="grid grid-cols-2 gap-2">
            {songs && songs.map((item, index) => {
                return (
                    <li>
                        <p>{item.name} <Link to={`/artists/${item.artists[0].id}`}> <span className="text-zinc-500 hover:text-indigo-600">{item.artists[0].name}</span> </Link></p>
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default SearchedSongs
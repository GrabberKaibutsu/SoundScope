import React from 'react'
import { Link } from "react-router-dom";

const HomeAlbum = ({albums}) => {
  return (
    <div>
        <ul>
            {albums && albums.map((item, index) => {
                return (
                    <li>
                        <Link to={`/album/${item.id}`}>
                            {item.name}
                            <br></br>
                            <img src={item.images[1].url} />
                        </Link>
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default HomeAlbum
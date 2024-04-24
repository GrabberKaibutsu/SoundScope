import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; //new code 
const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, user } = useContext(AuthContext); //new code used to discern context
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const performSearch = () => {
    navigate(`/search/${searchTerm}`);
  };
  return (
    <nav className="navbar">
      <div className="home-link">
        <Link to={"/"} className="hover:text-indigo-600">Home</Link>
      </div>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="text-stone-800"
        />
        <button type="button" onClick={performSearch}>Search</button>
      </div>
      <div className="nav-links">
        <Link to={"/artists"} className="hover:text-indigo-600">Artists</Link>
        <Link to={"/albums"} className="hover:text-indigo-600">Albums</Link>
        <Link to={"/"} className="hover:text-indigo-600">Top Songs</Link>
      </div>
      <div className="profile-section">
        {isAuthenticated ? (
          <>
            <span>Welcome, {user.name}</span>
            <Link to={"/logout"} className="hover:text-indigo-600">Logout</Link>
          </>
        ) : (
          <Link to={"/login"} className="hover:text-indigo-600">Login</Link>
        )}
      </div>
    </nav>
  );
};
export default NavBar;
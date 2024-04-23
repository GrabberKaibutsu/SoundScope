import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; //new code 
const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated, user } = useContext(AuthContext); //new code used to discern context
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const performSearch = () => {
    console.log('Search Term:', searchTerm);
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
        />
        <button type="button" onClick={performSearch}>Search</button>
      </div>
      <div className="nav-links">
        <Link to={"/artists"} className="hover:text-indigo-600">Artists</Link>
        <Link to={"/albums"} className="hover:text-indigo-600">Albums</Link>
        <Link to={"/genres"} className="hover:text-indigo-600">Genres</Link>
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
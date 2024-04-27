import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const performSearch = () => {
    navigate(`/search/${searchTerm}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect user to the login page after logout
  };

  return (
    <nav className="navbar">
      <div className="home-link">
        <Link to={"/"} className="hover:text-indigo-600">
          Home
        </Link>
      </div>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="text-stone-800"
        />
        <button type="button" onClick={performSearch}>
          Search
        </button>
      </div>
      <div className="nav-links">
        <Link to={"/artists"} className="hover:text-indigo-600">
          Artists
        </Link>
        <Link to={"/albums"} className="hover:text-indigo-600">
          Albums
        </Link>
        <Link to={"/featured-playlists"} className="hover:text-indigo-600">  {/* Assuming this is the route */}
          Playlists
        </Link>
      </div>
      <div className="profile-section">
        {isAuthenticated ? (
          <>
            <span className="mr-4">Welcome, {user.username}!</span>
            <button onClick={handleLogout} className="hover:text-indigo-600">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="hover:text-indigo-600">
              Login
            </Link>
            <Link to={"/signup"} className="hover:text-indigo-600 ml-2">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

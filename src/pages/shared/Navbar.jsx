import React from "react";
import { Link } from "react-router";
import logo from "/trophy.png";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();

  const handleLogout = () => {
    logOut()
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div className="navbar max-w-7xl mx-auto bg-base-100">
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* MOBILE MENU */}
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/all-contests">All Contests</Link>
            </li>
            <li>
              <Link to="/packages">Packages</Link>
            </li>
            <li>
              <Link to="/resources">Resources</Link>
            </li>
            {role === "creator" && (
              <>
                <li>
                  <Link to="/dashboard/add-contest">Add Contest</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <img src={logo} className="w-8 h-8" alt="Logo" />
        <p className="text-amber-500 ml-4 font-bold text-xl">Contest Verse</p>
      </div>

      {/* CENTER MENU */}
      <div className="navbar-center hidden lg:flex">
        <ul className="text-md text-teal-600 flex justify-center items-center gap-6 font-semibold px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all-contests">All Contests</Link>
          </li>
          <li>
            <Link to="/packages">Packages</Link>
          </li>
          <li>
            <Link to="/resources">Resources</Link>
          </li>
          <li>
            <Link to="/add-contest">Add Contest</Link>
          </li>
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end">
        {/* Only show when user is logged in */}
        {user && (
          <div className="dropdown">
            <div tabIndex={0} role="button" className="cursor-pointer m-1">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                className="w-10 h-10 rounded-full mr-2"
                alt="User"
              />
            </div>

            <ul
              tabIndex="-1"
              className="dropdown-content menu bg-base-300 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link>{user?.displayName}</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Sign Out</button>
              </li>
            </ul>
          </div>
        )}

        {/* Show LOGIN only when user is NOT logged in */}
        {!user && (
          <Link to="/login" className="btn btn-info mr-2">
            Login
          </Link>
        )}

        <Link className="btn btn-primary" to="/beAcreator">
          Be a Creator
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

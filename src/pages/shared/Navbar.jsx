import React from "react";
import { Link } from "react-router";
import logo from "/trophy.png";
// import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  // const { user, logOut } = useAuth();

  // const handleLogout = () => {
  //   logOut()
  //   .then(res => console.log(res))
  //   .catch(error => {
  //     console.log(error);
  //   })
  // }

  return (
    <>
      <div className="navbar max-w-7xl mx-auto bg-base-100">
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
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
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
            </ul>
          </div>
          <img src={logo} className="w-8 h-8" alt="" />
          <a className="text-amber-500 ml-4 font-bold text-xl">Contest Verse</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="text-xl text-teal-600 flex justify-center items-center gap-6 font-semibold px-1">
            <li>
              <Link to="/" className="bg-[--color-brand]">Home</Link>
            </li>
            <li>
              <Link to="/all-contests">All Contests</Link>
            </li>
            <li>
              <Link to="/packages">Packages</Link>
            </li>
            <li>
              <Link to="/recources">Resources</Link>
            </li>
          </ul>
        </div>
        {/* <div className="navbar-end">
          <img src={user?.photoURL} className="w-10 h-10 rounded-full mr-2" alt="" />
          {user ? (
            <a onClick={handleLogout} className="btn btn-accent mr-2">Sign Out</a>
          ) : (
            <Link to='/login' className="btn btn-info ml-4">Login</Link>
          )}
          <Link className="btn btn-primary" to='/rider'>Be a Rider</Link>
        </div> */}
      </div>
    </>
  );
};

export default Navbar;

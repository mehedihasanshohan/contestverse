import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { BsFillTrophyFill } from "react-icons/bs";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MdOutlineSpaceDashboard } from "react-icons/md";
// import useRole from "../hooks/useRole";

const DashBoardLayout = () => {
  // const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-teal-600 text-white">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-6"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4 text-xl flex justify-center items-center gap-4">
            <h2 className="">DashBoard Panel</h2>
            {/* <MdOutlineSpaceDashboard className="w-6 h-6 "></MdOutlineSpaceDashboard> */}
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
        {/* <div className="p-4">Page Content</div> */}
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-12"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-6 mt-12"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </Link>
            </li>

            {/* our dashboard links */}
            <li>
              <NavLink
                className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                data-tip="My Contests"
                to="/dashboard/my-contests"
              >
                <BsFillTrophyFill className="w-6 h-6 mt-4"></BsFillTrophyFill>
                <span className="is-drawer-close:hidden">My Contests</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                data-tip="Payment History"
                to="/dashboard/payment-history"
              >
                <FaHistory className="w-6 h-6 mt-4"></FaHistory>
                <span className="is-drawer-close:hidden">History</span>
              </NavLink>
            </li>
            {/* {role === "admin" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="Approve Riders"
                    to="/dashboard/approve-riders"
                  >
                    <IoShieldCheckmarkSharp className="w-6 h-6"></IoShieldCheckmarkSharp>
                    <span className="is-drawer-close:hidden">
                      Approve Contest
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                    to="/dashboard/users-management"
                  >
                    <FaUser className="w-4 h-4"></FaUser>
                    <span className="is-drawer-close:hidden">
                      User Management
                    </span>
                  </NavLink>
                </li>
              </>
            )} */}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                {/* Settings icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-6 mt-4"
                >
                  <path d="M20 7h-9"></path>
                  <path d="M14 17H5"></path>
                  <circle cx="17" cy="17" r="3"></circle>
                  <circle cx="7" cy="7" r="3"></circle>
                </svg>
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
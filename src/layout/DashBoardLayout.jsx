import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import {  FaUser, FaUserCircle } from "react-icons/fa";
import { MdAssignmentAdd } from "react-icons/md";
import useRole from "../hooks/useRole";
import { TbDatabaseCog } from "react-icons/tb";
import { GiPodiumWinner } from "react-icons/gi";
import { FaClipboardList } from "react-icons/fa6";
import { BsClipboardPlusFill } from "react-icons/bs";
import { HiOutlineTrophy } from "react-icons/hi2";

const DashBoardLayout = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto bg-slate-50 ">
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
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow bg-[#0f172a] backdrop-blur-d">
            {/* List item */}
            <li>
              <Link
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right mt-16"
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
                  className="my-1.5 inline-block size-6 text-amber-300 mt-12"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden mt-12 text-amber-300">Homepage</span>
              </Link>
            </li>



            {role === "user" && (
              <div className="text-gray-200">
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="My Participated Contests"
                    to="/dashboard/my-participated-contests"
                  >
                    <FaClipboardList className="w-6 h-6 mt-4 text-teal-500"></FaClipboardList>
                    <span className="is-drawer-close:hidden mt-4">
                      My Participated Contests
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="My Winning Contests"
                    to="/dashboard/my-winning-contests"
                  >
                    <GiPodiumWinner className="w-6 h-6 mt-4 text-teal-500"></GiPodiumWinner>
                    <span className="is-drawer-close:hidden mt-4">
                      My Winning Contests
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="My Profile"
                    to="/dashboard/my-profile"
                  >
                    <FaUserCircle className="w-6 h-6 mt-4 text-teal-500"></FaUserCircle>
                    <span className="is-drawer-close:hidden mt-4">
                      My Profile
                    </span>
                  </NavLink>
                </li>
              </div>
            )}

            {role === "creator" && (
              <div className="text-gray-200">
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="Add Contest"
                    to="/dashboard/add-contest"
                  >
                    <BsClipboardPlusFill className="w-6 h-6 mt-4"></BsClipboardPlusFill>
                    <span className="is-drawer-close:hidden mt-4">Add Contest</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="My Created Contest"
                    to="/dashboard/my-created-contest"
                  >
                    <FaClipboardList className="w-6 h-6 mt-4"></FaClipboardList>
                    <span className="is-drawer-close:hidden mt-4">My Created Contest</span>
                  </NavLink>
                </li>
              </div>
            )}

            {role === "admin" && (
              <div className="text-gray-200">
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="Manage Contests"
                    to="/dashboard/manage-contests"
                  >
                    <TbDatabaseCog className="w-6 h-6 mt-4"></TbDatabaseCog>
                    <span className="is-drawer-close:hidden mt-4">
                      Manage Contests
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="Approve Creator"
                    to="/dashboard/approve-creator"
                  >
                    <MdAssignmentAdd className="h-6 w-6 mt-4"></MdAssignmentAdd>
                    <span className="is-drawer-close:hidden mt-4">
                      Approve Creator
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="User Management"
                    to="/dashboard/user-management"
                  >
                    <FaUser className="w-6 h-6 mt-4"></FaUser>
                    <span className="is-drawer-close:hidden mt-4">
                      User Management
                    </span>
                  </NavLink>
                </li>
              </div>
            )}

               <li>
                  <NavLink
                    className="is-drawer-close:tooltip
                    is-drawer-close:tooltip-right"
                    data-tip="Leaderboard"
                    to="/dashboard/leaderboard"
                  >
                    <HiOutlineTrophy className="w-6 h-6 mt-4 text-amber-400"></HiOutlineTrophy>
                    <span className="is-drawer-close:hidden mt-4 text-amber-400">
                      Leaderboard
                    </span>
                  </NavLink>
                </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;

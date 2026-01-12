import React from 'react';
import { Outlet } from 'react-router';
import authImage from '/authImage.png';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-7xl bg-base-100 shadow-sm rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT – FORM */}
        <div className="p-10 flex flex-col justify-center">
          <Outlet />
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-base-100">
          <img
            src={authImage}
            alt="Auth Illustration"
            className="w-4/5 object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
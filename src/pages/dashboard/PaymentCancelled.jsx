import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h2 className="text-red-500 text-4xl text-center mt-6 mb-2 font-semibold">
        PaymentCancelled
      </h2>
      <div className="flex justify-center items-center">
        <Link to="/dashboard/my-contests">
          <button className="btn btn-error">Try Again</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;

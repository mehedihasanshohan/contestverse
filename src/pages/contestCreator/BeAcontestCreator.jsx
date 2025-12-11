import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const BeAcontestCreator = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    reset({
      contestCreatorName: user?.displayName || "",
      contestCreatorEmail: user?.email || "",
      contestCreatorPhoneNumber: "",
      contestCreatorAddress: "",
    });
  }, [user, reset]);

  const handleContestCreatorApplication = (data) => {
    console.log("FORM DATA SENT:", data);

    axiosSecure.post("/creators", data).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. We will reach to you in next 7 days",
          showConfirmButton: false,
          timer: 1500,
        });

        reset();
      }
    });
  };

  return (
    <div className="flex justify-center">
      <form
        className="mt-12 text-black p-4 w-full max-w-xl"
        onSubmit={handleSubmit(handleContestCreatorApplication)}
      >
        <h4 className="text-2xl font-semibold mb-6 text-center">
          Contest Creator FORM
        </h4>

        <div className="space-y-4">

          <div className="space-y-2">
            <label className="label">Contest Creator Name</label>
            <input
              type="text"
              className="input w-full"
              {...register("contestCreatorName")}
            />
          </div>

          <div className="space-y-2">
            <label className="label">Contest Creator Email</label>
            <input
              type="text"
              className="input w-full"
              {...register("contestCreatorEmail")}
            />
          </div>

          <div className="space-y-2">
            <label className="label">Contest Creator Phone Number</label>
            <input
              type="number"
              className="input w-full"
              {...register("contestCreatorPhoneNumber")}
            />
          </div>

          <div className="space-y-2">
            <label className="label">Your Address</label>
            <input
              type="text"
              className="input w-full"
              {...register("contestCreatorAddress")}
            />
          </div>

        </div>

        <input
          type="submit"
          className="btn btn-accent text-white mt-8 w-full"
          value="Apply As a Contest Creator"
        />
      </form>
    </div>
  );
};

export default BeAcontestCreator;

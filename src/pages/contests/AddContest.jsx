import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddContest = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const deadline = watch("deadline");

  const handleAddContest = (data) => {
    // VALIDATIONS
    if (!data.deadline) {
      return Swal.fire("Error!", "Deadline is required.", "error");
    }

    const today = new Date();
    if (new Date(data.deadline) <= today) {
      return Swal.fire(
        "Invalid Deadline",
        "Deadline must be a future date.",
        "error"
      );
    }

    if (data.price < 0) {
      return Swal.fire(
        "Invalid Price",
        "Entry price cannot be negative.",
        "error"
      );
    }

    if (data.prize <= 0) {
      return Swal.fire(
        "Invalid Prize",
        "Prize money must be greater than 0.",
        "error"
      );
    }

    const contestInfo = {
      ...data,
      creatorName: user?.displayName,
      creatorEmail: user?.email,
      deadline: data.deadline.toISOString(),
      approvalStatus: "pending",
      participants: 0,
      winner: null,
      submissionCount: 0,
      createdAt: new Date(),
    };
    console.log(contestInfo);

    Swal.fire({
      title: "Confirm Contest Creation?",
      text: `Contest "${data.name}" will be created!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Create Contest",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post("/contests", contestInfo).then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Contest Added Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-10">Add New Contest</h2>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6"
        onSubmit={handleSubmit(handleAddContest)}
      >
        {/* Name */}
        <div>
          <label className="label">Contest Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Contest Name"
            {...register("name", { required: true })}
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="label">Contest Image URL</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Image URL"
            {...register("image", { required: true })}
          />
        </div>

        {/* Price */}
        <div>
          <label className="label">Entry Price</label>
          <input
            type="number"
            className="input w-full"
            placeholder="Price"
            {...register("price", { required: true })}
          />
        </div>

        {/* Prize Money */}
        <div>
          <label className="label">Prize Money</label>
          <input
            type="number"
            className="input w-full"
            placeholder="Prize Money"
            {...register("prize", { required: true })}
          />
        </div>

        {/* Contest Type */}
        <div>
          <label className="label">Contest Type</label>
          <select
            className="select w-full"
            {...register("type", { required: true })}
          >
            <option value="">Pick a type</option>
            <option value="design">Design Contest</option>
            <option value="article">Article Writing</option>
            <option value="idea">Business Ideas</option>
            <option value="gaming">Gaming Review</option>
            <option value="photography">Photography</option>
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label className="label">Deadline</label>
          <DatePicker
            selected={deadline}
            onChange={(date) => setValue("deadline", date)}
            className="input w-full"
            placeholderText="Select Deadline"
          />
        </div>

        {/* Description (full width) */}
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            className="textarea w-full h-28"
            placeholder="Contest Description"
            {...register("description", { required: true })}
          ></textarea>
        </div>

        {/* Task Instruction (full width) */}
        <div className="md:col-span-2">
          <label className="label">Task Instruction</label>
          <textarea
            className="textarea w-full h-32"
            placeholder="Task Instruction for participants"
            {...register("instruction", { required: true })}
          ></textarea>
        </div>

        <input
          type="submit"
          className="btn btn-primary w-full md:col-span-2"
          value="Create Contest"
        />
      </form>
    </div>
  );
};

export default AddContest;

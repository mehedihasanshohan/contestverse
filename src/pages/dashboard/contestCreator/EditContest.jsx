import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const EditContest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch contest & prefill form
  const { isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      reset({
        ...res.data,
        deadline: res.data.deadline?.slice(0, 16),
      });
      return res.data;
    },
  });

  // Update contest
  const onSubmit = async (data) => {
    const updateData = {
      name: data.name,
      image: data.image,
      description: data.description,
      instruction: data.instruction,
      price: Number(data.price),
      prize: Number(data.prize),
      type: data.type,
      deadline: data.deadline,
    };

    try {
      const res = await axiosSecure.patch(
        `/creator/contests/${id}`,
        updateData
      );

      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Contest updated successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/dashboard/my-created-contest");
      } else {
        Swal.fire("No Changes", "Nothing was updated", "info");
      }
    } catch (err) {
      Swal.fire("Error", "Failed to update contest", "error", err);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-base-100 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-amber-700">
        Edit Contest
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Contest Name */}
        <div>
          <label className="label">Contest Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
          {errors.name && <p className="text-red-500">Name is required</p>}
        </div>

        {/* Image */}
        <div>
          <label className="label">Image URL</label>
          <input
            {...register("image", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        {/* Instruction */}
        <div>
          <label className="label">Task Instruction</label>
          <textarea
            {...register("instruction", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </div>

        {/* Price & Prize */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">Entry Fee</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Prize Money</label>
            <input
              type="number"
              {...register("prize", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Contest Type */}
        <div>
          <label className="label">Contest Type</label>
          <select
            {...register("type", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Pick a type</option>
            <option value="design contest">Design Contest</option>
            <option value="article writing">Article Writing</option>
            <option value="business idea">Business Ideas</option>
            <option value="gaming review">Gaming Review</option>
            <option value="photography contest">Photography</option>
          </select>
        </div>

        {/* Deadline */}
        <div>
          <label className="label">Deadline</label>
          <input
            type="datetime-local"
            {...register("deadline", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <button className="btn btn-warning w-full text-lg">
          Update Contest
        </button>
      </form>
    </div>
  );
};

export default EditContest;

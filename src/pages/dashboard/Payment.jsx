import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Payment = () => {
   const {contestId} = useParams();
   const axiosSecure = useAxiosSecure();

   const { isLoading, data: contest } = useQuery({
    queryKey: ['contests', contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${contestId}`);
      return res.data;
    }
   })

   const handlePayment = async () => {
    const paymentInfo = {
      cost: contest.price,
      contestId: contest._id,
      name: contest.name,
      creatorEmail: contest.creatorEmail,
      creatorName: contest.creatorName
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.assign(res.data.url);
   };

   if(isLoading){
    return <div>
      <span className='loading loading-infinity loading-xl'></span>
    </div>
   }

  return (
   <div className="max-w-2xl mx-auto p-6 mt-2">
  <h2 className="text-3xl font-bold text-center mb-2">
    Complete Your Payment
  </h2>

  {/* Card */}
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden border">

    {/* Image */}
    <div className="h-60 w-full overflow-hidden p-4 ">
      <img
        src={contest?.image}
        className="object-cover w-full h-full rounded-xl"
      />
    </div>

    {/* Content */}
    <div className="p-6 space-y-4">

      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold">{contest.name}</h3>
        <span className="text-xl font-bold text-green-600">
          Cost: ${contest.price}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mt-4">
        <p><span className="font-semibold">Prize Money:</span> ${contest.prize}</p>
        <p><span className="font-semibold">Type:</span> {contest.type}</p>
        <p><span className="font-semibold">Deadline:</span> {new Date(contest.deadline).toLocaleDateString()}</p>
        <p><span className="font-semibold">Creator:</span> {contest.creatorName}</p>
      </div>

      {/* Payment Button */}
      <button
        onClick={handlePayment}
        className="btn btn-primary w-full mt-6 text-lg"
      >
        Pay via Stripe
      </button>
    </div>
  </div>
</div>

  )
}

export default Payment
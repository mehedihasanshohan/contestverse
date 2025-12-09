// import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router'
import useAxiosSecure from '../../hooks/useAxiosSecure';

// const PaymentSuccess = () => {
//   const [ searchParams ] = useSearchParams();
//   // const sessionId = searchParams.get('session_id');
//   const [paymentInfo, setPaymentInfo] = useState({});  const sessionId = searchParams.get('session_id');
//   const axiosSecure = useAxiosSecure();
//   console.log(sessionId);

//   useEffect(() => {
//     if(sessionId){
//       axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
//       .then(res => {
//         console.log(res.data);
//         setPaymentInfo({
//           transactionId: res.data.transactionId,
//           trackingId : res.data.trackingId
//         })
//       })
//     }
//   },[sessionId, axiosSecure])


//   return (
//     <div>
//       <h2 className='text-green-400 font-semibold text-center text-3xl mt-2'>Payment Successful</h2>
//       <p className='text-gray-500 font-semibold text-center text-lg mt-2'>Your transactionId : {paymentInfo.transactionId}</p>
//     </div>
//   )
// }

// export default PaymentSuccess


import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {
  const [ searchParams ] = useSearchParams();
  const sessionId = searchParams.get('session_id')
  const axiosSecure = useAxiosSecure();

  console.log(sessionId);

   useEffect(() => {
    if(sessionId){
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
      .then(res => {
        console.log(res.data);
        // setPaymentInfo({
        //   transactionId: res.data.transactionId,
        //   trackingId : res.data.trackingId
        // })
      })
    }
  },[sessionId, axiosSecure])

  return (
    <div>
      <h2>success</h2>
    </div>
  )
}

export default PaymentSuccess
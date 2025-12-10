import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useSearchParams } from 'react-router';

const PaymentSuccess = () => {
  const [ searchParams ] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get('session_id')
  const axiosSecure = useAxiosSecure();

  console.log(sessionId);

   useEffect(() => {
    if(sessionId){
      axiosSecure.patch(`/payment-success?session_id=${sessionId}`)
      .then(res => {
        console.log(res.data);
        setPaymentInfo({
          transactionId: res.data.transactionId,
          trackingId : res.data.trackingId
        })
      })
    }
  },[sessionId, axiosSecure])

  return (
   <div>
     <h2 className='text-green-400 font-semibold text-center text-3xl mt-2'>Payment Successful</h2>
    <p className='text-gray-500 font-semibold text-center text-lg mt-2'>Your transactionId : {paymentInfo.transactionId}</p>
    <p className='text-gray-500 font-semibold text-center text-lg mt-2'>Your trackingId : {paymentInfo.trackingId}</p>
     </div>
  )
}

export default PaymentSuccess
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { FaEye, FaUserCheck } from 'react-icons/fa';
import { IoPersonRemoveSharp } from 'react-icons/io5';
import { FaTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApproveCreator = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: creators = [] } = useQuery({
    queryKey: ['creators', 'pending'],
    queryFn: async () => {
      const res = await axiosSecure.get('/creators');
      return res.data;
    }
  })

  const handleApproval = creator => {
     updateRiderStatus( creator, 'approved');
  }

  const updateRiderStatus = (creator, status) => {
      const updateInfo = {status: status, email: creator.contestCreatorEmail}
      axiosSecure.patch(`/riders/${creator._id}`, updateInfo)
      .then(res => {
        if(res.data.modifiedCount){
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Rider status is set to ${status}`,
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
  }

  const handleRejection = creator => {
    updateRiderStatus(creator, 'rejected')
  }


  return (
    <div>
      <h2>Riders Pending Approval: {creators.length}</h2>
    <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Creator Name</th>
        <th>Email</th>
        <th>Address</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        creators.map((creator, index) =>  <tr>
        <th>{index+1}</th>
        <td>{creator.contestCreatorName}</td>
        <td>{creator.contestCreatorEmail}</td>
        <td>{creator.contestCreatorAddress}</td>
        <td>
          <p className={`${creator.status === 'approved' ?
            'text-green-500' : 'text-orange-500'
          }`}>{creator.status}</p>
        </td>
        <td>
          <button className='btn'>
            <FaEye></FaEye>
          </button>
          <button
            onClick={() => handleApproval(creator)}
            className='btn text-teal-600 '>
            <FaUserCheck></FaUserCheck>
          </button>
          <button
            onClick={() => handleRejection(creator)}
            className='btn text-red-600 ml-2 mr-2'>
            <IoPersonRemoveSharp></IoPersonRemoveSharp>
          </button>
          <button className='btn text-red-400'>
            <FaTrashCan></FaTrashCan>
          </button>
        </td>
      </tr>)
      }


    </tbody>
  </table>
</div>
    </div>
  )
}

export default ApproveCreator
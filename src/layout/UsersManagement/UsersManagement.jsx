import React from 'react'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import { FaUserShield } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleMakeAdmin = user => {
    const roleInfo = {role : 'admin'}
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
      .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount){
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.displayName} marked as an admin`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }
  const handleRemoveAdmin = user => {
    const roleInfo = {role : 'user'}
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo)
      .then(res => {
        console.log(res.data);
        if(res.data.modifiedCount){
          refetch();
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `${user.displayName} removed as an admin`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  }

  return (
    <div>
      <h2 className='text-4xl text-teal-500'>Manage Users: {users.length}</h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>

                {/* Photo */}
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={user.photoURL || "https://img.daisyui.com/images/profile/demo/2@94.webp"}
                        alt="user avatar"
                      />
                    </div>
                  </div>
                </td>

                {/* Name */}
                <td>{user.displayName}</td>

                {/* Email */}
                <td>{user.email}</td>

                <td>{user.role}</td>

                <td>
                  {
                    user.role === 'admin' ?
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className='btn bg-red-200'>
                      Remove Admin
                    </button> :
                    <button
                      onClick={ () => handleMakeAdmin(user)}
                      className='btn bg-green-500'>
                      Make Admin
                    </button>
                  }
                </td>
              </tr>
              ))}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default UsersManagement;
import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();
  const {registerUser, updateUserProfile} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    // console.log(data);
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
    .then(result => {
      console.log(result.user);
      // 1.store the image in form data
      const formData = new FormData();
      formData.append('image', profileImg);

      // 2.send the photo to store and get the url
      const image_API_URL =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`

      axios.post(image_API_URL, formData)
      .then(res => {
        const photoURL= res.data.data.url;

        // create user in the database
        const userInfo = {
          email: data.email,
          displayName: data.name,
          photoURL: photoURL
        }
        axiosSecure.post('/users', userInfo)
          .then(res => {
            if(res.data.insertedId){
              console.log('user created in the database');
            }
          })

        // update user profile to firebase
        const userProfile = {
          displayName: data.name,
          photoURL: photoURL
        }
        updateUserProfile(userProfile)
          .then( () => {
            // console.log('user profile updated done')
            navigate(location.state || '/')
          })
          .catch(error => console.log(error))
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div className='w-full mx-auto'>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* name */}
          <label className="label">Name</label>
          <input type="text" {...register('name', {required: true})} className="input input-bordered w-full" placeholder="Your Name" />
          {errors.name?.type === 'required' && <p className='text-red-500 font-semibold'>Name is required</p>}

          {/* image */}
          <label className="label">Photo</label>
          <input type="file" {...register('photo', {required: true})} className="file-input" placeholder="Your Photo" />
          {errors.name?.type === 'required' && <p className='text-red-500 font-semibold'>Photo is required</p>}

          {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email', {required: true})} className="input input-bordered w-full" placeholder="Email" />
          {errors.email?.type === 'required' && <p className='text-red-500 font-semibold'>Email is required</p>}

          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password', {
            required: true,
            minLength: 6,
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
            })} className="input input-bordered w-full" placeholder="Password" />
          {
            errors.password?.type === "required" &&
             <p className='text-red-500 font-semibold'>Password is required</p>
          }
          {
            errors.password?.type === "minLength" &&
            <p className='text-red-400 font-semibold'>Password must be 6 correcter or longer</p>
          }
          {
            errors.password?.type === "pattern" &&
            <p className='text-red-500'>Password must be at least one
            uppercase, at least one lowercase, at least one number and at least one special characters</p>
          }
          <button className="btn btn-accent mt-4">Register</button>
        </fieldset>
        <SocialLogin></SocialLogin>
        <p>Already have an Account? <Link state={location.state} className='text-blue-400 underline' to='/login'>Login</Link></p>
      </form>
    </div>
  )
}

export default Register
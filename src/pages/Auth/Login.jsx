import React from 'react'
import { useForm } from 'react-hook-form'
import useAuth from '../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState:{errors}
  } = useForm();
  const {signInUser} = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
    .then(result => {
      console.log(result.user);
      navigate(location?.state || '/')
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <div className='w-full mx-auto'>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
           {/* name */}
          <label className="label">Name</label>
          <input type="text" {...register('name', {required: true})} className="input input-bordered w-full" placeholder="Email" />
          {errors.name?.type === 'required' && <p className='text-red-500 font-semibold'>Name is required</p>}

          {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email', {required: true})} className="input w-full" placeholder="Email" />
          {errors.email?.type === 'required' && <p className='text-red-500 font-semibold'>Email is required</p>}

          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password', {
            required: true,
            minLength: 6,
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
            })} className="input w-full" placeholder="Password" />
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
          <button className="btn btn-accent mt-4">Login</button>
        </fieldset>
        <SocialLogin></SocialLogin>
        <p>New to Motiar Store? <Link state={location.state} className='text-blue-400 underline' to='/register'>Register</Link></p>
      </form>
    </div>
  )
}

export default Login
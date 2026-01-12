// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { Link, useLocation, useNavigate } from 'react-router';
// import useAuth from '../../hooks/useAuth';
// import SocialLogin from './SocailLogin';

// const Login = () => {
//   const {
//     register,
//     handleSubmit,
//     formState:{errors}
//   } = useForm();
//   const {signInUser} = useAuth();
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogin = (data) => {
//     console.log(data);
//     signInUser(data.email, data.password)
//     .then(result => {
//       console.log(result.user);
//       navigate(location?.state || '/')
//     })
//     .catch(error => {
//       console.log(error);
//     })
//   }

//   return (
//     <div className='w-full bg-base-100'>
//       <form onSubmit={handleSubmit(handleLogin)}>
//         <fieldset className="fieldset">
//            {/* name */}
//           <label className="label">Name</label>
//           <input type="text" {...register('name', {required: true})} className="input input-bordered w-full" placeholder="Email" />
//           {errors.name?.type === 'required' && <p className='text-red-500 font-semibold'>Name is required</p>}

//           {/* email */}
//           <label className="label">Email</label>
//           <input type="email" {...register('email', {required: true})} className="input w-full" placeholder="Email" />
//           {errors.email?.type === 'required' && <p className='text-red-500 font-semibold'>Email is required</p>}

//           {/* password */}
//           <label className="label">Password</label>
//           <input type="password" {...register('password', {
//             required: true,
//             minLength: 6,
//             pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
//             })} className="input w-full" placeholder="Password" />
//           {
//             errors.password?.type === "required" &&
//              <p className='text-red-500 font-semibold'>Password is required</p>
//           }
//           {
//             errors.password?.type === "minLength" &&
//             <p className='text-red-500 font-semibold'>Password must be 6 correcter or longer</p>
//           }
//           {
//             errors.password?.type === "pattern" &&
//             <p className='text-red-500'>Password must be at least one
//             uppercase, at least one lowercase, at least one number and at least one special characters</p>
//           }
//           <button className="btn bg-base-300 mt-4">Login</button>
//         </fieldset>
//         <SocialLogin></SocialLogin>
//         <p>New to ConteseVerse? <Link state={location.state} className='underline' to='/register'>Register</Link></p>
//       </form>
//     </div>
//   )
// }

// export default Login


import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import SocialLogin from './SocailLogin';

const Login = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm();
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDemoLogin = (email, password) => {
    setValue('email', email);
    setValue('password', password);
  };

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
    <div className='w-full bg-base-100'>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">

          <div className='flex flex-wrap gap-2 mb-4'>
            <button type="button" onClick={() => handleDemoLogin('a@gmail.com', 'aA23@#')} className="btn btn-xs btn-outline">Demo Admin</button>
            <button type="button" onClick={() => handleDemoLogin('cr@gmail.com', 'cC23@#')} className="btn btn-xs btn-outline">Demo Creator</button>
            <button type="button" onClick={() => handleDemoLogin('w@gmail.com', 'wW23@#')} className="btn btn-xs btn-outline">Demo User</button>
          </div>

          {/* email */}
          <label className="label">Email</label>
          <input type="email" {...register('email', { required: true })} className="input w-full input-bordered" placeholder="Email" />
          {errors.email?.type === 'required' && <p className='text-red-500 font-semibold'>Email is required</p>}

          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password', {
            required: true,
            minLength: 6,
            pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/
          })} className="input w-full input-bordered" placeholder="Password" />
          {
            errors.password?.type === "required" &&
            <p className='text-red-500 font-semibold'>Password is required</p>
          }
          {
            errors.password?.type === "minLength" &&
            <p className='text-red-500 font-semibold'>Password must be 6 character or longer</p>
          }
          {
            errors.password?.type === "pattern" &&
            <p className='text-red-500'>Password must be at least one
              uppercase, at least one lowercase, at least one number and at least one special characters</p>
          }
          <button className="btn bg-base-300 mt-4">Login</button>
        </fieldset>
        <SocialLogin></SocialLogin>
        <p className='mt-2'>New to ConteseVerse? <Link state={location.state} className='underline' to='/register'>Register</Link></p>
      </form>
    </div>
  )
}

export default Login
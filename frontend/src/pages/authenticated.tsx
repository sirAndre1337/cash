import Head from 'next/head'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function Authenticated ()  {
  const [mode,setMode] = useState<'signIn' | 'signUp'>('signIn'); 
 
  const { register,handleSubmit } = useForm();
  const  { signIn, signUp } = useContext(AuthContext);

   function handleSignIn(data: any) {
    if(mode === 'signIn') {
      signIn(data)
         .catch(err => toast.error(err.response?.data.message));
    }

    if(mode === 'signUp') {
      signUp(data)
        .catch(err => toast.error(err.response.data.message))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Authentication</title>
      </Head>
      
      <div className="max-w-sm w-full space-y-8">
        <div className='flex gap-14 text-gray-400 text-lg mb-24'>
            <a onClick={()=> setMode('signIn')} className={`${mode === 'signIn' ? 'border-b-4 border-indigo-500 pb-2' : ''} cursor-pointer`}>Login</a>
            <a onClick={()=> setMode('signUp')} className={`${mode === 'signUp' ? 'border-b-4 border-indigo-500 pb-2' : ''} cursor-pointer`}>Cadastro</a>
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-400">
            {mode === 'signIn' ? 'Realize login no sistema' : 'Cadastra-se no sistema'}
            </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                {...register('username')}
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              {mode === 'signIn' ? 'Entrar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
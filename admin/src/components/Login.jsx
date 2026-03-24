import React from 'react'
import axios from 'axios'
import {useState} from 'react'
import { backendURL } from '../App'
import { toast } from 'react-toastify'

const Login = ({ setToken }) => {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            if (!backendURL) {
                toast.error('Missing VITE_BACKEND_URL in admin settings')
                return
            }

            setLoading(true)
            //console.log(email,password);
            const response = await axios.post(backendURL + '/api/user/admin' , {email,password})
            //console.log(response);
            if(response.data.success){
                setToken(response.data.token)
            }
            else{
                toast.error(response.data.message)
            }
            
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } finally {
            setLoading(false)
            
        }
    }

    return (
        <div className='min-h-screen flex items-center justify-center w-full px-4'>
            <div className='admin-auth-card rounded-2xl px-6 sm:px-8 py-7 max-w-md w-full'>
                <h1 className='text-2xl font-bold mb-1'>Admin Control Panel</h1>
                <p className='text-sm text-slate-500 mb-4'>Sign in to manage products and orders.</p>
                <form onSubmit={onSubmitHandler}>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Email Address</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="email" placeholder='Enter your email' required />
                    </div>
                    <div className='mb-3 min-w-72'>
                        <p className='text-sm font-medium text-gray-700 mb-2'>Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='Enter your password' required />
                    </div>
                    <button disabled={loading} className='mt-2 w-full py-2.5 px-4 rounded-md admin-btn-solid disabled:opacity-70' type="submit"> {loading ? 'Signing in...' : 'Login'} </button>
                </form>
            </div>
        </div>
    )
}

export default Login
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from 'axios'
import { toast } from "react-toastify";

const Login = () =>{

    const [currentState, setCurrentState] = useState('Login')
    const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

    const [name, setName] =  useState('')
    const [password, setPassword] =  useState('')
    const [email, setEmail] =  useState('')

    const onSubmitHandler = async (event)=>{
        event.preventDefault()
        try {
            if(currentState === 'Sign Up'){
                const response = await axios.post(backendUrl + '/api/user/register', {name,email,password})
                //console.log(response.data);
                if(response.data.success){
                    setToken(response.data.token)
                    localStorage.setItem('token',response.data.token)
                }
                else{
                    toast.error(response.data.message)
                }
                
            }
            else{
                const response = await axios.post(backendUrl + '/api/user/login', {email, password})
                //console.log(response.data);
                if(response.data.success){
                    setToken(response.data.token)
                    localStorage.setItem('token',response.data.token)
                } else{
                    toast.error(response.data.message)
                }
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
    useEffect(()=>{
        if(token){
            navigate('/')
        }
    },[token])
    return(
        <div className="py-10 sm:py-16">
        <form onSubmit={onSubmitHandler} className="elev-card flex flex-col items-center w-[95%] sm:max-w-md m-auto p-6 sm:p-8 gap-4 text-gray-800">

            <div className="inline-flex items-center gap-2 mb-2 mt-10">

                <p className="prata-regular text-3xl text-[#17212f]">{currentState}</p>
                <hr className="border-none h-[2px] w-10 bg-gradient-to-r from-[#17212f] to-[#c6a16e]" />

            </div>

            {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" placeholder="Name" required/> }
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" placeholder="Email" required/>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-white" placeholder="Password" required/>

            <div className="w-full flex justify-between text-sm mt-[-8px]"> 
                <p className="cursor-pointer text-gray-500 hover:text-black">Forgot your password?</p>
                {
                    currentState === 'Login' 
                    ? <p onClick={()=>setCurrentState('Sign Up')} className="cursor-pointer text-[#17212f] font-medium">Create Account</p>
                    : <p onClick={()=>setCurrentState('Login')} className="cursor-pointer text-[#17212f] font-medium">Login Here</p>
                }
            </div>

            <button className="btn-primary font-light px-10 py-2.5 mt-4">{currentState === 'Login'? 'Login' : 'Sign Up'}</button>

        </form>
        </div>
    )
} 

export default Login;
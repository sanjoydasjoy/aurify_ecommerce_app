import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

//export const backendURL = import.meta.env.VITE_BACKEND_URL;
export const backendURL = import.meta.env.VITE_BACKEND_URL;
export const currency = '৳'



const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
  const [backendStatus, setBackendStatus] = useState('checking')

  const checkBackendHealth = async () => {
    if (!backendURL) {
      setBackendStatus('missing')
      return
    }

    try {
      await axios.get(`${backendURL}/`)
      setBackendStatus('connected')
    } catch (error) {
      setBackendStatus('disconnected')
      console.log(error)
    }
  }

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    checkBackendHealth()
  }, [])

  useEffect(() => {
    if (!backendURL) {
      toast.error('Missing VITE_BACKEND_URL in admin environment variables')
    }
  }, [])

  return (
    <div className='admin-shell min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} backendStatus={backendStatus} onRetryHealthCheck={checkBackendHealth} />
        :
        <>
          <Navbar setToken={setToken} backendStatus={backendStatus} onRetryHealthCheck={checkBackendHealth} />
          <div className='flex w-full gap-5 px-4 sm:px-6 py-5'>
            <Sidebar backendStatus={backendStatus} />
            <div className='admin-content flex-1 text-gray-600 text-base'>
              <Routes>
                <Route path="/" element={<List token={token} />} /> {/* Default Route */}
                <Route path='/add' element={<Add token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }

    </div>

  )
}

export default App
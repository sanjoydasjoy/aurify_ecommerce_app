import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import Title from '../components/Title'

const Profile = () => {
    const { token, backendUrl, navigate } = useContext(ShopContext)
    const [profile, setProfile] = useState(null)
    const [stats, setStats] = useState(null)
    const [recentOrders, setRecentOrders] = useState([])
    const [loading, setLoading] = useState(true)

    const formatMoney = (value) => `৳${Number(value || 0).toLocaleString()}`
    const formatDate = (value) => {
        if (!value) return 'N/A'
        const date = new Date(value)
        if (Number.isNaN(date.getTime())) return 'N/A'
        return date.toLocaleDateString()
    }

    const initials = (profile?.name || 'A')
        .split(' ')
        .map((item) => item[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()

    const loadProfile = async () => {
        if (!token) {
            navigate('/login')
            return
        }

        try {
            const response = await axios.get(backendUrl + '/api/user/profile', { headers: { token } })
            if (response.data.success) {
                setProfile(response.data.user)
                setStats(response.data.stats || null)
                setRecentOrders(response.data.recentOrders || [])
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadProfile()
    }, [token])

    return (
        <div className='border-t border-slate-200 pt-12 min-h-[70vh]'>
            <div className='text-2xl'>
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            {loading ? (
                <div className='surface-card p-6 sm:p-8 mt-4'>
                    <p className='text-gray-500'>Loading profile...</p>
                </div>
            ) : (
                <div className='grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr] gap-5 mt-4'>
                    <div className='surface-card p-6 sm:p-8'>
                        <div className='flex items-center gap-4'>
                            <div className='w-14 h-14 rounded-full bg-[#111722] text-white grid place-items-center font-semibold text-lg'>
                                {initials}
                            </div>
                            <div>
                                <p className='text-xs uppercase tracking-[0.14em] text-gray-500'>Account Holder</p>
                                <p className='text-xl font-semibold mt-1'>{profile?.name || '-'}</p>
                            </div>
                        </div>

                        <div className='mt-6 space-y-4'>
                            <div>
                                <p className='text-xs uppercase tracking-[0.14em] text-gray-500'>Email</p>
                                <p className='text-base font-medium mt-1 break-all'>{profile?.email || '-'}</p>
                            </div>
                            <div>
                                <p className='text-xs uppercase tracking-[0.14em] text-gray-500'>Member Since</p>
                                <p className='text-base font-medium mt-1'>{formatDate(stats?.memberSince)}</p>
                            </div>
                            <div>
                                <p className='text-xs uppercase tracking-[0.14em] text-gray-500'>Last Order</p>
                                <p className='text-base font-medium mt-1'>{formatDate(stats?.lastOrderDate)}</p>
                            </div>
                        </div>

                        <button onClick={() => navigate('/orders')} className='btn-primary px-6 py-2.5 text-sm mt-6'>
                            View All Orders
                        </button>
                    </div>

                    <div className='space-y-5'>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='elev-card p-5'>
                                <p className='text-xs uppercase tracking-[0.14em] text-gray-500'>Total Orders</p>
                                <p className='text-3xl font-semibold mt-2 text-[#17212f]'>{stats?.totalOrders || 0}</p>
                            </div>
                            <div className='elev-card p-5'>
                                <p className='text-xs uppercase tracking-[0.14em] text-gray-500'>Total Spent</p>
                                <p className='text-3xl font-semibold mt-2 text-[#17212f]'>{formatMoney(stats?.totalSpent)}</p>
                            </div>
                        </div>

                        <div className='surface-card p-5 sm:p-6'>
                            <p className='text-xs uppercase tracking-[0.14em] text-gray-500 mb-4'>Recent Orders</p>

                            {!recentOrders.length ? (
                                <p className='text-sm text-gray-500'>No orders yet. Your future orders will appear here.</p>
                            ) : (
                                <div className='space-y-3'>
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className='border border-gray-200 rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3'>
                                            <div>
                                                <p className='text-sm font-semibold text-[#17212f]'>
                                                    {formatMoney(order.amount)} · {order.itemCount} item{order.itemCount > 1 ? 's' : ''}
                                                </p>
                                                <p className='text-xs text-gray-500 mt-1'>
                                                    {order.paymentMethod} · {formatDate(order.date)}
                                                </p>
                                            </div>
                                            <span className='subtle-tag px-3 py-1 text-xs'>{order.status}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile

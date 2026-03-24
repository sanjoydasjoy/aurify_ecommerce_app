import React from 'react'
import { assets } from '../assets/assets'

const Navbar = ({ setToken, backendStatus, onRetryHealthCheck }) => {
    const statusLabel =
        backendStatus === 'connected'
            ? 'Backend Connected'
            : backendStatus === 'disconnected'
                ? 'Backend Disconnected'
                : backendStatus === 'missing'
                    ? 'Missing Backend URL'
                    : 'Checking Backend'

    const statusClass =
        backendStatus === 'connected'
            ? 'status-ok'
            : backendStatus === 'disconnected' || backendStatus === 'missing'
                ? 'status-bad'
                : 'status-warn'

    return (
        <div className='admin-topbar flex items-center py-3 px-4 sm:px-6 justify-between'>
            <img src={assets.logo} alt="logo" className="w-32 sm:w-36 h-auto" />

            <div className='flex items-center gap-2 sm:gap-3'>
                <span className={`status-pill ${statusClass}`}>{statusLabel}</span>
                <button onClick={onRetryHealthCheck} className='admin-btn-outline text-xs sm:text-sm'>Retry</button>
                <button onClick={() => setToken('')} className='admin-btn-solid text-xs sm:text-sm'>Logout</button>
            </div>
        </div>
    );
};

export default Navbar
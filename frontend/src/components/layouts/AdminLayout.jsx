import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import api from '../../lib/axios'

import {
    FiLogOut,
    FiUsers,
    FiMessageSquare,
    FiShield,
    FiHome
} from 'react-icons/fi'

export default function AdminLayout({ children }) {
    const location = useLocation()
    const navigate = useNavigate()

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const res = await api.post('/api/v1/logout')
            return res.data
        },
        onSuccess: () => navigate('/login'),
        onError: () => alert('Logout failed')
    })

    const handleLogout = (e) => {
        e.preventDefault()
        logoutMutation.mutate()
    }

    const isActive = (path) => location.pathname.startsWith(path)

    return (
        <div className="min-h-screen bg-gray-50 flex">

            {/* ===== Sidebar ===== */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">

                {/* Brand */}
                <div className="px-6 py-5 border-b border-gray-200 flex items-center gap-3">
                    <div className="bg-indigo-600 text-white p-2 rounded-xl shadow">
                        <FiShield size={18} />
                    </div>

                    <span className="font-semibold text-gray-900">
                        Admin Panel
                    </span>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-4 space-y-2">

                    <Link
                        to="/admin/tickets"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
                        ${isActive('/admin/tickets')
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <FiMessageSquare size={18} />
                        Tickets
                    </Link>

                    <Link
                        to="/admin/users"
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium
                        ${isActive('/admin/users')
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                    >
                        <FiUsers size={18} />
                        Users
                    </Link>

                </nav>

            </aside>

            {/* ===== Main Area ===== */}
            <div className="flex-1 flex flex-col">

                {/* ===== Top Navbar ===== */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">

                    {/* Left */}
                    <div className="flex items-center gap-3 text-gray-900 font-semibold">
                        <FiHome />
                        Dashboard
                    </div>

                    {/* Right: Profile + Logout */}
                    <div className="flex items-center gap-5">

                        {/* Profile */}
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition">

                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold shadow-sm">
                                A
                            </div>

                            <div className="hidden sm:block leading-tight">
                                <p className="text-sm font-medium text-gray-900">
                                    Admin
                                </p>
                                <p className="text-xs text-gray-500">
                                    Super User
                                </p>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-6 w-px bg-gray-200" />

                        {/* Logout */}
                        <button
                            onClick={handleLogout}
                            disabled={logoutMutation.isLoading}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-600 transition"
                        >
                            <FiLogOut size={18} />

                            {logoutMutation.isLoading
                                ? 'Signing out...'
                                : 'Logout'}
                        </button>

                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8">
                    {children}
                </main>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 px-6 py-4 text-sm text-gray-500 flex justify-between">
                    <span>© {new Date().getFullYear()} Admin Panel</span>
                    <span className="hidden sm:block">
                        Built with Laravel & React
                    </span>
                </footer>

            </div>
        </div>
    )
}

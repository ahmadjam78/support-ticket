import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import api from '../../lib/axios'

import {
    FiLogOut,
    FiUser,
    FiMessageSquare
} from 'react-icons/fi'

export default function CustomerLayout({ children }) {
    const navigate = useNavigate()

    const logoutMutation = useMutation({
        mutationFn: async () => {
            const res = await api.post('/api/v1/logout')
            return res.data
        },
        onSuccess: () => navigate('/login'),
        onError: (error) => {
            console.error('Logout failed:', error)
            alert('Logout failed. Please try again.')
        }
    })

    const handleLogout = (e) => {
        e.preventDefault()
        logoutMutation.mutate()
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* ===== Top Navbar ===== */}
            <header className="bg-white/80 backdrop-blur border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                    {/* Brand */}
                    <Link
                        to="/tickets"
                        className="flex items-center gap-3 group"
                    >
                        <div className="bg-blue-600 text-white p-2 rounded-xl shadow-sm group-hover:shadow-md transition">
                            <FiMessageSquare size={18} />
                        </div>

                        <span className="text-lg font-semibold tracking-tight text-gray-900">
                            Support Ticket
                        </span>
                    </Link>

                    {/* Right Side */}
                    <div className="flex items-center gap-5">

                        {/* Profile */}
                        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition">

                            {/* Avatar */}
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-sm">
                                C
                            </div>

                            <div className="hidden sm:block leading-tight">
                                <p className="text-sm font-medium text-gray-900">
                                    Customer
                                </p>
                                <p className="text-xs text-gray-500">
                                    User Panel
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
                </div>
            </header>

            {/* ===== Main Content ===== */}
            <main className="flex-1">
                <div className="max-w-7xl mx-auto w-full px-6 py-8">
                    {children}
                </div>
            </main>

            {/* ===== Footer ===== */}
            <footer className="bg-white border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between text-sm text-gray-500">

                    <span>
                        © {new Date().getFullYear()} Support Ticket
                    </span>

                    <span className="hidden sm:block">
                        Built with Laravel & React
                    </span>

                </div>
            </footer>

        </div>
    )
}

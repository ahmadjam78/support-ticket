import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../../lib/axios'

import { FiUser, FiMail, FiLock, FiCheck } from 'react-icons/fi'

export default function RegisterPage() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            await api.post('/api/v1/register', data)
            navigate('/login')
        } catch {
            alert('Registration failed')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6"
                >

                    {/* Header */}
                    <div className="text-center space-y-2">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Create Account
                        </h1>
                        <p className="text-sm text-gray-500">
                            Join Support Desk today
                        </p>
                    </div>

                    {/* Name */}
                    <div className="space-y-1 relative">
                        <label className="text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                {...register('name')}
                                type="text"
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1 relative">
                        <label className="text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                {...register('email')}
                                type="email"
                                placeholder="you@example.com"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1 relative">
                        <label className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-1 relative">
                        <label className="text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <FiCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                {...register('password_confirmation')}
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-semibold py-2.5 rounded-lg shadow-sm hover:shadow transition"
                    >
                        <FiUser size={20} />
                        Register
                    </button>

                    {/* Footer */}
                    <p className="text-sm text-center text-gray-500">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>

                </form>

                <p className="text-center text-xs text-gray-400 mt-6">
                    © {new Date().getFullYear()} Support Ticket
                </p>

            </div>
        </div>
    )
}

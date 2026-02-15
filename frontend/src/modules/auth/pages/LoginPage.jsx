import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import api from '../../../lib/axios'
import { useAuth } from '../../../context/AuthContext'

import { FiMail, FiLock, FiLogIn } from 'react-icons/fi'

export default function LoginPage() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()
    const { setUser } = useAuth()

    const onSubmit = async (data) => {
        try {
            await api.get('/sanctum/csrf-cookie')
            await api.post('/api/v1/login', data)

            const res = await api.get('/api/v1/user')
            const user = res.data.data

            setUser(user)
            navigate(user.role === 'admin' ? '/admin/tickets' : '/tickets')

        } catch {
            alert('Invalid credentials')
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
                            Welcome Back
                        </h1>
                        <p className="text-sm text-gray-500">
                            Sign in to your account
                        </p>
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
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
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
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-2.5 rounded-lg shadow-sm hover:shadow transition"
                    >
                        <FiLogIn size={20} />
                        Sign in
                    </button>

                    {/* Footer */}
                    <p className="text-sm text-center text-gray-500">
                        Don’t have an account?{' '}
                        <Link
                            to="/register"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Create one
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

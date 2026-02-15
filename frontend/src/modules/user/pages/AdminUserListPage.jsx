import { useQuery } from '@tanstack/react-query'
import api from '../../../lib/axios'

import {
    FiUser,
    FiMail,
    FiShield,
} from 'react-icons/fi'

export default function AdminUserListPage() {

    const { data, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await api.get('/api/v1/admin/users')
            return res.data.data
        }
    })

    if (isLoading) return <div className="p-8">Loading...</div>

    const roleStyles = {
        admin: 'bg-indigo-100 text-indigo-700',
        customer: 'bg-green-100 text-green-700',
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                <p className="text-gray-500 mt-1">
                    Manage system users and permissions
                </p>
            </div>

            {/* User Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {data.map(user => (
                    <div
                        key={user.id}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition p-5 flex flex-col justify-between"
                    >

                        {/* Top */}
                        <div className="flex items-center gap-4">

                            {/* Avatar */}
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-semibold text-lg shadow">
                                {user.name?.charAt(0).toUpperCase()}
                            </div>

                            {/* Name & Email */}
                            <div>
                                <h2 className="font-semibold text-gray-900">
                                    {user.name}
                                </h2>

                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                    <FiMail size={14} />
                                    {user.email}
                                </div>
                            </div>
                        </div>

                        {/* Bottom */}
                        <div className="mt-5 flex items-center justify-between">

                            {/* Role */}
                            <span
                                className={`flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full capitalize
                                ${roleStyles[user.role] || 'bg-gray-100 text-gray-700'}
                                `}
                            >
                                <FiShield size={12} />
                                {user.role}
                            </span>

                            {/* ID */}
                            <span className="text-xs text-gray-400">
                                ID #{user.id}
                            </span>

                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}

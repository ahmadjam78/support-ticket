import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../lib/axios'

import {
    FiUser,
    FiMessageSquare,
    FiClock,
    FiChevronRight,
    FiTrash2
} from 'react-icons/fi'
import AdminTicketModal from "../components/AdminTicketModal"

export default function AdminTicketListPage() {
    const [selectedTicket, setSelectedTicket] = useState(null)
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['adminTickets'],
        queryFn: async () => {
            const res = await api.get('/api/v1/admin/tickets')
            return res.data.data
        }
    })

    // Mutation برای تغییر وضعیت تیکت
    const updateStatusMutation = useMutation({
        mutationFn: async ({ ticketId, status }) => {
            const res = await api.post(`/api/v1/admin/tickets/${ticketId}/${status}`)
            return res.data
        },
        onSuccess: () => queryClient.invalidateQueries(['adminTickets'])
    })

    // Mutation برای حذف تیکت
    const deleteTicketMutation = useMutation({
        mutationFn: async (ticketId) => {
            const res = await api.delete(`/api/v1/admin/tickets/${ticketId}`)
            return res.data
        },
        onSuccess: () => queryClient.invalidateQueries(['adminTickets'])
    })

    if (isLoading) return <div className="p-8">Loading...</div>

    const statusStyles = {
        open: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        closed: 'bg-gray-200 text-gray-700',
    }

    const statusOptions = ['open', 'pending', 'closed']

    return (
        <div className="space-y-6">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">All Tickets</h1>
                <p className="text-gray-500 mt-1">
                    Manage and respond to customer support requests
                </p>
            </div>

            {/* Ticket List */}
            <div className="grid gap-4">
                {data.map(ticket => (
                    <div
                        key={ticket.id}
                        className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition p-5 flex items-center justify-between"
                    >
                        {/* Left */}
                        <div className="space-y-2 flex-1 cursor-pointer" onClick={() => setSelectedTicket(ticket)}>

                            {/* Subject */}
                            <div className="flex items-center gap-2 text-gray-900 font-semibold">
                                <FiMessageSquare className="text-indigo-500" />
                                {ticket.subject}
                            </div>

                            {/* User */}
                            <div className="flex items-center gap-3 text-sm text-gray-500">
                                <FiUser />
                                <span>{ticket.user?.name}</span>

                                <FiClock className="ml-2" />
                                <span>
                                    {new Date(ticket.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="flex items-center gap-3">

                            {/* Status Dropdown */}
                            <select
                                className={`px-4 py-1 text-xs font-medium rounded-full capitalize cursor-pointer
                                    ${statusStyles[ticket.status] || 'bg-gray-100 text-gray-700'}
                                `}
                                value={ticket.status}
                                onChange={(e) => {
                                    e.stopPropagation()
                                    updateStatusMutation.mutate({
                                        ticketId: ticket.id,
                                        status: e.target.value
                                    })
                                }}
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>

                            {/* Delete Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    if (confirm(`Are you sure you want to delete ticket #${ticket.id}?`)) {
                                        deleteTicketMutation.mutate(ticket.id)
                                    }
                                }}
                                className="text-red-500 hover:text-red-700 p-1 rounded-full transition"
                                title="Delete Ticket"
                            >
                                <FiTrash2 size={18} />
                            </button>

                            <FiChevronRight className="text-gray-400" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedTicket && (
                <AdminTicketModal
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                />
            )}
        </div>
    )
}

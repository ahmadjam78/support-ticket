import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import api from '../../../lib/axios'
import TicketModal from "../components/TicketModal";

export default function TicketListPage() {
    const [selectedTicket, setSelectedTicket] = useState(null)

    const { data, isLoading, error } = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const res = await api.get('/api/v1/customer/tickets')
            return res.data
        },
    })

    if (isLoading)
        return <div className="p-6 text-gray-500">Loading tickets...</div>

    if (error)
        return <div className="p-6 text-red-500">Error loading tickets</div>

    const getStatusColor = (status) => {
        switch (status) {
            case 'open':
                return 'bg-green-100 text-green-700'
            case 'pending':
                return 'bg-yellow-100 text-yellow-700'
            case 'closed':
                return 'bg-gray-200 text-gray-700'
            default:
                return 'bg-gray-100 text-gray-600'
        }
    }

    return (
        <div className="max-w-5xl mx-auto">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    My Tickets
                </h1>

                <Link
                    to="/tickets/new"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition"
                >
                    + New Ticket
                </Link>
            </div>

            {/* Ticket List */}
            <div className="space-y-4">
                {data.data.map(ticket => (
                    <div
                        key={ticket.id}
                        className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                    >
                        <div className="flex justify-between items-start">

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    {ticket.subject}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Ticket #{ticket.id}
                                </p>
                            </div>

                            <span
                                className={`px-3 py-1 text-sm rounded-full font-medium ${getStatusColor(ticket.status)}`}
                            >
                                {ticket.status}
                            </span>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setSelectedTicket(ticket)}
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                View Conversation →
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal — Ticket Detail */}
            {selectedTicket && (
                <TicketModal
                    ticket={selectedTicket}
                    onClose={() => setSelectedTicket(null)}
                />
            )}
        </div>
    )
}


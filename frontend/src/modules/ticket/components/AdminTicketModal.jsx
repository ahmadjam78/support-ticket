import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../../../lib/axios'

import {
    FiX,
    FiPaperclip,
    FiDownload,
    FiSend,
    FiUser,
    FiClock,
} from 'react-icons/fi'

export default function AdminTicketModal({ ticket, onClose }) {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['adminTicket', ticket.id],
        queryFn: async () => {
            const res = await api.get(`/api/v1/admin/tickets/${ticket.id}`)
            return res.data
        },
    })

    const [message, setMessage] = useState('')
    const [attachments, setAttachments] = useState([])
    const [isSending, setIsSending] = useState(false)

    const handleSend = async () => {
        if (!message && attachments.length === 0) return

        const formData = new FormData()
        formData.append('message', message)
        attachments.forEach(file => formData.append('attachments[]', file))

        setIsSending(true)

        try {
            await api.post(
                `/api/v1/admin/tickets/${ticket.id}/reply`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            )

            setMessage('')
            setAttachments([])

            queryClient.invalidateQueries(['adminTicket', ticket.id])

        } catch {
            alert('Error sending reply')
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center p-5 border-b bg-indigo-600 text-white">
                    <div>
                        <h2 className="text-xl font-semibold">{ticket.subject}</h2>
                        <p className="text-sm opacity-90">Ticket #{ticket.id}</p>
                    </div>

                    <button onClick={onClose} className="hover:bg-white/20 rounded-full p-2 transition">
                        <FiX size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4 max-h-[350px]">

                    {isLoading && <p>Loading messages...</p>}

                    {data?.messages?.map(msg => {
                        const isCustomer = msg.user?.role === 'customer'

                        return (
                            <div key={msg.id} className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}>
                                <div className={`max-w-[75%] rounded-2xl px-4 py-3 shadow
                                    ${isCustomer
                                    ? 'bg-white border border-gray-300'
                                    : 'bg-indigo-100'
                                }`}
                                >
                                    <div className="flex items-center gap-2 text-xs opacity-80 mb-1">
                                        <FiUser size={12} />
                                        <span>{msg.user?.name}</span>
                                        <FiClock size={12} />
                                        <span>{new Date(msg.created_at).toLocaleString()}</span>
                                    </div>

                                    <p className="text-sm whitespace-pre-line">{msg.message}</p>

                                    {msg.attachments?.map(file => (
                                        <a
                                            key={file.id}
                                            href={file.original_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="mt-2 flex items-center justify-between bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm"
                                        >
                                            <span className="truncate">{file.file_name}</span>
                                            <FiDownload />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Reply Box */}
                <div className="p-5 bg-gray-50 flex items-center gap-2">

                    <textarea
                        placeholder="Reply to customer..."
                        className="flex-1 border rounded-xl p-3 resize-none"
                        rows={2}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />

                    <input
                        type="file"
                        multiple
                        className="hidden"
                        id="admin-reply-attachments"
                        onChange={e => setAttachments([...e.target.files])}
                    />

                    <label htmlFor="admin-reply-attachments" className="p-3 bg-gray-200 rounded-xl cursor-pointer">
                        <FiPaperclip size={20} />
                    </label>

                    <button
                        onClick={handleSend}
                        disabled={isSending}
                        className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50"
                    >
                        <FiSend size={20} />
                    </button>
                </div>

            </div>
        </div>
    )
}

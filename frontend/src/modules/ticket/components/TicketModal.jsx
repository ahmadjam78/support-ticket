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

function TicketModal({ ticket, onClose }) {
    const queryClient = useQueryClient()
    const { data, isLoading } = useQuery({
        queryKey: ['ticket', ticket.id],
        queryFn: async () => {
            const res = await api.get(`/api/v1/customer/tickets/${ticket.id}`)
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
        attachments.forEach((file) => formData.append('attachments[]', file))

        setIsSending(true)
        try {
            await api.post(`/api/v1/customer/tickets/${ticket.id}/reply`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            setMessage('')
            setAttachments([])
            queryClient.invalidateQueries(['ticket', ticket.id]) // Refetch messages
        } catch (err) {
            console.error(err)
            alert('Error sending reply')
        } finally {
            setIsSending(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col">

                {/* ===== Header ===== */}
                <div className="flex justify-between items-center p-5 border-b bg-blue-600 text-white rounded-t-2xl">
                    <div>
                        <h2 className="text-xl font-semibold">{ticket.subject}</h2>
                        <p className="text-sm opacity-90 mt-0.5">Ticket #{ticket.id}</p>
                    </div>
                    <button onClick={onClose} className="hover:bg-white/20 rounded-full p-2 transition">
                        <FiX size={20} />
                    </button>
                </div>

                {/* ===== Messages ===== */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50 space-y-4 max-h-[350px]">
                    {isLoading && <p className="text-gray-500">Loading messages...</p>}

                    {data?.messages?.map(msg => {
                        const isCustomer = msg.user?.role === 'customer'

                        return (
                            <div key={msg.id} className={`flex ${isCustomer ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] rounded-2xl px-4 py-3 flex flex-col shadow
                                    ${isCustomer
                                    ? 'bg-blue-100 text-gray-900 rounded-br-md rounded-tl-2xl'
                                    : 'bg-gray-100 text-gray-800 border border-gray-300 rounded-bl-md rounded-tr-2xl'
                                }`}>
                                    {/* Sender Info */}
                                    <div className="flex items-center gap-2 text-xs opacity-80 mb-1">
                                        <FiUser size={12} />
                                        <span>{msg.user?.name || 'User'}</span>
                                        <FiClock size={12} />
                                        <span>{new Date(msg.created_at).toLocaleString()}</span>
                                    </div>

                                    {/* Message Text */}
                                    <p className="text-sm whitespace-pre-line">{msg.message}</p>

                                    {/* Attachments */}
                                    {msg.attachments?.length > 0 && (
                                        <div className="mt-2 flex flex-col gap-1">
                                            {msg.attachments.map(file => (
                                                <a
                                                    key={file.id}
                                                    href={file.original_url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center justify-between bg-white hover:bg-gray-50 px-3 py-2 rounded-lg text-sm transition"
                                                >
                                                    <div className="flex items-center gap-2 truncate max-w-[200px]">
                                                        <FiPaperclip />
                                                        <span className="truncate">{file.file_name}</span>
                                                    </div>
                                                    <FiDownload />
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* ===== Reply Box ===== */}
                <div className="p-5 bg-gray-50 flex items-center gap-2">
                    {/* Textarea */}
                    <textarea
                        placeholder="Write your reply..."
                        className="flex-1 border border-gray-300 rounded-xl p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none resize-none bg-white placeholder-gray-400"
                        rows={2}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    {/* Attach Icon */}
                    <input
                        type="file"
                        multiple
                        className="hidden"
                        id="reply-attachments"
                        onChange={(e) => setAttachments([...e.target.files])}
                    />
                    <label htmlFor="reply-attachments" className="p-3 bg-gray-200 rounded-xl hover:bg-gray-300 cursor-pointer transition">
                        <FiPaperclip size={20} />
                    </label>

                    {/* Send Icon */}
                    <button
                        onClick={handleSend}
                        disabled={isSending}
                        className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition flex items-center justify-center shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FiSend size={20} />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default TicketModal

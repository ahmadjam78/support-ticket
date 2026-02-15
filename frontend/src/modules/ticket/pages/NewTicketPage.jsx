import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import api from '../../../lib/axios'
import { FiFileText, FiFile, FiArrowLeft, FiSend, FiChevronDown, FiUpload } from 'react-icons/fi'
import { useMutation } from '@tanstack/react-query'

export default function NewTicketPage() {
    const { register, handleSubmit, reset, watch, setValue } = useForm()
    const navigate = useNavigate()
    const attachment = watch('attachment')
    const selectedCategory = watch('category')
    const selectedSubcategory = watch('subcategory')

    const [categories, setCategories] = useState([])
    const [subcategories, setSubcategories] = useState([])

    // Fetch categories from API
    useEffect(() => {
        api.get('/api/v1/customer/ticket-categories')
            .then(res => setCategories(res.data.data))
            .catch(err => console.error(err))
    }, [])

    // Update subcategories when category changes
    useEffect(() => {
        if (!selectedCategory) {
            setSubcategories([])
            setValue('subcategory', '')
            return
        }
        const category = categories.find(c => c.id === parseInt(selectedCategory))
        setSubcategories(category?.children || [])
        setValue('subcategory', '')
    }, [selectedCategory, categories, setValue])

    const createTicketMutation = useMutation({
        mutationFn: async (formData) => {
            const res = await api.post('/api/v1/customer/tickets', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            return res.data
        },
        onSuccess: () => {
            alert('Ticket created successfully!')
            reset()
            navigate('/tickets')
        },
        onError: (err) => {
            console.error(err)
            alert('Failed to create ticket')
        },
    })

    const onSubmit = (data) => {
        if (!data.category || !data.subcategory) {
            setErrorMessage('Please select Category and Subcategory first.')
            return
        }

        const formData = new FormData()

        formData.append('subject', data.subject)
        formData.append('description', data.description)
        formData.append('priority', data.priority || 'medium')

        // category = leaf node
        formData.append('category_id', parseInt(data.subcategory))

        // attachment
        if (data.attachment?.[0]) {
            formData.append('attachments[]', data.attachment[0])
        }

        createTicketMutation.mutate(formData)
    }


    const showForm = selectedCategory && selectedSubcategory

    const canSubmit =
        selectedCategory &&
        selectedSubcategory &&
        !createTicketMutation.isLoading

    return (
        <div className="max-w-5xl mx-auto mt-10 px-4">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition"
                >
                    <FiArrowLeft size={20} />
                    Back
                </button>
                <h1 className="text-2xl font-bold ml-4">Create New Ticket</h1>
            </div>

            {/* ===== Category & Subcategory ===== */}
            <div className="space-y-4 mb-6">
                {/* Category */}
                <div className="relative">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                        <FiChevronDown />
                        Category
                    </label>
                    <select
                        {...register('category')}
                        className="w-full mt-1 p-2.5 rounded-lg border border-gray-300
                                   focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                        defaultValue=""
                    >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                {/* Subcategory */}
                {subcategories.length > 0 && (
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <FiChevronDown />
                            Subcategory
                        </label>
                        <select
                            {...register('subcategory')}
                            className="w-full mt-1 p-2.5 rounded-lg border border-gray-300
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                            defaultValue=""
                        >
                            <option value="">Select subcategory</option>
                            {subcategories.map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.name}</option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* ===== Message when Category/Subcategory not selected ===== */}
            {!showForm && (
                <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg mb-4 transition-opacity duration-300">
                    Please select both Category and Subcategory to continue.
                </div>
            )}

            {/* ===== Form Fields (Tailwind Fade-In) ===== */}
            <div
                className={`transition-all duration-300 ease-in-out ${
                    showForm ? 'opacity-100 max-h-[2000px] mb-6' : 'opacity-0 max-h-0'
                }`}
            >
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-xl rounded-2xl border border-gray-100 p-8 space-y-6"
                >
                    {/* Subject */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <FiFileText />
                            Subject
                        </label>
                        <input
                            {...register('subject')}
                            placeholder="Enter ticket subject"
                            className="mt-2 w-full px-4 py-2.5 rounded-lg border border-gray-300
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <FiFile />
                            Description
                        </label>
                        <textarea
                            {...register('description')}
                            placeholder="Describe your issue..."
                            className="mt-2 w-full px-4 pt-2.5 pb-2.5 rounded-lg border border-gray-300
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition h-40 resize-none"
                            required
                        />
                    </div>

                    {/* Attachment */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <FiUpload />
                            Attachment
                        </label>
                        <input
                            {...register('attachment')}
                            type="file"
                            className="hidden"
                            id="attachment"
                        />
                        <label
                            htmlFor="attachment"
                            className="mt-2 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer
                                       hover:bg-gray-50 transition"
                        >
                            <FiFile className="text-gray-500" />
                            {attachment?.[0]?.name || 'Choose a file...'}
                        </label>
                        <p className="text-xs text-gray-400 mt-1">
                            Optional. You can attach an image or PDF.
                        </p>
                    </div>

                    {/* Priority */}
                    <div className="relative">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                            <FiChevronDown />
                            Priority
                        </label>
                        <select
                            {...register('priority')}
                            className="w-full mt-1 p-2.5 rounded-lg border border-gray-300
                                       focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                            defaultValue="medium"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className={`w-full flex items-center justify-center gap-2
        text-white font-semibold py-2.5 rounded-lg shadow-sm transition
        ${
                            canSubmit
                                ? 'bg-blue-600 hover:bg-blue-700'
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >

                    <FiSend size={20} />
                        {createTicketMutation.isLoading ? 'Submitting...' : 'Submit Ticket'}
                    </button>
                </form>
            </div>
        </div>
    )
}

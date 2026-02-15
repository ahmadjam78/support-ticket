export default function TicketDetailPage() {
    return (
        <div>
            <h1 className="text-xl font-bold mb-4">
                Ticket #123 — Cannot login
            </h1>

            <div className="space-y-3 mb-6">
                <div className="bg-white p-3 shadow rounded">
                    <strong>You:</strong>
                    <p>I cannot login to my account.</p>
                </div>

                <div className="bg-gray-100 p-3 shadow rounded">
                    <strong>Support:</strong>
                    <p>Please reset your password.</p>
                </div>
            </div>

            <form className="space-y-3">
                <textarea
                    placeholder="Write your reply..."
                    className="border p-2 w-full h-32"
                />

                <button className="bg-green-600 text-white px-4 py-2 rounded">
                    Send Reply
                </button>
            </form>
        </div>
    );
}

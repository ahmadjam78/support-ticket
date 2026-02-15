import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function LoginPage() {
    return <h1>Login Page</h1>
}

function Dashboard() {
    return <h1>Dashboard</h1>
}

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    )
}

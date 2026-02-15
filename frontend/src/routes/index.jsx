import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginPage from '../modules/auth/pages/LoginPage'
import RegisterPage from '../modules/auth/pages/RegisterPage'

import TicketListPage from '../modules/ticket/pages/TicketListPage'
import NewTicketPage from '../modules/ticket/pages/NewTicketPage'

import AdminTicketListPage from '../modules/ticket/pages/AdminTicketListPage'
import AdminUserListPage from '../modules/user/pages/AdminUserListPage'
import CustomerLayout from '../components/layouts/CustomerLayout'
import AdminLayout from '../components/layouts/AdminLayout'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/register" element={<RegisterPage/>}/>

                <Route
                    path="/tickets"
                    element={
                        <ProtectedRoute role="customer">
                                <CustomerLayout>
                                    <TicketListPage/>
                                </CustomerLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/tickets/new"
                    element={
                        <ProtectedRoute role="customer">
                                <CustomerLayout>
                                    <NewTicketPage/>
                                </CustomerLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/tickets"
                    element={
                        <ProtectedRoute role="admin">
                                <AdminLayout>
                                    <AdminTicketListPage/>
                                </AdminLayout>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/users"
                    element={
                        <ProtectedRoute role="admin">
                                <AdminLayout>
                                    <AdminUserListPage/>
                                </AdminLayout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}

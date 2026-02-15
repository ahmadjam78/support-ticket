import { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/axios'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get('/api/v1/user')
                const user = res.data;
                setUser(user.data)
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
                setInitialized(true)
            }
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loading, initialized }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}

"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  devLogin: () => Promise<void>
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock authentication - in real app, this would validate against your backend
    if (email === "user@example.com" && password === "password") {
      const userData = { id: "1", name: "John Doe", email }
      setUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
    } else {
      throw new Error("Invalid credentials")
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock registration - in real app, this would create user in your backend
    const userData = { id: Date.now().toString(), name, email }
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("user")
  }, [])

  const devLogin = useCallback(async () => {
    // Development-only bypass login
    await new Promise((resolve) => setTimeout(resolve, 300)) // Shorter timeout for dev

    const devUserData = {
      id: "dev-user-007",
      name: "Dev User",
      email: "dev@example.com",
    }
    setUser(devUserData)
    localStorage.setItem("user", JSON.stringify(devUserData))
  }, [])

  const value = {
    user,
    login,
    register,
    logout,
    devLogin,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

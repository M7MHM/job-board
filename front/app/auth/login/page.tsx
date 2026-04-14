'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LoginRequest } from '@/types/auth'
import { API_URL } from '../../lib/api'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter();
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

        const data = await res.json()

        if (!res.ok) {
        throw new Error(data.message || "Login failed")
        } 
        localStorage.setItem("token", data.token)

      console.log("Login success:", data)

    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setLoading(false)
    }
    router.push(`/`);
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <Card className="w-full max-w-md">

        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Sign In
          </CardTitle>
          <p className="text-center text-gray-500">
            Welcome back to JobBoard
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    email: e.target.value
                  }))
                }
                required
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    password: e.target.value
                  }))
                }
                required
              />
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Do not have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>

        </CardContent>

      </Card>
    </div>
  )
}
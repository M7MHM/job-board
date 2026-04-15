'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LoginRequest } from '@/types/auth'
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
import { authApi } from '@/lib/api'
import { authUtils } from '@/lib/auth'

export default function LoginPage() {
  const router = useRouter()

  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await authApi.login(formData)

      if (response?.token) {
        authUtils.setToken(response.token)
        router.push('/dashboard')
      } else if (typeof response === 'string') {
        authUtils.setToken(response)
        router.push('/dashboard')
      } else {
        setError('Login failed. Please check your credentials.')
      }

    } catch (err) {
      console.error('Login error:', err)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
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

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

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

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !formData.email || !formData.password}
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
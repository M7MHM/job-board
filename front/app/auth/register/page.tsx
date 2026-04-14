'use client'

import { useState } from 'react'
import Link from 'next/link'
import { RegisterRequest } from '@/types/auth'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from "@/components/ui/card"
import { API_URL } from '@/app/lib/api'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
    const router = useRouter();
  const [formData, setFormData] = useState<RegisterRequest>({
    name: '',
    email: '',
    password: '',
    role: ''
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
         const res = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()

        if (!res.ok) {
        throw new Error(data.message || "Registration failed")
        }

        localStorage.setItem("token", data.token)

        console.log("Register success:", data)
            } catch (error) {
            console.error('Registration failed:', error)
            } finally {
            setLoading(false)
            }
            router.push(`/auth/login`)
            router.refresh();
        }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">

      <Card className="w-full max-w-md">

        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Sign Up
          </CardTitle>
          <p className="text-center text-gray-500">
            Create your JobBoard account
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, email: e.target.value }))
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
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, password: e.target.value }))
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">I am a...</Label>

              <select
                id="role"
                className="border rounded-md p-2"
                value={formData.role}
                onChange={(e) =>
                  setFormData(prev => ({ ...prev, role: e.target.value }))
                }
                required
              >
                <option value="">Select your role</option>
                <option value="Client">
                  Client - I want to hire freelancers
                </option>
                <option value="Freelancer">
                  Freelancer - I want to find work
                </option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>

          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>

        </CardContent>

      </Card>
    </div>
  )
}
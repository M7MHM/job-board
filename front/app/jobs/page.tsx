'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Job } from '@/types/job'
import { jobsApi, applicationsApi } from '@/lib/api'
import { authUtils } from '@/lib/auth'
import Navbar from '@/components/common/Navbar'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function JobsPage() {
  const router = useRouter()

  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [applyingJobs, setApplyingJobs] = useState<Set<number>>(new Set())
  const [message, setMessage] = useState('')

  // 🔐 حماية الصفحة
  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      router.push('/auth/login')
    }
  }, [router])

  // 📦 fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await jobsApi.getAll()
        setJobs(data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  const filteredJobs = useMemo(() => {
    return jobs.filter(job =>
      job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [jobs, searchTerm])

  
  const handleApply = async (jobId: number) => {
    if (!authUtils.isAuthenticated()) {
      router.push('/auth/login')
      return
    }

    setApplyingJobs(prev => new Set(prev).add(jobId))

    try {
      await applicationsApi.apply(jobId)
      setMessage('Applied successfully!')
    } catch (error) {
      console.error(error)
      setMessage('Failed to apply. Try again.')
    } finally {
      setApplyingJobs(prev => {
        const newSet = new Set(prev)
        newSet.delete(jobId)
        return newSet
      })
    }
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-5xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Browse Jobs</h1>
          <p className="text-muted-foreground mt-2">
            Find your next opportunity
          </p>

          <div className="mt-6">
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md mx-auto"
            />
          </div>
        </div>

        {message && (
          <div className="mb-4 text-center text-sm text-green-600">
            {message}
          </div>
        )}

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-6 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-3/4"></div>
          </div>
        ) : (
          <div className="space-y-6">

            {filteredJobs.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No jobs found
              </p>
            ) : (
              filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-md transition">
                  <CardHeader className="flex flex-row justify-between items-start">
                    <div>
                      <CardTitle>{job.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        by {job.clientName}
                      </p>
                    </div>

                    <Badge variant="secondary">
                      {job.status}
                    </Badge>
                  </CardHeader>

                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {job.description}
                    </p>

                    <div className="flex justify-between items-center">
                      
                      <div className="flex gap-2">
                        <Badge variant="outline">React</Badge>
                        <Badge variant="outline">TypeScript</Badge>
                        <Badge variant="outline">Remote</Badge>
                      </div>

                      <Button
                        onClick={() => handleApply(job.id)}
                        disabled={applyingJobs.has(job.id)}
                      >
                        {applyingJobs.has(job.id)
                          ? 'Applying...'
                          : 'Apply'}
                      </Button>

                    </div>
                  </CardContent>
                </Card>
              ))
            )}

          </div>
        )}

      </div>
    </>
  )
}
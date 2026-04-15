'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Job, CreateJobRequest } from '@/types/job'
import { Application } from '@/types/application'
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
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function DashboardPage() {
  const router = useRouter()

  const [userRole] = useState<'Client' | 'Freelancer'>('Client')

  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  const [open, setOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [newJob, setNewJob] = useState<CreateJobRequest>({
    title: '',
    description: ''
  })

  useEffect(() => {
    if (!authUtils.isAuthenticated()) {
      router.push('/auth/login')
    }
  }, [router])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userRole === 'Client') {
          const jobsData = await jobsApi.getAll()
          setJobs(jobsData)

          // mock applications (replace later)
          setApplications([
            {
              id: 1,
              jobTitle: jobsData[0]?.title || '',
              freelancerName: 'Ahmed Hassan',
              status: 'Pending',
              appliedAt: new Date().toISOString()
            }
          ])
        } else {
          const apps = await applicationsApi.getMine()
          setApplications(apps)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userRole])

  const handleCreateJob = async () => {
    setSubmitting(true)

    try {
      await jobsApi.create(newJob)

      setNewJob({ title: '', description: '' })
      setOpen(false)

      const updated = await jobsApi.getAll()
      setJobs(updated)

    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleStatus = async (
    appId: number,
    status: 'Accepted' | 'Rejected'
  ) => {
    try {
      await applicationsApi.updateStatus(appId, status)

      setApplications(prev =>
        prev.map(app =>
          app.id === appId ? { ...app, status } : app
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="p-10 text-center text-muted-foreground">
          Loading dashboard...
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            {userRole} Dashboard
          </h1>

          {userRole === 'Client' && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Post Job</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Job</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <Input
                    placeholder="Job title"
                    value={newJob.title}
                    onChange={(e) =>
                      setNewJob(prev => ({
                        ...prev,
                        title: e.target.value
                      }))
                    }
                  />

                  <Textarea
                    placeholder="Job description"
                    value={newJob.description}
                    onChange={(e) =>
                      setNewJob(prev => ({
                        ...prev,
                        description: e.target.value
                      }))
                    }
                  />
                </div>

                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={handleCreateJob}
                    disabled={submitting}
                  >
                    {submitting ? 'Creating...' : 'Create'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* CLIENT VIEW */}
        {userRole === 'Client' ? (
          <div className="space-y-8">

            {/* Jobs */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                My Jobs
              </h2>

              <div className="space-y-4">
                {jobs.map(job => (
                  <Card key={job.id}>
                    <CardHeader>
                      <CardTitle>{job.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {job.description}
                      </p>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            {/* Applications */}
            <section>
              <h2 className="text-xl font-semibold mb-4">
                Applications
              </h2>

              <div className="space-y-4">
                {applications.map(app => (
                  <Card key={app.id}>
                    <CardContent className="flex justify-between items-center">

                      <div>
                        <p className="font-medium">
                          {app.freelancerName}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {app.jobTitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">

                        <Badge>
                          {app.status}
                        </Badge>

                        {app.status === 'Pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() =>
                                handleStatus(app.id, 'Accepted')
                              }
                            >
                              Accept
                            </Button>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() =>
                                handleStatus(app.id, 'Rejected')
                              }
                            >
                              Reject
                            </Button>
                          </>
                        )}
                      </div>

                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

          </div>
        ) : (
          // FREELANCER VIEW
          <div className="space-y-4">

            {applications.map(app => (
              <Card key={app.id}>
                <CardContent className="flex justify-between items-center">

                  <div>
                    <p className="font-medium">
                      {app.jobTitle}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <Badge>{app.status}</Badge>

                </CardContent>
              </Card>
            ))}

          </div>
        )}

      </div>
    </>
  )
}
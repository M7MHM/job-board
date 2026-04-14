import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Navbar from '@/components/common/Navbar'
import "./globals.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-16 ">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">
            Find Your Next <span className="text-primary">Project</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with talented freelancers or find your dream project. 
            Simple, fast, and effective.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/jobs">Browse Jobs</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/register">Post a Job</Link>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>For Freelancers</CardTitle>
              <CardDescription>Find projects that match your skills</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Browse hundreds of projects, apply with one click, and get hired faster.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Clients</CardTitle>
              <CardDescription>Hire the best talent</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Post your project, review applications, and hire the perfect freelancer.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Simple Process</CardTitle>
              <CardDescription>Three easy steps</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Post or find a job, connect, and get the work done. It,s that simple.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
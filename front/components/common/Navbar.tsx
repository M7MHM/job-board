import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 bg-red-500 text-white">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          JobBoard
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/jobs" className="text-foreground/80 hover:text-foreground">
            Browse Jobs
          </Link>
          <Link href="/dashboard" className="text-foreground/80 hover:text-foreground">
            Dashboard
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
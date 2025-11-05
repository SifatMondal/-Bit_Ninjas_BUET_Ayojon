'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, User, MapPin, LogOut, LayoutDashboard } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Role } from '@prisma/client';
import { LocaleSwitcher } from '@/components/locale-switcher';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Get current locale from cookie
  const currentLocale = typeof window !== 'undefined' 
    ? document.cookie.split(';').find(c => c.trim().startsWith('NEXT_LOCALE='))?.split('=')[1] || 'en'
    : 'en';

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <MapPin className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">Ayojon</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-6">
            <Link
              href="/search"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Browse Services
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              href="/business/register"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              List Your Business
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LocaleSwitcher currentLocale={currentLocale} />

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Auth Buttons */}
            {status === 'loading' ? (
              <div className="h-9 w-24 animate-pulse rounded-md bg-muted" />
            ) : session ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href={session.user.role === Role.BUSINESS ? '/business/dashboard' : session.user.role === Role.ADMIN ? '/admin' : '/dashboard'}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/signin">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <div className="container space-y-2 py-4">
            <Link
              href="/search"
              className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Browse Services
            </Link>
            <Link
              href="/how-it-works"
              className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              How It Works
            </Link>
            <Link
              href="/business/register"
              className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              List Your Business
            </Link>
            <div className="flex gap-2 pt-2">
              {session ? (
                <>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={session.user.role === Role.BUSINESS ? '/business/dashboard' : session.user.role === Role.ADMIN ? '/admin' : '/dashboard'}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => signOut({ callbackUrl: '/' })}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href="/auth/signin">Sign In</Link>
                  </Button>
                  <Button size="sm" className="flex-1" asChild>
                    <Link href="/auth/signup">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

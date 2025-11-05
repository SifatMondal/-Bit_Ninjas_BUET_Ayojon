import Link from 'next/link';
import { MapPin, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <MapPin className="h-6 w-6 text-primary" />
              <span className="font-bold">Ayojon</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Bangladesh&apos;s trusted marketplace for event services and professionals.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* For Users */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">For Users</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-primary">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-primary">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary">
                  My Dashboard
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="text-muted-foreground hover:text-primary">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">For Businesses</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/business/register"
                  className="text-muted-foreground hover:text-primary"
                >
                  List Your Business
                </Link>
              </li>
              <li>
                <Link
                  href="/business/dashboard"
                  className="text-muted-foreground hover:text-primary"
                >
                  Business Dashboard
                </Link>
              </li>
              <li>
                <Link href="/business/pricing" className="text-muted-foreground hover:text-primary">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/business/success-stories" className="text-muted-foreground hover:text-primary">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Ayojon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

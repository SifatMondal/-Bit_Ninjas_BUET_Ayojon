'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MapPin, Mail, Lock, User, Phone, Building2, Chrome } from 'lucide-react';

export default function BusinessRegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: 'Error',
        description: 'Password must be at least 8 characters',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/business/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessName: formData.businessName,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      toast({
        title: 'Success',
        description: 'Business account created successfully!',
      });

      // Auto sign in
      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      router.push('/business/onboarding');
      router.refresh();
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex min-h-screen items-center justify-center py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-2 text-center">
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Ayojon</span>
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight">Register Your Business</h1>
          <p className="text-sm text-muted-foreground">
            Join thousands of service providers on Ayojon
          </p>
        </div>

        {/* Form */}
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Business Name */}
            <div className="space-y-2">
              <label htmlFor="businessName" className="text-sm font-medium">
                Business Name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  id="businessName"
                  type="text"
                  placeholder="e.g., Moments Capture Photography"
                  className="w-full rounded-md border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Owner Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Your Name <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  id="name"
                  type="text"
                  placeholder="Abdul Rahman"
                  className="w-full rounded-md border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Business Email <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  placeholder="contact@yourbusiness.com"
                  className="w-full rounded-md border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  id="phone"
                  type="tel"
                  placeholder="+880 1XXX-XXXXXX"
                  className="w-full rounded-md border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-md border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={8}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-md border bg-background px-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={8}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Register Business'}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By registering, you agree to our Terms of Service and Privacy Policy
            </p>
          </form>
        </div>

        {/* Sign In Link */}
        <p className="text-center text-sm text-muted-foreground">
          Already have a business account?{' '}
          <Link href="/auth/signin" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>

        {/* User Link */}
        <p className="text-center text-sm">
          <Link href="/auth/signup" className="font-medium text-primary hover:underline">
            ← Register as a customer instead
          </Link>
        </p>
      </div>
    </div>
  );
}

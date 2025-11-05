'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Building2, MapPin, FileText, Camera, CheckCircle2 } from 'lucide-react';

export default function BusinessOnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    description: '',
    address: '',
    city: 'Dhaka',
    categories: [] as string[],
  });

  const steps = [
    { number: 1, title: 'Business Details', icon: Building2 },
    { number: 2, title: 'Location', icon: MapPin },
    { number: 3, title: 'Services', icon: FileText },
    { number: 4, title: 'Gallery', icon: Camera },
  ];

  const cities = ['Dhaka', 'Chattogram', 'Rajshahi', 'Sylhet', 'Bogura', 'Khulna'];
  const categories = [
    'Photography',
    'Catering',
    'Makeup Artist',
    'Decorator',
    'Venue',
    'DJ & Sound',
    'Transportation',
  ];

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/business/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to complete onboarding');
      }

      toast({
        title: 'Success!',
        description: 'Your business profile is now complete',
      });

      router.push('/business/dashboard');
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save business details',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCategory = (category: string) => {
    if (formData.categories.includes(category)) {
      setFormData({
        ...formData,
        categories: formData.categories.filter((c) => c !== category),
      });
    } else {
      setFormData({
        ...formData,
        categories: [...formData.categories, category],
      });
    }
  };

  return (
    <div className="container max-w-4xl py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Complete Your Business Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Let&apos;s get your business set up on Ayojon
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-12 flex justify-center">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 ${
                  currentStep >= step.number
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-muted bg-background text-muted-foreground'
                }`}
              >
                {currentStep > step.number ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <step.icon className="h-6 w-6" />
                )}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-16 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="rounded-lg border bg-card p-8 shadow-sm">
        {/* Step 1: Business Details */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Tell us about your business</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Business Description</label>
                <textarea
                  className="w-full rounded-md border bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={6}
                  placeholder="Describe your services, experience, and what makes your business unique..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Where are you located?</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Address</label>
                <input
                  type="text"
                  className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Street address, area, landmarks"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <select
                  className="w-full rounded-md border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Services */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">What services do you offer?</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  className={`rounded-lg border-2 p-4 text-center transition-colors ${
                    formData.categories.includes(category)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Gallery */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Add photos of your work</h2>
            <div className="rounded-lg border-2 border-dashed border-muted p-12 text-center">
              <Camera className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Gallery upload will be available in your dashboard
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                You can skip this for now and add photos later
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          {currentStep < 4 ? (
            <Button onClick={() => setCurrentStep(currentStep + 1)}>Next</Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Completing...' : 'Complete Setup'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

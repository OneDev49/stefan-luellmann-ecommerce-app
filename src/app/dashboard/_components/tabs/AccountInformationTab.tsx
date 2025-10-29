'use client';

import { UserProfile } from '@prisma/client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  profileFormSchema,
  TProfileFormSchema,
} from '@/lib/validations/profile';
import { DEMO_SENTENCE_PREFIX, isDemoMode } from '@/config/site';
import { mockDashboardDB } from '@/lib/data/mockDashboardDB';
import { DashboardUser } from '@/hooks/useDashboardData';

import useSWR from 'swr';
import toast from 'react-hot-toast';
import Button from '@/components/ui/Button';
import FloppyDiskIcon from '@/components/icons/ecommerce/FloppyDiskIcon';

type ProfileData = (UserProfile & { email?: string }) | null;

interface DashboardAccountInformationProps {
  user: DashboardUser;
  initialUserProfile: ProfileData;
}

// Fetcher Definitions
const realFetcher = (url: string) => fetch(url).then((res) => res.json());
const demoFetcher = ([url, userEmail]: [string, string]) => {
  console.log(
    `%c${DEMO_SENTENCE_PREFIX} Fetching profile from localStorage.`,
    'color: #7c3aed'
  );
  return { ...mockDashboardDB.profile.get(), email: userEmail };
};

export default function DashboardAccountInformation({
  user,
  initialUserProfile,
}: DashboardAccountInformationProps) {
  const swrKey = user.email ? ['/api/user/profile'] : null;

  const {
    data: userProfile,
    isLoading: isDataLoading,
    mutate,
  } = useSWR(swrKey, isDemoMode ? demoFetcher : realFetcher, {
    fallbackData: initialUserProfile,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<TProfileFormSchema>({
    resolver: zodResolver(profileFormSchema),
  });

  useEffect(() => {
    if (userProfile) {
      const formData = {
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        phoneNumber: userProfile.phoneNumber || '',
        birthDate: userProfile.birthDate
          ? new Date(userProfile.birthDate).toISOString().split('T')[0]
          : '',
        gender: userProfile.gender || '',
        street: userProfile.street || '',
        zipCode: userProfile.zipCode || '',
        city: userProfile.city || '',
        country: userProfile.country || '',
      };
      reset(formData);
    }
  }, [userProfile, reset]);

  const onSubmit: SubmitHandler<TProfileFormSchema> = async (formData) => {
    // DEMO MODE
    if (isDemoMode) {
      console.log(
        `%c${DEMO_SENTENCE_PREFIX} "Updating" profile in localStorage.`,
        'color: #7c3aed'
      );
      const currentProfile = mockDashboardDB.profile.get();

      const updatedProfile = {
        ...currentProfile,
        ...formData,
        birthDate: formData.birthDate ? new Date(formData.birthDate) : null,
      };

      mockDashboardDB.profile.set(updatedProfile);

      mutate();
      reset(formData);
      toast.success(`${DEMO_SENTENCE_PREFIX} Profile updated!`);
      return;
    }

    // REAL MODE
    toast.promise(
      fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).then(async (res) => {
        if (!res.ok)
          throw new Error((await res.json()).message || 'Failed to update.');
        const updatedData = await res.json();
        mutate({ ...userProfile, ...updatedData }, false);
      }),
      {
        loading: 'Saving changes...',
        success: 'Profile updated successfully!',
        error: (err) => err.message,
      }
    );
  };

  const inputClassNames =
    'peer block w-full rounded-lg border border-[#606060] bg-transparent p-2 text-gray-400 shadow-sm focus-visible:outline-[#00b700] focus-visible:outline-1 focus-visible:outline focus:text-white';

  if (isDataLoading) return <div>Loading...</div>;

  return (
    <div className='pb-12 pt-4 max-w-3xl'>
      <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold'>Personal Info</h2>
          <div className='grid grid-cols-2 gap-x-8 gap-y-6'>
            <div>
              <label htmlFor='firstName'>First Name</label>
              <input
                id='firstName'
                type='text'
                className={inputClassNames}
                {...register('firstName')}
              />
              {errors.firstName && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='lastName'>Last Name</label>
              <input
                id='lastName'
                type='text'
                className={inputClassNames}
                {...register('lastName')}
              />
              {errors.lastName && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='email'>Email Address</label>
              <input
                id='email'
                type='email'
                className={inputClassNames}
                value={userProfile?.email || ''}
                disabled
                readOnly
              />
            </div>
            <div>
              <label htmlFor='phoneNumber'>Phone Number</label>
              <input
                id='phoneNumber'
                type='tel'
                inputMode='tel'
                className={inputClassNames}
                {...register('phoneNumber')}
              />
              {errors.phoneNumber && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='birthDate'>Date of Birth</label>
              <input
                id='birthDate'
                type='date'
                className={inputClassNames}
                {...register('birthDate')}
              />
              {errors.birthDate && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.birthDate.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='gender'>Gender</label>
              <input
                id='gender'
                type='text'
                className={inputClassNames}
                {...register('gender')}
              />
              {errors.gender && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.gender.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='street'>Street Address</label>
              <input
                id='street'
                type='text'
                className={inputClassNames}
                {...register('street')}
              />
              {errors.street && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.street.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='zipCode'>ZIP Code</label>
              <input
                id='zipCode'
                type='text'
                inputMode='numeric'
                pattern='[0-9]*'
                className={inputClassNames}
                {...register('zipCode')}
              />
              {errors.zipCode && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.zipCode.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='city'>City</label>
              <input
                id='city'
                type='text'
                className={inputClassNames}
                {...register('city')}
              />
              {errors.city && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='country'>Country</label>
              <input
                id='country'
                type='text'
                className={inputClassNames}
                {...register('country')}
              />
              {errors.country && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <Button
          as='button'
          type='submit'
          className='w-full justify-center'
          variant='secondary'
          disabled={!isDirty || isSubmitting}
        >
          <FloppyDiskIcon />
          {isSubmitting ? 'Saving...' : 'Apply Changes'}
        </Button>
      </form>
    </div>
  );
}

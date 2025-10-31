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
import LogoutIcon from '@/components/icons/ui/LogoutIcon';
import PenIcon from '@/components/icons/ui/PenIcon';

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
const NOT_GIVE_SENTENCE = 'Not yet Set';

export default function DashboardAccountInformation({
  user,
  initialUserProfile,
}: DashboardAccountInformationProps) {
  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

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
      setIsAddingNew(false);
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

  const labelClassName = 'font-bold';
  const informationContainer = 'grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-8';
  const informationParentClassName = 'flex justify-between gap-2';
  const informationLabelClassName = 'underline  whitespace-nowrap';
  const informationValueClassName = 'text-right';

  if (isDataLoading) return <div>Loading...</div>;

  return (
    <div className='pb-32 pt-12 max-w-3xl space-y-20'>
      <div className='flex flex-col top-20 max-w-2xl rounded-md border border-gray-700 shadow-lg shadow-gray-800 overflow-hidden'>
        <h2 className='text-2xl font-bold p-4 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)]'>
          Account Information
        </h2>
        <div className='p-4 space-y-10'>
          <div className='space-y-2'>
            <h3 className='font-bold text-lg border-b border-gray-600'>
              User Information
            </h3>
            <div className={informationContainer}>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>Account Name:</span>
                <span className={informationValueClassName}>
                  {user.name ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>E-Mail:</span>
                <span className={informationValueClassName}>
                  {user.email ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
            </div>
          </div>
          <div className='space-y-2'>
            <h3 className='font-bold text-lg border-b border-gray-600'>
              Profile Information
            </h3>
            <div className={informationContainer}>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>First Name:</span>
                <span className={informationValueClassName}>
                  {userProfile.firstName ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>Last Name:</span>
                <span className={informationValueClassName}>
                  {userProfile.lastName ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
            </div>
            <div className={informationContainer}>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>Phone Number:</span>
                <span className={informationValueClassName}>
                  {userProfile.phoneNumber ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>Birth Date:</span>
                <span className={informationValueClassName}>
                  {new Date(userProfile.birthDate)
                    .toISOString()
                    .split('T')[0]
                    .replaceAll('-', '.')
                    .split('.')
                    .reverse()
                    .join('.') ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
            </div>
            <div className={informationContainer}>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>Gender:</span>
                <span className={informationValueClassName}>
                  {userProfile.gender ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>Street:</span>
                <span className={informationValueClassName}>
                  {userProfile.street ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
            </div>
            <div className={informationContainer}>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>ZIP Code:</span>
                <span className={informationValueClassName}>
                  {userProfile.zipCode ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>City:</span>
                <span className={informationValueClassName}>
                  {userProfile.city ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
            </div>
            <div className={informationContainer}>
              <div className={informationParentClassName}>
                <span className={informationLabelClassName}>Country:</span>
                <span className={informationValueClassName}>
                  {userProfile.country ?? NOT_GIVE_SENTENCE}
                </span>
              </div>
            </div>
          </div>
          <div>
            <Button
              as='button'
              type='button'
              position='standalone'
              className='px-4 py-2 rounded-md'
              variant='secondary'
              onClick={() => setIsAddingNew((prev) => !prev)}
            >
              <PenIcon />
              Edit Profile Information
            </Button>
          </div>
        </div>
      </div>
      {isAddingNew && (
        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <h2 className='text-2xl font-bold'>Personal Info</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8'>
              <div>
                <label htmlFor='firstName' className={labelClassName}>
                  First Name
                </label>
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
                <label htmlFor='lastName' className={labelClassName}>
                  Last Name
                </label>
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
                <label htmlFor='email' className={labelClassName}>
                  Email Address
                </label>
                <input
                  id='email'
                  type='email'
                  className={inputClassNames}
                  value={user?.email || ''}
                  disabled
                  readOnly
                />
              </div>
              <div>
                <label htmlFor='phoneNumber' className={labelClassName}>
                  Phone Number
                </label>
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
                <label htmlFor='birthDate' className={labelClassName}>
                  Date of Birth
                </label>
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
                <label htmlFor='gender' className={labelClassName}>
                  Gender
                </label>
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
                <label htmlFor='street' className={labelClassName}>
                  Street Address
                </label>
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
                <label htmlFor='zipCode' className={labelClassName}>
                  ZIP Code
                </label>
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
                <label htmlFor='city' className={labelClassName}>
                  City
                </label>
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
                <label htmlFor='country' className={labelClassName}>
                  Country
                </label>
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

          <div className='flex gap-4 justify-between'>
            <Button
              as='button'
              type='submit'
              variant='secondary'
              position='standalone'
              className='px-4 py-2 rounded-md justify-center'
              disabled={!isDirty || isSubmitting}
            >
              <FloppyDiskIcon />
              {isSubmitting ? 'Saving...' : 'Apply Changes'}
            </Button>
            <Button
              as='button'
              type='button'
              position='standalone'
              className='px-4 py-2 rounded-md justify-center'
              variant='danger'
              onClick={() => setIsAddingNew(false)}
            >
              <LogoutIcon />
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

import clsx from 'clsx';
import { DashboardUser } from '../DashboardClient';
import Button from '@/components/ui/Button';
import FloppyDiskIcon from '@/components/icons/ecommerce/FloppyDiskIcon';

interface DashboardAccountInformationProps {
  user: DashboardUser;
}

export default function DashboardAccountInformation({
  user,
}: DashboardAccountInformationProps) {
  const inputClassNames = clsx(
    'peer block w-full rounded-lg border border-[#606060] bg-transparent p-2 text-white shadow-sm focus-visible:outline-[#00b700] focus-visible:outline-1 focus-visible:outline'
  );

  return (
    <div className='pb-12 pt-4 max-w-3xl w-[95%]'>
      <form className='space-y-20'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold'>Personal Info</h2>
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <label htmlFor='firstname' className='text-lg font-bold'>
                First Name
              </label>
              <input
                id='firstname'
                type='text'
                className={inputClassNames}
                placeholder='Stefan'
              />
            </div>
            <div>
              <label htmlFor='lastname' className='text-lg font-bold'>
                Last Name
              </label>
              <input
                id='lastname'
                type='text'
                className={inputClassNames}
                placeholder='Lüllmann'
              />
            </div>
            <div>
              <label htmlFor='email' className='text-lg font-bold'>
                Email Address
              </label>
              <input
                id='email'
                type='email'
                className={inputClassNames}
                placeholder='demo@stefan-luellmann.com'
              />
            </div>
            <div>
              <label htmlFor='phone' className='text-lg font-bold'>
                Phone Number
              </label>
              <input
                id='phone'
                type='tel'
                className={inputClassNames}
                placeholder='+12 3456 7890'
              />
            </div>
            <div>
              <label htmlFor='birthday' className='text-lg font-bold'>
                Date of Birth
              </label>
              <input
                id='birthday'
                type='date'
                className={inputClassNames}
                placeholder='01/01/1900'
              />
            </div>
            <div>
              <label htmlFor='gender' className='text-lg font-bold'>
                Gender
              </label>
              <input
                id='gender'
                type='text'
                className={inputClassNames}
                placeholder='Male'
              />
            </div>
            <div>
              <label htmlFor='street' className='text-lg font-bold'>
                Street Address
              </label>
              <input
                id='street'
                type='text'
                className={inputClassNames}
                placeholder='Example Street 1'
              />
            </div>
            <div>
              <label htmlFor='zipcode' className='text-lg font-bold'>
                ZIP Code
              </label>
              <input
                id='zipcode'
                type='text'
                className={inputClassNames}
                placeholder='30159'
              />
            </div>
            <div>
              <label htmlFor='city' className='text-lg font-bold'>
                City
              </label>
              <input
                id='city'
                type='text'
                className={inputClassNames}
                placeholder='Hanover'
              />
            </div>
            <div>
              <label htmlFor='country' className='text-lg font-bold'>
                Country
              </label>
              <input
                id='country'
                type='text'
                className={inputClassNames}
                placeholder='Germany'
              />
            </div>
          </div>
        </div>
        <div className='space-y-4'>
          <h2 className='text-2xl font-bold'>Change Password</h2>
          <div className='grid grid-cols-2 gap-8'>
            <div>
              <label htmlFor='password' className='text-lg font-bold'>
                Old Password
              </label>
              <input
                id='password'
                type='text'
                className={inputClassNames}
                placeholder='Old Password'
              />
            </div>
            <div>
              <label htmlFor='newpassword' className='text-lg font-bold'>
                New Password
              </label>
              <input
                id='newpassword'
                type='text'
                className={inputClassNames}
                placeholder='Repeat Password'
              />
            </div>
          </div>
        </div>
        <Button
          as='button'
          type='button'
          className='w-full justify-center'
          variant='secondary'
        >
          <FloppyDiskIcon />
          Apply Changes
        </Button>
      </form>
    </div>
  );
}

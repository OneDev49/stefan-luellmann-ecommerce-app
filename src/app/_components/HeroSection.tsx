import Image from 'next/image';
import Button from '@/components/ui/Button';
import SearchIcon from '@/components/icons/ui/SearchIcon';
import AnglesRightIcon from '@/components/icons/ui/AnglesRightIcon';

export default function HeroSection() {
  return (
    <section className='grid place-items-center text-center h-[90svh] overflow-hidden relative'>
      <div className='relative z-10 flex flex-col gap-4'>
        <h1 className='text-6xl col text-[#53ff5f] font-bold underline'>
          Built Without Compromise
        </h1>
        <p className='text-2xl'>
          High-performance components for every build.
          <br /> Find the perfect parts and check compatibility in real-time
          with the Entro PC Builder.
        </p>
        <div className='flex flex-row justify-center gap-6'>
          <Button as='a' href='/pc-builder'>
            <>
              <span>Start Your Build</span>
              <AnglesRightIcon />
            </>
          </Button>
          <Button as='a' href='/search' variant='tertiary'>
            <>
              <span>Browse All Components</span>
              <SearchIcon />
            </>
          </Button>
        </div>
      </div>
      <div className='absolute z-0 inset-0'>
        <div className='absolute inset-0 shadow-[inset_0_-20px_20px_20px_rgba(0,0,0,1)]'></div>
        <Image
          className='w-full opacity-40 relative z-[-1] h-full object-cover'
          src='/images/PC.webp'
          alt='PC-Background'
          width={1400}
          height={800}
        />
      </div>
    </section>
  );
}

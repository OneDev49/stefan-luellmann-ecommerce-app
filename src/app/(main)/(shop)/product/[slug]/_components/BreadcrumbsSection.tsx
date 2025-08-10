import Link from 'next/link';
import clsx from 'clsx';

interface BreadcrumbsSectionProps {
  productName: string;
  category: string;
}

export default function BreadcrumbsSection({
  productName,
  category,
}: BreadcrumbsSectionProps) {
  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-lg px-4 py-2'
  );

  const textClassNames = clsx('hover:text-white');

  const ADJUSTED_NAME =
    category === 'GPU' || category === 'CPU' || category === 'RAM'
      ? category
      : category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  return (
    <div className='px-4'>
      <div className='flex justify-start max-w-2xl lg:max-w-7xl m-auto'>
        <section
          className={`${transparentCardClassName} text-sm text-gray-300 `}
        >
          <Link href='/' className={textClassNames}>
            Homepage
          </Link>{' '}
          {' / '}
          <Link
            href={`/search?category=${category.toLowerCase()}`}
            className={textClassNames}
          >
            {ADJUSTED_NAME}
          </Link>{' '}
          {' / '}
          <span className={`${textClassNames} cursor-pointer`}>
            {productName}
          </span>
        </section>
      </div>
    </div>
  );
}

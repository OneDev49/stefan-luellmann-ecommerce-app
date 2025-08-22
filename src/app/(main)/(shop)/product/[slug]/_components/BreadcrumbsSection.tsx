import { ProductPageType } from '@/types/product';

import Link from 'next/link';
import clsx from 'clsx';

interface BreadcrumbsSectionProps {
  product: Pick<ProductPageType, 'name' | 'productType'>;
}

export default function BreadcrumbsSection({
  product,
}: BreadcrumbsSectionProps) {
  /* Adjust font of ProductType */
  const ADJUSTED_NAME =
    product.productType === 'GPU' ||
    product.productType === 'CPU' ||
    product.productType === 'RAM'
      ? product.productType
      : product.productType.charAt(0).toUpperCase() +
        product.productType.slice(1).toLowerCase();

  /* CSS Classnames */
  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-lg px-4 py-2'
  );
  const textClassNames = clsx('hover:text-white');

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
            href={`/search?category=${product.productType.toLowerCase()}`}
            className={textClassNames}
          >
            {ADJUSTED_NAME}
          </Link>{' '}
          {' / '}
          <span className={`${textClassNames} cursor-pointer`}>
            {product.name}
          </span>
        </section>
      </div>
    </div>
  );
}

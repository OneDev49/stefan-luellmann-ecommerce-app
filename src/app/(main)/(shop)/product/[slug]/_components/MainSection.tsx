import Image from 'next/image';
import clsx from 'clsx';
import Rating from '@/components/ui/Rating';
import PurchaseControls from './PurchaseControls';
import { calculateAverageRating } from '@/lib/calculateRating';

interface mainSectionProps {
  productItem: any;
}

export default function MainSection({ productItem }: mainSectionProps) {
  const { average, totalCount } = calculateAverageRating(productItem);

  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl p-8 max-w-7xl m-auto'
  );

  const stockClassNames = clsx(
    {
      ['text-[#00ff55]']: productItem.stockCount >= 100,
      ['text-[#ffe100]']: productItem.stockCount < 100,
      ['text-[#ff0000]']: productItem.stockCount === 0,
    },
    'text-2xl'
  );

  const imageGridClassName = clsx('h-[75px] w-[75px] bg-white rounded-2xl');

  const stockText =
    productItem.stockCount === 0
      ? `Out of Stock`
      : productItem.stockCount < 10 && productItem.stockCount > 0
      ? `Limited Stock`
      : `In Stock`;

  return (
    <section
      className={`${transparentCardClassName} flex justify-between w-full`}
    >
      <div className='flex-[50%] flex flex-col gap-5 max-w-[475px]'>
        <div className='h-[475px] w-[475px] bg-white grid place-items-center rounded-3xl overflow-hidden relative'>
          {productItem.isOnSale && (
            <div className='absolute select-none bg-red-700 h-8 grid place-items-center w-40 top-[20px] right-[-40px] rotate-45 z-50 will-change-transform text-xl'>
              On Sale
            </div>
          )}
          <Image
            className='object-contain w-full'
            src={productItem.imageUrl}
            height={280}
            width={480}
            alt={productItem.name}
            draggable='false'
            loading='eager'
          />
        </div>
        <div className='grid grid-cols-5 gap-2 place-items-center'>
          <div className={imageGridClassName}></div>
          <div className={imageGridClassName}></div>
          <div className={imageGridClassName}></div>
          <div className={imageGridClassName}></div>
          <div className={imageGridClassName}></div>
        </div>
      </div>
      <div className='flex-[50%] flex flex-col gap-8 max-w-[650px]'>
        <h1 className='text-5xl font-bold underline'>{productItem.name}</h1>
        <div className='flex flex-col gap-4'>
          {/* Rating */}
          <div className='flex items-center gap-2'>
            <Rating rating={average} size='large' />
            <span>({totalCount})</span>
          </div>
          <div className='font-bold flex items-center gap-2'>
            <p className={stockClassNames}>{stockText}</p>
            <p>
              |{' '}
              {productItem.stockCount > 10
                ? `>10`
                : `${productItem.stockCount}`}{' '}
              in Storage
            </p>
          </div>
        </div>
        {productItem.isOnSale ? (
          <div className='flex items-center gap-2'>
            <div className='flex flex-col gap-1'>
              <span className='text-2xl font-headings line-through font-normal'>
                {productItem.price}€
              </span>
              <div className='flex items-start gap-4 text-[#ff4545] font-bold font-headings'>
                <h2 className='text-4xl'>{productItem.reducedPrice}€*</h2>
                <span className='text-xl'>
                  (
                  {(
                    (productItem.reducedPrice / productItem.price - 1) *
                    100
                  ).toFixed(0)}
                  % Off)
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-sm'>* +19% VAT and Delivery Costs</span>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-2'>
            <h2 className='text-4xl font-bold'>{productItem.price}€*</h2>
            <span className='text-sm'>* +19% VAT and Delivery Costs</span>
          </div>
        )}
        <div>
          <p>{productItem.shortDescription}</p>
        </div>
        <PurchaseControls product={productItem} />
      </div>
    </section>
  );
}

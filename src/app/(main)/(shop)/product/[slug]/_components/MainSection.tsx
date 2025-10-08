import { ProductPageType } from '@/types/product';

import Image from 'next/image';
import clsx from 'clsx';
import Rating from '@/components/ui/Rating';
import PurchaseControls from './PurchaseControls';

interface mainSectionProps {
  product: Pick<
    ProductPageType,
    | 'id'
    | 'slug'
    | 'stockCount'
    | 'isOnSale'
    | 'imageUrl'
    | 'name'
    | 'averageRating'
    | 'totalRatingCount'
    | 'reducedPrice'
    | 'price'
    | 'shortDescription'
    | 'createdAt'
    | 'brand'
  >;
}

export default function MainSection({ product }: mainSectionProps) {
  /* Determine Stock Text for Stock Indicator */
  const stockText =
    product.stockCount === 0
      ? `Out of Stock`
      : product.stockCount < 10 && product.stockCount > 0
      ? `Limited Stock`
      : `In Stock`;

  const stockClassName = clsx(
    {
      ['text-[#00ff55]']: product.stockCount >= 100,
      ['text-[#ffe100]']: product.stockCount < 100,
      ['text-[#ff0000]']: product.stockCount === 0,
    },
    'text-2xl'
  );

  return (
    <section className='bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl p-8 max-w-2xl lg:max-w-7xl m-auto items-center lg:items-start flex flex-col lg:flex-row justify-between w-full gap-8'>
      <div className='w-full lg:flex-[50%] flex flex-col gap-5 lg:max-w-[475px]'>
        <div className='lg:max-h-[475px] lg:max-w-[475px] bg-white grid place-items-center rounded-3xl overflow-hidden relative'>
          {product.isOnSale && (
            <div className='absolute select-none bg-red-700 h-8 grid place-items-center w-40 top-[20px] right-[-40px] rotate-45 z-50 will-change-transform text-xl'>
              On Sale
            </div>
          )}
          <Image
            className='object-contain lg:w-full'
            src={`${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${product.imageUrl}`}
            height={280}
            width={480}
            alt={product.name}
            draggable='false'
            loading='eager'
          />
        </div>
      </div>
      <div className='flex-[50%] flex flex-col gap-8 max-w-[650px]'>
        <h1 className='text-5xl font-bold underline'>{product.name}</h1>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <Rating rating={product.averageRating} size='large' />
            <span>({product.totalRatingCount})</span>
          </div>
          <div className='font-bold flex items-center gap-2'>
            <p className={stockClassName}>{stockText}</p>
            <p>
              | {product.stockCount > 10 ? `>10` : `${product.stockCount}`} in
              Storage
            </p>
          </div>
        </div>
        {product.isOnSale && product.reducedPrice !== null ? (
          <div className='flex items-center gap-2'>
            <div className='flex flex-col gap-1'>
              <span className='text-2xl font-headings line-through font-normal'>
                {product.price}€
              </span>
              <div className='flex items-start gap-4 text-[#ff4545] font-bold font-headings'>
                <h2 className='text-4xl'>{product.reducedPrice}€*</h2>
                <span className='text-xl'>
                  (
                  {((product.reducedPrice / product.price - 1) * 100).toFixed(
                    0
                  )}
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
            <h2 className='text-4xl font-bold'>{product.price}€*</h2>
            <span className='text-sm'>* +19% VAT and Delivery Costs</span>
          </div>
        )}
        <div>
          <p>{product.shortDescription}</p>
        </div>
        <PurchaseControls product={product} />
      </div>
    </section>
  );
}

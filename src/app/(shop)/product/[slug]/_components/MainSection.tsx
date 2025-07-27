import Image from 'next/image';
import clsx from 'clsx';
import Rating from '@/components/ui/Rating';
import PurchaseControls from './PurchaseControls';

interface mainSectionProps {
  productItem: any;
}

export default function MainSection({ productItem }: mainSectionProps) {
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

  const stockText =
    productItem.stockCount === 0
      ? `Out of Stock`
      : productItem.stockCount < 100 && productItem.stockCount > 0
      ? `Limited Stock`
      : `In Stock`;

  return (
    <section className={`${transparentCardClassName} flex justify-between`}>
      <div className='flex-[50%]'>
        <div className='h-[500px] w-[500px] bg-white grid place-items-center rounded-3xl overflow-hidden relative'>
          {productItem.isOnSale && (
            <div className='absolute bg-red-700 h-8 grid place-items-center w-40 top-[20px] right-[-40px] rotate-45 z-50 will-change-transform text-xl'>
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
      </div>
      <div className='flex-[50%] flex flex-col gap-8'>
        <h1 className='text-5xl font-bold underline'>{productItem.name}</h1>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center gap-2'>
            <Rating rating={productItem.rating} size='medium' />
            <span>({productItem.reviewCount})</span>
          </div>
          {productItem.isOnSale ? (
            <div className='flex gap-2'>
              <span className='text-base font-headings line-through font-normal'>
                {productItem.price}€
              </span>
              <h2 className='text-4xl font-bold font-headings text-[#ff4545]'>
                {productItem.reducedPrice}€
              </h2>
            </div>
          ) : (
            <h2 className='text-4xl font-bold'>{productItem.price}€</h2>
          )}
          <div className='font-bold flex items-center gap-2'>
            <p className={stockClassNames}>{stockText}</p>
            <p>
              |{' '}
              {productItem.stockCount > 100
                ? `>100`
                : `${productItem.stockCount}`}{' '}
              in Storage
            </p>
          </div>
        </div>
        <div>
          <p>{productItem.shortDescription}</p>
        </div>
        <PurchaseControls product={productItem} />
      </div>
    </section>
  );
}

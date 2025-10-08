import Image from 'next/image';
import Link from 'next/link';

import { ProductCardType } from '@/types/product';
import CloseIcon from '@/components/icons/ui/CloseIcon';
import { useCartStore } from '@/store/cartStore';

interface CheckoutCardProps {
  product: ProductCardType;
  quantity: number;
}

export default function CheckoutCard({ product, quantity }: CheckoutCardProps) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const handleRemoveFromCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromCart(productId);
  };

  return (
    <Link href={`/product/${product.slug}`} className='flex gap-4 group'>
      <div className='max-w-48 h-full rounded-xl overflow-hidden relative'>
        {product.isOnSale && (
          <div className='absolute select-none bg-red-700 h-6 grid place-items-center w-40 top-[20px] right-[-40px] rotate-45 z-50 will-change-transform text-sm'>
            On Sale
          </div>
        )}
        <Image
          className='object-contain w-full group-hover:scale-105 transition-all'
          src={`${process.env.NEXT_PUBLIC_UPLOADTHING_URL}/${product.imageUrl}`}
          height={200}
          width={200}
          alt={product.name}
          draggable='false'
          loading='eager'
        />
      </div>
      <div className='w-full space-y-4'>
        <div className='flex justify-between gap-4 items-start'>
          <div>
            <span className='text-sm text-[#2aff00]'>
              ({quantity} in your Cart)
            </span>
            <h3 className='flex items-center gap-3'>
              <span className='text-2xl font-bold'>{product.name}</span>
            </h3>
          </div>

          <button
            onClick={(e) => handleRemoveFromCart(e, product.id)}
            className='bg-red-500 rounded-sm'
            title={`Remove ${product.name} from your Cart`}
          >
            <CloseIcon height={25} width={25} />
          </button>
        </div>
        <div>
          {product.reducedPrice &&
          product.isOnSale &&
          product.reducedPrice !== null ? (
            <div className=''>
              <span className='text-xl font-headings line-through font-normal'>
                {product.price}€
              </span>
              <div className='flex items-start gap-2 text-[#ff4545] font-bold font-headings'>
                <strong className='text-2xl'>{product.reducedPrice}€*</strong>
                <span>
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
          ) : (
            <div className='flex flex-col gap-2'>
              <strong className='text-2xl font-bold'>{product.price}€*</strong>
              <span className='text-sm'>* +19% VAT and Delivery Costs</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

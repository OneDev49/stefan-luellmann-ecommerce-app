import clsx from 'clsx';

interface DescriptionSectionProps {
  productItem: any;
}

export default function DescriptionSection({
  productItem,
}: DescriptionSectionProps) {
  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl max-w-7xl m-auto'
  );

  return (
    <section
      className={`${transparentCardClassName} flex flex-col justify-between overflow-hidden`}
    >
      <h2 className='p-8 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)] text-3xl font-bold'>
        Product Description
      </h2>
      <div className='p-8'>{productItem.longDescription}</div>
    </section>
  );
}

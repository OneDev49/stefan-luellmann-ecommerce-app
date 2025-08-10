import clsx from 'clsx';

interface DescriptionSectionProps {
  productItem: any;
}

export default function DescriptionSection({
  productItem,
}: DescriptionSectionProps) {
  const transparentCardClassName = clsx(
    'bg-[rgb(33,33,33,0.5)] border border-[#6c6c6c] rounded-3xl max-w-2xl lg:max-w-7xl m-auto'
  );

  const headingClassNames = clsx('text-3xl font-bold p-8');
  const headingMobileClassNames = clsx(
    'bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)] border-t border-[#6c6c6c]'
  );

  const specs = productItem?.specs || {};

  return (
    <>
      <section
        className={`${transparentCardClassName} flex flex-col lg:hidden overflow-hidden`}
      >
        <div className='flex-1 relative overflow-hidden'>
          <h2 className={`${headingClassNames} ${headingMobileClassNames}`}>
            Technical Data
          </h2>
          <table className='table-auto border-collapse text-sm w-full my-8 mx-4 max-w-[90%]'>
            <tbody>
              {Object.entries(specs).map(([key, value]) => (
                <tr
                  key={key}
                  className='border-b border-gray-700 text-base hover:bg-[#007623] cursor-pointer'
                >
                  <td className='px-4 py-2 font-medium text-left capitalize'>
                    {key
                      .replace(/([a-z])([A-Z])/g, '$1 $2')
                      .replace(/^./, (c) => c.toUpperCase())}
                  </td>
                  <td className='px-4 py-2 text-left'>{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex-1 relative overflow-hidden'>
          <h2 className={`${headingClassNames} ${headingMobileClassNames}`}>
            Product Description
          </h2>
          <div className='p-8 leading-7'>{productItem.longDescription}</div>
        </div>
      </section>
      <section
        className={`${transparentCardClassName} hidden lg:flex justify-between overflow-hidden relative`}
      >
        <div className='absolute h-24 bg-[rgb(87,87,87,0.2)] shadow-[0_4px_15px_0_rgb(0,0,0,1)] left-0 right-0'></div>
        <div className='flex-1 relative'>
          <h2 className={headingClassNames}>Technical Data</h2>
          <table className='table-auto border-collapse text-sm w-full my-8 mx-4 max-w-[90%]'>
            <tbody>
              {Object.entries(specs).map(([key, value]) => (
                <tr
                  key={key}
                  className='border-b border-gray-700 text-base hover:bg-[#007623] cursor-pointer'
                >
                  <td className='px-4 py-2 font-medium text-left capitalize'>
                    {key
                      .replace(/([a-z])([A-Z])/g, '$1 $2')
                      .replace(/^./, (c) => c.toUpperCase())}
                  </td>
                  <td className='px-4 py-2 text-left'>{String(value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex-1 relative'>
          <h2 className={headingClassNames}>Product Description</h2>
          <div className='p-8 leading-7'>{productItem.longDescription}</div>
        </div>
      </section>
    </>
  );
}

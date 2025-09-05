import Link from 'next/link';

interface SecondaryBreadcrumb {
  text: string;
  link: string;
}

interface BreadcrumbsProps {
  secondaryBreadcrumbs: SecondaryBreadcrumb[];
  mainBreadcrumb: string;
}

export default function Breadcrumbs({
  secondaryBreadcrumbs,
  mainBreadcrumb,
}: BreadcrumbsProps) {
  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex gap-1'>
        {secondaryBreadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            <Link
              className='hover:text-brightGreen transition-colors text-gray-500'
              href={breadcrumb.link}
            >
              {breadcrumb.text}
            </Link>
            <span className='text-gray-500'> / </span>
          </li>
        ))}
        <li className='text-white'>{mainBreadcrumb}</li>
      </ol>
    </nav>
  );
}

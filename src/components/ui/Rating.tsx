import clsx from 'clsx';
import StarIcon from '../icons/ecommerce/StarIcon';
import styles from './Rating.module.scss';

interface RatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function Rating({
  rating,
  maxRating = 5,
  className,
  size = 'medium',
}: RatingProps) {
  const percentage = Math.max(0, Math.min((rating / maxRating) * 100, 100));

  const ratingContainerClassNames = clsx(
    'relative',
    'inline-flex',
    'items-center'
  );

  const starsForegroundClassNames = clsx(
    'absolute',
    'top-[0]',
    'left-[0]',
    'flex',
    'whitespace-nowrap',
    'overflow-hidden'
  );

  const starsClassNames = clsx(
    {
      ['w-5 h-5']: size === 'small',
      ['w-6 h-6']: size === 'medium',
      ['w-8 h-8']: size === 'large',
    },
    'shrink-0'
  );

  const starsFilledClassNames = clsx('text-[#1eff00]');

  const starsEmptyClassNames = clsx('text-[#4a5568]');

  return (
    <div className={`${ratingContainerClassNames} ${className || ''}`}>
      <div className='flex'>
        {Array.from({ length: maxRating }).map((_, index) => (
          <StarIcon
            key={index}
            className={`${starsClassNames} ${starsEmptyClassNames}`}
          />
        ))}
      </div>

      <div
        className={starsForegroundClassNames}
        style={{ width: `${percentage}%` }}
      >
        {Array.from({ length: maxRating }).map((_, index) => (
          <StarIcon
            key={index}
            className={`${starsClassNames} ${starsFilledClassNames}`}
          />
        ))}
      </div>
    </div>
  );
}

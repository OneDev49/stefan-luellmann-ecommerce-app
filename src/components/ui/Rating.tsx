import StarIcon from '../icons/ecommerce/StarIcon';

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
  const percentage: number = Math.max(
    0,
    Math.min((rating / maxRating) * 100, 100)
  );

  const starSizes: string =
    size === 'small' ? 'w-5 h-5' : size === 'medium' ? 'w-6 h-6' : 'w-8 h-8';

  return (
    <div className={`relative inline-flex items-center ${className || ''}`}>
      <div className='flex'>
        {Array.from({ length: maxRating }).map((_, index) => (
          <StarIcon
            key={index}
            className={`text-[#4a5568] shrink-0 ${starSizes}`}
          />
        ))}
      </div>

      <div
        className='absolute top-[0] left-[0] flex whitespace-nowrap overflow-hidden'
        style={{ width: `${percentage}%` }}
      >
        {Array.from({ length: maxRating }).map((_, index) => (
          <StarIcon
            key={index}
            className={`text-[#1eff00] shrink-0 ${starSizes}`}
          />
        ))}
      </div>
    </div>
  );
}

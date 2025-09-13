/**
 * @license
 * SVG Code by:
 * Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free
 * Copyright 2025 Fonticons, Inc.
 *
 * For more information, check the LICENSE.txt of the Repository
 */

const iconVariants = {
  solid: {
    viewBox: '0 0 128 512',
    path: 'M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z',
  },
};

type IconVariant = keyof typeof iconVariants;

interface IconProps {
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
  variant?: IconVariant;
}

export default function EllipsisVerticalIcon({
  width = 24,
  height = 24,
  className,
  variant = 'solid',
  color,
}: IconProps) {
  const selectedVariant = iconVariants[variant];

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox={selectedVariant.viewBox}
      width={width}
      height={height}
      fill={color || 'currentColor'}
      className={className}
    >
      <path d={selectedVariant.path} />
    </svg>
  );
}

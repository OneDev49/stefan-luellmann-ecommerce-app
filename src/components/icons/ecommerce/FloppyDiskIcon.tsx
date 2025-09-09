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
    viewBox: '0 0 448 512',
    path: 'M64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-242.7c0-17-6.7-33.3-18.7-45.3L352 50.7C340 38.7 323.7 32 306.7 32L64 32zm0 96c0-17.7 14.3-32 32-32l192 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32L96 224c-17.7 0-32-14.3-32-32l0-64zM224 288a64 64 0 1 1 0 128 64 64 0 1 1 0-128z',
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

export default function FloppyDiskIcon({
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

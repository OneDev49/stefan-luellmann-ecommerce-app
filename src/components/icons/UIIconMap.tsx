import AnglesDownIcon from './ui/AnglesDownIcon';
import AnglesLeftIcon from './ui/AnglexLeftIcon';
import AnglesRightIcon from './ui/AnglesRightIcon';
import AnglesUpIcon from './ui/AnglesUpIcon';
import ArrowDownIcon from './ui/ArrowDownIcon';
import ArrowLeftIcon from './ui/ArrowLeftIcon';
import ArrowRightIcon from './ui/ArrowRightIcon';
import ArrowUpIcon from './ui/ArrowUpIcon';
import CaretDownIcon from './ui/CaretDownIcon';
import CaretLeftIcon from './ui/CaretLeftIcon';
import CaretRightIcon from './ui/CaretRightIcon';
import CaretUpIcon from './ui/CaretUpIcon';
import ChevronDownIcon from './ui/ChevronDownIcon';
import ChevronLeftIcon from './ui/ChevronLeftIcon';
import ChevronRightIcon from './ui/ChevronRightIcon';
import ChevronUpIcon from './ui/ChevronUpIcon';

export type UiName =
  | 'anglesdown'
  | 'anglesleft'
  | 'anglesright'
  | 'anglesup'
  | 'arrowdown'
  | 'arrowright'
  | 'arrowleft'
  | 'arrowup'
  | 'caretdown'
  | 'caretright'
  | 'caretleft'
  | 'caretup'
  | 'chevronright'
  | 'chevrondown'
  | 'chevronup'
  | 'chevronleft';

export const UIIconMap: Record<
  UiName,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  anglesdown: AnglesDownIcon,
  anglesleft: AnglesLeftIcon,
  anglesright: AnglesRightIcon,
  anglesup: AnglesUpIcon,
  arrowdown: ArrowDownIcon,
  arrowleft: ArrowLeftIcon,
  arrowright: ArrowRightIcon,
  arrowup: ArrowUpIcon,
  caretdown: CaretDownIcon,
  caretleft: CaretLeftIcon,
  caretright: CaretRightIcon,
  caretup: CaretUpIcon,
  chevrondown: ChevronDownIcon,
  chevronleft: ChevronLeftIcon,
  chevronright: ChevronRightIcon,
  chevronup: ChevronUpIcon,
};

interface UiIconProps extends React.SVGProps<SVGSVGElement> {
  name: UiName;
}

export const UiIcon: React.FC<UiIconProps> = ({ name, ...props }) => {
  const IconComponent = UIIconMap[name];
  if (!IconComponent) {
    return null;
  }
  return <IconComponent {...props} />;
};

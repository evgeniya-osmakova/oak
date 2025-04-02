import React from 'react';
import { ReactComponent as LogoIcon } from '../../../icons/logo.svg';
import { ReactComponent as CompanyIcon } from '../../../icons/organizations.svg';
import { ReactComponent as SearchIcon } from '../../../icons/search.svg';
import { ReactComponent as SettingsIcon } from '../../../icons/settings.svg';
import { ReactComponent as ExitIcon } from '../../../icons/exit.svg';
import { ReactComponent as ContractorIcon } from '../../../icons/contractor.svg';
import { ReactComponent as AccountIcon } from '../../../icons/account.svg';
import { ReactComponent as ArrowLeftIcon } from '../../../icons/arrow-left.svg';
import { ReactComponent as EditIcon } from '../../../icons/edit.svg';
import { ReactComponent as DeleteIcon } from '../../../icons/delete.svg';
import { ReactComponent as PhotoIcon } from '../../../icons/photo.svg';
import { ReactComponent as CheckIcon } from '../../../icons/check.svg';
import { ReactComponent as CloseIcon } from '../../../icons/close.svg';


export type iconName = 'logo' | 'organizations' | 'search' | 'settings' | 'exit' | 'contractor' | 'account' | 'arrow-left' | 'edit' | 'delete' | 'photo' | 'check' | 'close';

interface IconProps {
  name: iconName;
  size?: number;
  className?: string;
}

const icons = {
  logo: LogoIcon,
  organizations: CompanyIcon,
  search: SearchIcon,
  settings: SettingsIcon,
  exit: ExitIcon,
  contractor: ContractorIcon,
  account: AccountIcon,
  'arrow-left': ArrowLeftIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  photo: PhotoIcon,
  check: CheckIcon,
  close: CloseIcon,
};

export const Icon: React.FC<IconProps> = ({ name, size = 24, className }) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    console.error(`Icon component not found: ${name}`);
    return null;
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={className}
    />
  );
};

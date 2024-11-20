import { FC, ReactNode, useState } from 'react';
import Dropdown from 'antd/es/dropdown/dropdown';
import cx from 'classnames';

import Icon from '../icons/icon';

export interface ActionsProps {
  dropdownRender: (handleClose: () => void) => ReactNode;
  disabled?: boolean;
}

const BaseActions: FC<ActionsProps> = ({ dropdownRender, disabled }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dropdown disabled={disabled} open={open} onOpenChange={(open: boolean) => setOpen(open)} trigger={['click']} dropdownRender={() => dropdownRender(() => setOpen(false))}>
      <div className={cx('shadow-black-10 h-[34px] w-[34px] rounded-xl border border-black-8 bg-white-60 p-[8px] shadow-sm', disabled && 'cursor-not-allowed text-black-20')}>
        <Icon name="editUi" classNameIcon=" w-4 h-4" className="h-4 w-4" />
      </div>
    </Dropdown>
  );
};

export default BaseActions;

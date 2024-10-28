import { FC, ReactNode } from 'react';
import { Modal as BaseModal, ModalProps as BaseModalProps } from 'antd';
import cx from 'classnames';
import { twMerge } from 'tailwind-merge';

import Icon from '../icons/icon';

import cls from './modal.module.scss';

export type ModalProps = BaseModalProps & {
  header?: ReactNode;
  contentClassName?: string;
  position?: 'right';
};

const Modal: FC<ModalProps> = ({ footer = false, children, header, contentClassName, className, position, wrapClassName, ...props }) => (
  <BaseModal
    className={cx('block', cls.container, footer ? cls.footer:'', position && cls[`${position}`], className)}
    closeIcon={<Icon name="crossClose" classNameIcon="w-[14px] h-[14px] text-black-100" />}
    {...props}
    footer={footer}
    centered
    wrapClassName={cx(cls[`wrap-${position}`], wrapClassName)}
  >
    {header && (
      <div className="w-full border-b border-black-8 p-4">
        {typeof header === 'string' ? <h1 className="text-base font-medium not-italic leading-[normal] tracking-[0.16px] text-black-100">{header}</h1> : <>{header}</>}
      </div>
    )}
    <div className={twMerge('p-4', footer && 'border-b border-black-8', contentClassName)}>{children}</div>
  </BaseModal>
);

export default Modal;

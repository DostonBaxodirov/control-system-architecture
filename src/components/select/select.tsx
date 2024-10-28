'use client';

import { FC, ReactNode, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd';
import { twMerge } from 'tailwind-merge';

import Icon from '../icons/icon';
import * as List from '../icons/list';

import cls from './select.module.scss';

export type SelectProps = AntdSelectProps & {
  error?: string;
  label?: ReactNode;
  htmlFor?: string;
  control: Control<any>;
  name: string;
  openIconName?: keyof typeof List;
  closeIconName?: keyof typeof List;
  isSuffix?: boolean;
};

const Select: FC<SelectProps> = ({
  control,
  error,
  className,
  label,
  name,
  listItemHeight = 46,
  listHeight = 250,
  suffixIcon,
  openIconName = 'open',
  closeIconName = 'find',
  isSuffix = false,
  ...props
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={twMerge(cls.wrapper, 'mb-1 flex flex-col gap-1', error && cls.error)}>
      {label && (
        <label htmlFor={name} className="mb-0 text-sm font-medium">
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <AntdSelect
            className={twMerge('w-full text-sm font-normal not-italic leading-[normal] tracking-[0.14px] text-black-40', className, cls.wrapper, isSuffix && cls['without-br'])}
            id={name}
            removeIcon={<Icon name="crossClose" className="text-black-100" classNameIcon="w-3 h-3" />}
            dropdownStyle={{
              marginTop: 4,
              borderRadius: 12,
              border: '1px solid rgba(0, 0, 0, 0.20)',
              boxShadow: '0px 0px 8px 0px rgba(0, 0, 0, 0.10)',
              padding: 8
            }}
            suffixIcon={
              suffixIcon || (
                <>
                  {open ? (
                    <Icon name={openIconName} className="rotate-180 text-black-100" classNameIcon="w-4 h-auto" />
                  ) : (
                    <Icon name={openIconName} className="text-black-100" classNameIcon="w-4 h-auto" />
                  )}
                </>
              )
            }
            {...field}
            {...props}
            onFocus={() => setOpen(!open)}
            onBlur={() => {
              setOpen(!open);
            }}
            listHeight={listHeight}
            listItemHeight={listItemHeight}
          />
        )}
      />

      {error && (
        <div className="flex items-center gap-1 text-sm font-normal leading-[16.8px] tracking-[0.14px] text-stress-red-main">
          <Icon name="warning" classNameIcon="w-4 h-auto" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

Select.displayName = 'Select';

export default Select;

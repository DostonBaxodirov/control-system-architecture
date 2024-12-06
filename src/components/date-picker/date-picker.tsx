import { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';
import { DatePicker as BaseDatePicker, DatePickerProps as BaseDatePickerProps } from 'antd';
import cx from 'classnames';
import { twMerge } from 'tailwind-merge';

import Icon from '../icons/icon';

import cls from './date-picker.module.scss';

export interface DatePickerProps extends BaseDatePickerProps {
  error?: string;
  label?: ReactNode;
  htmlFor?: string;
  control: Control<any>;
  name: string;
  wrapperClass?: string;
}

const DatePicker = ({ control, error, className, label, name, wrapperClass, ...props }: DatePickerProps) => (
  <div className={twMerge(cls.wrapper, 'flex flex-col gap-1', error && cls.error, wrapperClass)}>
    {label && (
      <label htmlFor={name} className="mb-0 text-sm font-medium">
        {label}
      </label>
    )}
    <div
      className={cx(
        't-all-300 group flex h-11 items-center overflow-hidden rounded-xl border border-black-20 shadow-default-input transition hover:border-spring hover:shadow-input focus:border-spring',
        props.value && !error?.length ? 'border-spring shadow-input' : 'border',
        error && '!hover:border-stress-red-main border-stress-red-main shadow-input-error focus:border-stress-red-main focus:shadow-input-error'
      )}
    >
      <Controller control={control} name={name} render={({ field }) => <BaseDatePicker {...props} {...field} popupClassName={cls['wrap-popup']} />} />
    </div>
    {error && (
      <div className="font-aeonik flex items-center gap-1 text-sm font-normal leading-[16.8px] tracking-[0.14px] text-stress-red-main">
        <Icon name="warning" classNameIcon="w-4 h-auto" />
        <p>{error}</p>
      </div>
    )}
  </div>
);

export default DatePicker;

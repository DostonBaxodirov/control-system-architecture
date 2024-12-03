import { ReactNode, useState } from 'react';
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

const DatePicker = ({ control, error, className, label, name, wrapperClass, ...props }: DatePickerProps) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className={twMerge(cls.wrapper, 'flex flex-col gap-1', error && cls.error, wrapperClass)}>
      {label && (
        <label htmlFor={name} className="mb-0 text-sm font-medium">
          {label}
        </label>
      )}
      <div
        className={cx(
          't-all-300 group flex h-11 items-center overflow-hidden rounded-xl border border-black-20 shadow-default-input transition hover:border-spring hover:shadow-input focus:border-spring',
          (isInputFocused || props.value) && !error?.length ? 'border-spring shadow-input' : 'border',
          error && '!hover:border-stress-red-main border-stress-red-main shadow-input-error focus:border-stress-red-main focus:shadow-input-error'
        )}
      >
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <BaseDatePicker
              {...props}
              {...field}
              onFocus={e => {
                setIsInputFocused(true);
                // props?.onFocus?.(e);
              }}
              onBlur={e => {
                setIsInputFocused(false);
                // props?.onBlur?.(e);
              }}
              // prevIcon={
              //   <div className="flex h-4 w-4 items-center justify-center rounded-full transition-all hover:bg-black-3">
              //     <Icon name="dropdown" classNameIcon="w-3 h-3 text-black-100 -rotate-90" />
              //   </div>
              // }
              // nextIcon={
              //   <div className="flex h-4 w-4 items-center justify-center rounded-full transition-all hover:bg-black-3">
              //     <Icon name="dropdown" classNameIcon="w-3 h-3 text-black-100 rotate-90" />
              //   </div>
              // }
              popupClassName={cls['wrap-popup']}
            />
          )}
        />
      </div>
      {error && (
        <div className="font-aeonik flex items-center gap-1 text-sm font-normal leading-[16.8px] tracking-[0.14px] text-stress-red-main">
          <Icon name="warning" classNameIcon="w-4 h-auto" />
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

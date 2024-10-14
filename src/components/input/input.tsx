import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from '../icons/icon';

import cls from './input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  label?: React.ReactNode;
  error?: string;
  containerClass?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  suffixClass?: string;
  prefixClass?: string;
  wrapperClass?: string;
  infoContent?: string;
  subTitle?: string;
  optional?: boolean;
  showError?: boolean;
}

const Input = React.forwardRef(
  (
    {
      className,
      containerClass,
      wrapperClass,
      label,
      error,
      prefix,
      suffix,
      suffixClass,
      prefixClass,
      infoContent,
      subTitle,
      optional,
      showError = true,
      disabled,
      ...props
    }: InputProps,
    ref: any
  ) => {
    const [isInputFocused, setIsInputFocused] = React.useState(false);

    return (
      <div className={twMerge('flex flex-col gap-2', wrapperClass)}>
        {label &&
          (infoContent ? (
            <div>{infoContent}</div>
          ) : (
            // <Info tooltipProps={{ title: infoContent, placement: "right" }}>
            //   <label htmlFor={props.name} className="font-medium text-sm mb-0">
            //     {label}
            //   </label>
            // </Info>
            <label htmlFor={props.name} className=" mb-0 flex-wrap gap-2 text-sm font-medium">
              {label}
              {optional && <span className="ml-1 rounded-[4px] bg-black-8 p-1 text-center text-xs font-normal not-italic leading-[14.4px] tracking-[0.12px]">Optional</span>}
            </label>
          ))}
        <div
          className={twMerge(
            't-all-300 group flex h-11 items-center overflow-hidden rounded-xl  border border-black-20 shadow-default-input transition hover:border-spring hover:shadow-input focus:border-spring',
            (isInputFocused || props.value) && !error?.length ? 'border-spring shadow-input' : 'border',
            error && '!hover:border-stress-red-main border-stress-red-main shadow-input-error focus:border-stress-red-main focus:shadow-input-error',
            cls.input,
            disabled && ' !border-black-20 !shadow-none',
            containerClass
          )}
        >
          {prefix && (
            <div
              className={twMerge(
                't-all-300 flex h-full w-max items-center justify-center border-r border-black-20 px-4 group-hover:border-r-spring group-focus:border-r-spring',

                error && '!hover:border-stress-red-main border-stress-red-main focus:border-stress-red-main focus:shadow-input-error',
                cls.prefix,
                prefixClass
              )}
            >
              {prefix}
            </div>
          )}

          <input
            className={twMerge('h-full w-full px-4 py-3.5 text-sm leading-[16.8px] placeholder-black-40 outline-none placeholder:text-sm ', disabled && cls.disabled, className)}
            disabled={disabled}
            ref={ref}
            {...props}
            onFocus={e => {
              setIsInputFocused(true);
              props?.onFocus?.(e);
            }}
            onInput={e => {
              const target = e.target as HTMLInputElement;

              if (props.type === 'number') {
                if (props.step === '0') target.valueAsNumber = Number(target.value.split('.')[0]);
              }
              if (target.maxLength !== -1 && target.value.length > target.maxLength) target.value = target.value.slice(0, target.maxLength);
              if (target.max && target.valueAsNumber > +target.max) {
                if (parseInt(target.value.slice(0, target.max.length), 10) <= +target.max) target.valueAsNumber = parseInt(target.value.slice(0, target.max.length), 10);
                else target.valueAsNumber = parseInt(target.value.slice(0, target.max.length - 1), 10);
              }
              if (target.min && target.valueAsNumber < +target.min) target.valueAsNumber = +target.min;
            }}
            onBlur={e => {
              setIsInputFocused(false);
              props?.onBlur?.(e);
            }}
            id={props.name}
          />
          {suffix && (
            <div
              className={twMerge(
                't-all-300 flex h-full w-max items-center justify-center border-l border-black-20 px-4 group-hover:border-l-spring group-focus:border-l-spring',
                error && 'box-input-error border-stress-red-main hover:border-stress-red-main focus:border-stress-red-main focus:shadow-input-error',
                cls.suffix,
                suffixClass
              )}
            >
              {suffix}
            </div>
          )}
        </div>
        {subTitle && <p className=" text-xs font-normal leading-4 text-black-40">{subTitle}</p>}

        {error && showError && (
          <div className="font-aeonik flex items-center gap-1 text-sm font-normal leading-[16.8px] tracking-[0.14px] text-stress-red-main">
            <Icon name="warning" classNameIcon="w-4 h-auto" />
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;

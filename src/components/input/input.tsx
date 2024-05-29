import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import cls from './input.module.css';
import Icon from '../icons/icon';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
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
            <label
              htmlFor={props.name}
              className=" flex-wrap gap-2 font-medium text-sm mb-0"
            >
              {label}
              {optional && (
                <span className="rounded-[4px] ml-1 bg-black-8 text-center text-xs not-italic font-normal p-1 leading-[14.4px] tracking-[0.12px]">
                  Optional
                </span>
              )}
            </label>
          ))}
        <div
          className={twMerge(
            'transition group overflow-hidden rounded-xl h-11 border border-black-20  shadow-default-input focus:border-spring hover:border-spring hover:shadow-input flex items-center t-all-300',
            (isInputFocused || props.value) && !error?.length
              ? 'shadow-input border-spring'
              : 'border',
            error &&
              'border-stress-red-main shadow-input-error !hover:border-stress-red-main focus:border-stress-red-main focus:shadow-input-error',
            cls.input,
            disabled && ' !border-black-20 !shadow-none',
            containerClass
          )}
        >
          {prefix && (
            <div
              className={twMerge(
                'h-full w-max flex items-center justify-center px-4 border-r border-black-20 group-focus:border-r-spring group-hover:border-r-spring t-all-300',

                error &&
                  'border-stress-red-main !hover:border-stress-red-main focus:border-stress-red-main focus:shadow-input-error',
                cls.prefix,
                prefixClass
              )}
            >
              {prefix}
            </div>
          )}

          <input
            className={twMerge(
              'placeholder-black-40 placeholder:text-sm text-sm px-4 py-3.5 leading-[16.8px] h-full w-full outline-none ',
              disabled && cls.disabled,
              className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
            onFocus={(e) => {
              setIsInputFocused(true);
              props?.onFocus?.(e);
            }}
            onInput={(e) => {
              const target = e.target as HTMLInputElement;

              if (props.type === 'number') {
                if (props.step === '0')
                  target.valueAsNumber = Number(target.value.split('.')[0]);
              }
              if (
                target.maxLength !== -1 &&
                target.value.length > target.maxLength
              )
                target.value = target.value.slice(0, target.maxLength);
              if (target.max && target.valueAsNumber > +target.max) {
                if (
                  parseInt(target.value.slice(0, target.max.length), 10) <=
                  +target.max
                )
                  target.valueAsNumber = parseInt(
                    target.value.slice(0, target.max.length),
                    10
                  );
                else
                  target.valueAsNumber = parseInt(
                    target.value.slice(0, target.max.length - 1),
                    10
                  );
              }
              if (target.min && target.valueAsNumber < +target.min)
                target.valueAsNumber = +target.min;
            }}
            onBlur={(e) => {
              setIsInputFocused(false);
              props?.onBlur?.(e);
            }}
            id={props.name}
          />
          {suffix && (
            <div
              className={twMerge(
                'h-full w-max flex items-center justify-center px-4 border-l border-black-20 group-focus:border-l-spring group-hover:border-l-spring t-all-300',
                error &&
                  'border-stress-red-main box-input-error hover:border-stress-red-main focus:border-stress-red-main focus:shadow-input-error',
                cls.suffix,
                suffixClass
              )}
            >
              {suffix}
            </div>
          )}
        </div>
        {subTitle && (
          <p className=" text-xs font-normal leading-4 text-black-40">
            {subTitle}
          </p>
        )}

        {error && showError && (
          <div className="font-aeonik text-sm leading-[16.8px] tracking-[0.14px] font-normal text-stress-red-main flex gap-1 items-center">
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

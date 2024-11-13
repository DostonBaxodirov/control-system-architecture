import * as React from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from '../icons/icon';

import cls from './textarea.module.css';

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'prefix'> {
  label?: React.ReactNode;
  error?: string;
  containerClass?: string;
  wrapperClass?: string;
  infoContent?: string;
  subTitle?: string;
  optional?: boolean;
  showError?: boolean;
  maxCharacters?: number;
}

const Textarea = React.forwardRef(
  ({ className, containerClass, wrapperClass, label, error, infoContent, subTitle, optional, showError = true, maxCharacters, ...props }: TextareaProps, ref: any) => {
    const [isInputFocused, setIsInputFocused] = React.useState(false);

    return (
      <div className={twMerge('flex flex-col gap-2', wrapperClass)}>
        {label && (
          <label htmlFor={props.name} className="mb-0 text-sm font-medium">
            {label}
          </label>
        )}
        <div
          className={twMerge(
            't-all-300 group flex h-11 items-center overflow-hidden rounded-xl border border-black-20 shadow-default-input transition hover:border-spring hover:shadow-input focus:border-spring',
            (isInputFocused || props.value) && !error?.length ? 'border-spring shadow-input' : 'border',
            error && '!hover:border-stress-red-main border-stress-red-main shadow-input-error focus:border-stress-red-main focus:shadow-input-error',
            cls.input,
            containerClass
          )}
        >
          <textarea
            className={twMerge('h-full w-full px-4 pb-[11px] pt-[11px] text-sm placeholder-black-40 outline-none placeholder:text-sm',cls.input, className)}
            maxLength={maxCharacters}
            ref={ref}
            {...props}
            onFocus={e => {
              setIsInputFocused(true);
              props?.onFocus?.(e);
            }}
            onBlur={e => {
              setIsInputFocused(false);
              props?.onBlur?.(e);
            }}
            id={props.name}
          />
        </div>
        {subTitle && <p className=" text-xs font-normal leading-4 text-black-40">{subTitle}</p>}

        {error && showError && (
          <div className="leading-1 flex items-center gap-1 text-sm text-stress-red-main">
            <Icon name="warning" className="h-[12.8px] w-[12.8px]" />
            <p>{error}</p>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;

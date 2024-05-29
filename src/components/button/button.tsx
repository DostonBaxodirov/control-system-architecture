'use client';

import React, { FC, ReactNode, useRef } from 'react';
import { twMerge } from 'tailwind-merge';

import Icon from '../icons/icon';

import cls from './button.module.css';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonStyleType = 'green' | 'default' | 'text';

type ButtonOrLinksProps =
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
      as?: 'button';
      styleType?: `${ButtonSize}-${ButtonStyleType}`;
      loader?: boolean;
    })
  | (React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      as: 'a';
    });

export type ButtonProps = ButtonOrLinksProps & {
  children: ReactNode;
  reverse?: boolean;
  icon?: ReactNode;
};

export const btnClx = {
  base: "gap-2 t-all-300 rounded-xl cursor-pointer relative overflow-hidden z-[1] w-full h-full text-[inherit] tracking-[inherit] font-[inherit] leading-[inherit] flex items-center justify-center bg-transparent z-0 after:absolute after:content-[''] after:top-0 after:left-0 after:w-full after:h-full after:z-[-2] transition-all after:transition-all duration-300 after:duration-300 w-max before:!hidden",
  pill: 'rounded-full',
  size: {
    sm: 'h-[34px] text-sm not-italic font-medium leading-[normal] tracking-[0.14px] px-4 w-max',
    md: 'h-11 text-sm not-italic font-medium leading-[normal] tracking-[0.14px] px-8',
    lg: 'h-[60px] text-xl not-italic font-bold leading-[26px] tracking-[0.2px] px-8 ',
  },
  variant: {
    green: 'text-white-100 after:bg-spring hover:after:bg-b-20',
    text: 'disabled:after:bg-black-3',
    default:
      'after:bg-white-100 border border-black-20 hover:after:bg-white-60 shadow-none hover:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.10)] transition-all duration-200  ',
  },
  variantLoader: {
    green: 'after:!bg-spring cursor-not-allowed  ',
    text: 'after:!bg-transparent cursor-not-allowed',
    default: 'cursor-not-allowed',
  },
  variantDisabled: {
    green: 'after:!bg-b-400 cursor-not-allowed  text-black-100 ',
    text: 'after:bg-b-3 cursor-not-allowed text-black-100',
    default:
      'disabled:border-black-8 disabled:text-black-40 disabled:after:bg-white-100 text-black-100 cursor-not-allowed hover:shadow-none',
  },
};

const Button: FC<ButtonProps> = ({ children, reverse, icon, ...props }) => {
  const ref = useRef<HTMLButtonElement>(null);

  if (props.as === 'a') {
    return (
      <a {...props} className={cls['wrapper-anchor']}>
        {children}
      </a>
    );
  }

  const btnHandler = (e: any) => {
    const pos = ref.current?.getBoundingClientRect();

    const x = e.clientX - pos?.left!;
    const y = e.clientY - pos?.top!;

    const span = document.createElement('span') as HTMLSpanElement;

    span.className = cls.ripples;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    ref.current?.appendChild(span);

    setTimeout(() => span.remove(), 1000);
  };

  const {
    styleType = 'lg-green',
    loader,
    disabled,
    className,
    onClick,
    ...prop
  } = {
    ...props,
  };

  const size = styleType.slice(0, 2) as ButtonSize;
  const style = styleType?.slice(3, styleType.length) as ButtonStyleType;

  return (
    <button
      {...prop}
      onClick={(e) => {
        btnHandler(e);
        if (onClick) {
          onClick!(e);
        }
      }}
      ref={ref}
      disabled={disabled || loader}
      className={twMerge(
        btnClx.base,
        reverse && 'flex-row-reverse',
        btnClx.size[`${size}`],
        btnClx.variant[`${style}`],
        loader && btnClx.variantLoader[`${style}`],
        disabled && btnClx.variantDisabled[`${style}`],
        className
      )}
    >
      {loader ? (
        <span className={twMerge(cls['spinner-wrap'])}>
          <Icon
            name="loader"
            classNameIcon="w-5 h-5"
            className={twMerge(
              cls.spinner,
              style !== 'green' && cls['text-spinner']
            )}
          />
        </span>
      ) : (
        <>
          {icon && <>{icon}</>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;

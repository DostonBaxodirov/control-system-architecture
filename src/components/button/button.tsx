'use client'

import React, { FC, ReactNode, useRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import classnames, { type Value } from 'classnames';
import { twMerge } from 'tailwind-merge';

import Icon from '../icons/icon';

import cls from './button.module.css';

function cx(...inputs: Value[]) {
  return twMerge(classnames(inputs));
}

const button = cva(
  'flex overflow-hidden min-w-max items-center justify-center gap-2 w-full before:hidden transition-all duration-300 disabled:cursor-not-allowed rounded-xl relative px-4',
  {
    variants: {
      intent: {
        green: ['bg-spring text-white-100  hover:bg-b-20 disabled:bg-b-400 disabled:text-black-100 '],
        text: ['text-black-100 bg-transparent hover:text-black-60 disabled:text-black-40 '],
        default: [
          'bg-white-100 text-black-100 border border-black-20 shadow-[0px_1px_2px_0px_transparent] hover:shadow-[0px_1px_2px_0px_rgba(0,0,0,0.20)] disabled:text-black-40 disabled:border-black-10 disabled:hover:shadow-none hover:border-black-30 hover:'
        ]
      },
      size: {
        sm: ['text-sm font-medium leading-none tracking-tight py-[8px] h-[34px]'],
        md: ['text-sm font-medium leading-none tracking-tight py-[8px] h-11'],
        lg: ['text-center text-xl font-bold leading-relaxed tracking-tight py-[18px] h-[60px] ']
      },
      loading: {
        true: '!bg-spring disabled:text-white-100',
        false: ''
      }
    },
    compoundVariants: [
      {
        intent: 'text',
        loading: true,
        className: '!bg-transparent disabled:!text-black-100'
      },
      {
        intent: 'default',
        loading: true,
        className: '!bg-transparent disabled:!text-black-100'
      }
    ],
    defaultVariants: {
      intent: 'green',
      size: 'md'
    }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  children: ReactNode;
  reverse?: boolean;
  icon?: ReactNode;
  loading?: boolean;
}

const Button: FC<ButtonProps> = props => {
  const {
    children,
    reverse,
    icon,
    size,
    loading = false,
    disabled = false,
    className,
    onClick,
    intent,
    ...prop
  } = {
    ...props
  };

  const ref = useRef<HTMLButtonElement>(null);

  const btnHandler = (e: any) => {
    const pos = ref.current?.getBoundingClientRect();

    if (pos) {
      const x = e.clientX - pos.left;
      const y = e.clientY - pos.top;

      const span = document.createElement('span') as HTMLSpanElement;

      span.className = cls.ripples;
      span.style.left = `${x}px`;
      span.style.top = `${y}px`;
      ref.current?.appendChild(span);

      setTimeout(() => span.remove(), 1000);
    }
  };

  return (
    <button
      onClick={e => {
        btnHandler(e);
        if (onClick) {
          onClick(e);
        }
      }}
      {...prop}
      ref={ref}
      disabled={disabled || loading}
      className={cx(reverse && 'flex-row-reverse', button({ intent, size, loading }), className)}
    >
      {loading ? (
        <span className={cx(cls['spinner-wrap'])}>
          <Icon name="loader" classNameIcon="w-5 h-5" className={cx(cls.spinner)} />
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

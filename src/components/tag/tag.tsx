import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import classnames, { type Value } from "classnames";
import { twMerge } from "tailwind-merge";

function cx(...inputs: Value[]) {
  return twMerge(classnames(inputs));
}

const badgeVariants = cva(
  "flex h-[22px] w-max min-w-max items-center justify-center rounded px-3 py-[3px] text-[12px] text-xs font-medium not-italic leading-[normal] tracking-[0.12px] text-b-90",
  {
    variants: {
      color: {
        green: "bg-tag-green text-tag-green",
        blue: "bg-tag-blue text-tag-blue",
        pink: "bg-tag-pink text-tag-pink",
        "light-pink": "bg-tag-light-pink text-tag-light-pink",
        yellow: "bg-tag-yellow text-tag-yellow",
        "light-yellow": "bg-tag-light-yellow text-tag-light-yellow",
        sundown: "bg-tag-sundown text-tag-sundown",
        "light-sundown": "bg-tag-light-sundown text-tag-light-sundown",
        gray: "bg-tag-gray text-tag-gray",
        "light-gray": "bg-tag-light-gray text-tag-light-gray",
        purple: "bg-tag-purple text-tag-purple",
        magenta: "bg-tag-magenta text-tag-magenta",
        "powder-blue": "bg-tag-powder-blue text-tag-powder-blue",
        // yellow: "bg-tag-yellow text-tag-yellow"
      }
    }
  }
);

export interface TagProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof badgeVariants> {
  className?: string;
}

const Tag: React.FC<TagProps> = ({ className, color, ...args }) => (
  <div className={cx(badgeVariants({ color }), className)} {...args} />
);

export default Tag;

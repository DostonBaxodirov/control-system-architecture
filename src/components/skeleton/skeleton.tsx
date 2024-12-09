import cx from 'classnames';

export const Skeleton = ({ className }: { className: string }) => (
  <div className={cx('animate-skeleton bg-skeleton-linear  bg-skeleton relative  rounded-xl bg-[100%_0]', className)} />
);

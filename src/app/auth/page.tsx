'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { Button, Input } from '~/components';
import { Form } from '~/modules';

const Auth: FC = () => {
  const { push } = useRouter();

  return (
    <Form.Auth
      component={({ register, formState: { errors } }) => (
        <div className={twMerge('flex h-screen w-full items-center justify-center px-4 ')}>
          <div className="flex w-full max-w-[450px] flex-col gap-[30px]">
            <h2 className="text-left text-2xl font-medium md:text-center">Kirish</h2>
            <div className="flex w-full flex-col gap-3">
              <Input
                label={
                  <div>
                    Telefon raqam <span className="text-sm font-medium not-italic leading-[16.8px] tracking-[0.14px] text-stress-red-main">•</span>
                  </div>
                }
                maxLength={9}
                {...register('phone')}
                type="number"
                placeholder="Telefon raqamni kiriting"
                prefixClass="!bg-white-100"
                prefix={<div className="flex cursor-not-allowed items-center gap-2 text-sm font-normal not-italic leading-[16.8px] tracking-[0.14px] text-black-100">+998</div>}
                error={errors.phone?.message}
              />
              <Input {...register('password')} label="Parol" placeholder="Parolni kiriting" error={errors.password?.message} />
              <Button intent="green" className="h-[44px] w-full font-normal hover:before:scale-90 disabled:text-black-100">
                Continue
              </Button>
            </div>

            {/* <div className="flex w-full min-w-full items-center gap-3">
              <div className="h-[1px] flex-1 bg-black-20" />
              <p className="text-center text-3xl text-[12px] font-normal">or</p>
              <div className="h-[1px] flex-1 bg-black-20" />
            </div> */}
          </div>
        </div>
      )}
    />
  );
};

export default Auth;

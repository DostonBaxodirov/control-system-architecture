'use client';

import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'antd';
import { twMerge } from 'tailwind-merge';

import { useAuth } from '~/hooks';
import { useCurrency } from '~/modules/currency/hooks';
import * as Types from '~/modules/currency/types';
import { changeCurrencyId } from '~/store';

import Button from '../button/button';
import Icon from '../icons/icon';

import CreateUpdateCurrency from './currency-modal';

const CurrencySelect: FC = () => {
  const dispatch = useDispatch();
  const { currencyId } = useAuth();
  const { currencies } = useCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState<Types.Currency>();
  const [editCurrency, setEditCurrency] = useState<Types.Currency>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (currencyId) setSelectedCurrency(currencies.filter(currency => currency.id === currencyId)[0]);
    else setSelectedCurrency(currencies[0]);
  }, [currencies]);

  const onSelect = (currency: Types.Currency) => {
    if (selectedCurrency?.id !== currency.id) {
      setSelectedCurrency(currency);
      dispatch(changeCurrencyId({ id: currency.id }));
    }
  };

  return (
    <>
      <Dropdown
        trigger={['click']}
        dropdownRender={() => (
          <div className="flex flex-col gap-2 rounded-xl border border-black-8 bg-white-100 p-3">
            {currencies.map(currency => (
              <div
                key={currency.id}
                className={twMerge(
                  'flex h-[34px] w-full cursor-pointer items-center justify-between gap-3 rounded-xl px-2 hover:bg-black-3',
                  selectedCurrency?.id === currency.id && 'cursor-not-allowed'
                )}
                onClick={() => onSelect(currency)}
              >
                <p className="text-sm font-normal">{currency?.amount} UZS</p>
                <p className="rounded-md bg-black-3 p-1 text-sm font-medium">1 {currency?.currency}</p>
                <Button
                  intent="default"
                  size="sm"
                  className="h-[24px] w-max"
                  onClick={() => {
                    setEditCurrency(currency);
                    setOpen(true);
                  }}
                >
                  <Icon name="editText" classNameIcon=" w-3 h-3" />
                </Button>
              </div>
            ))}
            <Button intent="default" size="sm" className="h-[24px] text-xs" onClick={() => setOpen(true)}>
              Valuta qo'shish
            </Button>
          </div>
        )}
      >
        <div className="flex h-[34px] w-max cursor-pointer items-center justify-between gap-3 rounded-xl border border-black-8 px-2">
          {currencies.length ? (
            <>
              <p className="text-sm font-normal whitespace-nowrap">{selectedCurrency?.amount} UZS</p>
              <p className="rounded-md bg-black-3 p-1 text-sm font-medium whitespace-nowrap">1 {selectedCurrency?.currency}</p>
            </>
          ) : (
            <p className="text-sm font-normal text-stress-red-main">Pul birligi yarating!</p>
          )}
        </div>
      </Dropdown>
      <CreateUpdateCurrency
        clearEditCurrency={() => setEditCurrency(undefined)}
        open={open}
        setOpen={setOpen}
        currencyId={editCurrency?.id}
        defaultValues={{ name: editCurrency?.currency!, amount: editCurrency?.amount! }}
      />
    </>
  );
};

export default CurrencySelect;

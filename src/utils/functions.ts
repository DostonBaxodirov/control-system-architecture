import { useCurrency } from '~/modules/currency/hooks';

export const useCurrencyOptions = (): { label: string; value: string }[] => {
  const { currencies } = useCurrency();

  return currencies.map(item => ({ label: item.currency, value: item.id }));
};

export function numberFormat(value: number): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
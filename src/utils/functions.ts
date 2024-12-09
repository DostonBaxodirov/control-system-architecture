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

export const setQueryParam = ( params: { [key: string]: string }) => {
  const url = new URL(window.location.href);

  Object.keys(params).forEach(key => {
    url.searchParams.set(key, params[key]);
  });

  window.history.pushState(null, '', url.toString());
};

export const getQuery = ( param: string): string | null => {
  const parsedUrl = new URL(window.location.href);

  return parsedUrl.searchParams.get(param);
};

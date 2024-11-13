import * as Types from './types';

export const Currency = (currency: any): Types.Currency => ({
  id: currency.ID,
  currency: currency.Currency,
  amount: currency.Amount
});

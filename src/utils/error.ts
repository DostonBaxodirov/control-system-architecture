import { AxiosError } from 'axios';

import { toast } from '~/components';

export function onError(error: Error): unknown {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.error;

    if (message) toast.error(message);
  }

  toast.error('Parsing error');

  return undefined;
}

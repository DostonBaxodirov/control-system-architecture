'use client'

import { useRouter } from 'next/navigation';

export default function Home() {
  const { push } = useRouter();

  return push('/auth')
}

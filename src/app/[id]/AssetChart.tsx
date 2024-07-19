'use client';
import { lazy } from 'react';

import { getCandles } from '@/resources/Candles';
import { useLive } from '@data-client/react';

const LineChart = lazy(() => import(/* webpackPreload: true */ './LineChart'));

export default function AssetChart({ product_id, width, height }: Props) {
  const candles = useLive(getCandles, { product_id });

  return <LineChart data={candles} width={width} height={height} />;
}

interface Props {
  product_id: string;
  width: number;
  height: number;
}

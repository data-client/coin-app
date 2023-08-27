//https://api.exchange.coinbase.com/products/BTC-USD/stats
//https://api.exchange.coinbase.com/products/stats

import { Entity, createResource, schema } from '@data-client/rest';
class FloatSerializer extends Number {
  constructor(v: any) {
    super(Number.parseFloat(v));
  }
}
export class Stats extends Entity {
  id = '';
  open = '26031.15';
  high = '26115.44';
  low = '25931.57';
  last = '26005.52';
  volume = 0;
  volume_30day = 0;

  pk(parent: any, key: string, args: any[]) {
    return this.id ?? key ?? args[0]?.id;
  }

  static key = 'Stats';
  static schema = {
    volume: FloatSerializer,
    volume_30day: FloatSerializer,
  };

  process(value: any, parent: any, key: string, args: any[]) {
    console.log();
    return { ...value, id: value.id ?? key ?? args[0]?.id };
  }
}

export const StatsResource = createResource({
  urlPrefix: 'https://api.exchange.coinbase.com',
  path: '/products/:id/stats',
  schema: Stats,
}).extend({
  getList: {
    path: '/products/stats',
    schema: new schema.Collection(new schema.Values(Stats)),
    process(value) {
      Object.keys(value).forEach((key) => {
        value[key] = {
          ...value[key].stats_24hour,
          volume_30day: value[key].stats_30day?.volume,
        };
      });
      return value;
    },
  },
});

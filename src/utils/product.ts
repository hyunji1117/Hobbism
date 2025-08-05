import { Product } from '@/types';

export default function filterValidProducts(products: Product[]) {
  const result = products
    .filter(p => p.show)
    .filter(p => !p.extra.isLiveSpecial);

  return result;
}

import { Product } from '@/types';

interface ProductFilterOptions {
  excludeLiveSpecial?: boolean;
}

export default function filterValidProducts(
  products: Product[],
  options: ProductFilterOptions = { excludeLiveSpecial: true },
) {
  let result = products;
  result = result.filter(p => p.show);

  if (options.excludeLiveSpecial) {
    result = result.filter(p => !p.extra.isLiveSpecial);
  }

  return result;
}

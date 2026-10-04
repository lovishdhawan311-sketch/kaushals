export type Product = {
  id: number;
  name: string;
  cat: string;
  price: number;
  image: string;
  detail: string;
  discount: number;
};

export type CartLine = { id: number; q: number; variant?: string };

export const products: Product[] = [
  { id: 1, name: "Aarohi Chandbalis", cat: "Earrings", price: 2890, image: "products/ruby-set.jpeg", detail: "Hand-finished stones with a light-catching drop.", discount: 12 },
  { id: 2, name: "Nura Pearl Drops", cat: "Earrings", price: 2390, image: "products/emerald-set.jpeg", detail: "Soft pearl detail for modern celebration.", discount: 10 },
  { id: 3, name: "Saanjh Layered Chain", cat: "Necklaces", price: 3490, image: "products/gold-lariat.jpeg", detail: "A sculpted layer made for an open neckline.", discount: 12 },
  { id: 4, name: "Mira Sculpted Cuff", cat: "Bracelets", price: 2190, image: "products/floral-pendant.jpeg", detail: "A polished cuff with an easy, weightless feel.", discount: 10 },
  { id: 5, name: "Ira Signet Ring", cat: "Rings", price: 1690, image: "products/serpent-ring.png", detail: "A clean signet silhouette with lasting shine.", discount: 12 },
  { id: 6, name: "Gulzar Floral Set", cat: "Sets", price: 4290, image: "products/mirror-floral-pendant.png", detail: "A complete floral set for instant occasion dressing.", discount: 10 },
];

export const ru = (n: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
export const salePrice = (product: Product) => Math.round(product.price * (1 - product.discount / 100));

export function cartSummary(lines: CartLine[]) {
  const items = lines.flatMap((line) => {
    const product = products.find((entry) => entry.id === line.id);
    return product ? [{ ...product, ...line, original: product.price, unit: salePrice(product) }] : [];
  });
  const subtotal = items.reduce((sum, item) => sum + item.original * item.q, 0);
  const productDiscount = items.reduce((sum, item) => sum + (item.original - item.unit) * item.q, 0);
  const units = items.reduce((sum, item) => sum + item.q, 0);
  const bundleDiscount = units >= 2 ? 250 : 0;
  return { items, subtotal, productDiscount, bundleDiscount, total: Math.max(0, subtotal - productDiscount - bundleDiscount), units };
}

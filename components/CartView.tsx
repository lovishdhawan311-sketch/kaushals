"use client";

import { ArrowLeft, ArrowRight, Minus, Plus, Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CartLine, cartSummary, ru } from "@/lib/catalog";

const bagKey = "kaushals-bag";
const orderKey = "kaushals-checkout-lines";

export default function CartView() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const summary = useMemo(() => cartSummary(lines), [lines]);
  const promo = applied ? Math.min(250, summary.total) : 0;
  const shipping = summary.total - promo >= 3000 ? 0 : summary.items.length ? 149 : 0;
  const total = Math.max(0, summary.total - promo + shipping);

  useEffect(() => { try { setLines(JSON.parse(localStorage.getItem(bagKey) || "[]")); } catch { setLines([]); } }, []);
  function update(next: CartLine[]) { setLines(next); localStorage.setItem(bagKey, JSON.stringify(next)); }
  function change(id: number, variant: string | undefined, delta: number) { update(lines.flatMap((line) => line.id === id && line.variant === variant ? line.q + delta < 1 ? [] : [{ ...line, q: line.q + delta }] : [line])); }
  function checkout() { localStorage.setItem(orderKey, JSON.stringify(lines)); window.location.assign("/checkout"); }
  return <main className="commerce-view cart-view"><header className="commerce-nav"><Link href="/#shop"><ArrowLeft /> Continue shopping</Link><Link className="commerce-nav__brand" href="/">KAUSHALS</Link><span>My bag · {summary.units}</span></header><section className="cart-view__grid"><article className="cart-view__items"><div className="cart-view__heading"><p>Your selected pieces</p><h1>My <em>bag.</em></h1></div>{summary.items.length ? summary.items.map((item) => <div className="cart-item" key={`${item.id}-${item.variant}`}><img src={`/images/kaushals/${item.image}`} alt={item.name} /><div className="cart-item__info"><p>{item.cat} · contemporary gold</p><h2>{item.name}</h2><small>{item.variant || "Gold finish"}</small><div className="cart-item__price"><s>{ru(item.original * item.q)}</s><strong>{ru(item.unit * item.q)}</strong></div></div><div className="cart-item__controls"><button onClick={() => change(item.id, item.variant, -1)} aria-label="Decrease quantity"><Minus /></button><span>{item.q}</span><button onClick={() => change(item.id, item.variant, 1)} aria-label="Increase quantity"><Plus /></button><button className="cart-item__remove" onClick={() => change(item.id, item.variant, -item.q)} aria-label="Remove item"><Trash /></button></div></div>) : <div className="cart-view__empty"><h2>Your bag is waiting.</h2><p>Discover jewellery for every becoming.</p><Link className="commerce-button commerce-button--dark" href="/#shop">Discover the collection <ArrowRight /></Link></div>}</article><aside className="cart-view__summary"><p>Order summary</p><h2>Ready when you are.</h2><div className="cart-view__promo"><input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Enter promo code" /><button onClick={() => setApplied(code.trim().toUpperCase() === "KAUSHAL250")}>Apply</button></div>{applied && <small className="cart-view__success">KAUSHAL250 applied · ₹250 saved</small>}<dl><div><dt>Item total</dt><dd>{ru(summary.subtotal)}</dd></div><div><dt>Piece offers</dt><dd>−{ru(summary.productDiscount)}</dd></div><div><dt>Multi-piece offer</dt><dd>{summary.bundleDiscount ? `−${ru(summary.bundleDiscount)}` : "Add another piece"}</dd></div><div><dt>Promotion</dt><dd>{promo ? `−${ru(promo)}` : "—"}</dd></div><div><dt>Shipping</dt><dd>{shipping ? ru(shipping) : summary.items.length ? "Complimentary" : "—"}</dd></div><div className="cart-view__total"><dt>Total</dt><dd>{ru(total)}</dd></div></dl><button className="commerce-button commerce-button--dark cart-view__checkout" disabled={!summary.items.length} onClick={checkout}>Proceed to checkout <ArrowRight /></button><small className="cart-view__secure">Your order is reviewed with you on WhatsApp before confirmation.</small></aside></section></main>;
}

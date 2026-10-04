"use client";

import { ArrowLeft, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { CartLine, cartSummary, ru } from "@/lib/catalog";
import "./checkout.css";
import "../commerce-reference-theme.css";

const orderKey = "kaushals-checkout-lines";
const waNumber = "919888147756";

export default function CheckoutPage() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [sent, setSent] = useState(false);
  const summary = useMemo(() => cartSummary(lines), [lines]);

  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem(orderKey) || localStorage.getItem("kaushals-bag") || "[]")); } catch { setLines([]); }
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!summary.items.length) return;
    const form = new FormData(event.currentTarget);
    const customer = { name: String(form.get("name") || ""), phone: String(form.get("phone") || ""), address: String(form.get("address") || "") };
    const productsText = summary.items.map((item) => `• ${item.name}${item.variant ? ` (${item.variant})` : ""} × ${item.q} — ${ru(item.unit * item.q)} (was ${ru(item.original * item.q)}, ${item.discount}% off)`).join("\n");
    const message = `Kaushals order request\n\nCustomer: ${customer.name}\nPhone: ${customer.phone}\nAddress: ${customer.address}\n\nItems:\n${productsText}\n\nSubtotal: ${ru(summary.subtotal)}\nProduct offers: -${ru(summary.productDiscount)}\n${summary.bundleDiscount ? `Multi-piece offer: -${ru(summary.bundleDiscount)}\n` : ""}Total: ${ru(summary.total)}\n\nPlease confirm availability and delivery details.`;
    localStorage.setItem("kaushals-last-order", JSON.stringify({ ...customer, total: summary.total, createdAt: new Date().toISOString() }));
    setSent(true);
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return <main className="checkout-page"><header className="checkout-nav"><Link href="/"><ArrowLeft /> Continue shopping</Link><span>KAUSHALS</span><small>Secure order request</small></header><div className="checkout-layout"><section className="checkout-form"><p className="checkout-kicker">Your details</p><h1>Complete your <em>order request.</em></h1><p className="checkout-intro">We will prepare your exact order message for WhatsApp, where Kaushals confirms availability and delivery.</p>{sent && <div className="checkout-success"><CheckCircle /> Your WhatsApp order is ready to send. We will confirm your order there.</div>}<form onSubmit={submit}><label>Full name<input required name="name" placeholder="Your name" /></label><label>Phone number<input required name="phone" inputMode="tel" placeholder="Your WhatsApp number" /></label><label>Delivery address<textarea required name="address" placeholder="House, street, city and PIN code" /></label><button className="checkout-submit" disabled={!summary.items.length}>Send order to WhatsApp <ArrowRight /></button></form></section><aside className="checkout-summary"><p className="checkout-kicker">Order summary</p>{summary.items.length ? <>{summary.items.map((item) => <div className="checkout-item" key={item.id}><img src={`/images/kaushals/${item.image}`} alt="" /><div><b>{item.name}</b><small>{item.variant || "Standard finish"} · Qty {item.q}</small><span><s>{ru(item.original * item.q)}</s> {ru(item.unit * item.q)}</span></div></div>)}<dl><div><dt>Subtotal</dt><dd>{ru(summary.subtotal)}</dd></div><div><dt>Piece offers</dt><dd>−{ru(summary.productDiscount)}</dd></div><div><dt>Two-piece offer</dt><dd>{summary.bundleDiscount ? `−${ru(summary.bundleDiscount)}` : "Add one more piece"}</dd></div><div className="checkout-total"><dt>Total</dt><dd>{ru(summary.total)}</dd></div></dl></> : <div className="checkout-empty">Your bag is empty.<Link href="/#shop">Discover jewellery</Link></div>}</aside></div></main>;
}

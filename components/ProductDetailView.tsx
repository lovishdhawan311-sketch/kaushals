"use client";

import { ArrowLeft, ArrowRight, Heart, Minus, Plus, Star } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CartLine, products, ru, salePrice } from "@/lib/catalog";

const bagKey = "kaushals-bag";
const orderKey = "kaushals-checkout-lines";

export default function ProductDetailView() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const product = useMemo(() => products.find((item) => item.id === Number(params.id)), [params.id]);
  const [variant, setVariant] = useState("Gold finish");
  const [qty, setQty] = useState(1);
  const [saved, setSaved] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try { setSaved(JSON.parse(localStorage.getItem("kaushals-wish") || "[]").includes(product?.id)); } catch { setSaved(false); }
  }, [product?.id]);

  if (!product) return <main className="commerce-view commerce-view--empty"><Link href="/#shop"><ArrowLeft /> Back to collection</Link><h1>That piece is no longer available.</h1></main>;
  const currentProduct = product;

  function addToBag() {
    const line: CartLine = { id: currentProduct.id, q: qty, variant };
    try {
      const bag: CartLine[] = JSON.parse(localStorage.getItem(bagKey) || "[]");
      const exists = bag.find((item) => item.id === line.id && item.variant === line.variant);
      localStorage.setItem(bagKey, JSON.stringify(exists ? bag.map((item) => item === exists ? { ...item, q: item.q + qty } : item) : [...bag, line]));
    } catch { localStorage.setItem(bagKey, JSON.stringify([line])); }
    setNotice("Added to your bag");
    window.setTimeout(() => setNotice(""), 1800);
  }

  function buyNow() {
    localStorage.setItem(orderKey, JSON.stringify([{ id: currentProduct.id, q: qty, variant }]));
    router.push("/checkout");
  }

  function toggleSaved() {
    const next = !saved;
    setSaved(next);
    try {
      const existing: number[] = JSON.parse(localStorage.getItem("kaushals-wish") || "[]");
      localStorage.setItem("kaushals-wish", JSON.stringify(next ? [...new Set([...existing, currentProduct.id])] : existing.filter((id) => id !== currentProduct.id)));
    } catch { /* Local persistence is optional. */ }
  }

  const related = products.filter((item) => item.id !== product.id).slice(0, 4);
  return <main className="commerce-view product-view">
    <header className="commerce-nav"><Link href="/#shop"><ArrowLeft /> Collection</Link><Link className="commerce-nav__brand" href="/">KAUSHALS</Link><Link href="/cart">My bag</Link></header>
    <section className="product-view__grid">
      <div className="product-view__visual"><div className="product-view__image"><img src={`/images/kaushals/${product.image}`} alt={product.name} /></div><div className="product-view__thumbs"><button className="is-active"><img src={`/images/kaushals/${product.image}`} alt="" /></button>{related.slice(0, 3).map((item) => <button onClick={() => router.push(`/product/${item.id}`)} key={item.id}><img src={`/images/kaushals/${item.image}`} alt={item.name} /></button>)}</div></div>
      <article className="product-view__content"><div className="product-view__title"><p>{product.cat} · contemporary gold</p><button onClick={toggleSaved} aria-label="Save product"><Heart weight={saved ? "fill" : "regular"} /></button></div><h1>{product.name}</h1><div className="product-view__price"><s>{ru(product.price)}</s><strong>{ru(salePrice(product))}</strong><span>{product.discount}% off</span></div><div className="product-view__rating"><Star weight="fill" /> 4.8 <small>· 126 verified reviews</small></div><p className="product-view__intro">{product.detail} A considered piece designed to bring a little ceremony to the everyday.</p><div className="product-view__rule" /><div className="product-view__option"><span>Finish</span><div><button className={variant === "Gold finish" ? "is-active" : ""} onClick={() => setVariant("Gold finish")}>Gold finish</button><button className={variant === "Rose gold" ? "is-active" : ""} onClick={() => setVariant("Rose gold")}>Rose gold</button></div></div><div className="product-view__buybar"><div className="product-view__quantity"><button aria-label="Decrease quantity" onClick={() => setQty((value) => Math.max(1, value - 1))}><Minus /></button><span>{qty}</span><button aria-label="Increase quantity" onClick={() => setQty((value) => value + 1)}><Plus /></button></div><button className="commerce-button commerce-button--soft" onClick={addToBag}>Add to cart</button><button className="commerce-button commerce-button--dark" onClick={buyNow}>Buy now <ArrowRight /></button></div><p className="product-view__delivery">Complimentary shipping on orders above ₹3,000 · Carefully packed in Kaushals signature wrapping.</p><section className="product-view__related"><div><p>More to discover</p><h2>Related pieces</h2></div><div className="product-view__related-grid">{related.map((item) => <button onClick={() => router.push(`/product/${item.id}`)} key={item.id}><img src={`/images/kaushals/${item.image}`} alt={item.name} /><span>{item.name}</span></button>)}</div></section></article>
    </section>{notice && <div className="commerce-toast">{notice}</div>}
  </main>;
}

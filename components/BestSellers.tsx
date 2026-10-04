"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pieces = [
  { id: 5, name: "Ira Signet Ring", price: "₹1,487", image: "/images/kaushals/categories/ring.png", className: "feature" },
  { id: 2, name: "Nura Pearl Drops", price: "₹2,151", image: "/images/kaushals/categories/earrings.png", className: "earrings" },
  { id: 1, name: "Aarohi Chandbalis", price: "₹2,543", image: "/images/kaushals/categories/necklace.png", className: "necklace" },
];

export default function BestSellers() {
  const section = useRef<HTMLElement>(null);
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const categorySlot = document.querySelector<HTMLElement>("[data-category-edit-slot='true']");
    if (!categorySlot) return;
    const slot = document.createElement("div");
    slot.dataset.bestSellersSlot = "true";
    categorySlot.insertAdjacentElement("afterend", slot);
    setHost(slot);
    return () => slot.remove();
  }, []);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = gsap.utils.toArray<HTMLElement>(".best-sellers__piece");
    gsap.from(".best-sellers__intro > *", { autoAlpha: 0, y: 30, duration: 0.85, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: section.current, start: "top 72%", once: true } });
    gsap.from(cards, { autoAlpha: 0, y: 48, scale: 0.96, duration: 1, stagger: 0.13, ease: "power3.out", scrollTrigger: { trigger: section.current, start: "top 62%", once: true } });
    cards.forEach((card, index) => {
      const image = card.querySelector("img");
      if (image) gsap.to(image, { yPercent: index === 1 ? -5 : 5, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: 1 } });
    });
  }, { scope: section, dependencies: [host], revertOnUpdate: true });
  if (!host) return null;
  return createPortal(
    <section className="best-sellers" ref={section} aria-labelledby="best-sellers-title">
      <div className="best-sellers__inner">
        <div className="best-sellers__intro"><p>Chosen for their lasting presence</p><h2 id="best-sellers-title">Best sellers,<br /><em>now with a special offer.</em></h2><a className="best-sellers__cta" href="#shop">Shop best sellers <ArrowRight aria-hidden="true" /></a></div>
        <div className="best-sellers__gallery">{pieces.map((piece) => <article className={`best-sellers__piece ${piece.className}`} key={piece.name}><div className="best-sellers__image"><img src={piece.image} alt={piece.name} /></div><span className="best-sellers__copy"><b>{piece.name}</b><small>{piece.price} · offer included</small><i><button onClick={() => window.dispatchEvent(new CustomEvent("kaushals:add", { detail: piece.id }))}>Add to cart</button><button onClick={() => window.dispatchEvent(new CustomEvent("kaushals:buy", { detail: piece.id }))}>Buy now <ArrowRight aria-hidden="true" /></button></i></span></article>)}</div>
      </div>
    </section>, host,
  );
}

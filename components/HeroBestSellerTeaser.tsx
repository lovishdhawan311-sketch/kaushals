"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function HeroBestSellerTeaser() {
  const [hero, setHero] = useState<HTMLElement | null>(null);
  useEffect(() => setHero(document.querySelector<HTMLElement>(".site-shell > .hero")), []);
  if (!hero) return null;
  return createPortal(
    <a className="hero-best-seller" href="#shop" aria-label="Shop Kaushals best sellers">
      <img src="/images/kaushals/categories/ring.png" alt="Kaushals best-selling ring" />
      <span><small>Best sellers</small><b>Special offer</b></span>
      <ArrowRight aria-hidden="true" />
    </a>, hero,
  );
}

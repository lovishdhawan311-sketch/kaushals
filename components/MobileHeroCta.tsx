"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function MobileHeroCta() {
  const [hero, setHero] = useState<HTMLElement | null>(null);

  useEffect(() => setHero(document.querySelector<HTMLElement>(".site-shell > .hero")), []);
  if (!hero) return null;

  return createPortal(
    <a className="hero-mobile-cta" href="#shop">
      <span>Explore the collection</span><ArrowRight />
    </a>,
    hero,
  );
}

"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const categories = [
  { name: "bracelets", note: "Made to shine with lasting charm, designed for a look that's forever.", image: "/images/kaushals/categories/bracelet.png", className: "bracelets" },
  { name: "necklaces", note: "Love where the gift means far more than words can ever say.", image: "/images/kaushals/categories/necklace.png", className: "necklaces" },
  { name: "rings", note: "When it comes to glamour rings, the more the merrier.", image: "/images/kaushals/categories/ring.png", className: "rings" },
  { name: "earrings", note: "Add timeless sparkle to the ears and leave a lasting impression.", image: "/images/kaushals/categories/earrings.png", className: "earrings" },
];

export default function CategoryEdit() {
  const section = useRef<HTMLElement>(null);
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".site-shell > .hero");
    if (!hero) return;
    const slot = document.createElement("div");
    slot.dataset.categoryEditSlot = "true";
    hero.insertAdjacentElement("afterend", slot);
    setHost(slot);
    return () => slot.remove();
  }, []);

  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = gsap.utils.toArray<HTMLElement>(".category-edit__item");
    gsap.from(items, {
      autoAlpha: 0,
      y: 34,
      duration: 0.95,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: section.current, start: "top 72%", once: true },
    });
    items.forEach((item, index) => {
      const image = item.querySelector<HTMLElement>("img");
      if (!image) return;
      gsap.to(image, {
        yPercent: index % 2 ? -5 : 5,
        ease: "none",
        scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    });
  }, { scope: section, dependencies: [host], revertOnUpdate: true });

  if (!host) return null;

  return createPortal(
    <section className="category-edit" ref={section} aria-label="Shop by jewellery category">
      <div className="category-edit__canvas">
        {categories.map((category) => (
          <a className={`category-edit__item ${category.className}`} href="#shop" key={category.name}>
            <span className="category-edit__title">{category.name}</span>
            <span className="category-edit__image"><i/><img src={category.image} alt={`${category.name} by Kaushals`} /></span>
            <span className="category-edit__note">{category.note}</span>
            <span className="category-edit__cta">Shop {category.name}<ArrowRight /></span>
          </a>
        ))}
      </div>
    </section>
  , host);
}

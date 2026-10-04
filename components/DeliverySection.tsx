"use client";

import { ArrowRight, GlobeHemisphereWest } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function DeliverySection() {
  const section = useRef<HTMLElement>(null);
  const [host, setHost] = useState<HTMLElement | null>(null);
  useEffect(() => { const faq = document.querySelector<HTMLElement>("[data-faq-slot='true']"); if (!faq) return; const slot = document.createElement("div"); slot.dataset.deliverySlot = "true"; faq.insertAdjacentElement("beforebegin", slot); setHost(slot); return () => slot.remove(); }, []);
  useGSAP(() => { if (matchMedia("(prefers-reduced-motion: reduce)").matches) return; gsap.from(".delivery-section__intro, .delivery-section__map, .delivery-card", { autoAlpha: 0, y: 32, duration: .85, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: section.current, start: "top 72%", once: true } }); }, { scope: section, dependencies: [host], revertOnUpdate: true });
  if (!host) return null;
  return createPortal(<section className="delivery-section" ref={section} aria-labelledby="delivery-title"><div className="delivery-section__intro"><p className="eyebrow">Where we deliver</p><h2 id="delivery-title">A little Kaushals,<br /><em>wherever you are.</em></h2><p>Thoughtfully packed and sent with care to every address across India and the United Kingdom.</p><a href="#shop">Explore the edit <ArrowRight /></a></div><div className="delivery-section__map"><GlobeHemisphereWest /><span className="delivery-orbit orbit-one" /><span className="delivery-orbit orbit-two" /><i className="pin pin-india">India</i><i className="pin pin-uk">United Kingdom</i></div><div className="delivery-section__cards"><article className="delivery-card"><b>India</b><small>Standard delivery</small><strong>3–7 days</strong><p>Complimentary delivery on orders above ₹1,999.</p></article><article className="delivery-card"><b>United Kingdom</b><small>International delivery</small><strong>7–12 days</strong><p>Shipping is calculated and confirmed over WhatsApp.</p></article></div></section>, host);
}

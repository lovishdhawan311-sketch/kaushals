"use client";

import { ArrowRight, Minus, Plus } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const questions = [
  ["How do I choose the right piece?", "Start with the occasion, then choose the silhouette you will reach for again. Our edit is made to layer effortlessly."],
  ["Will my jewellery keep its finish?", "Store every piece dry, away from fragrance and moisture. A soft cloth after wear will keep the finish luminous."],
  ["How does the special offer work?", "Every selected piece carries its stated offer. Add two or more pieces to your bag and the ₹250 multi-piece offer applies automatically."],
  ["Can I order through WhatsApp?", "Yes. At checkout, your order details are prepared in a WhatsApp message for our team to confirm availability and delivery."],
  ["Do you offer gifting support?", "We can help you select a considered gift. Add your request in the WhatsApp order message and our team will guide you."],
];

export default function FaqSection() {
  const section = useRef<HTMLElement>(null);
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(2);
  useEffect(() => {
    const newsletter = document.querySelector<HTMLElement>(".site-shell > .newsletter");
    if (!newsletter) return;
    const slot = document.createElement("div");
    slot.dataset.faqSlot = "true";
    newsletter.insertAdjacentElement("beforebegin", slot);
    setHost(slot);
    return () => slot.remove();
  }, []);
  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.from(".faq-section__art, .faq-section__copy", { autoAlpha: 0, y: 32, duration: .9, stagger: .14, ease: "power3.out", scrollTrigger: { trigger: section.current, start: "top 72%", once: true } });
    gsap.from(".faq-item", { autoAlpha: 0, x: 20, duration: .65, stagger: .07, ease: "power2.out", scrollTrigger: { trigger: section.current, start: "top 62%", once: true } });
  }, { scope: section, dependencies: [host], revertOnUpdate: true });
  if (!host) return null;
  return createPortal(<section className="faq-section" ref={section} aria-labelledby="faq-title"><div className="faq-section__top"><div className="faq-section__art"><div><p>Light, held close.</p><small>Jewellery made to accompany<br />your everyday celebrations.</small></div><img src="/images/kaushals/reference-sparkle.jpg" alt="Kaushals jewellery close-up" /><a href="#shop">Discover the edit <ArrowRight /></a></div></div><div className="faq-section__body"><div className="faq-section__copy"><p className="eyebrow">A little clarity</p><h2 id="faq-title">Your questions,<br /><em>our answers.</em></h2><p>Everything you need to know before choosing the piece that feels most like you.</p></div><div className="faq-section__list">{questions.map(([question, answer], index) => <article className={`faq-item ${open === index ? "is-open" : ""}`} key={question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{question}</span>{open === index ? <Minus /> : <Plus />}</button><div className="faq-item__answer"><p>{answer}</p></div></article>)}</div></div></section>, host);
}

"use client";

import { ArrowRight } from "@phosphor-icons/react";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function EndSection() {
  const [host, setHost] = useState<HTMLElement | null>(null);
  const [message, setMessage] = useState("");
  useEffect(() => { const footer = document.querySelector<HTMLElement>(".site-shell > footer"); if (!footer) return; const slot = document.createElement("div"); slot.dataset.endSlot = "true"; footer.insertAdjacentElement("beforebegin", slot); setHost(slot); return () => slot.remove(); }, []);
  if (!host) return null;
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setMessage("You’re on the Kaushals list."); };
  return createPortal(<section className="end-section"><div className="end-section__top"><div><p className="eyebrow">Stay updated</p><h2>A quieter kind<br />of <em>occasion.</em></h2></div><form onSubmit={submit}><label>Get new pieces, private offers and launch notes directly in your inbox.</label><div><input required type="email" placeholder="Your email address" aria-label="Email address" /><button>Join us <ArrowRight /></button></div>{message && <small>{message}</small>}</form><nav><a href="#shop">Shop</a><a href="#collections">Collections</a><a href="#story">Our story</a><a href="mailto:care@kaushals.in">Contact</a></nav></div><div className="end-section__word">KAUSHALS</div><div className="end-section__rail"><span>Contact us</span><span>Made for the moments</span><span>Artful ornament</span><span>India · United Kingdom</span></div></section>, host);
}

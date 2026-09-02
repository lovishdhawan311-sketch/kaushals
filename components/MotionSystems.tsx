"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function MotionSystems() {
  const scope = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    let frame = 0;
    const render = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    lenis.on("scroll", ScrollTrigger.update);
    const root = document.querySelector<HTMLElement>(".site-shell");
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => gsap.fromTo(element, { y: 42, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%" } }));
      gsap.utils.toArray<HTMLElement>(".product").forEach((element, index) => gsap.fromTo(element, { y: 45, opacity: 0 }, { y: 0, opacity: 1, delay: index * 0.08, duration: 0.7, scrollTrigger: { trigger: element, start: "top 88%" } }));
      const storyMedia = document.querySelector<HTMLElement>(".story-media");
      if (storyMedia) gsap.to(storyMedia, { scale: 1.06, yPercent: -6, scrollTrigger: { trigger: ".story", start: "top bottom", end: "bottom top", scrub: 1 } });
    }, root ?? undefined);
    return () => {
      cancelAnimationFrame(frame);
      context.revert();
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useGSAP(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.querySelector<HTMLElement>(".site-shell");
    if (!root) return;
    scope.current = root;
    const nav = root.querySelector<HTMLElement>("header > nav");
    if (!nav) return;
    const controls = Array.from(nav.querySelectorAll<HTMLElement>(".links a, .icons button"));
    gsap.from(nav, { y: -18, opacity: 0, duration: 0.78, ease: "power3.out", clearProps: "transform,opacity" });
    const removers = controls.map((control) => {
      const enter = () => gsap.to(control, { y: -1, scale: 1.035, duration: 0.22, ease: "power2.out", overwrite: true });
      const leave = () => gsap.to(control, { y: 0, scale: 1, duration: 0.34, ease: "power3.out", overwrite: true });
      control.addEventListener("pointerenter", enter);
      control.addEventListener("pointerleave", leave);
      return () => {
        control.removeEventListener("pointerenter", enter);
        control.removeEventListener("pointerleave", leave);
      };
    });
    return () => removers.forEach((remove) => remove());
  }, { scope });

  return null;
}

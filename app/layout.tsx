import type { Metadata } from "next";
import "./globals.css";
import "./premium-refinement.css";
import "./collection-wheel.css";
import "./kaushals-home.css";
import "./hero-single.css";

export const metadata: Metadata = { title: "Kaushals | Contemporary Indian Jewellery", description: "Artful artificial jewellery, made to hold your attention and move with your life.", openGraph: { title: "Kaushals | Contemporary Indian Jewellery", description: "Pieces with presence, designed for the everyday ceremony.", type: "website" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

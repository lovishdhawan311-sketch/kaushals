import SiteClient from "@/components/SiteClient";

const productSchema = { "@context": "https://schema.org", "@type": "ItemList", name: "Kaushals jewellery", itemListElement: ["Aarohi Chandbalis", "Nura Pearl Drops", "Saanjh Layered Chain"].map((name, position) => ({ "@type": "ListItem", position: position + 1, item: { "@type": "Product", name, brand: { "@type": "Brand", name: "Kaushals" } } })) };
export default function Page() { return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} /><SiteClient /></>; }

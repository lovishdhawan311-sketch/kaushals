import RouteContent from "@/components/RouteContent";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Kaushals | Contemporary Indian Jewellery", description: "Discover Kaushals' edit of expressive artificial jewellery." };
export default async function RoutedPage({ params }: { params: Promise<{ slug: string[] }> }){ const { slug } = await params; return <RouteContent slug={slug} />; }

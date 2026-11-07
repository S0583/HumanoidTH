import type { Metadata } from "next";
import { redirect } from "next/navigation";

type SearchParams = Promise<{
  collection?: string;
  selectedId?: string;
}>;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: { index: false, follow: false }
};

export default async function AdminCmsRedirect({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const collection = params.collection ? `?collection=${encodeURIComponent(params.collection)}` : "";
  const selected = params.selectedId ? `${collection ? "&" : "?"}selectedId=${encodeURIComponent(params.selectedId)}` : "";
  redirect(`/admin${collection}${selected}`);
}

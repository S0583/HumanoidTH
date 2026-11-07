import type { Metadata } from "next";
import { redirect } from "next/navigation";

type SearchParams = Promise<{
  collection?: string | string[];
  selectedId?: string | string[];
}>;

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: { index: false, follow: false },
};

const first = (value?: string | string[]) =>
  Array.isArray(value) ? value[0] : value;

export default async function AdminCmsRedirect({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();

  const collection = first(params.collection);
  const selectedId = first(params.selectedId);

  if (collection) query.set("collection", collection);
  if (selectedId) query.set("selectedId", selectedId);

  const qs = query.toString();
  redirect(qs ? `/admin?${qs}` : "/admin");
}

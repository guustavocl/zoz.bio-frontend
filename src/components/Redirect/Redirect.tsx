"use client";
import { useRouter } from "next/navigation";

export default function Redirect({ path = "/", refresh = false }: { path?: string; refresh?: boolean }) {
  const router = useRouter();
  if (refresh) router.refresh();
  router.push(path);
  return <></>;
}

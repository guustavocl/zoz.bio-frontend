"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Redirect({ path = "/", refresh = false }: { path?: string; refresh?: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (refresh) router.refresh();
    router.push(path);
  }, []);

  return <></>;
}

"use client";
import { useRouter } from "next/navigation";

export default function Redirect({ path = "/" }: { path?: string }) {
  const router = useRouter();
  router.refresh();
  router.push(path);
  return <></>;
}

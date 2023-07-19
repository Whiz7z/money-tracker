"use client";
import Auth from "@/components/Auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession<any>();
  console.log(status);
  if (status === "authenticated") {
    router.push("/profile");
  }
  return <Auth />;
}

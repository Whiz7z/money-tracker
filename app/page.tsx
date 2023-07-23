import Auth from "@/components/Auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOption } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession<unknown, any>(authOption);

  if (session) {
    redirect("/profile");
  }
  return <Auth />;
}

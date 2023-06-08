import React from "react";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { authOption } from "../api/auth/[...nextauth]/route";
import SignOut from "@/components/SignOut";
import MainBlock from "@/components/MainBlock";

const Profile = async () => {
  const session = await getServerSession(authOption);
  console.log("sessi", session);

  return (
    <main
      className="flex h-screen w-screen bg-fill justify-center items-center  text-[2.2rem]
       align-middle text-center m-auto"
    >
      <MainBlock>
        <SignOut />
      </MainBlock>
    </main>
  );
};

export default Profile;

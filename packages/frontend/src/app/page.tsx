"use server";

import { auth } from "@/auth";
import { SignInButton } from "./components/sign-in-button";
import Image from "next/image";
import { SignOutButton } from "./components/sign-out-button";

export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return (
      <div> 
        {" "}
        <h1> Du wurdest erfolgreich angemeldet {session.user.name}</h1>
        {session.user.image  && (
          <Image 
            src={session.user.image} 
            width={48} height={48} 
            alt={session.user.name ?? "Avatar"}
            style={{ borderRadius: "50%" }}
          />
        )}
        <SignOutButton />
      </div>)
    ;
  }

  return (
    <div>
      {" "}
      <p>You Are Not Signed In</p> {" "}
      <SignInButton />
    </div>
  );
}
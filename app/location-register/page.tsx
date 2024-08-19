"use client";

import { LocationForm } from "@/components/Forms/LocationForm";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function RegisterScreen() {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const userIdFromCookie = Cookies.get("userId");
    setUserId(userIdFromCookie || null);
  }, []);

  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full flex h-screen">
      <div className="w-full bg-white h-full flex flex-col items-center justify-center p-4">
        <LocationForm userId={userId} />
      </div>
      <div className="background-register w-[40%] h-full bg-cover bg-center"></div>
    </div>
  );
}

"use client";

import { RegisterFormLogged } from "@/components/Forms/RegisterUserLoggedForm";

export default function RegisterScreen() {
  return (
    <div className="w-full flex h-screen">
      <div className="w-full bg-white h-full flex flex-col items-center justify-center p-4">
        <RegisterFormLogged />
      </div>
      <div className="background-register w-[40%] h-full bg-cover bg-center"></div>
    </div>
  );
}
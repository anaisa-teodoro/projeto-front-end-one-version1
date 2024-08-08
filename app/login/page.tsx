"use client";

import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginScreen() {
  return (
    <div className="w-full h-screen flex">
      <div className="background-image"></div>
      <div className="w-[60%] bg-white h-full flex flex-col items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  );
}

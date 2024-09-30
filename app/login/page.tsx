"use client";

import { LoginForm } from "@/components/Forms/LoginForm";

export default function LoginScreen() {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-y-auto">
      <div className="background-image"></div>
      <div className="md:w-[60%] bg-white h-full flex flex-col items-center justify-center p-4">
        <LoginForm />
      </div>
    </div>
  );
}

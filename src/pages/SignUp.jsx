import React from "react";
import AuthForm from "../components.jsx/AuthForm";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <AuthForm mode="signup" />
      </div>
    </div>
  );
}

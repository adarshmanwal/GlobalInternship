import React, { useState } from "react";
import { Form, Link } from "react-router-dom";

export default function AuthForm({ mode }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <>
      <Form method="post">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "Log in" : "Create a new account"}
        </h1>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-white rounded ${
              isSubmitting
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : mode === "login"
              ? "Login"
              : "Sign Up"}
          </button>

          <Link
            to={mode === "login" ? "/auth/signup" : "/auth/login"}
            className="text-blue-600 hover:underline"
          >
            {mode === "login"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Log in"}
          </Link>
        </div>
      </Form>
    </>
  );
}

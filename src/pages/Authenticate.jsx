import React from "react";
import { Outlet, redirect } from "react-router-dom";
import httpClient from "../utils/httpClient";
export default function Authentication() {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export async function action({ request }) {
  try {
    debugger;
    const url = new URL(request.url);
    const endpoint = url.pathname.split("/").filter(Boolean).pop();
    const formData = await request.formData();

    const authData = {
      //   email: formData.get("email"),
      //   password: formData.get("password"),
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };
    debugger;
    const response = await httpClient.post(`/api/${endpoint}`, authData);
    if (![200, 201].includes(response.status)) {
      return response;
    }

    if (response.status === 201) {
      return redirect("/auth/login");
    }

    const { token } = response.data;

    localStorage.setItem("token", token);

    return redirect("/");
  } catch (error) {
    // if (error.response && error.response.data.error === "Validation error") {
    //   return { error: ["Email already exist"] }; // Ensure it's an array
    // }
    return { error: ["An unexpected error occurred"] };
  }
}

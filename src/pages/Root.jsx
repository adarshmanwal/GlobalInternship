import React, { useEffect } from "react";
import { Form, Outlet, useNavigate } from "react-router-dom";
import { getAuthToken } from "../utils/auth";
import UsersContextProvider from "../store/users-context";

export default function Root() {
  const navigate = useNavigate();
  const token = getAuthToken();
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);

  return (
    <UsersContextProvider>
      <div className="flex-1">
        {token && (
          <header>
            {/* Header  or nav */}
            <div>
              <nav className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                  <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                      <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">
                          <a
                            href="users"
                            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                            aria-current="page"
                          >
                            users
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                      {/* Profile dropdown */}
                      <Form method="post" action="/logout">
                        <button
                          type="submit"
                          className="w-full text-left block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-black"
                        >
                          Sign out
                        </button>
                      </Form>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </header>
        )}

        <main>
          <Outlet />
        </main>
      </div>
    </UsersContextProvider>
  );
}

import React, { useEffect } from "react";
import { Form, Outlet, useNavigate } from "react-router-dom";
import { getAuthToken } from "../utils/auth";

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
    <>
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
                      <div className="relative ml-3">
                        <div>
                          <button
                            type="button"
                            className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                            id="user-menu-button"
                            aria-expanded="false"
                            aria-haspopup="true"
                          >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="size-8 rounded-full"
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt
                            />
                          </button>
                        </div>
                        <div
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu-button"
                          tabIndex={-1}
                        >
                          {/* Active: "bg-gray-100 outline-hidden", Not Active: "" */}
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex={-1}
                            id="user-menu-item-0"
                          >
                            Your Profile
                          </a>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            tabIndex={-1}
                            id="user-menu-item-1"
                          >
                            Settings
                          </a>
                          <Form method="post" action="/logout">
                            <button
                              type="submit"
                              className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              Sign out
                            </button>
                          </Form>
                        </div>
                      </div>
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
    </>
  );
}

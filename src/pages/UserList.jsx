import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import httpClient from "../utils/httpClient";
import { getAuthToken } from "../utils/auth";
import { UsersContext } from "../store/users-context";

function UserList() {
  const { users, setUsers, total_pages, setTotalPages,setCurrentPage,current_page } =
    useContext(UsersContext);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      navigate("/auth", { replace: true });
    }
  }, [navigate]);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (!params.has("page")) {
      navigate("?page=1", { replace: true });
      return;
    }
    if (users.length > 0 && current_page == params.get("page")) {
      return;
    }
    const usersData = async () => {
      try {
        const response = await httpClient.get(`/api/users${location.search}`);
        setCurrentPage(response.data.page)
        setTotalPages(response.data.total_pages);
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    usersData();
  }, [location.search, navigate]);

  const currentPage =
    parseInt(new URLSearchParams(location.search).get("page")) || 1;
  const goToPage = (page) => {
    navigate(`?page=${page}`);
  };

  const handleDelete = async (id) => {
    try {
      await httpClient.delete(`/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
  return (
    <>
      {/* user list  */}
      <div className="px-4 sm:px-6 lg:px-8">
        <ul role="list" className="divide-y divide-gray-100">
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id} className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="size-12 flex-none rounded-full bg-gray-50"
                    src={
                      user.avatar ||
                      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    }
                    alt={user.first_name}
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold text-gray-900">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* Edit Button */}
                  <button
                    type="button"
                    className="text-sm text-green-500 hover:underline"
                    onClick={() => navigate(`/users/${user.id}`)}
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    type="button"
                    className="text-sm text-red-500 hover:underline"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No users found</p>
          )}
        </ul>
      </div>
      {/* pagination */}
      {total_pages && total_pages > 1 && (
        <div>
          <div className="border-t border-gray-200 bg-white px-4 py-3">
            <div className="flex justify-center">
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-xs"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 ${
                      currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="flex gap-2">
                    {Array.from(
                      { length: total_pages },
                      (_, index) => index + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          currentPage === page
                            ? "bg-indigo-600 text-white"
                            : "text-gray-900 hover:bg-gray-50 ring-1 ring-gray-300 ring-inset"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === total_pages}
                    className={`relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 ${
                      currentPage === total_pages
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="size-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserList;

import { createContext, useState } from "react";
export const UsersContext = createContext({
  users: [],
  total_pages: 0,
  current_page: 0,
  setCurrentPage:()=>{},
  setUsers: () => {},
  setTotalPages: () => {},
});

export default function UsersContextProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [current_page,setCurrentPage] = useState(0)
  const [total_pages, setTotalPages] = useState(0);
  const ctx = {
    users,
    total_pages,
    setUsers,
    current_page,
    setCurrentPage,
    setTotalPages,
  };

  return <UsersContext.Provider value={ctx}>{children}</UsersContext.Provider>;
}

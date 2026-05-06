// src/components/layout/Navbar.jsx
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/features/auth/hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  /*
    Logout and redirect
  */

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <h1 className="text-xl font-bold">Content Broadcasting System</h1>

      <div className="flex items-center gap-4">
        <p className="font-medium">{user?.name}</p>

        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
};

export default Navbar;

import { useState } from "react";

import GuestPage from "./pages/Guest/GuestPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";

function App() {

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <>
      {
        isAuthenticated ? (
          <DashboardPage
            handleLogout={handleLogout}
          />
        ) : (
          <GuestPage />
        )
      }
    </>
  );
}

export default App;
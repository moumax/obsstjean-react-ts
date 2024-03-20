import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
import Administration from "@/pages/Administration.tsx";
import Signup from "@/pages/Signup.tsx";
import { Button } from "./components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "./components/ui/sonner"

function App() {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  return (
    <main className="h-fit bg-[#072449]">
      <Toaster position="bottom-right" expand/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/administration"
            element={
              isLoggedIn ? (
                <Administration />
              ) : (
                <div className="flex h-screen flex-col items-center justify-center gap-10 text-center text-white">
                  Tu n'as pas les droits nécéssaires pour accéder à cette page
                  <Button type="submit" onClick={() => navigate("/")}>
                    Retour
                  </Button>
                </div>
              )
            }
          />
        </Routes>
      </div>
    </main>
  );
}

export default App;

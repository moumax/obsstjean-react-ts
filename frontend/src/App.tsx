import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "@/pages/Home.tsx";
import Login from "@/pages/Login.tsx";
import Administration from "@/pages/Administration.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import Signup from "@/pages/Signup.tsx";
import useSWR from "swr";
import callAPI from "./api/callAPI";
import { Button } from "./components/ui/button";

function App() {
  const { data: dataSession } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/api/session/`,
    callAPI,
  );
  const navigate = useNavigate();

  return (
    <main className="h-fit bg-[#072449]">
      <Toaster />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/administration"
            element={
              dataSession ? (
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

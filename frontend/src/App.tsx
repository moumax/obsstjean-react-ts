import { Route, Routes } from "react-router-dom"
import Home from "@/pages/Home.tsx"
import Login from "@/pages/Login.tsx"
import Administration from "@/pages/Administration.tsx"
import { Toaster } from "@/components/ui/toaster.tsx"
import Signup from "@/pages/Signup.tsx"

function App() {
  return (
    <main className="bg-[#072449] h-fit">
      <Toaster/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/administration" element={<Administration />} />
        </Routes>
      </div>
    </main>
  )
}

export default App

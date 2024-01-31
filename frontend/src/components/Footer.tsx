import { Button } from "@/components/ui/button.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import { BiLogoJavascript, BiLogoReact } from "react-icons/bi";
import { SiMysql } from "react-icons/si";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

const  handleDisconnection = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/logout/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
        if (!response.ok) {
      toast({
        description: "Logout impossible",
      })
      throw new Error('Erreur dans la fonction logout');
    }
      toast({
        description: "Tu es déconnecté !",
      })
  }

  return (
    <footer className="flex flex-col">
      <div className="flex flex-col text-white opacity-40 items-center text-xs">
        <p>© 2019 - 2023 -- Marc LANTOL</p>
        <p>Observatoire Astronomique de Saint Jean Le Blanc (V3.0.0)</p>
        <div className="mt-4 mb-4 flex self-start gap-3">
          <BiLogoReact size="2rem" color="#61DAFB" />
          <BiLogoJavascript size="2rem" color="yellow" />
          <SiMysql size="2rem" color="#3e6e93" />
          <img className="w-6" src="src/assets/footer/logo_st_jean_le_blanc.png" alt="Ville de Saint Jean Le Blancé" />
        </div>
      </div>
      <div className="self-end mt-5">
        <Button
          type="submit"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button type="submit" onClick={handleDisconnection}>Logout</Button>
        <Button
          type="submit"
          onClick={() => navigate("/administration")}
        >
          Administration
        </Button>
      </div>
    </footer>
  )
}

export default Footer

import { Button } from "@/components/ui/button.tsx";
import { toast } from "@/components/ui/use-toast.ts";
import { BiLogoJavascript, BiLogoReact } from "react-icons/bi";
import { SiMysql } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

function refreshPage() {
  window.location.reload();
}

function Footer() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleDisconnection = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      if (!response.ok) {
        toast({
          description: "Logout impossible",
        });
        throw new Error("Erreur dans la fonction logout");
      }

      toast({
        description: "Tu es déconnecté !",
      });
      refreshPage();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    }
  };

  return (
    <footer className="flex flex-col">
      <div className="flex flex-col items-center text-center text-xs text-white opacity-40">
        <p>© 2019 - 2023 -- Marc LANTOL</p>
        <p>Observatoire Astronomique de Saint Jean Le Blanc (V3.0.0)</p>
        <div className="mb-4 mt-4 flex gap-3 self-center">
          <BiLogoReact size="3rem" color="#61DAFB" />
          <BiLogoJavascript size="3rem" color="yellow" />
          <SiMysql size="3rem" color="#3e6e93" />
          <img
            className="w-8"
            src="src/assets/footer/logo_st_jean_le_blanc.png"
            alt="Ville de Saint Jean Le Blancé"
          />
        </div>
      </div>
      <div className="mt-5 self-end">
        {!isLoggedIn && (
          <Button type="submit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
        {isLoggedIn && (
          <Button type="submit" onClick={handleDisconnection}>
            Logout
          </Button>
        )}
        {isLoggedIn && (
          <Button type="submit" onClick={() => navigate("/administration")}>
            Administration
          </Button>
        )}
      </div>
    </footer>
  );
}

export default Footer;

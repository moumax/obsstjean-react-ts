import { Button } from "@/components/ui/button.tsx"
import { Input } from "@/components/ui/input.tsx"
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col h-screen justify-center gap-3">
      <h2 className="text-xl text-center text-white mb-10">Page de connexion</h2>
      <Input type="text" placeholder="Email@email.com" />
      <Input type="text" placeholder="Mot de passe" />
      <Button className="bg-green-600">Se connecter</Button>
      <Button className="bg-red-600" type="submit" onClick={() => navigate("/signup")}>
        Créer un compte
      </Button>
      <Button
        className="mt-10"
        type="submit"
        onClick={() => navigate("/")}
        >
          Retour
      </Button>
    </section>
  )
}

export default Login

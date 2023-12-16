import logo from "@/assets/header/logo.png";
import coupole from "@/assets/header/coupole.jpg";

function Header() {
  return (
    <header className="mb-10">
      <div className="flex gap-3">
        <img
          className="w-1/2"
          src={logo}
          alt="Logo de l'observatoire de Saint Jean Le Blanc"
        />
        <h1 className="text-xl bg-gradient-to-r from-[#fffc08] to-[#575506] bg-clip-text text-transparent font-extralight mt-12">
          Observatoire <br /> de <br /> Saint Jean Le Blanc
        </h1>
      </div>
      <h2 className="text-white opacity-50 text-xs text-center my-4">
        Association loi 1901 pour la promotion de l&apos;astronomie amateur
      </h2>
      <img
        className="rounded-3xl"
        src={coupole}
        alt="Coupole de l'observatoire de Saint Jean Le Blanc"
      />
    </header>
  );
}

export default Header;

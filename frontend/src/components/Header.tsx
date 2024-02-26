import logo from "@/assets/header/logo.png";
import coupole from "@/assets/header/coupole.jpg";

function Header() {
  return (
    <header className="mb-10 mt-10 flex flex-col">
      <div className="flex flex-row">
        <img
          className="w-1/2"
          src={logo}
          alt="Logo de l'observatoire de Saint Jean Le Blanc"
        />
        <h1 className="ml-5 self-end bg-gradient-to-r from-[#fffc08] to-[#575506] bg-clip-text text-center text-xl font-extralight text-transparent">
          Observatoire <br /> de <br /> Saint Jean Le Blanc
        </h1>
      </div>
      <h2 className="my-4 text-center text-xs text-white opacity-50">
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

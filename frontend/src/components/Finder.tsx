import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";


async function fetchData(authString) {
const response = await fetch ('https://simbad.u-strasbg.fr/simbad/sim-id?Ident=M31&NbIdent=1&Radius=2&Radius.unit=arcmin&submit=submit+id')
  try {
    const response = await fetch('https://api.astronomyapi.com/api/v2/search?term=m31&ra=&dec=&match_type=exact', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${authString}`
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    throw error;
  }
}

function Finder({ appId, appSecret }) {
  const authString = btoa(`${appId}:${appSecret}`);

  const [bodies, setBodies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData(authString)
      .then(data => {
        setBodies(data); // Définir bodies avec le tableau de données
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [authString]);

  return (
    <Dialog>
      <DialogTrigger className="bg-white">Trouver une cible</DialogTrigger>
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle>Trouver une cible</DialogTitle>
          <DialogDescription>
            Trouve une cible à prendre en photo en ce moment !
            <div>
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p>Error: {error}</p>
              ) : (
                <ul>
                  {bodies.map((body, index) => (
                    <li key={index}>
                      <strong>{body.name}</strong><br />
                      Right Ascension: {body.position.equatorial.rightAscension.string}<br />
                      Declination: {body.position.equatorial.declination.string}<br />
                      Constellation: {body.position.constellation.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Finder;
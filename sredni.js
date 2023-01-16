import { warunki_wygranej } from "./warunki_wygranej";

export class tryb_sredni {
  getMove = (pola, gracz) => {
    for (let i = 0; i <= 7; i++) {
      const [posA, posB, posC] = warunki_wygranej[i];
      const value1 = pola[posA];
      const value2 = pola[posB];
      const value3 = pola[posC];

      if (value1 === value2 && value1 !== "" && value3 === "") {
        return posC;
      }
      if (value1 === value3 && value1 !== "" && value2 === "") {
        return posB;
      }
      if (value2 === value3 && value2 !== "" && value1 === "") {
        return posA;
      }
    }

    const puste_pola = Object.entries(pola)
      .filter((wpis_do_pola) => wpis_do_pola[1] === "")
      .map((wpis_do_pola) => wpis_do_pola[0]);

    const losowa_pozycja = Math.floor(Math.random() * puste_pola.length);
    return puste_pola[losowa_pozycja];
  };
}

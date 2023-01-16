export class tryb_latwy {
  getMove = (pola, gracz) => {
    const puste_pola = Object.entries(pola)
      .filter((wpis_do_pola) => wpis_do_pola[1] === "")
      .map((wpis_do_pola) => wpis_do_pola[0]);

    const losowe_pole = Math.floor(Math.random() * puste_pola.length);
    return puste_pola[losowe_pole];
  };
}

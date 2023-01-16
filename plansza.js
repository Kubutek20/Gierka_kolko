export class plansza {
  elementy_pola = document.querySelectorAll(".kwadrat");
  panel = document.querySelector(".panel");
  tryb_gry = document.querySelector("#tryb-gry");
  przycisk_1 = document.querySelector(".przycisk-resetu");
  nazwa_aktywnego_gracza = document.querySelector("#aktywny-gracz");

  constructor(onItemClick, klikniecie_przycisku, zmiana_trybu_gry) {
    this.klikniecie_przycisku = klikniecie_przycisku;
    this.przycisk_1.addEventListener("click", this.przycisk);

    this.elementy_pola.forEach((field) => {
      field.addEventListener("click", onItemClick);
    });
    this.tryb_gry.addEventListener("change", zmiana_trybu_gry);

    this.ustaw_aktywnego_gracza("X");
  }

  ustaw_aktywnego_gracza = (player) => {
    this.nazwa_aktywnego_gracza.innerText = player;
  };

  przycisk = () => {
    this.reset_planszy();
    this.klikniecie_przycisku();
  };

  reset_planszy = () => {
    this.reset_klas_planszy();
    this.reset_komunikatu();
    this.ustaw_aktywnego_gracza("X");
  };

  reset_klas_planszy = () => {
    this.elementy_pola.forEach((field) => {
      field.classList.remove("kwadrat--filled-X", "kwadrat--filled-0");
    });
  };

  pole_po_pozycji = (position) => {
    return this.elementy_pola[position];
  };

  komunikat_wygranej = (aktywny_gracz) => {
    this.panel.innerText = `Gratulacje ${aktywny_gracz}, Wygrałeś!`;
  };

  komunikat_remisu = () => {
    this.panel.innerText = `Remis!`;
  };

  reset_komunikatu = () => {
    this.panel.innerText = "";
  };
}

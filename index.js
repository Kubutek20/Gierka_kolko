import { plansza } from "./plansza";
import { tryb_latwy } from "./latwy";
import { tryb_sredni } from "./sredni";
import { warunki_wygranej } from "./warunki_wygranej";

class Game {
  pola;
  aktywny_gracz;
  aktywna_gra;

  aktywny_tryb = null; //null - pvp
  ruch_bota = false;

  constructor() {
    this.plansza = new plansza(
      this.klikniecie,
      this.reset,
      this.zmiana_trybu_gry
    );
    this.domyslne_ustawienia();
  }

  domyslne_ustawienia = (ruch_bota) => {
    this.pola = ["", "", "", "", "", "", "", "", ""];
    this.aktywny_gracz = "X";
    this.aktywna_gra = true;
    this.ruch_bota = ruch_bota !== undefined ? ruch_bota : false;
  };

  zmiana_trybu_gry = (e) => {
    this.aktywny_tryb = this.nazwa_trybu_gry(e.target.value);
    this.domyslne_ustawienia(false);
    this.plansza.reset_planszy();
  };

  nazwa_trybu_gry = (name) => {
    if (name === "latwy") return new tryb_latwy();
    if (name === "sredni") return new tryb_sredni();
    return null;
  };

  reset = () => {
    this.domyslne_ustawienia(!this.ruch_bota);
    this.bot_pierwszy();
  };

  bot_pierwszy = () => {
    if (this.ruch_bota && this.aktywny_tryb !== null) {
      this.wykonaj_ruch(
        this.aktywny_tryb.getMove(this.pola, this.aktywny_gracz)
      );
    }
  };

  klikniecie = (e) => {
    const { pos } = e.target.dataset;

    if (this.aktywna_gra && this.pola[pos] === "") {
      this.wykonaj_ruch(pos);

      if (this.aktywna_gra && this.aktywny_tryb !== null) {
        this.wykonaj_ruch(
          this.aktywny_tryb.getMove(this.pola, this.aktywny_gracz)
        );
      }
    }
  };

  wykonaj_ruch = (position) => {
    this.pola[position] = this.aktywny_gracz;
    this.plansza
      .pole_po_pozycji(position)
      .classList.add(`kwadrat--filled-${this.aktywny_gracz}`);
    this.gierka();
    this.aktywny_gracz = this.aktywny_gracz === "X" ? "0" : "X";
    this.plansza.ustaw_aktywnego_gracza(this.aktywny_gracz);
  };

  plansza_zapelniona = () => {
    return this.pola.find((field) => field === "") === undefined;
  };

  gierka = () => {
    let gra_wygrana = false;

    for (let i = 0; i <= 7; i++) {
      const [posA, posB, posC] = warunki_wygranej[i];
      const value1 = this.pola[posA];
      const value2 = this.pola[posB];
      const value3 = this.pola[posC];

      if (value1 !== "" && value1 === value2 && value1 === value3) {
        gra_wygrana = true;
        break;
      }
    }

    if (gra_wygrana) {
      this.aktywna_gra = false;
      this.plansza.komunikat_wygranej(this.aktywny_gracz);
    } else if (this.plansza_zapelniona()) {
      this.aktywna_gra = false;
      this.plansza.komunikat_remisu();
    }
  };
}

const game = new Game();

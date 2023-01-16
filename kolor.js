class kolor {
  constructor() {
    this.color = "000000";
  }
}

class zmiana extends kolor {
  constructor() {
    super();
    this.color = "#" + this.color;
  }
}

const zmiana_kol = new zmiana();
document.querySelector("body").style.background = `${zmiana_kol.color}`;

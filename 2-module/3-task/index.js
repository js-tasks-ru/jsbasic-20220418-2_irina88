let calculator = {
  A: null,
  B: null,

  read(a,b) {
    this.A = a
    this.B = b
  },
  sum() {
    return this.A+this.B
  },
  mul() {
    return this.A*this.B
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально

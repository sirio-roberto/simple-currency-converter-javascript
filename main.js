function Currency(name, rateFromUSD) {
  this.name = name;
  this.rateFromUSD = rateFromUSD;
}

const currencies = [
  new Currency("USD", 1.0),
  new Currency("JPY", 113.5),
  new Currency("EUR", 0.89),
  new Currency("RUB",  	74.36),
  new Currency("GBP", 0.75),
]

function main() {
  console.log("Welcome to Currency Converter!");
  currencies.forEach(c => console.log(`1 USD equals ${c.rateFromUSD} ${c.name}`));
}

main();
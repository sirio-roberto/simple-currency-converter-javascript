const input = require("sync-input");

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

function getCurrencyNames() {
  return currencies.map(c => c.name);
}

function validateCurrencyName(toCurrency) {
  if (!getCurrencyNames().includes(toCurrency)) {
    return "Unknown currency";
  }
  return "";
}

function validateCurrencyAmount(amount) {
  if (isNaN(amount)) {
    return "The amount has to be a number";
  }
  if (amount < 1) {
    return "The amount cannot be less than 1";
  }
  return "";
}

function convertAmount(fromCurrency, toCurrency, amount) {
  const rate = currencies.find(c => c.name === toCurrency).rateFromUSD;
  const result = rate * amount;
  return result.toFixed(4);
}

function main() {
  console.log("Welcome to Currency Converter!");
  currencies.forEach(c => console.log(`1 USD equals ${c.rateFromUSD} ${c.name}`));
  console.log("I can convert USD to these currencies: " + "JPY, EUR, RUB, USD, GBP"); // change it later back to getCurrencyNames
  let fromCurrency = "USD";
  console.log("Type the currency you wish to convert: " + fromCurrency);

  let toCurrency = input("To: ").toUpperCase();
  let errorMsg = validateCurrencyName(toCurrency);
  if (errorMsg) {
    console.log(errorMsg);
  } else {
    let amount = Number(input("Amount: "));
    errorMsg = validateCurrencyAmount(amount);
    if (errorMsg) {
      console.log(errorMsg);
    } else {
      const convertedAmount = convertAmount(fromCurrency, toCurrency, amount);
      console.log(`Result: ${amount} ${fromCurrency} equals ${convertedAmount} ${toCurrency}`);
    }
  }
}

main();
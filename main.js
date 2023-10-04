const input = require("sync-input");

function Currency(name, from, to, rate) {
  this.name = name;
  this.from = from;
  this.to = to;
  this.rate = rate;
}

const currencies = [
  new Currency("USD:USD", "USD", "USD", 1.0),
  new Currency("USD:JPY", "USD", "JPY", 113.5),
  new Currency("USD:EUR", "USD", "EUR",  0.89),
  new Currency("USD:RUB", "USD", "RUB",  	74.36),
  new Currency("USD:GBP", "USD", "GBP",  0.75),
]

function getCurrencyNames() {
  return currencies.map(c => c.name).flatMap(name => name.split(":"));
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
  let currency = currencies.find(c => c.from === fromCurrency && c.to === toCurrency);
  let rate;
  if (currency === undefined) {
    // if we are handling any USD conversion, that will be easier, so let's start with that
    if (toCurrency === "USD") {
      const invertedRate = currencies.find(c => c.to === fromCurrency && c.from === toCurrency).rate;
      rate = 1 / invertedRate;
    } else {
      // worst scenario, where we are not handling any USD currency, so we will need triangulation
      // first we need to convert the fromCurrency to USD and then get the rate based on that
      const USDFromRate = currencies.find(c => c.from === "USD" && c.to === fromCurrency).rate;
      rate = currencies.find(c => c.from === "USD" && c.to === toCurrency).rate;
      rate /= USDFromRate;
    }
  } else {
    rate = currency.rate;
  }
  const result = rate * amount;
  return result.toFixed(4);
}

function validateOptionsInput(userInput) {
  if (userInput !== "1" && userInput !== "2") {
    return "Unknown input";
  }
  return "";
}

function showConversionMenu() {
  console.log("What do you want to convert?");

  let fromCurrency = input("From: ").toUpperCase();
  let errorMsg = validateCurrencyName(fromCurrency);
  if (errorMsg) {
    console.log(errorMsg);
  } else {
    let toCurrency = input("To: ").toUpperCase();
    errorMsg = validateCurrencyName(toCurrency);
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
}

function main() {
  console.log("Welcome to Currency Converter!");
  currencies.forEach(c => console.log(`1 ${c.from} equals ${c.rate} ${c.to}`));
  let userInput;
  do {
    console.log("What do you want to do?");
    userInput = input("1-Convert currencies 2-Exit program\n");
    let errorMsg = validateOptionsInput(userInput);
    if (errorMsg) {
      console.log(errorMsg);
    } else if (userInput === "1") {
      showConversionMenu();
    } else {
      break;
    }
  } while (true);

  console.log("Have a nice day!");
}

main();
/*
Cedis per Euro = Cedis per Dollar/Euro per Dollar
*/


export function cedisToOther(currencies) {
    let {cedisPerDollar,otherPerDollar,cedis} = currencies
    // Convert the amount of Cedis to Dollars by dividing by the Cedis per Dollar rate
    let dollars = cedis / cedisPerDollar;
  
    // Convert the amount of Dollars to other by multiplying by the other per Dollar rate
    let other = (1/(dollars * otherPerDollar)).toFixed(2);
  
    // Return the amount of other
    return Number(other);
  }
  

export function convertExchangeRates(data){
    const {conversion_rates:conversionRates} = data; 
    const desiredCurrencies = ["NGN", "GBP", "EUR", "CNY"];

    const convertedValues = {};
    convertedValues.GHS = Number((conversionRates.GHS).toFixed(2)); //Cedi to Dollar Rate

    desiredCurrencies.forEach((currency) => {
      const otherPerDollar = conversionRates[currency];
      const cedis = 1;
    //   console.log(currency, otherPerDollar);
    
      convertedValues[currency] = cedisToOther({
        cedisPerDollar:conversionRates.GHS,
        otherPerDollar,
        cedis,
      });
    });

    return convertedValues;
}
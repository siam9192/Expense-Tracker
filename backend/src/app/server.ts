import app from "./app";
import countryService from "./modules/country/country.service";
import currencyService from "./modules/currency/currency.service";

async function main() {
  try {
    app.listen(5000, () => {
      console.log("Server is connected");
    });
  } catch (error) {
    console.log(error);
  }
}

main();

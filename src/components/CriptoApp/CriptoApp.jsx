import { useState } from "react";
import axios from "axios";

export const CriptoApp = () => {
  const [bitcoin, setBitcoin] = useState("");
  const [currencyRate, setCurrencyRate] = useState();

  const changeValueBitcoin = async (event) => {
    setBitcoin(event.target.value);
    try {
      const response = await axios(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,rub,eur"
      );
      setCurrencyRate(response.data);
    } catch (err) {
      console.error("Произошла ошибка!", err);
    }
  };

  console.log(currencyRate);

  return (
    <div>
      <input type="number" value={bitcoin} onChange={changeValueBitcoin} />

      {currencyRate && (
        <div>
          <p>{currencyRate.bitcoin.usd} $</p>
          <p>{currencyRate.bitcoin.rub} руб</p>
          <p>{currencyRate.bitcoin.eur} евро</p>
        </div>
      )}
    </div>
  );
};

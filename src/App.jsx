import { useState, useEffect } from "react";
import useCurrencyInfo from "./hooks/currencyInfo";

function App() {
  // Variables
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("usd");
  const [toCurrency, setToCurrency] = useState("pkr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencyNames, setCurrencyNames] = useState({});
  const [from, setFrom] = useState("US Dollar");
  const [to, setTo] = useState("Pakistani Rupee");
  const currencyInfo = useCurrencyInfo(fromCurrency);
  const currName = Object.values(currencyNames);

  // Fetching API for converting currency code to name
  const fetchCurrencyNames = async () => {
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json`
    );
    const data = await response.json();
    return data;
  };
  useEffect(() => {
    const getCurrencyNames = async () => {
      const names = await fetchCurrencyNames();
      setCurrencyNames(names);
    };
    getCurrencyNames();
  }, []);

  // Function for finding keys from value
  const findKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  // Function for convert currency amount
  function convertCurrency() {
    setConvertedAmount(amount * currencyInfo[toCurrency]);
  }

  return (
    <>
      <div className="bg-[#1A202C] w-full h-screen flex justify-center items-center flex-col">
        <h1 className="text-white font-medium text-5xl mb-4">
          Currency Converter
        </h1>
        <div className="w-[30%] bg-[#171A23] h-[70%] flex flex-col items-center">
          <div className="w-[80%] mt-20">
            {/* Input for amount */}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-10 bg-[#171A23] text-white text-xl p-4 outline-none border border-zinc-700 rounded-md"
            />
          </div>
          <div className="w-[80%] mt-4 mb-6">
            {/* Dropdown for selecting from currency */}
            <select
              className="w-full h-10 bg-[#20232C] text-white text-xl px-2 outline-none rounded-md"
              value={from}
              onChange={(e) => {
                setFromCurrency(findKeyByValue(currencyNames, e.target.value));
                setFrom(e.target.value);
              }}
            >
              {currName
                .filter((curr) => curr !== "")
                .map((currency, index) => (
                  <option key={index} value={currency}>
                    {currency}
                  </option>
                ))}
            </select>
          </div>
          {/* Swap button */}
          <button
            className="bg-[#20232C] px-4 w-20 h-8 text-white text-center text-xl rounded-md hover:bg-[#2C313D]"
            onClick={() => {
              // Swap currencies
              const temp = fromCurrency;
              setFromCurrency(toCurrency);
              setToCurrency(temp);
            }}
          >
            Swap
          </button>

          <div className="w-[80%] mt-6">
            {/* Dropdown for selecting to currency */}
            <select
              value={to}
              onChange={(e) => {
                setToCurrency(findKeyByValue(currencyNames, e.target.value));
                setTo(e.target.value);
              }}
              className="w-full h-10 bg-[#20232C] text-white text-xl px-2 outline-none rounded-md"
            >
              {currName
                .filter((curr) => curr !== "")
                .map((currency, index) => (
                  <option key={index} value={currency}>
                    {currency}
                  </option>
                ))}
            </select>
          </div>
          {/* Display converted amount */}
          <div id="text" className="mt-4 text-white self-start ml-12">
            <p className="text-xl">
              {amount} {fromCurrency.toUpperCase()} ={" "}
            </p>
            <h1 className="text-4xl">
              {convertedAmount.toFixed(2)} {toCurrency.toUpperCase()}
            </h1>
          </div>
          {/* Convert button */}
          <button
            onClick={convertCurrency}
            className="bg-[#20232C] px-8 w-[80%] h-12 mt-6 text-white text-center text-2xl rounded-md hover:bg-[#2C313D]"
          >
            Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

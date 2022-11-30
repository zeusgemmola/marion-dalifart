import React, { useState, useEffect } from "react";
import ConvertorInput from "../../components/ConvertorInput";
import ConvertorResult from "../../components/ConvertorResult";
import ConvertorSelect from "../../components/ConvertorSelect";
import { usePrevious } from "../../utils/UsePrevious";
import appConfigJson from "../../appConfig.json";

//default value for select from and to
const default_currency_select = {
  fromCurrency: "EUR",
  toCurrency: "CHF"
};

/*enum for diplay className, we use this a lot so if one day we need to change
the class name when isValid we have just to change here*/
const enum_display_class_name = {
  valid: "valid",
  invalid: "invalid"
};

//default value to convert and if it's valid
const default_currency_input = {
  value: "0",
  className: enum_display_class_name.valid
};

const default_currency_rate = {
  CHF: { code: "CHF", value: 0 },
  EUR: { code: "EUR", value: 0 },
  GBP: { code: "GBP", value: 0 },
  USD: { code: "USD", value: 0 }
};

//default currencies
const currencies = ["EUR", "CHF", "GBP", "USD"];

const Convertor = () => {
  const [currencySelectValue, setCurrencySelectValue] = useState(
    default_currency_select
  );
  const [amountCurrency, setAmountCurrency] = useState(default_currency_input);
  const [resultCurrency, setResultCurrency] = useState(0);
  const [rateCurrency, setRateCurrency] = useState(default_currency_rate);
  const [showLoading, setShowLoading] = useState(false);
  const previousFromCurrency = usePrevious(currencySelectValue.fromCurrency);

  const handleCurrencyChange = (event) => {
    setCurrencySelectValue({
      ...currencySelectValue,
      [event.target.name]: event.target.value
    });
  };

  //if value it's a number -> slice for example 0458 become 458
  const cleanInputValue = (value) =>
    Number(value) || value[1] === "0"
      ? value[0] === "0" && value.length > 1
        ? cleanInputValue(value.slice(1))
        : value
      : value;

  //verify is the value is a Number return "valid" otherwise "invalid"
  const isNumber = (value) =>
    value === "0" || Number(value)
      ? enum_display_class_name.valid
      : enum_display_class_name.invalid;

  //Handle use when whe change the amount
  const handleInputChange = (event) => {
    //first we clean the value, example : 0458 become 458
    const cleanValue = cleanInputValue(event.target.value);
    /*if value = 0, the amount is "valid" otherwhise we verify if it'a number and 
    return "valid" or "invalid"*/
    const cleanClassName =
      cleanValue.length === 0
        ? default_currency_input.className
        : isNumber(cleanValue);
    //set amount whith new value
    setAmountCurrency({
      className: cleanClassName,
      value: cleanValue
    });
  };

  useEffect(() => {
    //async function to Call API for convert
    const getResultConvertor = async () => {
      setShowLoading(true);
      const BASE_URL =
        appConfigJson.URL +
        "&currencies=EUR,USD,CHF,GBP&base_currency=" +
        currencySelectValue.fromCurrency;
      try {
        await fetch(BASE_URL)
          .then((res) => res.json())
          .then((resJson) => {
            setRateCurrency(resJson.data);
          });
      } catch (error) {
        console.log(error);
      }
      setShowLoading(false);
    };

    //We don't call API if the amount is invalid or it's equal to 0
    if (
      amountCurrency.className === enum_display_class_name.invalid ||
      amountCurrency.value === "0" ||
      amountCurrency.value === ""
    ) {
      setResultCurrency(0);
      return;
    }
    // We don't call if the selector is the same in from and to
    if (currencySelectValue.fromCurrency === currencySelectValue.toCurrency) {
      setResultCurrency(parseInt(amountCurrency.value, 10));
      return;
    }

    /*And we don't call API if previous From is the same 
    (seul le changement de la valeur de base_currency (FROM)
       provoque l'appel à l'API)*/
    if (
      previousFromCurrency !== currencySelectValue.fromCurrency ||
      rateCurrency === default_currency_rate
    ) {
      getResultConvertor();
    }
    //We apply the result with the rate * the amount
    setResultCurrency(
      rateCurrency[currencySelectValue.toCurrency].value * amountCurrency.value
    );
  }, [amountCurrency, currencySelectValue, rateCurrency, previousFromCurrency]);

  return (
    <div className="container">
      <div className="row">
        <h3>Convertisseur</h3>
        <div className="col s8">
          <div className="row">
            <ConvertorSelect
              label="From"
              name="fromCurrency"
              id="fromCurrency"
              currencies={currencies}
              defaultValue={currencySelectValue.fromCurrency}
              onChange={handleCurrencyChange}
            />
            <ConvertorSelect
              label="To"
              name="toCurrency"
              id="toCurrency"
              currencies={currencies}
              defaultValue={currencySelectValue.toCurrency}
              onChange={handleCurrencyChange}
            />
          </div>
          <ConvertorInput
            value={amountCurrency.value}
            className={amountCurrency.className}
            onChange={handleInputChange}
          />
          <ConvertorResult result={resultCurrency} showLoading={showLoading} />
        </div>
      </div>
    </div>
  );
};

export default Convertor;

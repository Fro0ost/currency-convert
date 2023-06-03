import React, {FC, useState, useEffect} from 'react'
import {InputNumber, Select} from 'antd';
import styles from './convert.module.scss';

interface Props {

}

export const Convert: FC<Props> = props => {
  const {} = props
  const [exchangeRatesUAH, setExchangeRatesUAH] = useState({
    UAH: '',
    USD: '',
    EUR: ''

  });
  const [exchangeRatesUSD, setExchangeRatesUSD] = useState({
    UAH: '',
    USD: '',
    EUR: ''
  });
  const [exchangeRatesEUR, setExchangeRatesEUR] = useState({
    UAH: '',
    USD: '',
    EUR: ''
  });

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const UAH_RESPONSE = await fetch(`https://api.exchangerate-api.com/v4/latest/UAH`);
      const USD_RESPONSE = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
      const EUR_RESPONSE = await fetch(`https://api.exchangerate-api.com/v4/latest/EUR`);
      const data_UAH = await UAH_RESPONSE.json();
      const data_USD = await USD_RESPONSE.json();
      const data_EUR = await EUR_RESPONSE.json();
      setExchangeRatesUAH(data_UAH.rates);
      setExchangeRatesUSD(data_USD.rates);
      setExchangeRatesEUR(data_EUR.rates);
    } catch (error) {
      console.error('Ошибка при получении курсов валют:', error);
    }
  };

  const UAH_UAH = parseFloat(exchangeRatesUAH.UAH)
  const USD_UAH = parseFloat(exchangeRatesUAH.USD)
  const EUR_UAH = parseFloat(exchangeRatesUAH.EUR)

  const UAH_USD = parseFloat(exchangeRatesUSD.UAH)
  const USD_USD = parseFloat(exchangeRatesUSD.USD)
  const EUR_USD = parseFloat(exchangeRatesUSD.EUR)

  const UAH_EUR = parseFloat(exchangeRatesEUR.UAH)
  const USD_EUR = parseFloat(exchangeRatesEUR.USD)
  const EUR_EUR = parseFloat(exchangeRatesEUR.EUR)

  const conversionRates = {
    UAH: {
      UAH: UAH_UAH,
      USD: USD_UAH,
      EUR: EUR_UAH,
    },
    USD: {
      UAH: UAH_USD,
      USD: USD_USD,
      EUR: EUR_USD,
    },
    EUR: {
      UAH: UAH_EUR,
      USD: USD_EUR,
      EUR: EUR_EUR,
    },
  };

  const [amountStart, setAmountStart] = useState('');
  const [amountEqual, setAmountEqual] = useState('');
  const [currencyStart, setCurrencyStart] = useState('UAH');
  const [currencyEqual, setCurrencyEqual] = useState('USD');

  const handleAmountStartChange = (value: any) => {
    setAmountStart(value);
    setAmountEqual(convertCurrency(value, currencyStart, currencyEqual));
  };

  const handleAmountEqualChange = (value: any) => {
    setAmountEqual(value);
    setAmountStart(convertCurrency(value, currencyEqual, currencyStart));
  };

  const handleCurrencyStartChange = (value: string) => {
    setCurrencyStart(value);
    setAmountEqual(convertCurrency(amountStart, value, currencyEqual));
  };

  const handleCurrencyEqualChange = (value: string) => {
    setCurrencyEqual(value);
    setAmountEqual(convertCurrency(amountStart, currencyStart, value));
  };

  const convertCurrency = (amount: string, fromCurrency: string, toCurrency: string) => {

    // @ts-ignore
    const rate = conversionRates[fromCurrency][toCurrency];
    return (parseFloat(amount) * rate).toFixed(2);
  };

  return (
      <div className='container'>
        <div className={styles.convert}>
          <h1 className={styles.convert__title}>
            Currency Converter
          </h1>

          <div className={styles.convert__items}>
            <div className={styles.convert__item}>
              <InputNumber className={styles.convert__input}
                           min={'0'}
                           value={amountStart ? amountStart : ''}
                           onChange={handleAmountStartChange}
                           placeholder="Enter amount"
              />

              <Select className={styles.convert__select}
                      defaultValue={currencyStart ? currencyStart : ''}
                      value={currencyStart ? currencyStart : ''}
                      style={{width: 75}}
                      onChange={handleCurrencyStartChange}
                      options={[
                        {value: 'UAH', label: 'UAH'},
                        {value: 'USD', label: 'USD'},
                        {value: 'EUR', label: 'EUR'},
                      ]}
              />
            </div>

            <span className={styles.convert__equalSymbol}>=</span>

            <div className={styles.convert__item}>
              <InputNumber className={styles.convert__input}
                           min={'0'}
                           value={amountEqual ? amountEqual : ''}
                           onChange={handleAmountEqualChange}
                           placeholder="Result" disabled={amountStart === '' || amountStart === null}
              />

              <Select className={styles.convert__select}
                      defaultValue={currencyEqual ? currencyEqual : ''}
                      value={currencyEqual ? currencyEqual : ''}
                      style={{width: 75}}
                      onChange={handleCurrencyEqualChange}
                      options={[
                        {value: 'UAH', label: 'UAH'},
                        {value: 'USD', label: 'USD'},
                        {value: 'EUR', label: 'EUR'},
                      ]}
              />
            </div>
          </div>
        </div>
      </div>
  );
}


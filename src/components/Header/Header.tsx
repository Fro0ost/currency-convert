import React, {FC, useEffect, useState} from 'react'
import styles from './header.module.scss';

interface Props {

}

export const Header: FC<Props> = props => {
  const {} = props

  const [exchangeRates, setExchangeRates] = useState({
    USD: undefined,
    EUR: undefined
  });

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/UAH');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className={styles.header}>
        <div className="container">
          <div className={styles.header__wrapper}>
            <div className={styles.header__logo}>
              Logo company
            </div>

            <div className={styles.header__currencyWrapper}>
              <div className={styles.header__currencyItem}>
                1 UAH = {exchangeRates.EUR} EUR
              </div>

              <div className={styles.header__currencyItem}>
                1 UAH = {exchangeRates.USD} USD
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

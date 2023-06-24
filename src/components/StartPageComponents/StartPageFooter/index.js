import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StartPageFooter.css';
import logo__usd from '../../images/logo__usd.svg';
import logo__eur from '../../images/logo__eur.svg';

import AuthService from "../../services/auth.service";

const StartPageFooter = () => {

  const [currencyUSD, setCurrencyUSD] = useState(0);
  const [currencyEUR, setCurrencyEUR] = useState(0);

  useEffect(() => {
    AuthService.setCurrencyInfo("USD")
      .then(() => AuthService.setCurrencyInfo("EUR"))
      .then(() => {
        setCurrencyUSD(AuthService.getCurrencyInfo("USD").rate);
        setCurrencyEUR(AuthService.getCurrencyInfo("EUR").rate);
      })
  }, []);

  return (
    <footer className="footer">
      <div className="footer__flex">
        <div className="footer__flex__body__blok__first">
          <div className="footer__flex__title">КУРСИ В ТВІЙ БАНК ONLINE</div>
          <div className="footer__flex__body__blok__blok">
            <div className="footer__flex__body__blok_value__imeg__blok">
              <div className="footer__flex__body__blok_value__imeg">
                <div><img src={logo__usd} className="footer__imeg__logo" alt="logo__usd" /></div>
                <div>USD</div>
              </div>
              <div className="footer__flex__body__blok_value__imeg"><img src={logo__eur} className="footer__imeg__logo" alt="logo__eur" />EUR</div>
            </div>
            <div className="footer__flex__body__blok_value">
              <div className="footer__flex__body__blok_value__blok">
                <div>Купівля</div>
                <div>{currencyUSD}</div>
                <div>{currencyEUR}</div>
              </div>
              <div className="footer__flex__body__blok_value__blok">
                <div>Продаж</div>
                <div>{currencyUSD}</div>
                <div>{currencyEUR}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__flex__body__blok__second">
          <div className="footer__flex__title">КЛІЄНТАМ</div>
          <div className="footer__flex__body__blok__blok">
            <div className="footer__flex__body__blok__second_value__first">
              <div>
                <Link className='footer__link' to='rules&termsOutOfLogin' >Правила обслуговування</Link>
              </div>
              <div>
                <Link className='footer__link' to='/securityOutOfLogin'>Безпека</Link>
              </div>   
            </div>
            <div className="footer__flex__body__blok__second_value">
              <div>Для дзвінків по Україні  0 800 500 133</div>
              <div>Для дзвінків з інших країн  +38 044 230 99 98</div>
            </div>
          </div>
        </div>
      </div>
    </footer >
  );
}

export default StartPageFooter;

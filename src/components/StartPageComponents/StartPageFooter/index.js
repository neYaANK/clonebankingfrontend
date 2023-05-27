import React, { useState } from 'react';
import './StartPageFooter.css';
import logo__usd from '../../images/logo__usd.svg';
import logo__eur from '../../images/logo__eur.svg';

import AuthService from "../../services/auth.service";

const StartPageFooter = () => {
  
  const [currencyUSD, setCurrencyUSD] = useState(AuthService.setCurrencyInfo("USD"));
  const [currencyEUR, setCurrencyEUR] = useState(AuthService.setCurrencyInfo("EUR"));

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
                    <div>{AuthService.getCurrencyInfo("USD").rate}</div>
                    <div>{AuthService.getCurrencyInfo("EUR").rate}</div>
                  </div>
                  <div className="footer__flex__body__blok_value__blok">
                    <div>Продаж</div>
                    <div>{AuthService.getCurrencyInfo("USD").rate}</div>
                    <div>{AuthService.getCurrencyInfo("EUR").rate}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer__flex__body__blok__second">
              <div className="footer__flex__title">КЛІЄНТАМ</div>
              <div className="footer__flex__body__blok__blok">
                <div className="footer__flex__body__blok__second_value">
                  <div>Правила обслуговування</div>
                  <div>Відділення та банкомати</div>
                  <div>Учасник Фонду гарантування вкладів фізичних осіб</div>
                </div>
                <div className="footer__flex__body__blok__second_value">
                  <div>Депозитні та поточні рахунки</div>
                  <div>Тарифи на операції в Твій Банк Online</div>
                </div>
              </div>
            </div>
          </div>
        </footer >
    );
}

export default StartPageFooter;

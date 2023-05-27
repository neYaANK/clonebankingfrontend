import React from 'react';
import './StartPageHeader.css';
import logo from '../../images/logo.svg';

const StartPageHeader = () => {
    return (
        <header className="App-header">
          <div className="header__flex">
            <div className="header__flex__logo">
              <img src={logo} className="body__flex__logo__imeg" alt="logo" />
            </div>
            <div className="header__flex__text__blok">
              <div className="header__flex__text__blok__value"><b>ДЛЯ ДЗВІНКІВ ПО УКРАЇНІ:    0 800 300 255</b></div>
              <div className="header__flex__text__blok__value"><b>ДЛЯ ДЗВІНКІВ З ІНШИХ КРАЇН:    0 800 300 255</b></div>
              <select className='header__flex__text__blok__select__list'>
                <option value="deposit">UA</option>
                <option value="deposit">USD</option>
              </select>
            </div>
          </div>
        </header >
    );
}

export default StartPageHeader;

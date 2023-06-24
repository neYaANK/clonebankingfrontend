import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './MainPageHeader.css';
import logo__two from '../../images/logo__two.svg';
import settings__icon from '../../images/settings__icon.svg';
import flag__icon from '../../images/flag__icon.svg';
import change__password__icon from '../../images/change__password__icon.svg';
import topic__icon from '../../images/topic__icon.svg';
import go__out__icon from '../../images/go__out__icon.svg';
import AuthService from '../../services/auth.service';

const MainPageHeader = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const [currencyUSD, setCurrencyUSD] = useState(AuthService.getCurrencyInfo("USD"));
    const navigate = useNavigate();
    
    const logOutHandler = () => {
        //AuthService.logOut();
    }

    const handleSearchInputChanged = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleSearchBar = (event) => {
        //пошук по назвах послуг, шаблонів, кредитів, депозитів та відображення результатів пошуку\перехід на відповідну сторінку
        if (searchQuery.toLowerCase().includes("кредити")) {
            navigate('/allCredits')
        }
        if (searchQuery.toLowerCase().includes("перекази")) {
            navigate('/moneyTransfer')
        }
    }
    const demoMessage = "Функція недоступна у демоверсії";

    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <img onClick={() => navigate("/main")} src={logo__two} className="logo__two" alt="logo__two" />
            <div className='header__links'>
                <Link className="headerLink" onClick={() => alert(demoMessage)}>Послуги</Link>
                <Link className="headerLink" onClick={() => alert(demoMessage)}>Депозити</Link>
                <Link className="headerLink" to='/allCredits'>Кредити</Link>
            </div>
            <input className="searchBar" type='text' value={searchQuery} onChange={handleSearchInputChanged} onKeyDown={handleSearchBar} placeholder='Введіть назву послуги, шаблону, кредиту, депозиту'></input>
            <div className="currencyRate">USD {AuthService.getCurrencyInfo("USD").rate}</div>

            <div>
                <img onClick={toggleMenu} className="image" src={`data:;base64,${AuthService.getUserImage()}`} alt='avatar'></img>

                {isOpen && (
                    <ul className="menu__profile">
                        <li>
                            <img src={settings__icon} className="icon" alt="settings__icon" />
                            <div>
                                <NavLink to='/profile' className="burgerMenu">Налаштування</NavLink>
                            </div>
                        </li>
                        <li>
                            <img src={flag__icon} className="icon" alt="flag__icon" />
                            <div>Українська</div>
                        </li>
                        <li>
                            <img src={change__password__icon} className="icon" alt="change__password__icon" />
                            <div>Змінити пароль</div>
                        </li>
                        <li>
                            <img src={topic__icon} className="icon" alt="topic__icon" />
                            <div>Тема</div>
                        </li>
                        <li> </li>
                       < NavLink to='/'>
                       <li>
                            <img src={go__out__icon} className="icon" alt="go__out__icon" />
                            <div className="go__out" >Вийти</div>
                        </li>
                       </NavLink>
                      
                    </ul>
                )}
            </div>
        </header>
    );
}

export default MainPageHeader;

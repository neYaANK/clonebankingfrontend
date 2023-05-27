import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import './MainPageHeader.css';
import logo__two from '../../images/logo__two.svg';
import AuthService from '../../services/auth.service';

const MainPageHeader = () => {

    const [searchQuery, setSearchQuery] = useState('')
    const [currencyUSD, setCurrencyUSD] = useState(AuthService.setCurrencyInfo("USD"));

    const logOutHandler=()=>{
        //AuthService.logOut();
    }

   const handleSearchInputChanged = (event)=> {
       setSearchQuery(event.target.value);
      }

    const handleSearchBar= (event) => {
      // пошук по назвах послуг, шаблонів, кредитів, депозитів та відображення результатів пошуку\перехід на відповідну сторінку
      // if (searchQuery === "авто") ...
      }
    const demoMessage = "Функція недоступна у демоверсії";

        /*<header className={styles.header}>
                                <img className={styles.logo} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZJIeIh65YwVsNJ5QbyRXSyJuNWHpwixzGarYhJON23pqEXdzSXSRdO6bH2vwCO_0LRDA&usqp=CAU'></img>
                                <Link className={styles.headerLink}>Послуги</Link>
                                <Link className={styles.headerLink}>Депозити</Link>
                                <Link className={styles.headerLink} onClick={() => alert(demoMessage)}>Архів</Link>
                                <input className={styles.searchBar} type='text' value={this.state.searchQuery} onChange={this.handleSearchInputChanged} onKeyDown={this.handleSearchBar} placeholder='Введіть назву послуги, шаблону, кредиту, депозиту'></input>
                                <div className={styles.currencyRate}>USD ...</div>
                                <NavLink to='/menu' className={styles.burgerMenu}>
                                    <img className={styles.image} src={`data:;base64,${this.state.image}`} alt='avatar'></img>
                                    <span></span>
                                </NavLink>
                            </header> */
    return (
        <header className="header">
                        <img src={logo__two} className="logo__two" alt="logo__two" />
                        <Link className="headerLink">Послуги</Link>
                        <Link className="headerLink">Депозити</Link>
                        <Link className="headerLink" onClick={() => alert(demoMessage)}>Архів</Link>
                        <input className="searchBar" type='text' value={searchQuery} onChange={handleSearchInputChanged} onKeyDown={handleSearchBar} placeholder='Введіть назву послуги, шаблону, кредиту, депозиту'></input>
                        <div className="currencyRate">USD {AuthService.getCurrencyInfo("USD").rate}</div>
                        <NavLink to='/menu' className="burgerMenu">
                            <img className="image" src={`data:;base64,${AuthService.getUserImage()}`} alt='avatar'></img>
                        </NavLink>
        </header>
    );
}

export default MainPageHeader;

import React from "react";
import AuthService from '../services/auth.service';
import './Menu.css'

const Menu = ({ active }) => {

    return (
        <div class={active ? 'menu' : 'menuactive'}>
            <div className="menu__content">
                <div className="menu__header">
                    <img className="menu__img" src={`data:;base64,${AuthService.getUserImage()}`} alt='avatar'></img>
                    <div>
                        {AuthService.getUserFullInfo().surname} {AuthService.getUserFullInfo().name}
                        <p></p>
                        {AuthService.getUserFullInfo().phoneNumber}
                    </div>

                </div>
                <ul>
                    <li>
                        <a href='/profile'>Профіль</a>
                    </li>
                    <li>
                        <a href='/passwordChange'>В розробці</a>
                    </li>
                    <li>
                        <a href='/сhangeLogin'>В розробці</a>
                    </li>
                    <li>
                        <a href='/info'>В розробці</a>
                    </li>
                    <li>
                        <a href='/oldVersion'>В розробці</a>
                    </li>
                    <li>
                        <a href='/language'>В розробці</a>
                    </li>
                    <li>
                        <a href='/whatsNew'>В розробці</a>
                    </li>
                    <li>
                        <a href='/'>Вийти</a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Menu;
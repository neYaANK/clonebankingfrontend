import React, { useState } from 'react';
import logo__card from '../images/logo__card.svg';
import AuthService from "../services/auth.service";
import './LogInForm.css';
import { useNavigate } from "react-router-dom";
import StartPageHeader from '../StartPageComponents/StartPageHeader';
import StartPageFooter from '../StartPageComponents/StartPageFooter';

const phoneValidationPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; 
//This will match phone numbers input in the following formats:
// +380978887766
// 0978887766
// +80978887766
// 097-888-7766
// (097) 888-7766

const passwordValidationPattern = /^[a-zA-Z0-9]{6,16}$/; //6-16 letters length

const StartPageLogInForm = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleForm = (event) => {
    event.preventDefault();
    event.target.reset();

    AuthService.login(phone, password);
    const token = AuthService.getCurrentUser().token;
    if (token !== null){
        navigate("/CodeForm");
    }
    else{
        alert("Некоректний логін та/або пароль. Спробуйте ще раз");
    }
}

const handlePhoneInput = (validationPattern, warningMessage) => ({ target }) => {
  const valid = target.value.match(validationPattern);
  if (!valid) {
      target.setCustomValidity(warningMessage);
  }
  else {
      target.setCustomValidity("");
  }   
  setPhone(target.value); 
}

const handlePasswordInput = (validationPattern, warningMessage) => ({ target }) => {
  const valid = target.value.match(validationPattern);
  if (!valid) {
      target.setCustomValidity(warningMessage);
  }
  else {
      target.setCustomValidity("");
  }    
  setPassword(target.value);
}

    return (
      <div className="App">
        <StartPageHeader/>

        <div className="body">
          <div className="body__flex">
            <div className="body__flex__login__form" >
              <div className="body__flex__login__form__title">Авторизація в системі</div>
              <form className="body__flex__login__form__container" onSubmit={handleForm}>
                <div className="body__flex__login__form__container__input">
                  <input type="text"
                    value={phone}
                    onChange={handlePhoneInput(phoneValidationPattern, "Неправильний формат номера")}
                    placeholder="Логін:"
                    name="phone"
                    required>
                  </input>
                </div>
                <div className="body__flex__login__form__container__input">
                  <input type="password"
                    placeholder="Пароль:"
                    name="password"
                    required
                    value={password}
                    onChange={handlePasswordInput(passwordValidationPattern, "Довжина паролю від 6 до 16 літер")}>
                  </input>
                </div>
                <div className="body__flex__login__form__container__chec">
                  <label className="container">Запам'ятати логін</label>
                </div>
                <button className="body__flex__login__form__container__button__exit" type="submit">Далі</button>
                <div className="body__flex__login__form__container__button__repair">ЗАБУЛИ ЛОГІН АБО ПАРОЛЬ?</div>
                <div className="body__flex__login__form__container__button__reg">РЕЄСТРАЦІЯ</div>
              </form>
            </div>
            <div className="body__flex__imeg">
              <img src={logo__card} className="body__flex__imeg__logo" alt="logo__card" />
            </div>
          </div>
        </div>

        <StartPageFooter/>
      </div >
    );
  }

export default StartPageLogInForm;

import React, {useState } from 'react';
import AuthService from '../services/auth.service';
import styles from './ChangeUserPhone.module.css';
import { useNavigate, Link } from "react-router-dom";
import ModalCreditOpen from '../Credits/ModalCreditOpen';
import MainPageHeader from '../MainPageComponents/MainPageHeader';
import MainPageFooter from '../MainPageComponents/MainPageFooter';
import go_back_arrow_icon from '../images/go_back_arrow_icon.png';
import success_icon from '../images/success_icon.png';

const phoneValidationPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; //This will match phone numbers input in the following formats:
                                                                                            // +380978887766
                                                                                            // 0978887766
                                                                                            // +80978887766
                                                                                            // 097-888-7766
                                                                                            // (097) 888-7766

const ChangeUserPhone = () => {   
    const[phoneNumber, setPhoneNumber] = useState(AuthService.getUserFullInfo().phoneNumber);
    const navigate = useNavigate();

    const[modalActive, setModalActive] = useState(false)

    const demoMessage = "Функція недоступна у демоверсії";

const handleForm = (event) => {
        event.preventDefault();
        //event.target.reset(); 
        AuthService.changeUserPhoneNumber(event.target.phone.value)
        .then(()=>AuthService.setUserFullInfo())
        .then(()=>setModalActive(true))
    }
    
    const handleInput = (validationPattern, warningMessage) => ({ target }) => {
        const valid = target.value.match(validationPattern);
  if (!valid) {
      target.setCustomValidity(warningMessage);
  }
  else {
      target.setCustomValidity("");
  }   
  setPhoneNumber(target.value);
    }
    
        return (
            <> <MainPageHeader/>
            <div className='upper__line'>
                <div className='upper__line__combo_'>
                    <div>
                    <Link onClick={() => navigate(-1)}>
                    <img className='upper__line__go__back__img' src={go_back_arrow_icon}></img>
                </Link>
                    </div>
                </div>
                <div className='get__consult'>
                    <button className='get__consult__button' onClick={() => alert(demoMessage)}>Отримати консультацію</button>
                </div>
            </div>
            <form className={styles.block} onSubmit={handleForm}>
                <label className={styles.label}> Введіть новий номер телефону:</label>
                <input className={styles.input_} name="phone"
                    onChange={()=>handleInput(phoneValidationPattern, "Неправильний формат номера")}
                    type="text"
                    placeholder="Номер телефону"
                />
                <input className={styles.submit__change__button} 
                    type="submit"
                    value="Підтвердити"
                />
            </form>   
            <MainPageFooter/> 

<ModalCreditOpen active={modalActive} setActive={setModalActive}>
<div className='modal__credits'>
<div className='modal__credits__congrats'>
<img className='modal__credits__img' src={success_icon}></img>
<div className='modal__credits__text'>Вітаємо!</div>
<div className='modal__credits__text'>Номер телефону успішно змінено</div>
</div>
<div className='modal__credits__buttons'>
<button className='modal__credits__button__to__main' onClick={() => navigate('/profile')}>У профіль</button>
</div>
</div>
</ModalCreditOpen> 
</>
        );
    }


export default ChangeUserPhone;

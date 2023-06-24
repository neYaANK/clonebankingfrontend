import React, {useState} from 'react';
import { useNavigate, Link } from "react-router-dom";
import "./MoreAboutCashCreditPage.css";
import MainPageHeader from '../../MainPageComponents/MainPageHeader';
import MainPageFooter from '../../MainPageComponents/MainPageFooter';
import money_cash from '../../images/money_cash.png';
import cash_credit_icon from '../../images/cash_credit_icon.png';
import go_back_arrow_icon from '../../images/go_back_arrow_icon.png';

const MoreAboutCashCreditPage = () => {
    const navigate = useNavigate();
    const demoMessage = "Функція недоступна у демоверсії";

    return (
        <>
        <MainPageHeader/>
       

         <div className='upper__line'>
            <div className='upper__line__combo__1'>
                <Link onClick={() => navigate(-1)}>
                    <img className='upper__line__go__back__img' src={go_back_arrow_icon}></img>
                </Link>
                <img className='upper__line__img' src={cash_credit_icon}></img>
                <div className='upper__line__title'>Кредит готівкою</div>
            </div>
            <div className='get__consult'>
                <button className='get__consult__button' onClick={() => alert(demoMessage)}>Отримати консультацію</button>
            </div>
        </div>

        <div className='credits__container__more__about'>
            <h1>Більше про кредит</h1>
            <div className='credits__main__terms'>
                &#8226; Максимальна сума кредиту – 300 000 грн<br></br>
                &#8226; Комісія за кредитом – 1,5% на місяць<br></br>
                &#8226; Строк договору – 10, 20 або 36 місяців<br></br>
            </div>
            <div className='credit__info'>
                <div className='credits__title'>Як погашати кредит?</div>
                <div>Для зручності ми автоматично встановимо вам автоплатіж на погашення кредиту.<br></br>
                    Або погашайте кредит зручним для вас способом:<br></br>
                    &#8226; через додаток (меню «Гаманець» – «Кредити»);<br></br>
                    &#8226; ТСО й відділення ПриватБанку.<br></br>
                    Для цього внесіть обов’язковий платіж у період, зазначений у договорі, на свій рахунок IBAN. 
                </div>
                <div className='credits__title'>Ще немає картки для зарахування «Кредиту готівкою»?</div>
                <div>
                    Зарахування можливе на Картку для виплат і інтернет-картку.<br></br>
                    Інтернет-картка – платіжна картка, що не має фізичної форми, але володіє всіма властивостями звичайних пластикових карток.<br></br>
                    Які операції можна здійснювати з інтернет-карткою:<br></br>
                    &#8226; зняття готівки (за QR-кодом у банкоматі та касі банку);<br></br>
                    &#8226; поповнення картки в терміналі самообслуговування;<br></br>
                    &#8226; оплата в магазинах (Google Pay або Apple Pay);<br></br>
                    &#8226; операції в додатку та оплата в Інтернеті.<br></br>
                    <br></br>
                </div>
            </div>
            
        <MainPageFooter/>   
        </div>
        </>
       
    );
}

export default MoreAboutCashCreditPage;

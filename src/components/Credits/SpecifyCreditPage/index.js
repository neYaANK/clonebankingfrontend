import React, {useState, useEffect} from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./SpecifyCreditPage.css";
import MainPageHeader from '../../MainPageComponents/MainPageHeader';
import MainPageFooter from '../../MainPageComponents/MainPageFooter';
import cash_credit_icon from '../../images/cash_credit_icon.png';
import go_back_arrow_icon from '../../images/go_back_arrow_icon.png';

import AuthService from "../../services/auth.service";

const SpecifyCreditPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const demoMessage = "Функція недоступна у демоверсії";

    let typeId = location.state.typeId;

    let rate = 0;
    let minSum = 0;
    let maxSum = 0;
    let minTerm = 0;
    let maxTerm = 0;
    let moreAboutCredit = '';
    let pageTitle = '';
    let icon = null;
  
    if (typeId === 2){
        pageTitle = 'Оплата частинами';
        rate = 0.24;
        minSum = 1000;
        maxSum = 300000;
        minTerm = 2;
        maxTerm = 24;
        moreAboutCredit = '';
    }
    else if (typeId === 1){
        pageTitle = 'Кредит готівкою';
        rate = 10;
        minSum = 15000;
        maxSum = 300000;
        minTerm = 3;
        maxTerm = 36;
        moreAboutCredit = '';
        icon = cash_credit_icon;
    }
    else if (typeId === 3){
        pageTitle = 'Авто в кредит';
        rate = 6.5;
        minSum = 100000;
        maxSum = 800000;
        minTerm = 12;
        maxTerm = 48;
        moreAboutCredit = '';
    }
    else if (typeId === 4){
        pageTitle = 'Кредит на житло';
        rate = 12;
        minSum = 100000;
        maxSum = 800000;
        minTerm = 12;
        maxTerm = 240;
        moreAboutCredit = '';
    }

    const[creditSum, setCreditSum] = useState(minSum);
    const[creditTerm, setCreditTerm] = useState(minTerm);

    const handleOpenCreditButton=(id, creditSum, creditTerm, pageTitle, icon, rate)=>{
        navigate("/checkCredit", {
            state: {typeId : id, 
            creditSum: creditSum,
            creditTerm : creditTerm, 
            pageTitle : pageTitle,
            icon : icon,
            rate : rate,
        }
        });
    }
    // useEffect(()=>{
    //     const ele = document.querySelector('.credit__specification__value');
    //   if (ele) {
    //     ele.style.left = `${Number(creditSum / 4)}px`;
    //   }
    // })

    return (
        <>
        <MainPageHeader/>
        <div className='upper__line'>
            <div className='upper__line__combo__1'>
                <Link onClick={() => navigate(-1)}>
                    <img className='upper__line__go__back__img' src={go_back_arrow_icon}></img>
                </Link>
                <img className='upper__line__img' src={icon}></img>
                <div className='upper__line__title'>{pageTitle}</div>
            </div>
            <div className='get__consult'>
                <button className='get__consult__button' onClick={() => alert(demoMessage)}>Отримати консультацію</button>
            </div>
        </div>

         <div className='credits__container__1'>
         
         <div className='credits__title__text'>Розрахуйте найзручніший для Вас варіант кредитування:</div>
            <div className='credits__types__spec'>
                <div className='credit__specification' >
                    <div className='credit__specification__currencies' onClick={() => alert(demoMessage)}>
                        <div className='credit__specification__currency__active'>ГРН</div>
                        <div className='credit__specification__currency__not__active'>USD</div>
                        <div className='credit__specification__currency__not__active'>EUR</div>                    
                    </div>

                <div className='credit__specification__input__wrap'>
                            <div className='credit__specification__output__title'>Сума кредиту</div>
                                <div className='credit__specification__value'>{creditSum}</div>
                                <input type="range" id='fader' min={minSum} max={maxSum} step="1000" value={creditSum} onChange={(e)=>setCreditSum(e.target.value)} />              
                            
                 <div>
                 <span className='credit__specification__input__start__value'>{minSum}</span>
                            <span className='credit__specification__input__end__value'>{maxSum}</span>
                 </div>
                </div>

                <script>
                    
                </script>
                <div className='credit__specification__input__wrap'>
                            <div className='credit__specification__output__title'>Термін кредиту, міс.</div>
                            <div className='credit__specification__value'>{creditTerm}</div>
                            <input type="range"id='fader'min={minTerm} max={maxTerm} step="1" value={creditTerm} onChange={(e)=>setCreditTerm(e.target.value)} />
                           <div>
                           <span className='credit__specification__input__start__value'>{minTerm}</span>
                            <span className='credit__specification__input__end__value'>{maxTerm}</span>
                           </div>
                </div>
                    
                </div>

                <div className='credit__result__spec'>
                    <p className='credit__result__text__title'>Загальна вартість кредиту</p>
                    <p className='credit__result__text__value'>{((creditSum/creditTerm+100)*creditTerm).toFixed(2)} грн</p>
                    <p className='credit__result__text__title'>Щомісячний платіж</p>
                    <p className='credit__result__text__value'>{(creditSum/creditTerm+100).toFixed(2)} грн</p>
                    <p className='credit__result__text__title'>% ставка</p>
                    <p className='credit__result__text__value'>{rate} %</p>                    
                    <button className='button__open__credit_' onClick={()=>handleOpenCreditButton(typeId, creditSum, creditTerm, pageTitle, icon, rate)}>Відкрити кредит</button>
                </div>
            </div>
            <Link className='link__more__about__credit' to="/moreAboutCashCredit">Більше про кредит</Link>
            
        <MainPageFooter/>   
        </div>
        </>
       
    );
}

export default SpecifyCreditPage;

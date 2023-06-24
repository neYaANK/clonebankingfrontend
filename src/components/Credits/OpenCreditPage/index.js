import React, {useState} from 'react';
import { useNavigate, Link } from "react-router-dom";
import "./OpenCreditPage.css";
import MainPageHeader from '../../MainPageComponents/MainPageHeader';
import MainPageFooter from '../../MainPageComponents/MainPageFooter';
import part_pay_icon from '../../images/part_pay_icon.png';
import cash_pay_icon from '../../images/cash_pay_icon.png';

import home_hand_icon from '../../images/home_hand_icon.png';
import auto_key_icon from '../../images/auto_key_icon.png';
import cash_credit_icon from '../../images/cash_credit_icon.png';
import go_back_arrow_icon from '../../images/go_back_arrow_icon.png';

const OpenCreditPage = () => {
    const navigate = useNavigate();
    const demoMessage = "Функція недоступна у демоверсії";
   
    const handleCreditType=(id)=>{
        navigate("/specifyCredit", {
            state: {typeId : id}
        });
    }

    return (
        <>
        <MainPageHeader/>
        <div className='upper__line'>
            <div className='upper__line__combo'>
                <Link onClick={() => navigate(-1)}>
                    <img className='upper__line__go__back__img' src={go_back_arrow_icon}></img>
                </Link>
                <img className='upper__line__img' src={cash_credit_icon}></img>
                <div className='upper__line__title'>Кредити</div>
            </div>
            <div className='get__consult'>
                <button className='get__consult__button' onClick={() => alert(demoMessage)}>Отримати консультацію</button>
            </div>
        </div>

         <div className='credits__container__2'>
            <div className='credits__types'>
                <div className='credit__type__border'>
                    <div className='credit__type' onClick={() => alert(demoMessage)}>
                        <p className='credit__type__title'>Оплата частинами</p>
                        <img className='img__credits__type__1' src={part_pay_icon}></img>
                        <div>Максимальна сума кредиту - 300 000 грн</div>
                        <div>Реальна річна ставка - 0,24%</div>
                        <div>Максимальний строк кредиту - 24 місяці</div>
                        <div>Мінімальна сума першого внеску - від 12 грн</div>
                    </div>
                </div>
                
                <div className='credit__type__border'>
                    <div className='credit__type' onClick={()=> handleCreditType(1)}>
                        <p className='credit__type__title'>Кредит готівкою</p>
                        <img className='img__credits__type' src={cash_pay_icon}></img>
                        <div>Максимальна сума кредиту - 300 000 грн</div>
                        <div>Реальна річна ставка - 1,5% на місяць</div>
                        <div>Строк договору - 10, 20 або 36 місяців</div>
                    </div>
                </div>
                
                <div className='credit__type__border'>
                    <div className='credit__type' onClick={() => alert(demoMessage)}>
                        <p className='credit__type__title'>Авто в кредит</p>
                        <img className='img__credits__type__1' src={auto_key_icon}></img>
                        <div>Власний внесок - від 30% вартості автомобіля</div>
                        <div>Період - від 1 до 4 місяців</div>
                        <div>Ставка - від 6.5% до 21% річних</div>
                        <div>Сума кредиту - від 100 000 грн до 800 000 грн</div>
                    </div>
                </div>
               
                <div className='credit__type__border'>
                    <div className='credit__type' onClick={() => alert(demoMessage)}>
                        <p className='credit__type__title'>Кредит на житло</p>
                        <img className='img__credits__type__1' src={home_hand_icon}></img>
                        <div>12% - річна ставка в 1-й рік кредитування</div>
                        <div>UIRD* 12M + 4% - річна ставка з 2-го року кредитування</div>
                        <div>Строк - до 20 років</div>
                        <div>Аванс - від 25%</div>
                    </div>
                </div>
                
            </div>
            
        <MainPageFooter/>   
        </div>
        </>
       
    );
}

export default OpenCreditPage;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./MoneyTransferPage.css";
import MainPageHeader from '../MainPageComponents/MainPageHeader';
import MainPageFooter from '../MainPageComponents/MainPageFooter';
import ModalCreditOpen from '../Credits/ModalCreditOpen';
import ModalCreditClose from '../Credits/ModalCreditClose';
import money_transfer_icon from '../images/money_transfer_icon.png';
import go_back_arrow_icon from '../images/go_back_arrow_icon.png';
import media_social_icon from '../images/media_social_icon.png';
import wallet_icon from '../images/wallet_icon.png';
import success_icon from '../images/success_icon.png';
import template_avatar_icon from '../images/template_avatar_icon.png';
import AuthService from "../services/auth.service";
import dateFormat from 'dateformat';

const MoneyTransferPage = () => {
    const navigate = useNavigate();
    const demoMessage = "Функція недоступна у демоверсії";
    const[cards, setCards] = useState(Array.from(AuthService.getUserAllCards().cards))
    const[cardToPayFrom, setCardToPayFrom] = useState(AuthService.getSelectedCardInfo())
    const[previousTransfers, setPreviousTransfers] = useState(AuthService.getSelectedCardPayments().outgoingPayments)

    const [inputCardNumber, setInputCardNumber] = useState("");
    const [inputSum, setInputSum] = useState(0);

    const[modalActive, setModalActive] = useState(false)
    const[modalCloseActive, setModalCloseActive] = useState(false)

    const handleInputCardNumber = event => {
    setInputCardNumber(event.target.value);}
    
    const handleInputSum = event => {
        setInputSum(event.target.value);}
        
    const handleProposedSum = event =>{
        setInputSum(event.target.value)
    }

    function findArrayElementById(array, id) {
            return array.find((element) => {
              return element.id === id;
            })
    }
   
    function findArrayElementByCardNumber(array, cardNumber) {
        return array.find((element) => {
          return element.cardNumber === cardNumber;
        })
}

    function handleContinueButton(){
        setModalCloseActive(true)
    }
    function handleSubmitPaymentButton(){
        const id = cardToPayFrom.id;
        AuthService.sendPayment(cardToPayFrom.cardNumber, inputCardNumber, inputSum)
        .then(()=>AuthService.setSelectedCardPayments(cardToPayFrom.id))
        .then(()=>setPreviousTransfers(AuthService.getSelectedCardPayments().outgoingPayments))
        .then(()=>AuthService.setUserAllCards())
        .then(()=>{setCardToPayFrom(()=>findArrayElementById(AuthService.getUserAllCards().cards, id))})
        .then(()=>setModalCloseActive(false))
        .then(()=>setModalActive(true))
    }  
    function handleRepeatMoneyTransfer(senderCardNumber, receiverCardNumber, value){
        const senderCard = findArrayElementByCardNumber(cards, senderCardNumber);
        setCardToPayFrom(senderCard);
        setInputCardNumber(receiverCardNumber);
        setInputSum(value);
        setModalCloseActive(true);
    }
    useEffect(() => {
       // AuthService.setSelectedCardPayments(cardToPayFrom.id);
      },[previousTransfers, cardToPayFrom]);

    const renderPreviousTransfers = previousTransfers.map((transfer, index) => 
    <div className='previous__transfer__view' key={index}>
        <div className='previous__transfer__view__date'>{dateFormat(transfer.issuedAt, "dd.mm.yyyy  hh:MM")}</div>
        <div className='previous__transfer__view__row'>
            <div className='previous__transfer__view__text'>З картки:</div>
            <div className='previous__transfer__view__value'>*{(transfer.sender).slice(12)}</div>
        </div>
        <div className='previous__transfer__view__row'>
            <div className='previous__transfer__view__text'>На картку:</div>
            <div className='previous__transfer__view__value'>*{(transfer.receiver).slice(12)}</div>
        </div>
        <div className='previous__transfer__view__row'>
            <div className='previous__transfer__view__text'>Сума:</div>
            <div className='previous__transfer__view__value'>{(transfer.outgoing).toFixed(2)} грн</div>
        </div>
        <div className='previous__transfer__view__row'>
            <div className='previous__transfer__view__text'>Комісія:</div>
            <div className='previous__transfer__view__value'> {(transfer.outgoing/100*1).toFixed(2)} грн</div>
        </div>
        <button className='previous__transfer__view__repeat__button' onClick={()=>handleRepeatMoneyTransfer(transfer.sender, transfer.receiver, transfer.outgoing)}>Повторити платіж</button>
    </div>)

    
    return (
        <>
        <MainPageHeader/>
        <div className='upper__line'>
            <div className='upper__line__combo'>
                <Link onClick={() => navigate(-1)}>
                    <img className='upper__line__go__back__img' src={go_back_arrow_icon}></img>
                </Link>
                <img className='upper__line__img' src={money_transfer_icon}></img>
                <div className='upper__line__title'>Переказ коштів</div>
            </div>
            <div className='get__consult'>
                <button className='get__consult__button' onClick={() => alert(demoMessage)}>Отримати консультацію</button>
            </div>
        </div>

         <div className='transfer__container'>
            <div className='transfer__details'>
                <div className='transfer__details__templates'>
                    <div className='transfer__details__template'>
                        <div className='transfer__details__template__round' onClick={() => alert(demoMessage)}><img className='transfer__details__template__round__avatar' src={template_avatar_icon}></img></div>
                        <div className='transfer__details__template__name'>Вавринчук В.П.</div>
                    </div>
                    <div className='transfer__details__template'>
                        <div className='transfer__details__template__round' onClick={() => alert(demoMessage)}><img className='transfer__details__template__round__avatar' src={template_avatar_icon}></img></div>
                        <div className='transfer__details__template__name'>Банас О.І.</div>
                    </div>
                    <div className='transfer__details__template'>
                        <div className='transfer__details__template__round' onClick={() => alert(demoMessage)}><img className='transfer__details__template__round__avatar' src={template_avatar_icon}></img></div>
                        <div className='transfer__details__template__name'>Волкова Р.В.</div>
                    </div>
                </div>

                <div className='transfer__details__main__text'>З картки:</div>

                <div className='selectedCard__combo'>

                <div className='selectedCard__'>
                    <div className='selectedCard__main__info__1'>
                        <div className='selectedCard__balance__'>$ {(cardToPayFrom.balance).toFixed(2)}</div>
                        <p>Номер карти</p>
                        <div className='selectedCard__number__'>{cardToPayFrom.cardNumber}</div>
                    </div>
                    <div className='selectedCard__date__'>
                    <img className='card__sign__white' src={media_social_icon}/>
                    <div>
                        <span>Дата</span>
                        <p className='selectedCard__date__value__'> {dateFormat(cardToPayFrom.expireDate, "mm/yy")}</p>
                    </div>

                </div>          
        
    </div>
</div>

                <div className='transfer__details__text__and__wallet'>
                    <div className='transfer__details__main__text'>Картка отримувача:</div>
                    <div>
                        <Link to={'/main'} className='transfer__details__wallet'>Мій гаманець</Link>
                        <img className='transfer__details__wallet__icon' src={wallet_icon}></img>
                        
                    </div>
                </div>
                
                <input type="number" 
                    size="16" 
                    maxLength="16" 
                    placeholder="1111 1111 1111 1111"
                    id="inputCardNumber"
                    name="inputCardNumber"
                    onChange={handleInputCardNumber}
                    value={inputCardNumber}
                    required/>
                <div className='transfer__details__main__text'>Сума:</div>
                <div className='transfer__details__combo'>
                    <input className='transfer__details__sum'
                        type="number" 
                        id="inputSum"
                        name="inputSum"
                        onChange={handleInputSum}
                        value={inputSum}
                        placeholder="100" 
                        required/>
                        <button className='transfer__details__proposed__sum' value='100' onClick={handleProposedSum}>100</button>
                        <button className='transfer__details__proposed__sum' value='150' onClick={handleProposedSum}>150</button>
                        <button className='transfer__details__proposed__sum' value='200' onClick={handleProposedSum}>200</button>
                </div>
                
                

                <div>Додати коментар:</div>
                <input type="text" className='transfer__details__comment' placeholder='Напишіть щось...' />
                
                <button className='transfer__details__continue__button' onClick={handleContinueButton}>Продовжити</button>

            </div>

            <div className='transfer__previous'>
                <div className='transfer__previous__title'>Попередні перекази:</div>
                <div className='transfer__previous__view__all'>
                    {renderPreviousTransfers}
                </div>
                <div>
                    <Link onClick={() => alert(demoMessage)}>Більше</Link>
                </div>

            </div>
        
        </div>
            
        <MainPageFooter/> 


        <ModalCreditClose active={modalCloseActive} setActive={setModalCloseActive}>
        <div className='modal__submit'>
           <button className='modal__submit__button__close' type="button" onClick={()=>setModalCloseActive(false)}>&#x2715;</button>
           <div className='modal__submit__title'>Підтвердження операції</div>
           <div className='modal__submit__row'>
                <div className='modal__submit__text'>Картка відправника</div>
                <div className='modal__submit__value'>*{cardToPayFrom.cardNumber.slice(12)}</div>
           </div>
           <div className='modal__submit__row'>
                <div className='modal__submit__text'>Картка отримувача</div>
                <div className='modal__submit__value'>*{inputCardNumber.slice(12)}</div>
           </div>
           <hr></hr>
           <div className='modal__submit__row'>
                <div className='modal__submit__text'>Сума</div>
                <div className='modal__submit__value'>{inputSum} ГРН</div>
           </div>
           <div className='modal__submit__row'>
                <div className='modal__close__credit__text'>Комісія відправника</div>
                <div className='modal__close__credit__value'>0 грн</div>
           </div>
           <div className='modal__submit__row'>
                <div className='modal__submit__text'>Комісія отримувача</div>
                <div className='modal__submit__value'>{inputSum/100*1} грн</div>
           </div>
           <div className='modal__submit__row'>
                <div className='modal__submit__text__small' onClick={() => alert(demoMessage)}>Оплатити комісію замість отримувача</div>
                <div className='modal__submit__value'></div>
           </div>
           <div className='modal__submit__row'>
                <div className='modal__submit__value'>До сплати</div>
                <div className='modal__submit__value'>{inputSum} ГРН</div>
           </div>
         
           <button className='modal__submit__button' onClick={handleSubmitPaymentButton}>Підтвердити</button>
      </div>
        </ModalCreditClose>



        <ModalCreditOpen active={modalActive} setActive={setModalActive}>
      <div className='modal__success'>
                <img className='modal__success__img' src={success_icon}></img>
                <div className='modal__success__text'>Дякуємо!</div>
                <div className='modal__success__text'>Платіж успішно відправлено</div>
                <div className='modal__success__text__small'>Переказ на картку</div>
                <div className='modal__success__text__small'>Номер картки *{inputCardNumber.slice(12)}</div>
                <div className='modal__success__text'>{inputSum} ГРН</div>
                <button className='modal__success__button__to__main' onClick={() => navigate('/main')}>На головну</button>
      </div>
        </ModalCreditOpen>  
       
        </>
    );
}

export default MoneyTransferPage;

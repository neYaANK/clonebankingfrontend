import React, {useState} from 'react';
import { useNavigate, Link } from "react-router-dom";
import "./AllCreditsPage.css";
import MainPageHeader from '../../MainPageComponents/MainPageHeader';
import MainPageFooter from '../../MainPageComponents/MainPageFooter';
import AuthService from "../../services/auth.service";
import dateFormat from 'dateformat';
import credits_icon from '../../images/credits_icon.png';
import go_back_arrow_icon from '../../images/go_back_arrow_icon.png';
import ModalCreditOpen from '../ModalCreditOpen'
import ModalCreditClose from '../ModalCreditClose';

const AllCreditsPage = () => {
    const navigate = useNavigate();
    const demoMessage = "Функція недоступна у демоверсії";

    const[credits, setCredits] = useState(AuthService.getUserAllCredits().credits);
    const[selectedCredit, setSelectedCredit] = useState(AuthService.getUserAllCredits().credits[0]);
    const[cards, setCards] = useState(AuthService.getUserAllCards().cards);
    const[selectedCardNumber, setSelectedCardNumber] = useState(AuthService.getUserAllCards().cards[0].cardNumber);
    const [valueToPay, setValueToPay] = useState((selectedCredit.baseBalance/12 + selectedCredit.baseBalance/12/100*selectedCredit.creditType.percentPerMonth).toFixed(2))

    const[modalActive, setModalActive] = useState(false)
    const[modalCloseActive, setModalCloseActive] = useState(false)

    const renderCredits = credits.map(credit => <div key={credit.id} >
            <div className="credit__view__blok">
                <div>
                    <div className='credit__view__blok__creditNumberTitle'>Номер кредиту: </div> 
                    <div>{credit.creditType.id}/{credit.id}</div>
                </div>
                <div className='credit__view__blok__baseBalance'>{credit.baseBalance.toFixed(2)} ГРН</div>
                <div>
                    <div className='credit__view__blok__nextPaymentTitle'>наступний внесок {dateFormat(new Date, "dd.mm.yy")}</div>
                    <div className='credit__view__blok__nextPaymentSize'>{(credit.baseBalance/12 + credit.baseBalance/12/100*5).toFixed(2)} грн</div>
                </div>
                <div className='credit__view__blok__balance'>Баланс: {credit.balance.toFixed(2)} грн</div>
                <button className='credit__view__blok__buttonPayCredit' onClick={()=>{setModalActive(true); setSelectedCredit(credit)} }>Зробити внесок</button>
            </div>
        </div>)       
   
    const payCreditHandle = (creditId, value, cardNumber) =>{
        AuthService.repayCredit(creditId, value, cardNumber)
        
        .then(()=>AuthService.setUserAllCredits())
        .then(()=>setCredits(AuthService.getUserAllCredits().credits))
        .then(()=>AuthService.setUserAllCards()) 
        .then(()=>setModalActive(false))
        .then(()=>setModalCloseActive(true))
       
    }

    const cardsAsOptions = cards.map(card => <option key={card.id} value={card.cardNumber}> 
        
        * * * * {(card.cardNumber).slice(12)} Дата {dateFormat(card.expireDate, "mm/yy")} {card.balance.toFixed(2)} грн</option>)

    return (
        <>
        <MainPageHeader/>
        <div className='upper__line'>
            <div className='upper__line__combo'>
            <Link onClick={() => navigate(-1)}>
                    <img className='upper__line__go__back__img' src={go_back_arrow_icon}></img>
                </Link>
                <img className='upper__line__img' src={credits_icon}></img>
                <div className='upper__line__title'>Кредити</div>
                <button className='upper__line__add__button' onClick={()=>navigate('/openCredit')}>+</button>
            </div>
            <div className='get__consult'>
                <button className='get__consult__button' onClick={() => alert(demoMessage)}>Отримати консультацію</button>
            </div>
        </div>

        <div className='credits__archiv__container'>
            <div className='credits__container'>
                <div className='container__title'>Мої кредити</div>
                <div className='credits__list'>
                    {renderCredits}
                </div>
            </div>
            
            <div className='archiv__container'>
                <div className='container__title'>Архів</div>
            </div>
        </div>

      

        <ModalCreditOpen active={modalActive} setActive={setModalActive}>
      <div className='modal__close__credit'>
           <button className='modal__close__credit__button__close' type="button" onClick={()=>setModalActive(false)}>&#x2715;</button>
           <div className='modal__close__credit__title'>Погашення кредиту № {selectedCredit.creditType.id}/{selectedCredit.id}</div>
           <div className='modal__close__credit__row'>
                <div className='modal__close__credit__text'>Сума кредиту</div>
                <div className='modal__close__credit__value'>{(selectedCredit.baseBalance).toFixed(2)} грн</div>
           </div>
           <div className='modal__close__credit__row'>
                <div className='modal__close__credit__text'>Погашено</div>
                <div className='modal__close__credit__value'>{(selectedCredit.baseBalance - selectedCredit.balance).toFixed(2)} грн</div>
           </div>
           <div className='modal__close__credit__row'>
                <div className='modal__close__credit__text'>Ставка</div>
                <div className='modal__close__credit__value'>{selectedCredit.creditType.percentPerMonth} %</div>
           </div>
           <div className='modal__close__credit__row'>
                <div className='modal__close__credit__text'>Необхідно сплатити</div>
                <div className='modal__close__credit__value__red'>{valueToPay} грн</div>
           </div>
           <div className='modal__close__credit__row'>
                <div className='modal__close__credit__text'>Картка для оплати: </div>
                <div className='modal__close__credit__value'>{selectedCardNumber}</div>
           </div>

           
           <div >
                <select value={selectedCardNumber}  onChange={(e) => setSelectedCardNumber(e.target.value)}>
                    {cardsAsOptions}
                </select>
           </div>
           <button className='modal__close__credit__button' onClick={()=>payCreditHandle(selectedCredit.id, valueToPay, selectedCardNumber)}>Сплатити</button>
      </div>
        </ModalCreditOpen>

        <ModalCreditClose active={modalCloseActive} setActive={setModalCloseActive}>
        <div className='modal__credits'>
            <div className='modal__credits__congrats'>
                <img className='modal__credits__img' src={credits_icon}></img>
                <div className='modal__credits__text'>Вітаємо!</div>
                <div className='modal__credits__text'>Сплата пройшла успішно</div>
            </div>
            <div className='modal__credits__buttons'>
                <button className='modal__credits__button__contract' onClick={() => setModalCloseActive(false)}>Мої кредити</button>
                <button className='modal__credits__button__to__main' onClick={() => navigate('/main')}>На головну</button>
            </div>
        </div>
        </ModalCreditClose>
        <MainPageFooter/>  
        
        </>
       
    );
}

export default AllCreditsPage;

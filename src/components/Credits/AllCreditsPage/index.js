import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import "./AllCreditsPage.css";
import MainPageHeader from '../../MainPageComponents/MainPageHeader';
import MainPageFooter from '../../MainPageComponents/MainPageFooter';
import AuthService from "../../services/auth.service";
import dateFormat from 'dateformat';

const AllCreditsPage = () => {
    const navigate = useNavigate();
    function handleAllCreditsButton(){navigate("/allCredits");} 

    const [credits, setCredits] = React.useState(AuthService.getUserAllCredits().credits);
    const renderCredits = credits.map(credit => <div key={credit.id} >
            <div className="credit__view__blok">
                <p>Тип кредиту: {credit.creditType.currency}</p>
                <p>{credit.baseBalance} ГРН</p>
                <p>наступний внесок</p>
                <p>... дата ...</p>
                <p>...розмір внеску...</p>
                <p>баланс: -{credit.balance} грн</p>
            </div>
        </div>)

    const[rows, setRows] = useState(credits);
    const Row = (props) => {
        const{id, baseBalance, balance, creditStatus, issuedAt, percentPerMonth, currency, term = 10, monthPayment = baseBalance/term + (baseBalance/term)/100*percentPerMonth, reopenAt = "-"} = props;
        return (<tr>
            <td>{id}</td>
            <td>{dateFormat(issuedAt, "dd.mm.yy")}</td>
            <td>{id}</td>
            <td>{baseBalance}</td>
            <td>{balance}</td>
            <td>{currency}</td>
            <td>{percentPerMonth}</td>
            <td>{monthPayment}</td>
            <td>{term} міс.</td>
            <td>{reopenAt}</td>
            <td>{creditStatus}</td>
    
        </tr>)

    }
    const Table = (props) => {
        const {data} = props;
        return(
            <table>
                <tr>
                    <th>№</th>
                    <th>Дата видачі</th>
                    <th>Номер договору</th>
                    <th>Сума</th>
                    <th>Поточна заборгованість</th>
                    <th>Валюта</th>
                    <th>Місячна ставка</th>
                    <th>Сума місячного платежу</th>
                    <th>Термін</th>
                    <th>Дата оновлення</th>
                    <th>Стан</th>
                </tr>
                <tbody>
                    {data.map((row, index) =>
                        <Row key={index} 
                        id={index+1}
                        issuedAt={row.issuedAt}
                        baseBalance={row.baseBalance}
                        balance={row.balance}
                        currency={row.creditType.currency}
                        percentPerMonth={row.creditType.percentPerMonth}
                        creditStatus={row.creditStatus}
                        />
                    )}
                </tbody>
            </table>
        )
    }
    
    return (
        <>
        <MainPageHeader/>
         <div className='credits__container'>
            <div className='credits__title'>Кредити</div>
            <div className='credits__options__buttons'>
                <button className='credits__list__button' onClick={handleAllCreditsButton}>Мої кредити </button>
                <button className='credits__open__button'>Відкрити кредит </button>
            </div>
            <div className='credits__list'>
                {renderCredits}
            </div>
            <div className='credits__archiv__title'>Архів кредитів:</div>
            <div className='credits__archiv__table'>
                <Table data={rows}/>
            </div>
        <MainPageFooter/>   
        </div>
        </>
       
    );
}

export default AllCreditsPage;

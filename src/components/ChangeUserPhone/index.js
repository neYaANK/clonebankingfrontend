import React, { Component } from 'react';
import AuthService from '../services/auth.service';
import styles from './ChangeUserPhone.module.css';

const phoneValidationPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; //This will match phone numbers input in the following formats:
                                                                                            // +380978887766
                                                                                            // 0978887766
                                                                                            // +80978887766
                                                                                            // 097-888-7766
                                                                                            // (097) 888-7766

class ChangeUserPhone extends Component {   
    constructor(props) {
        super(props);
        this.state = { phoneNumber: null }
    }

    componentDidMount(){
        const phoneNumber = AuthService.getUserFullInfo().phoneNumber;
        this.setState({phoneNumber : phoneNumber});
    }
    handleForm = (event) => {
        event.preventDefault();
        //event.target.reset();
          
        AuthService.changeUserPhoneNumber(event.target.phone.value);
        console.log("handleForm end");
    }
    
    handleInput = (validationPattern, warningMessage) => ({ target }) => {
        const valid = target.value.match(validationPattern);
        this.setState({
            [target.name]: target.value, 
            });
        if (!valid) {
            target.setCustomValidity(warningMessage);
        }
        else {
            target.setCustomValidity("");
        }
    }
    
    render() {
        return (
            <form className={styles.block} onSubmit={this.handleForm}>
                <label className={styles.label}> Введіть новий номер телефону:</label>
                <input name="phone"
                    onChange={this.handleInput(phoneValidationPattern, "Неправильний формат номера")}
                    type="text"
                    placeholder="Номер телефону"
                />
                <input 
                    type="submit"
                    value="Підтвердити"
                />
            </form>   
        );
    }
}

export default ChangeUserPhone;

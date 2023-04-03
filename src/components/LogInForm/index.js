import React, { Component } from 'react';
import styles from './LogInForm.module.css';
import cx from 'classnames';
import AuthService from '../../services/auth.service';
import Account from '../Account';

const initialState = {
    phone: '',
    password: '',

    phoneIsInvalid: false,
    emailIsInvalid: false,

    currentUser: {}
};

const phoneValidationPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; //This will match phone numbers input in the following formats:
                                                                                            // +380978887766
                                                                                            // 0978887766
                                                                                            // +80978887766
                                                                                            // 097-888-7766
                                                                                            // (097) 888-7766
const passwordValidationPattern = /^[a-zA-Z0-9]{6,16}$/; //6-16 letters length

class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState }
    }

    componentDidMount(){}

    handleForm = (event) => {
    //  console.log('handleform');
       
        event.preventDefault();
        event.target.reset();

        AuthService.login(this.state.phone, this.state.password)
        .then(response => {
            //console.log(response.data);
            this.setState({currentUser: response.data });
           
            // спрацьовує за другим разом????
            alert(this.state.currentUser.name + '\n'+this.state.currentUser.surname + '\n' + this.state.currentUser.phoneNumber);
            //console.log(this.state.currentUser.name);
        })
        .catch((error)=>{
            console.log(error);
         });

    }

    handleInput = (validationPattern, warningMessage) => ({ target }) => {
        const valid = target.value.match(validationPattern);
        this.setState({
            [target.name]: target.value,
            [`${target.name}IsInvalid`]: !valid
        });
        if (!valid) {
            target.setCustomValidity(warningMessage);
        }
        else {
            target.setCustomValidity("");
        }
    }

    render() {
        const {phone, password, phoneIsInvalid, passwordIsInvalid, currentUser} = this.state;
            
        const phoneClass = cx(styles.input, { [styles.invalid]: phoneIsInvalid });
        const passwordClass = cx(styles.input, { [styles.invalid]: passwordIsInvalid });

        return (
            <form className={styles.form} onSubmit={this.handleForm}>
                <h1>LogIn form</h1>
                
                <input className={phoneClass}
                    value={phone}
                    onChange={this.handleInput(phoneValidationPattern, "Неправильний формат номера")}
                    type="text"
                    name="phone"
                    placeholder="Номер телефону"
                    required
                />
                <input className={passwordClass}
                    value={password}
                    onChange={this.handleInput(passwordValidationPattern, "Довжина паролю від 6 до 16 літер")}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                />
               
                <input className={styles.input}
                    type="submit"
                    value="Login"
                />

            </form>
        );
    }
}

export default LogInForm;
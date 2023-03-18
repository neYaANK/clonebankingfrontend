import React, { Component } from 'react';
import styles from './LogInForm.module.css';
import cx from 'classnames';

const initialState = {
    phone: '',
    password: '',

    phoneIsInvalid: false,
    emailIsInvalid: false,
};

const phoneValidationPattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; //This will match phone numbers input in the following formats:
                                                                                            // +380978887766
                                                                                            // 0978887766
                                                                                            // +80978887766
                                                                                            // 097-888-7766
                                                                                            // (097) 888-7766
const passwordValidationPattern = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/; // At least 1 digit, 6-16 symbols length

class LogInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { ...initialState }
    }

    handleForm = (event) => {
        event.preventDefault();
        event.target.reset();
        this.setState({ ...initialState })
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
        const {phone, password, phoneIsInvalid,passwordIsInvalid} = this.state;
            
        const phoneClass = cx(styles.input, { [styles.invalid]: phoneIsInvalid });
        const passwordClass = cx(styles.input, { [styles.invalid]: passwordIsInvalid });

        return (
            <form className={styles.form} onSubmit={this.handleForm}>
                <h1>Log In form</h1>
                
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
                    onChange={this.handleInput(passwordValidationPattern, "Пароль повинен містити принаймні 1 цифру\nДовжина паролю від 6 до 16 символів")}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    required
                />
               
                <input className={styles.input}
                    type="submit"
                    value="Send"
                />

            </form>
        );
    }
}

export default LogInForm;
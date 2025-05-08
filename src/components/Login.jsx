import { useState } from "react"
import { Logo } from './Logo'
import { Input } from './Input'
import {
    emailValidationMessage,
    validationEmail,
    validatePasswordMessage,
    validatePassword
} from '../shared/validators'
import { useLogin } from "../shared/hooks"

export const Login = ({ switchAuthHandler }) => {
    const { login, isLoading } = useLogin();

    const [formState, setFormState] = useState({
        email: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
    })

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'email':
                isValid = validationEmail(value)
                break

            case 'password':
                isValid = validatePassword(value)
                break

            default:
                break
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleLogin = (event) => {
        event.preventDefault()

        login(formState.email.value, formState.password.value)
    }

    const isSubmitButtonDisable = isLoading || !formState.email.isValid || !formState.password.isValid

    return (
        <div className="login-container">
            <form className="auth-form">
                <Logo text={'INICIAR SESION'} />
                <div className="input-box">
                    <Input
                        field='email'
                        placeholder='Email'
                        className='login-input'
                        value={formState.email.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.email.showError}
                        validationMessage={emailValidationMessage}
                    />
                    <i class="fa-solid fa-envelope"></i>
                </div>
                <div className="input-box">
                    <Input
                        field='password'
                        placeholder='Password'
                        className='login-input'
                        value={formState.password.value}
                        onChangeHandler={handleInputValueChange}
                        type='password'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.password.showError}
                        validationMessage={validatePasswordMessage}
                    />
                    <i class="fa-solid fa-lock"></i>
                </div>
                <button onClick={handleLogin} disabled={isSubmitButtonDisable} className="login__button">
                    INICIA SESION
                </button>
                <div onClick={switchAuthHandler} className="auth-form-switch-label">
                    ¿NO TIENES UNA CUENTA? ¡REGISTRATE HORA!
                </div>
            </form>
        </div>
    )
}
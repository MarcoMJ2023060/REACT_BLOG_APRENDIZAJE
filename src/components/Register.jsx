import { useState } from 'react'
import { Logo } from './Logo'
import { Input } from './Input'
import {
    emailValidationMessage,
    validationEmail,
    validatePasswordMessage,
    validatePassword,
    validateUsername,
    validateUsernameMessage,
    validateConfirmPassword,
    passwordConfirmationMessage
} from '../shared/validators'
import { useRegister } from '../shared/hooks'

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

    const [formState, setFormState] = useState({
        username: {
            value: '',
            isValid: false,
            showError: false
        },
        password: {
            value: '',
            isValid: false,
            showError: false
        },
        passwordConfirm: {
            value: '',
            isValid: false,
            showError: false
        },
        email: {
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

            case 'passwordConfirm':
                isValid = validateConfirmPassword(formState.password.value, value)
                break

            case 'username':
                isValid = validateUsername(value)
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

    const handleRegister = (event) => {
        event.preventDefault()

        register(formState.username.value, formState.password.value, formState.email.value)
    }

    const isSubmitButtonDisable = isLoading || !formState.username.isValid || !formState.email.isValid || !formState.password.isValid || !formState.passwordConfirm.isValid

    return (
        <div className="register-container">
            <Logo text={'REGISTRARSE'} />
            <form className='auth-form'>
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
                        field='username'
                        placeholder='Username'
                        className='login-input'
                        value={formState.username.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.username.showError}
                        validationMessage={validateUsernameMessage}
                    />
                    <i class="fa-solid fa-user"></i>
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
                    <i class="fa-solid fa-key"></i>
                </div>
                <div className="input-box">
                    <Input
                        field='passwordConfirm'
                        placeholder='Password Confirmation'
                        className='login-input'
                        value={formState.passwordConfirm.value}
                        onChangeHandler={handleInputValueChange}
                        type='password'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.passwordConfirm.showError}
                        validationMessage={passwordConfirmationMessage}
                    />
                    <i class="fa-solid fa-lock"></i>
                </div>
                <button onClick={handleRegister} disabled={isSubmitButtonDisable}>
                    REGISTRARTE
                </button>
            </form>
            <span onClick={switchAuthHandler} className="auth-form-switch-label">
                ¿YA TIENES UNA CUENTA? ¡INICIA SESION!
            </span>
        </div>
    )
}
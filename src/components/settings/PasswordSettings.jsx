import { useState } from "react"
import { 
    validatePassword, 
    validatePasswordMessage} from '../../shared/validators'
import { Input } from "../Input"
import { useChangePassword } from "../../shared/hooks"

const inputs = [
    {
        field: 'password',
        label: 'Password',
        validationMessage: validatePasswordMessage,
        type:'password'
    },
    {
        field: 'newPassword',
        label: 'New Password',
        validationMessage: validatePasswordMessage,
        type:'password'
    },
]

export const PasswordSettings = () => {
    const [formState, setFormState] = useState({
        password:{
            isValid:false,
            showError: false,
            value:''
        },
        newPassword:{
            isValid:false,
            showError: false,
            value:''
        }
    })

    const {changePassword} = useChangePassword()

    const handelInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]:{
                ...prevState[field],
                value: value
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = validatePassword(value)

        setFormState((prevState) => ({
            ...prevState,
            [field]:{
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const isSubmitButtonDisabled = !formState.password.isValid || !formState.newPassword.isValid

    const handleFormSubmit = (event) => {
        event.preventDefault()

        changePassword(formState.password.value, formState.newPassword.value)
    }
  return (
    <form className="settings-form">
        {inputs.map((input) => (
            <Input
                key={input.field}
                field={input.field}
                label={input.label}
                value={formState[input.field].value}
                onBlurHandler={handleInputValidationOnBlur}
                onChangeHandler={handelInputValueChange}
                showErrorMessage={formState[input.field].showError}
                validationMessage={input.validationMessage}
                type={input.type}
            />
        ))}
        <button onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>
            AZTUALIZA TU CONTRASEÑA
        </button>
    </form>
  )
}

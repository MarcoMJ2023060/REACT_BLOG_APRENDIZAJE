import { useState } from "react";
import {
  validateUsername,
  validateUsernameMessage,
  validationEmail,
  emailValidationMessage,
} from "../../shared/validators";
import { Input } from "../Input.jsx";

const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

const inputs = [
  {
    field: "username",
    label: "Username",
    validationMessage: validateUsernameMessage,
    type: "text",
  },
  {
    field: "email",
    label: "Email",
    validationMessage: emailValidationMessage,
    type: "text",
  },
];
export const UserSettings = ({ settings, saveSettings }) => {
  const [formState, setFormState] = useState({
    username: {
      isValid: validateUsername(settings.username),
      showError: false,
      value: settings.username,
    },
    email: {
      isValid: validationEmail(settings.email),
      showError: false,
      value: settings.email,
    },
  });

  const handleInputValueChange = (value, field) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        value,
      },
    }));
  };

  const handleInputValidationOnBlur = (value, field) => {
    let isValid = false;
    switch (field) {
      case "username":
        isValid = validateUsername(value);
        break;
      case "email":
        isValid = validationEmail(value);
        break;
      default:
        break;
    }
    setFormState((prevState) => ({
        ...prevState,
        [field]:{
            ...prevState[field],
            isValid,
            showError: !isValid
        }
    }))
  };

  const handleFormSubmit = (event) =>{
    event.preventDefault()

    saveSettings({
        username: formState.username.value,
        email: formState.email.value,
        userId: userId
    })

  }

  const isSubmitButtonDisabled = !formState.username.isValid ||
                                 !formState.email.isValid

  return(
    <form className="settings-form">
        {inputs.map((input) => (
            <Input 
                key={input.field}
                field={input.field}
                label={input.label}
                value={formState[input.field].value}
                onChangeHandler={handleInputValueChange}
                onBlurHandler={handleInputValidationOnBlur}
                showErrorMessage={formState[input.field].showError}
                validationMessage={input.validationMessage}
                type={input.type}
                textarea={input.textarea}
            />
        ))}
        <button onClick={handleFormSubmit} disabled={isSubmitButtonDisabled}>
            GUARDAR
        </button>
    </form>
  )
};

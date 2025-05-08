export const validationEmail = (email) => {
    const regex = /\S+@\S+\.\S+/

  return regex.test(email)
}

export const emailValidationMessage = 'Este email no sirve'
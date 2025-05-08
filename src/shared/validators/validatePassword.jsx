export const validatePassword = (password) => {
    const regex = /^\S{6,30}$/

    return regex.test(password)
}

export const validatePasswordMessage = 'La contraseña debe tener entre 6 y 30 caracteres'
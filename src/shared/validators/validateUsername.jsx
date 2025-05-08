export const validateUsername = (username) => {
    const regex = /^\S{1,20}$/

    return regex.test(username)
}

export const validateUsernameMessage = 'El username debe tener entre 3 y 20 caracteres sin espacios'
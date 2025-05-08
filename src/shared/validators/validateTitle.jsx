export const validateTitle = (title) => {
    return title.length >=2 && title.length <=30
}

export const validateTitleMessage = 'Se debe tener entre 2 y 30 caracteres'
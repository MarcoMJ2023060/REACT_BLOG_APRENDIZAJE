export const validateDescription = (description) => {
    return description.length >= 4 && description.length <= 1000
}

export const descriptionValidateMessage = 'La descripcion debe tener entre 4 y 1000 caracteres'
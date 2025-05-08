export const validateComment = (comment) => {
    return comment.length >=2 && comment.length <=200
}

export const validateCommentMessage = 'El comentario debe tener entre 2 y 200 caracteres'
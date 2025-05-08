import React, { useState } from 'react';
import { newComment as newCommentRequest } from '../../services';
import toast from 'react-hot-toast';

export const useNewComment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState([]);

    const comment = async (publicacion, texto) => {
        setIsLoading(true);

        let token = null;
        let username = 'Usuario';

        const userDataString = localStorage.getItem('user');
        if (userDataString) {
            const userData = JSON.parse(userDataString);
            token = userData.token;
            username = userData.username || 'Usuario'; // <- CORREGIDO
        }

        try {
            const response = await newCommentRequest({ publicacion, texto }, token);

            setIsLoading(false);

            if (response.error) {
                toast.error(response.e?.response?.data || 'Ocurrió un error al crear el comentario');
            } else {
                toast.success('Comentario creado exitosamente');

                // El backend ya responde con el comentario completo, puedes usar response.comment si lo deseas
                setComments(prevComments => [...prevComments, { usuario: username, texto }]);
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Ocurrió un error al enviar el comentario');
        }
    }

    return {
        comment,
        isLoading,
        comments
    }
}

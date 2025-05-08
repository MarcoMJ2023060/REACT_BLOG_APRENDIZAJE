import { useState } from "react";
import { newPost as newPostRequest } from '../../services'
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useNewPost = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const navigate = useNavigate()

    const post = async (titulo, categoria, texto) => {
        setIsLoading(true);

        const userDataString = localStorage.getItem('user');
        const userData = JSON.parse(userDataString);
        const token = userData.token;

        try {
            const response = await newPostRequest({
                titulo,
                categoria,
                texto
            }, token);

            setIsLoading(false);

            if (response.error) {
                toast.error(response.e?.response?.data || 'Ocurrio un error al crear un post nuevo');
            } else {
                toast.success('Post creado exitosamente');
                navigate('/')
            }
        } catch (error) {
            setIsLoading(false);
            toast.error('Ocurrió un error al enviar el comentario');
        }
    }

    return {
        post,
        isLoading,
        posts
    }
}

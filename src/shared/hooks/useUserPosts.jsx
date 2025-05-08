/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import toast from "react-hot-toast";
import { getPostsUser as getPostsUserRequest } from "../../services/api";

export const useUserPosts = () => {
    const [userPosts, setUserPosts] = useState([])

    const getUserPosts = async (isLogged = false) => {

        const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).username : null;

        try {
            const userPostsData = await getPostsUserRequest({user})
            if (userPostsData.error) {
                return toast.error(
                    userPostsData.e?.response?.data || 'Ocurrió un error al leer los posts'
                )
            }

            setUserPosts(userPostsData.data)

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return {
        getUserPosts,
        isFetching: !Boolean(userPosts),
        allUserPosts: userPosts
    }
}
/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import toast from "react-hot-toast";
import { getPosts as getPostsRequest } from "../../services/api";

export const usePosts = () => {
    const [posts, setPosts] = useState([])

    const getPosts = async (isLogged = false) => {
        try {
            const postsData = await getPostsRequest()
            if (postsData.error) {
                return toast.error(
                    postsData.e?.response?.data || 'Ocurrió un error al leer los posts'
                )
            }

            setPosts(postsData.data)

        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    return {
        getPosts,
        isFetching: !Boolean(posts),
        allPosts: posts
    }
}
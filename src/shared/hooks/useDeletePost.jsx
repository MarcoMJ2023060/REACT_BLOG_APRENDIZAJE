import { useState } from "react";
import {toast} from "react-hot-toast";
import { deletePost } from "../../services";

export const useDeletePost = () => {

    const PostDelete = async (id) => {
        const responseData = await deletePost(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al eliminar el post'
            )
        }
    }

    return{
        PostDelete
    }
}
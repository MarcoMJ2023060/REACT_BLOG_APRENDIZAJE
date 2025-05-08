import { useState } from "react";
import {toast} from "react-hot-toast";
import { getPostsDetails as getPostsDetailsRequest } from "../../services";

export const usePostDetails = () => {
    const [postDetails, setPostDetails] = useState();

    const getPostsDetails = async (id) => {
        const responseData = await getPostsDetailsRequest(id)

        if(responseData.error){
            return toast.error(
                responseData.e?.response?.data ||
                'Error al cargar la información del post'
            )
        }
        setPostDetails(responseData)
    }

    return{
        isFetching: !postDetails,
        postDetails,
        getPostsDetails
    }
}
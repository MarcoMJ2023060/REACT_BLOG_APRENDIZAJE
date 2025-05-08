import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/forchan_2/v1',
    timeout: 1000
})

export const login = async (data) => {
    try{
        return await apiClient.post('/usuarios/login', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const register = async (data) => {
    try{
        return await apiClient.post('/usuarios', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const patchChangePassword = async (data) => {
    try{
        return await apiClient.patch('/usuarios/password', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const putUserSettings = async (data) => {
    try{
        return await apiClient.put('/usuarios/update', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getUserSetting = async (data) => {
    try{
        return await apiClient.post('/usuarios/settings', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getPosts = async () => {
    try{
        return await apiClient.get('/publications')
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getPostsUser = async (data) => {
    console.log('api: '+data.user)
    try{
        return await apiClient.post('/publications/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getPostsDetails = async (id) => {
    try{
        return await apiClient.get(`/publications/${id}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const deletePost = async (id) => {
    try{
        return await apiClient.delete(`/publications/${id}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const newPost = async (data, token) => {
    try{
        const response = await apiClient.post('/publications', data, {
            headers: {
                'x-token': `${token}`
            }
        });
        return response;
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const newComment = async (data, token) => {
    try {
        const response = await apiClient.post('/comments', data, {
            headers: {
                'x-token': `${token}`
            }
        });
        return response;
    } catch (error) {
        console.error(error);
        return { error: true, e: error };
    }
};
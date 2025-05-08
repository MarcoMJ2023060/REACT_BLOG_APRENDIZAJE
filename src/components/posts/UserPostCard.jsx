import { useNavigate } from "react-router-dom"
import { useDeletePost } from "../../shared/hooks"

export const UserPostCard = ({
    usuario,
    _id,
    titulo,
    categoria,
    texto,
    navigateToPostHandler
}) => {

    const navigate = useNavigate()
    const { PostDelete } = useDeletePost()

    const handleEdit = () => {
        navigate(`/editpost/${_id}`)
    }

    const handleDelete = (event) => {
        event.preventDefault()

        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este post?");

        if (confirmDelete) {
            PostDelete(_id);
        }
    }

    const handleNavigate = () => {
        navigateToPostHandler(_id)
    }

    return (
        <div className="user-post">
            <div className="buttons-box">
                <button className="btn-editar" onClick={handleEdit}>
                    EDITAR PUBLICACION
                    <i className="fa-solid fa-pen"></i>
                </button>
                <button className="btn-eliminar" onClick={handleDelete}>
                    ELIMINAR PUBLICACION
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </div>
            <div className="post-card" onClick={handleNavigate}>
                <span className="post-card-title">{titulo}</span>
                <div className="post-box">
                    <div className="text-box">
                        <i className="fa-solid fa-user"></i>
                        <span className="post-card-text">{usuario}</span>
                    </div>
                    <div className="text-box">
                        <i className="fa-solid fa-layer-group"></i>
                        <span className="post-card-text">{categoria}</span>
                    </div>
                </div>
                <span className="post-card-subtitle">{texto}</span>
            </div>
        </div>
    )
}
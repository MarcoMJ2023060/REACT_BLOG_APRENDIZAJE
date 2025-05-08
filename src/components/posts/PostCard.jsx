export const PostCard = ({
    usuario,
    _id,
    titulo,
    categoria,
    texto,
    navigateToPostHandler
}) => {
    const handleNavigate = () => {
        navigateToPostHandler(_id)
    }

    return (
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
    )
}
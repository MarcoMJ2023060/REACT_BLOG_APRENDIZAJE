export const MessageDescription = ({
    usuario,
    texto,
}) => {

    return (
        <div className="message-container">
            <div className="message-item">
                <i className="fa-regular fa-user"></i>
                <span className="message-user">{usuario}</span>
            </div>
            <div className="message-text">
                <span className="message">{texto}</span>
            </div>
        </div>
    );
};
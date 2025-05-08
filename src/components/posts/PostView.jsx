import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { PostDescription } from "./PostDescription";
import { MessageDescription } from "./MessageDescription"
import { usePostDetails, useNewComment, useUserDetails } from "../../shared/hooks";
import { LoadingSpinner } from "../LoadingSpinner";
import { Input } from "../Input";
import {
    validateComment,
    validateCommentMessage
} from '../../shared/validators'

export const PostView = ({ getPosts }) => {
    const { isFetching, getPostsDetails, postDetails } = usePostDetails();
    const { comment, isLoading, comments } = useNewComment();
    const { isLogger, user } = useUserDetails(); // HOOK DEBE ESTAR AQUÍ

    const { id } = useParams();

    useEffect(() => {
        getPostsDetails(id)
    }, []);

    const [formState, setFormState] = useState({
        comment: {
            value: '',
            isValid: false,
            showError: false
        },
    });

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false;
        if (field === 'comment') {
            isValid = validateComment(value);
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }));
    };

    const handleComment = (event) => {
        event.preventDefault();

        // Protege contra 'user' undefined
        const username = isLogger && user && user.username ? user.username : "Usuario_Anonimo";

        comment(id, formState.comment.value, username);

        setFormState((prevState) => ({
            ...prevState,
            comment: {
                value: '',
                isValid: false,
                showError: false
            }
        }));
    };

    const isSubmitButtonDisable = isLoading || !formState.comment.isValid;

    if (isFetching) return <LoadingSpinner />;

    return (
        <div className="post-container">
            <div className="post-video-description-section">
                <div className="post-description-box2">
                    <PostDescription
                        usuario={postDetails.data.post.usuario}
                        titulo={postDetails.data.post.titulo}
                        categoria={postDetails.data.post.categoria}
                        texto={postDetails.data.post.texto}
                        getPosts={getPosts}
                    />
                </div>
                <div className="message-description-box">
                    <span className="message-title">COMENTARIOS:</span>
                    {postDetails.data.post.comentarios.length === 0 && comments.length === 0 && <p>Aun no hay comentarios</p>}
                    {postDetails.data.post.comentarios.map((comentario, index) => (
                        <MessageDescription key={index} usuario={comentario.usuario} texto={comentario.texto} />
                    ))}
                    {comments.map((comentario, index) => (
                        <MessageDescription key={index} usuario={comentario.usuario} texto={comentario.texto} />
                    ))}
                </div>
                <div className="new-message-box">
                    <Input
                        field='comment'
                        placeholder='New comment'
                        className='new-message'
                        value={formState.comment.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                        showErrorMessage={formState.comment.showError}
                        validationMessage={validateCommentMessage}
                    />
                    <button onClick={handleComment} disabled={isSubmitButtonDisable} className="send-button">
                        <i className="fa-solid fa-arrow-up-from-bracket"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

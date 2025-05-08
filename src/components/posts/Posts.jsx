import { useNavigate } from "react-router-dom";
import { PostCard } from "./PostCard";

export const Posts = ({posts}) => {
    const navigate  = useNavigate()

    const handleNavigateToPost = (id) => {
        navigate(`/post/${id}`)
    }


    return (
        <div className="posts-container">
          <span className="title-posts">PUBLICACIONES:</span>
          {Array.isArray(posts.posts) && posts.posts.map((p) => (
            <PostCard
              key={p.id}
              _id={p._id}
              usuario={p.usuario}
              titulo={p.titulo}
              categoria={p.categoria}
              texto={p.texto}
              navigateToPostHandler={handleNavigateToPost}
            />
          ))}
        </div>
      );      
}
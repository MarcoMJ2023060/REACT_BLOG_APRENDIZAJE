/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router-dom";
import { Settings } from "../settings/Settings";
import { Posts } from "../posts/Posts";
import { PostView } from '../posts/PostView'
import { NewPost } from "../posts/NewPost";

export const Content = ({posts, getPosts, newPost}) => {
    return(
        <div className="content-container">
            <Routes>
                <Route path="settings" element={<Settings/>}/>
                <Route path="/" element={<Posts posts={posts}/>}/>
                <Route path="post/:id" element={<PostView getPosts={getPosts}/>}/>
                <Route path="newPost" element={<NewPost/>}/>
            </Routes>
        </div>
    )
}   
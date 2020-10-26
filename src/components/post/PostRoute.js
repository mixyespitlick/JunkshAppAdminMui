import React from "react";
import { Route } from "react-router-dom";
import AddPost from "./AddPost";
import UpdatePost from "./UpdatePost";
import PostList from "./PostList";

const PostRoute = () => {
    return (
        <div>
            <Route path="/dashboard/posts/create" component={AddPost}></Route>
            <Route
                path="/dashboard/posts/update/:id"
                component={UpdatePost}
            ></Route>
            <Route path="/dashboard/posts" component={PostList} exact></Route>
        </div>
    );
};

export default PostRoute;

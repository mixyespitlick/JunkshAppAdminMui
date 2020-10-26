import React from "react";
import { Route } from "react-router-dom";
import AddUser from "./AddUser";
import UpdateUser from "./UpdateUser";
import UserList from "./UserList";

const UserRoute = () => {
    return (
        <div>
            <Route path="/dashboard/users/create" component={AddUser}></Route>
            <Route
                path="/dashboard/users/update/:id"
                component={UpdateUser}
            ></Route>
            <Route path="/dashboard/users" component={UserList} exact></Route>
        </div>
    );
};

export default UserRoute;

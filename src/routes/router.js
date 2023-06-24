import React from "react";
import {Route, Switch} from "react-router-dom";
import AuthContainer from "@components/auth";
import HomePage from "@components/pages";
import ProtectedRoute from "./protected-route";
import UsersContainer from "@components/users";

const Router = () => {
    return (
        <div>
            <Switch>
                <ProtectedRoute path="/" exact component={HomePage} />
                <ProtectedRoute path="/users/:action/:id?" authAllow={['confirmInvitation']} component={UsersContainer} />
                <Route path="/auth/:action" exact component={AuthContainer}></Route>
            </Switch>
        </div>
    );
};

export default Router;

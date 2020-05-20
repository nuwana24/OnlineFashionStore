import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, withRouter } from "react-router-dom";

const mapStateToProps = ({ session: { userId} }) => ({
    loggedIn: Boolean(userId)
});

const AuthAdmin = ({ loggedIn, path, component: Component }) => (
    <Route
        path={path}
        render={props => (
            loggedIn?
                <Redirect to='/Admin'/>:
                // <Redirect to='/Manager'/>
                <Component {...props} />

                // [
                //     loggedIn.username >= 0 ?
                //         :
                //         <Component {...props} />
                // ]


                // <div>
                // loggedIn.username ==='Admin'?
                // <Redirect to='/Admin' />
                // </div>
                // :
                // <div>
                //     loggedIn.username.indexOf('Store') >= 0 ?
                //         <Redirect to='/Manager' />
                //         :
                //         <Component {...props} />
                // </div>

        )}
    />
);

const AuthManager = ({ loggedIn, path, component: Component }) => (
    <Route
        path={path}
        render={props => (
            loggedIn ?
                <Redirect to='/Manager' /> :
                <Component {...props} />
        )}
    />
);


const Protected = ({ loggedIn, path, component: Component }) => (
    <Route
        path={path}
        render={props => (
            loggedIn ?
                <Component {...props} /> :
                <Redirect to='/AdLog' />
        )}
    />
);

export const AuthRouteAdmin = withRouter(
    connect(mapStateToProps)(AuthAdmin)
);
export const AuthRouteManager = withRouter(
    connect(mapStateToProps)(AuthManager)
);

export const ProtectedRoute = withRouter(
    connect(mapStateToProps)(Protected)
);
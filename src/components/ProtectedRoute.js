import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Spinner from './Spinner';

const ProtectedRoute = ({ isLoggedIn, path, children, isChecking }) => {
    return (
        <Route path={path} exact>
            {isChecking ? (
                <main className='content'>
                    <Spinner />
                </main>
            ) : (
                isLoggedIn ? children : <Redirect to="/signin" />
            )}
        </Route>
    )
}

export default ProtectedRoute;
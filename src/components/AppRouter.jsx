import React, {useContext} from "react";

import {privateRoutes, publicRoutes} from "../router/routes";
import {Navigate, Route, Routes} from "react-router-dom";
import {AuthContext} from "../Context";

const AppRouter=()=>{

const {isAuth}=useContext(AuthContext)
    return(
        isAuth
        ?
        <Routes>
            {privateRoutes.map(route =>
                <Route
                    element={route.element}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />

            )}
            <Route
                path="*"
                element={<Navigate to="/posts" replace />}
            />
        </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={route.element}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )}
                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
    )
}
export default AppRouter
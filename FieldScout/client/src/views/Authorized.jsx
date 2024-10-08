import { Navigate, useLocation } from "react-router-dom"

export const Authorized = ({ children }) => {
    let location = useLocation()

    //Check if uer i logged in. If they are, render the CHILD components (ApplicationView)
    if (localStorage.getItem("fieldScout_user")) {
        return children
    }
    // If the user is NOT logged in, redirect them to the login page using the Navigate component from react-router-dom
    else {
        return <Navigate to={`/login`} state={{ from: location }} replace />
    }
}
import { Outlet, Route, Routes } from "react-router-dom"
import { Dashboard } from "../components/dashboard/Dashboard.jsx"
import { ApplicationNavbar } from "../components/navbar/ApplicationNavbar.jsx"
import { GreenhouseManagement } from "../components/greenhouseManagement/GreenhouseManagement.jsx"
import { useEffect, useState } from "react"
import { GreenhouseBays } from "../components/greenhouseManagement/GreenhouseBays.jsx"

export const ApplicationViews = () => {
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
        const userObj = JSON.parse(localStorage.getItem("fieldScout_user"))

        setCurrentUser(userObj)
    }, [])

    return (
        
        <Routes>
            <Route
                path="/" 
                element={
                    <>
                        <ApplicationNavbar />
                        <Outlet />
                    </>
                } >
                <Route index element={<Dashboard currentUser={currentUser} />} />
                <Route path="greenhouseManagement" >
                    <Route index element={<GreenhouseManagement currentUser={currentUser} />} />
                    <Route path=":id" element={<GreenhouseBays currentUser={currentUser} />} />
                </Route>
            </Route>
        </Routes>
    )
}
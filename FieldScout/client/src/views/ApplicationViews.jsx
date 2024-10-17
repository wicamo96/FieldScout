import { Outlet, Route, Routes } from "react-router-dom"
import { Dashboard } from "../components/dashboard/Dashboard.jsx"
import { ApplicationNavbar } from "../components/navbar/ApplicationNavbar.jsx"
import { GreenhouseManagement } from "../components/greenhouseManagement/GreenhouseManagement.jsx"
import { useEffect, useState } from "react"
import { GreenhouseBays } from "../components/greenhouseManagement/GreenhouseBays.jsx"
import { GreenhouseBayDivision } from "../components/greenhouseManagement/GreenhouseBayDivision.jsx"
import { PestManagement } from "../components/pestManagement/PestManagement.jsx"
import { ScoutingHouseList } from "../components/scouting/ScoutingHouseList.jsx"
import { ScoutingBays } from "../components/scouting/ScoutingBays.jsx"
import { TrendsHouseList } from "../components/trends/TrendsHouseList.jsx"
import { HouseTrends } from "../components/trends/HouseTrends.jsx"

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
                    <Route path=":id" >
                        <Route index element={<GreenhouseBays currentUser={currentUser} />} />
                        <Route path=":bId" element={<GreenhouseBayDivision currentUser={currentUser} />} />
                    </Route>
                </Route>
                <Route path="pests" >
                    <Route index element={<PestManagement currentUser={currentUser} />} />
                </Route>
                <Route path="scouting">
                    <Route index element={<ScoutingHouseList currentUser={currentUser} />} />
                    <Route path=":shId" element={<ScoutingBays currentUser={currentUser} />} />
                </Route>
                <Route path="trends">
                    <Route index element={<TrendsHouseList currentUser={currentUser} />} />
                    <Route path=":thId" element={<HouseTrends currentUser={currentUser} />} />
                </Route>
            </Route>
        </Routes>
    )
}
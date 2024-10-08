import { Route, Routes } from "react-router-dom"
import { Dashboard } from "../components/dashboard/Dashboard.jsx"

export const ApplicationViews = () => {
    return (
        
        <Routes>
            <Route path="/" element={<Dashboard />} />
        </Routes>
    )
}
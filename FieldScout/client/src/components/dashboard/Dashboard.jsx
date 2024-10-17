import { useEffect, useState } from "react"
import { getCurrentGrowingWeek } from "../../services/ScoutingReportServices.jsx"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"
import { getPests } from "../../services/PestsServices.jsx"
import { Table } from "reactstrap"
import { DashboardGraph } from "./DashboardGraph.jsx"
import './Dashboard.css'

export const Dashboard = ({ currentUser }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [growingWeek, setGrowingWeek] = useState(0)
    const [facility, setFacility] = useState({})
    const [pests, setPests] = useState([])
    const [rows, setRows] = useState(0)
    const [even, setEven] = useState(false)

    useEffect(() => {
        getCurrentGrowingWeek().then(res => setGrowingWeek(res))
    }, [])

    useEffect(() => {
        getByIdWithHouses(currentUser.facilityId).then(res => setFacility(res))
    }, [currentUser])

    useEffect(() => {
        getPests().then(res => {
            setPests(res)
            let rows = res.length / 2
            setRows(rows)
            if (rows % 2 === 0) {
                setEven(true)
            } else {
                setEven(false)
            }

        })
    }, [])

    useEffect(() => {
        if (growingWeek != 0 || facility != {}) {
            setIsLoading(false)
        }
    }, [])

    return isLoading ?
        <div>Loading!</div>
    :
        <>
            <h1>{facility.name} Week {growingWeek}</h1>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><DashboardGraph pest={pests[0]} houseId={1} growingWeek={growingWeek} /></td>
                        <td></td>
                        <td><DashboardGraph pest={pests[1]} houseId={1} growingWeek={growingWeek} /></td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td><DashboardGraph pest={pests[2]} houseId={1} growingWeek={growingWeek} /></td>
                        <td></td>
                        <td><DashboardGraph pest={pests[3]} houseId={1} growingWeek={growingWeek} /></td>
                    </tr>
                    <tr className="secondary">
                        <td></td>
                    </tr>
                    <tr>
                        <td><DashboardGraph pest={pests[4]} houseId={1} growingWeek={growingWeek} /></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
}
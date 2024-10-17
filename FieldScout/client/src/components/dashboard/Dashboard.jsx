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
    const [houseList, setHouseList] = useState([])
    const [houseSelection, setHouseSelection] = useState({})

    useEffect(() => {
        setHouseList(facility.houses)
    }, [facility])

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
            <label>Select A House to View Last 4 Weeks Of Data
                <select onClick={(e) => setHouseSelection(e.target.value)}>
                    <option selected disabled>Filter By House</option>
                    {houseList?.map(house => {
                        return (
                            <option value={house.id}>{house.name}</option>
                        )
                    })}
                </select>
            </label>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><DashboardGraph pest={pests[0]} houseId={houseSelection} growingWeek={growingWeek} /></td>
                        <td></td>
                        <td><DashboardGraph pest={pests[1]} houseId={houseSelection} growingWeek={growingWeek} /></td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                    <tr>
                        <td><DashboardGraph pest={pests[2]} houseId={houseSelection} growingWeek={growingWeek} /></td>
                        <td></td>
                        <td><DashboardGraph pest={pests[3]} houseId={houseSelection} growingWeek={growingWeek} /></td>
                    </tr>
                    <tr className="secondary">
                        <td></td>
                    </tr>
                    <tr>
                        <td><DashboardGraph pest={pests[4]} houseId={houseSelection} growingWeek={growingWeek} /></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </>
}
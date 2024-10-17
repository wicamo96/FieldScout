import { useEffect, useState } from "react"
import { getCurrentGrowingWeek } from "../../services/ScoutingReportServices.jsx"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"
import { getPests } from "../../services/PestsServices.jsx"
import { Table } from "reactstrap"

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
    }, [])

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
            <Table>
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                            
                    </tr>                    
                </tbody>
            </Table>
        </>
}
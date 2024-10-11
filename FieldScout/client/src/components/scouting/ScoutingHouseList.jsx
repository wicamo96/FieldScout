import { useEffect, useState } from "react"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"
import { Table } from "reactstrap"
import { Link, useNavigate } from "react-router-dom"

export const ScoutingHouseList = ({ currentUser }) => {
    const [houses, setHouses] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getByIdWithHouses(currentUser.facilityId).then(facility => {
            setHouses(facility.houses)
        })
    }, [currentUser])


    return !houses?.length ?
        <div>Loading</div>
    :
        <>
            <h1>Select House To Add Scouting Data</h1>
            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {houses.map(house => {
                        return (
                            <tr>
                                <td><button onClick={() => navigate(`/scouting/${house.id}`, {state: { houseObj: house }})}>{house.name}</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
}
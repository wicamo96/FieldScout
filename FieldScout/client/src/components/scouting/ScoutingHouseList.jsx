import { useEffect, useState } from "react"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"
import { Button, Card, Table } from "reactstrap"
import { Link, useNavigate } from "react-router-dom"
import "./Scouting.css"

export const ScoutingHouseList = ({ currentUser }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [houses, setHouses] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        getByIdWithHouses(currentUser.facilityId).then(facility => {
            setHouses(facility.houses)
        }).then(setIsLoading(false))
    }, [currentUser])


    return isLoading ?
        <div>Loading</div>
    :
        <main className="background">
            <article className="gmBackground">
                <Table>
                    <thead>
                        <tr>
                            <th><h3>Select House To Add Scouting Data</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        {houses?.map(house => {
                            return (
                                <tr>
                                    <td><Button className="buttonWSymbol text" onClick={() => navigate(`/scouting/${house.id}`, {state: { houseObj: house }})}>{house.name}</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </article>
        </main>
}
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"
import { Button, Card, Table } from "reactstrap"

export const TrendsHouseList = ({ currentUser }) => {
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
                            <td><h3>Select House To View Pest Trends</h3></td>
                        </tr>
                    </thead>
                    <tbody>
                        {houses?.map(house => {
                            return (
                                <tr>
                                    <td><Button className="buttonWSymbol text" onClick={() => navigate(`/trends/${house.id}`, { state: { houseObj: house }})}>{house.name}</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </article>
        </main>
}
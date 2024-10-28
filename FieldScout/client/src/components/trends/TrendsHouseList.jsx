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
        <>
            <Card className="cardFix">
                <h1>Select House To View Pest Trends</h1>
                <Table>
                    <thead>
                        <tr>
                            <td>Name</td>
                        </tr>
                    </thead>
                    <tbody>
                        {houses?.map(house => {
                            return (
                                <tr>
                                    <td><Button className="greenButton" onClick={() => navigate(`/trends/${house.id}`, { state: { houseObj: house }})}>{house.name}</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </Card>
        </>
    
}
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getByIdWithHouses } from "../../services/FacilityServices.jsx"
import { Table } from "reactstrap"

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
                                <td><button onClick={() => navigate(`/trends/${house.id}`, { state: { houseObj: house }})}>{house.name}</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    
}